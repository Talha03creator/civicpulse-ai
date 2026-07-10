from pydantic import BaseModel, Field

class TriageResponse(BaseModel):
    issue_category: str = Field(description="e.g., 'Roads & Asphalt', 'Water & Sanitation', 'Electrical', 'Public Safety'")
    severity_score: int = Field(description="1 to 10", ge=1, le=10)
    urgency_level: str = Field(description="'Low', 'Medium', 'High', 'Critical'")
    assigned_department: str
    estimated_sla_hours: int
    ai_reasoning: str = Field(description="Detailed chain-of-thought explanation of why this severity and department were chosen based on visual evidence")

class ReportRequest(BaseModel):
    image_base64: str
    description: str = ""
