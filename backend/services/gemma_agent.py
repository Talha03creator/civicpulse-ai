import httpx
import json
import hashlib
from config import FIREWORKS_API_KEY, MODEL_NAME
from .mock_data import get_mock_triage_response

# ---------------------------------------------------------------------------
# Lightweight in-memory prompt cache
# Key: SHA-256 of (image_base64 first 512 chars + description)
# Value: parsed triage dict
# Eviction: simple LRU-style cap at 128 entries
# ---------------------------------------------------------------------------
_CACHE: dict[str, dict] = {}
_CACHE_MAX = 128

def _cache_key(image_base64: str, description: str) -> str:
    fingerprint = image_base64[:512] + "|" + description.strip().lower()
    return hashlib.sha256(fingerprint.encode()).hexdigest()

def _cache_get(key: str) -> dict | None:
    return _CACHE.get(key)

def _cache_set(key: str, value: dict) -> None:
    if len(_CACHE) >= _CACHE_MAX:
        # Evict oldest entry
        oldest = next(iter(_CACHE))
        del _CACHE[oldest]
    _CACHE[key] = value


# ---------------------------------------------------------------------------
# ASYNC Fireworks AI streaming call
# - Uses httpx.AsyncClient (non-blocking, does NOT stall the event loop)
# - stream=True: tokens stream from the API as they are generated
# - We collect the full streamed content before JSON-parsing it
#   because response_format=json_object guarantees the model completes
#   the JSON before the stream ends — safe to accumulate then parse.
# ---------------------------------------------------------------------------
async def analyze_civic_issue(image_base64: str, description: str) -> dict:
    """
    Async, streaming call to Fireworks AI Gemma-4 Multimodal.

    Previously: requests.post() — SYNCHRONOUS, held the thread for the full
    inference duration (often 3–5 minutes for multimodal payloads).

    Now: httpx.AsyncClient with stream=True — releases the event loop
    immediately; tokens arrive and are accumulated asynchronously.
    """
    if not FIREWORKS_API_KEY or FIREWORKS_API_KEY.startswith("fw_your"):
        print("[gemma_agent] No valid API key — using mock fallback.")
        return get_mock_triage_response()

    # --- Cache check (avoids re-running heavy model for identical queries) ---
    key = _cache_key(image_base64, description)
    cached = _cache_get(key)
    if cached:
        print(f"[gemma_agent] Cache HIT for key {key[:12]}…")
        return cached

    url = "https://api.fireworks.ai/inference/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {FIREWORKS_API_KEY}",
        "Content-Type": "application/json",
        "Accept": "text/event-stream",
    }

    payload = {
        "model": MODEL_NAME,
        "stream": True,          # ← THE FIX: tokens stream immediately
        "messages": [
            {
                "role": "system",
                "content": (
                    "You are CivicPulse AI, an autonomous municipal infrastructure triage agent "
                    "running on AMD hardware. Analyze the provided image and description. "
                    "Output ONLY valid JSON matching the exact schema: "
                    '{ "issue_category": str, "severity_score": int (1-10), '
                    '"urgency_level": str (Low|Medium|High|Critical), '
                    '"assigned_department": str, "estimated_sla_hours": int, '
                    '"ai_reasoning": str }'
                ),
            },
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": f"User description: {description}\nAnalyze this issue.",
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/jpeg;base64,{image_base64}"
                        },
                    },
                ],
            },
        ],
        "response_format": {"type": "json_object"},
        "temperature": 0.2,
        "max_tokens": 512,       # ← Cap token count to prevent runaway responses
    }

    accumulated = ""

    try:
        # httpx.AsyncClient is fully non-blocking — does NOT block the event loop
        # timeout=120s covers worst-case large-image multimodal inference
        async with httpx.AsyncClient(timeout=120.0) as client:
            async with client.stream("POST", url, headers=headers, json=payload) as response:
                response.raise_for_status()

                # Consume SSE lines as they arrive
                async for line in response.aiter_lines():
                    line = line.strip()
                    if not line or line == "data: [DONE]":
                        continue
                    if line.startswith("data: "):
                        chunk_json = line[6:]  # strip "data: " prefix
                        try:
                            chunk = json.loads(chunk_json)
                            delta = chunk["choices"][0].get("delta", {})
                            token = delta.get("content", "")
                            if token:
                                accumulated += token
                        except (json.JSONDecodeError, KeyError, IndexError):
                            continue  # malformed chunk — skip safely

        result = json.loads(accumulated)
        _cache_set(key, result)
        return result

    except httpx.TimeoutException:
        print("[gemma_agent] Fireworks AI timed out — using mock fallback.")
        return get_mock_triage_response()
    except Exception as e:
        print(f"[gemma_agent] Error: {e} — using mock fallback.")
        return get_mock_triage_response()
