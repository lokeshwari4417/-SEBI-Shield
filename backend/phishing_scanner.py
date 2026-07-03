import re
from typing import Dict, Any, List
from database import INTERMEDIARIES
from fuzzy_matcher import clean_url

# Standard list of trusted official financial bodies in India
OFFICIAL_DOMAINS = {
    "sebi.gov.in",
    "nseindia.com",
    "bseindia.com",
    "amfiindia.com",
    "cdslindia.com",
    "nsdl.co.in",
    "rbi.org.in",
    "sbi.co.in",
    "scores.gov.in"
}

# Regex definitions for phishing/scam detection
FRAUD_KEYWORDS = [
    (r"(guaranteed|assured|fixed|100%|sure-shot).{0,30}(returns|profit|gain|growth|income|payout)", "Guaranteed Returns Claim"),
    (r"\b(risk-free|no-risk|zero-risk|safe-haven|guaranteed-profit)\b", "Risk-Free Claim"),
    (r"(double|triple|multiply)\s+(your)?\s*(money|investment|capital)", "Get-Rich-Quick Promise"),
    (r"(\b\d+%\s*daily|\b\d+%\s*weekly|\b\d+%\s*monthly|30%\s*return|50%\s*return)", "Unrealistically High Yield"),
    (r"(insider\s+tips?|jackpot\s+call|sure\s+shot\s+tip|multibagger\s+leak)", "Illegal Insider/Jackpot Tip"),
    (r"(whatsapp\s+group|telegram\s+channel|join\s+vip|exclusive\s+channel|premium\s+group)", "Unregulated Group Invite"),
    (r"(deposit|transfer|send)\s+money\s+to\s+(personal|gpay|phonepe|upi|account)", "Direct Fund Transfer Request"),
    (r"(limited\s+slots|act\s+now|hurry\s+up|before\s+market\s+opens|urgent|last\s+chance)", "Urgency/FOMO Tactic"),
    (r"(sebi\s+approved\s+scheme|sebi\s+official\s+recommends|registered\s+with\s+sebi\s+officer)", "Authority Impersonation"),
]

def scan_text_keywords(text: str) -> List[Dict[str, Any]]:
    """
    Find matching fraud-risk keywords in the text and return their locations
    for inline highlighting in the UI.
    """
    findings = []
    text_lower = text.lower()
    
    for pattern, flag_type in FRAUD_KEYWORDS:
        for match in re.finditer(pattern, text_lower):
            start, end = match.span()
            findings.append({
                "phrase": text[start:end],
                "type": flag_type,
                "start": start,
                "end": end
            })
            
    # Sort by start index
    findings.sort(key=lambda x: x["start"])
    return findings

def get_registered_domains() -> set:
    """Extract official domains from mock database."""
    domains = set(OFFICIAL_DOMAINS)
    for item in INTERMEDIARIES:
        domain = clean_url(item["website"])
        if domain:
            domains.add(domain)
    return domains

def check_lookalike_domains(domain: str, trusted_domains: set) -> Dict[str, Any]:
    """
    Identify lookalike typo-squatting domains.
    e.g., 'sebi-verification.in' looks like 'sebi.gov.in'.
    'zerodh.com' looks like 'zerodha.com'.
    """
    if not domain:
        return {"is_lookalike": False, "target": None, "score": 0.0}
        
    from rapidfuzz import fuzz
    
    # If it's an exact match in the trusted list, it's not a lookalike (it's safe!)
    if domain in trusted_domains:
        return {"is_lookalike": False, "target": domain, "score": 100.0}
        
    best_score = 0.0
    best_target = None
    
    for td in trusted_domains:
        # Check similarity between domain names
        score = fuzz.ratio(domain, td)
        # Check if the trusted domain name is embedded with dashes (e.g. sebi-reg.in)
        if any(part in domain for part in td.split('.')):
            score = max(score, 75.0)
            
        if score > best_score:
            best_score = score
            best_target = td
            
    # If similarity is high but not 100% (e.g., between 60% and 99%)
    if 60.0 <= best_score < 100.0:
        return {
            "is_lookalike": True,
            "target": best_target,
            "score": best_score
        }
        
    return {"is_lookalike": False, "target": None, "score": best_score}

