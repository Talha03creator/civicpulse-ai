from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from schemas import ReportRequest, TriageResponse
from services.gemma_agent import analyze_civic_issue
from dotenv import load_dotenv
import datetime
import uuid
import os

load_dotenv()

app = FastAPI(title="CivicPulse AI - FastAPI Multimodal Agentic Engine")

# CORS Configuration
# Reads ALLOWED_ORIGINS from .env (comma-separated list).
# Example: ALLOWED_ORIGINS=http://localhost:3000,https://civicpulse-ai.vercel.app
_raw_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000")
ALLOWED_ORIGINS = [o.strip() for o in _raw_origins.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory database
mock_db_tickets = []

@app.get("/api/health")
def health_check():
    return {
        "status": "optimal",
        "compute": "AMD MI300X Developer Cloud",
        "engine": "Gemma 4 Multimodal"
    }

@app.post("/api/triage", response_model=TriageResponse)
def triage_issue(request: ReportRequest):
    try:
        result = analyze_civic_issue(request.image_base64, request.description)
        triage_resp = TriageResponse(**result)
        
        # Save to mock DB
        ticket = {
            "id": str(uuid.uuid4()),
            "timestamp": datetime.datetime.utcnow().isoformat(),
            "description": request.description,
            "image_base64": request.image_base64[:100] + "..." if request.image_base64 else "",
            "triage": triage_resp.model_dump()
        }
        mock_db_tickets.append(ticket)
        
        return triage_resp
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/tickets")
def get_tickets():
    # Return newest first
    return sorted(mock_db_tickets, key=lambda x: x["timestamp"], reverse=True)
