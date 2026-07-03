from fastapi import FastAPI, UploadFile, File, Form, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict, Any

from fuzzy_matcher import match_intermediary
from phishing_scanner import scan_link_or_message
from media_scanner import scan_media_file

app = FastAPI(
    title="SEBI Shield API",
    description="AI-Powered Deepfake & Phishing Detection for Securities Market Investors",
    version="1.0.0"
)

# Enable CORS for React frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For hackathon demo purposes
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PhishingRequest(BaseModel):
    content: str

class UnifiedCheckRequest(BaseModel):
    advisor_query: Optional[str] = None
    text_query: Optional[str] = None

@app.get("/")
def read_root():
    return {
        "status": "online",
        "service": "SEBI Shield API Portal",
        "documentation": "/docs"
    }

@app.get("/api/verify-intermediary")
def verify_intermediary(query: str = Query(..., description="Advisor Name, SEBI Registration Number, Website, or UPI ID")):
    try:
        result = match_intermediary(query)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/scan-phishing")
def scan_phishing(request: PhishingRequest):
    try:
        result = scan_link_or_message(request.content)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/scan-media")
async def scan_media(file: UploadFile = File(...)):
    try:
        # Read file contents and length
        contents = await file.read()
        file_size = len(contents)
        
        result = scan_media_file(
            filename=file.filename,
            file_size=file_size,
            content_type=file.content_type
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/unified-check")
def unified_check(request: UnifiedCheckRequest):
    """
    Perform a unified check incorporating advisor registry match and text/phishing scan.
    """
    advisor_res = None
    phishing_res = None
    
    reasons = []
    scores = []
    
    # 1. Evaluate advisor query if present
    if request.advisor_query and request.advisor_query.strip():
        advisor_res = match_intermediary(request.advisor_query)
        if not advisor_res["verified"]:
            # If not found or suspended, add risk
            if advisor_res["closest_match"]:
                # Suspended or Under Investigation
                status = advisor_res["closest_match"]["status"]
                scores.append(80 if status == "Suspended" else 60)
                reasons.append(f"Intermediary found is currently '{status}' under official SEBI records.")
            else:
                # Completely missing from DB
                scores.append(50)
                reasons.append("Advisor/Broker details not found in the official SEBI registered records.")
        else:
            scores.append(0)
            reasons.append(f"Successfully verified registered intermediary: {advisor_res['closest_match']['name']}.")
            
    # 2. Evaluate phishing/message content if present
    if request.text_query and request.text_query.strip():
        phishing_res = scan_link_or_message(request.text_query)
        scores.append(phishing_res["risk_score"])
        reasons.extend(phishing_res["reasons"])
        
    if not scores:
        return {
            "verdict": "Safe",
            "risk_score": 0,
            "reasons": ["No search queries provided."],
            "details": {}
        }
        
    # Aggregate scores (using max for security defense)
    overall_score = max(scores)
    
    if overall_score >= 60:
        verdict = "High Risk"
    elif overall_score >= 25:
        verdict = "Caution"
    else:
        verdict = "Safe"
        
    # Format and deduplicate reasons
    seen_reasons = set()
    dedup_reasons = []
    for r in reasons:
        if r not in seen_reasons:
            dedup_reasons.append(r)
            seen_reasons.add(r)
            
    return {
        "verdict": verdict,
        "risk_score": overall_score,
        "reasons": dedup_reasons,
        "details": {
            "advisor_check": advisor_res,
            "phishing_check": phishing_res
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
