def get_mock_triage_response() -> dict:
    return {
        "issue_category": "Roads & Asphalt",
        "severity_score": 8,
        "urgency_level": "High",
        "assigned_department": "Department of Public Works",
        "estimated_sla_hours": 48,
        "ai_reasoning": "The provided image displays a deep pothole on a major roadway. The depth and jagged edges indicate a high risk of vehicular damage or accidents. The severity warrants immediate attention from the Department of Public Works for asphalt repair. Estimated SLA is set to 48 hours due to the critical nature of the road."
    }