def scan_link_or_message(content: str) -> Dict[str, Any]:
    """
    Analyze text or URL to evaluate risk.
    """
    content = content.strip()
    if not content:
        return {
            "verdict": "Safe",
            "risk_score": 0,
            "is_link": False,
            "domain": None,
            "flagged_phrases": [],
            "reasons": ["Empty content provided."]
        }
        
    # Check if the content is a URL
    url_pattern = re.compile(
        r'^(https?://)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(/.*)?$',
        re.IGNORECASE
    )
    is_link = bool(url_pattern.match(content))
    
    reasons = []
    risk_score = 0
    domain = None
    
    trusted_domains = get_registered_domains()
    
    if is_link:
        domain = clean_url(content)
        
        # Check if domain is trusted
        if domain in trusted_domains:
            return {
                "verdict": "Safe",
                "risk_score": 0,
                "is_link": True,
                "domain": domain,
                "flagged_phrases": [],
                "reasons": [f"Domain '{domain}' matches an officially registered SEBI intermediary or exchange website."]
            }
            
        # Check for HTTP (Non-secure)
        if content.startswith("http://"):
            risk_score += 15
            reasons.append("Unencrypted connection (HTTP instead of HTTPS).")
            
        # Check lookalike domains
        lookalike_info = check_lookalike_domains(domain, trusted_domains)
        if lookalike_info["is_lookalike"]:
            risk_score += 65
            reasons.append(
                f"Suspicious lookalike domain. Closely resembles trusted official domain '{lookalike_info['target']}' "
                f"({lookalike_info['score']:.0f}% similarity). Typosquatting warning."
            )
        else:
            # Not verified, but not explicitly a lookalike of a specific name
            risk_score += 25
            reasons.append("Unverified domain. Not found in official SEBI registered records.")
            
        # Check if the URL contains urgency or returns terms in path/query
        url_findings = scan_text_keywords(content)
        if url_findings:
            risk_score += 20
            reasons.append("URL contains high-risk keywords associated with investment scams.")
            
    else:
        # It's a text message block
        findings = scan_text_keywords(content)
        
        # Calculate risk based on findings
        unique_findings = set(f["type"] for f in findings)
        
        for finding_type in unique_findings:
            if finding_type == "Guaranteed Returns Claim":
                risk_score += 35
                reasons.append("Promises guaranteed or fixed investment returns, which is prohibited under SEBI guidelines.")
            elif finding_type == "Risk-Free Claim":
                risk_score += 30
                reasons.append("Claims the investment is risk-free, which is highly misleading and violates regulatory standards.")
            elif finding_type == "Get-Rich-Quick Promise":
                risk_score += 30
                reasons.append("Promises quick wealth multiplication (doubling/tripling money) indicating high scam probability.")
            elif finding_type == "Unrealistically High Yield":
                risk_score += 25
                reasons.append("Mentions unrealistic returns like daily or weekly compounding profit margins.")
            elif finding_type == "Unregulated Group Invite":
                risk_score += 25
                reasons.append("Encourages joining VIP WhatsApp groups or Telegram channels for trading tips.")
            elif finding_type == "Direct Fund Transfer Request":
                risk_score += 30
                reasons.append("Asks to transfer money directly via personal UPI or digital wallet channels.")
            elif finding_type == "Urgency/FOMO Tactic":
                risk_score += 15
                reasons.append("Uses high-pressure tactics or urgency to force immediate action.")
            elif finding_type == "Authority Impersonation":
                risk_score += 40
                reasons.append("Claims approval from SEBI or impersonates official SEBI authority.")
            elif finding_type == "Illegal Insider/Jackpot Tip":
                risk_score += 30
                reasons.append("Promotes insider/jackpot stock suggestions which is a common bait tactic.")

    # Bound risk score between 0 and 100
    risk_score = min(max(risk_score, 0), 100)
    
    # Establish verdict
    if risk_score >= 60:
        verdict = "High Risk"
    elif risk_score >= 25:
        verdict = "Caution"
    else:
        verdict = "Safe"
        if not reasons:
            reasons.append("No suspicious domain irregularities or phishing indicators identified.")
            
    return {
        "verdict": verdict,
        "risk_score": risk_score,
        "is_link": is_link,
        "domain": domain,
        "flagged_phrases": scan_text_keywords(content),
        "reasons": reasons
    }
