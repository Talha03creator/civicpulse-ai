import requests
import json
from config import FIREWORKS_API_KEY, MODEL_NAME
from .mock_data import get_mock_triage_response

def analyze_civic_issue(image_base64: str, description: str) -> dict:
    if not FIREWORKS_API_KEY:
        print("Warning: FIREWORKS_API_KEY not found. Using mock fallback.")
        return get_mock_triage_response()

    url = "https://api.fireworks.ai/inference/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {FIREWORKS_API_KEY}",
        "Content-Type": "application/json"
    }

    # Format the payload for Fireworks AI / OpenAI compatibility
    payload = {
        "model": MODEL_NAME,
        "messages": [
            {
                "role": "system",
                "content": "You are CivicPulse AI, an autonomous municipal infrastructure triage agent running on AMD hardware. Analyze the provided image and description. Output ONLY valid JSON matching the exact schema provided: { \"issue_category\": str, \"severity_score\": int, \"urgency_level\": str, \"assigned_department\": str, \"estimated_sla_hours\": int, \"ai_reasoning\": str }"
            },
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": f"User description: {description}\nAnalyze this issue."
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/jpeg;base64,{image_base64}"
                        }
                    }
                ]
            }
        ],
        "response_format": { "type": "json_object" },
        "temperature": 0.2
    }

    try:
        response = requests.post(url, headers=headers, json=payload)
        response.raise_for_status()
        data = response.json()
        result_str = data["choices"][0]["message"]["content"]
        return json.loads(result_str)
    except Exception as e:
        print(f"Error calling Fireworks AI: {e}. Using mock fallback.")
        return get_mock_triage_response()
