from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from schemas import ReportRequest, TriageResponse
from services.gemma_agent import analyze_civic_issue
from dotenv import load_dotenv
import datetime
import uuid
import json
import os

load_dotenv()

app = FastAPI(title="CivicPulse AI - FastAPI Multimodal Agentic Engine")

# ---------------------------------------------------------------------------
# CORS — reads ALLOWED_ORIGINS from .env (comma-separated list)
# ---------------------------------------------------------------------------
_raw_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000")
ALLOWED_ORIGINS = [o.strip() for o in _raw_origins.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory ticket store
mock_db_tickets: list[dict] = []


# ---------------------------------------------------------------------------
# Health check — made async (zero blocking I/O, still best practice)
# ---------------------------------------------------------------------------
@app.get("/api/health")
async def health_check():
    return {
        "status": "optimal",
        "compute": "AMD MI300X Developer Cloud",
        "engine": "Gemma 4 Multimodal",
        "mode": "async-streaming",
    }


# ---------------------------------------------------------------------------
# STREAMING triage endpoint
#
# Previously: `def triage_issue` (synchronous)
#   → Uvicorn ran this in a threadpool executor
#   → requests.post() blocked that thread for the FULL inference duration
#   → with 4+ concurrent requests the threadpool was exhausted → 4-min queue
#
# Now: `async def triage_issue` + StreamingResponse
#   → Runs directly on the async event loop
#   → httpx.AsyncClient yields control while waiting for tokens
#   → Other requests are served concurrently with ZERO thread contention
# ---------------------------------------------------------------------------
@app.post("/api/triage")
async def triage_issue(request: ReportRequest):
    """
    Returns a Server-Sent Events (SSE) stream.

    Phase 1 (immediate): streams CoT status events as JSON lines
    Phase 2 (on completion): streams the final triage JSON object
    Phase 3: persists the ticket to the in-memory store
    """
    async def event_stream():
        # --- Phase 1: Send live status events so the UI can animate immediately ---
        cot_steps = [
            "Initializing Gemma-4 Vision Engine",
            "Extracting geospatial metadata",
            "Classifying infrastructure damage",
            "Calculating severity matrix",
            "Routing to Municipal department",
        ]
        for step in cot_steps:
            yield f"data: {json.dumps({'type': 'cot', 'step': step})}\n\n"

        # --- Phase 2: Run the actual async AI inference ---
        try:
            result = await analyze_civic_issue(
                request.image_base64, request.description
            )
            triage_resp = TriageResponse(**result)

            # --- Phase 3: Persist ticket asynchronously (non-blocking dict op) ---
            ticket = {
                "id": str(uuid.uuid4()),
                "timestamp": datetime.datetime.utcnow().isoformat(),
                "description": request.description,
                "image_base64": (
                    request.image_base64[:100] + "..."
                    if request.image_base64
                    else ""
                ),
                "triage": triage_resp.model_dump(),
            }
            mock_db_tickets.append(ticket)

            # Emit the complete result as the final SSE event
            yield f"data: {json.dumps({'type': 'result', 'data': triage_resp.model_dump()})}\n\n"
            yield "data: [DONE]\n\n"

        except Exception as e:
            yield f"data: {json.dumps({'type': 'error', 'message': str(e)})}\n\n"

    return StreamingResponse(
        event_stream(),
        media_type="text/event-stream",
        headers={
            # Disable buffering on proxies/nginx so tokens arrive immediately
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",
            "Connection": "keep-alive",
        },
    )


# ---------------------------------------------------------------------------
# Tickets — made async (non-blocking event loop call)
# ---------------------------------------------------------------------------
@app.get("/api/tickets")
async def get_tickets():
    return sorted(mock_db_tickets, key=lambda x: x["timestamp"], reverse=True)
