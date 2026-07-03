import re
from typing import Dict, Any, Optional, Tuple
from rapidfuzz import fuzz
from database import INTERMEDIARIES

def clean_url(url: str) -> str:
    """Helper to extract domain/subdomain from URL for uniform matching."""
    if not url:
        return ""
    # Remove http://, https://, www.
    cleaned = re.sub(r'^(https?://)?(www\.)?', '', url.strip().lower())
    # Remove trailing slash and path
    cleaned = cleaned.split('/')[0]
    return cleaned

def clean_upi(upi: str) -> str:
    """Normalize UPI IDs for matching."""
    if not upi:
        return ""
    return upi.strip().lower()

def extract_brand_name(name: str) -> str:
    """Strip common corporate and advisory suffixes to extract the core brand name."""
    name = name.lower()
    # Suffixes and generic words to strip
    suffixes = [
        "limited", "private", "pvt", "ltd", "securities", "broking", 
        "financials", "financial", "wealth", "advisory", "investments", 
        "investment", "associates", "academy", "research", "analyst", "analysts",
        "portfolio", "managers", "manager", "capital", "services", "service", 
        "growth", "advisor", "advisors", "partnership", "trust"
    ]
    # Replace matching suffix words (word boundaries)
    for suffix in suffixes:
        name = re.sub(rf'\b{suffix}\b', '', name)
    # Clean excess spaces
    name = re.sub(r'\s+', ' ', name).strip()
    return name

def match_intermediary(query: str) -> Dict[str, Any]:
    """
    Search for a SEBI intermediary by registration number, name, website, or UPI ID.
    Returns a dict with verification details:
    {
        "verified": bool,
        "closest_match": dict or None,
        "score": float, # 0-100 match confidence
        "match_field": str, # "registration_number", "name", "website", "upi_id", or "none"
        "message": str
    }
    """
    query = query.strip()
    if not query:
        return {
            "verified": False,
            "closest_match": None,
            "score": 0,
            "match_field": "none",
            "message": "Empty query provided."
        }

    # 1. Check for registration number exact / substring match
    # SEBI registration numbers start with IN, e.g. INZ000203235, INA000000094
    reg_pattern = re.compile(r'\bIN[A-Z0-9]{9,10}\b', re.IGNORECASE)
    reg_matches = reg_pattern.findall(query)
    
    if reg_matches:
        reg_to_check = reg_matches[0].upper()
        for item in INTERMEDIARIES:
            if item["registration_number"].upper() == reg_to_check:
                if item["status"] == "Active":
                    return {
                        "verified": True,
                        "closest_match": item,
                        "score": 100.0,
                        "match_field": "registration_number",
                        "message": f"Successfully verified: Exact SEBI Registration Number match found ({item['registration_number']}). Status is Active."
                    }
                else:
                    return {
                        "verified": False,
                        "closest_match": item,
                        "score": 100.0,
                        "match_field": "registration_number",
                        "message": f"WARNING: Intermediary found with registration number {item['registration_number']} but registration status is '{item['status']}'."
                    }

    # 2. Check for URL match (exact domain matches)
    query_url_clean = clean_url(query)
    if "." in query_url_clean and len(query_url_clean) > 4:
        for item in INTERMEDIARIES:
            db_url_clean = clean_url(item["website"])
            if db_url_clean == query_url_clean:
                if item["status"] == "Active":
                    return {
                        "verified": True,
                        "closest_match": item,
                        "score": 100.0,
                        "match_field": "website",
                        "message": f"Verified: Registered website match found ({item['website']}). Entity: {item['name']}."
                    }
                else:
                    return {
                        "verified": False,
                        "closest_match": item,
                        "score": 100.0,
                        "match_field": "website",
                        "message": f"WARNING: Website matched to registered entity '{item['name']}', but their SEBI registration is currently '{item['status']}'."
                    }

    # 3. Check for UPI ID matches
    if "@" in query:
        query_upi_clean = clean_upi(query)
        for item in INTERMEDIARIES:
            db_upi_clean = clean_upi(item["upi_id"])
            if db_upi_clean == query_upi_clean:
                if item["status"] == "Active":
                    return {
                        "verified": True,
                        "closest_match": item,
                        "score": 100.0,
                        "match_field": "upi_id",
                        "message": f"Verified: Registered business UPI ID match found ({item['upi_id']}). Entity: {item['name']}."
                    }
                else:
                    return {
                        "verified": False,
                        "closest_match": item,
                        "score": 100.0,
                        "match_field": "upi_id",
                        "message": f"WARNING: UPI ID matched to registered entity '{item['name']}', but their SEBI registration is currently '{item['status']}'."
                    }

    # 4. Fuzzy Match by Name
    best_match: Optional[Dict[str, Any]] = None
    best_brand_score = 0.0
    best_full_score = 0.0
    
    query_brand = extract_brand_name(query)
    
    for item in INTERMEDIARIES:
        db_brand = extract_brand_name(item["name"])
        
        # Fuzzy match on stripped brand names
        brand_score = fuzz.token_sort_ratio(query_brand, db_brand)
        full_score = fuzz.token_sort_ratio(query.lower(), item["name"].lower())
        
        # Find the best matching item
        if brand_score > best_brand_score:
            best_brand_score = brand_score
            best_full_score = full_score
            best_match = item
        elif brand_score == best_brand_score and full_score > best_full_score:
            best_full_score = full_score
            best_match = item

    # 5. Determine Verification Status based on Fuzzy Match Score
    if best_match:
        # We verify if the core brand name matches 100% exactly,
        # OR the full name matches with extremely high confidence (>= 92%)
        is_exact_brand = (best_brand_score >= 100.0)
        is_high_full = (best_full_score >= 92.0)
        
        if is_exact_brand or is_high_full:
            if best_match["status"] == "Active":
                return {
                    "verified": True,
                    "closest_match": best_match,
                    "score": max(best_brand_score, best_full_score),
                    "match_field": "name",
                    "message": f"Verified: Match found for registered advisor '{best_match['name']}'."
                }
            else:
                return {
                    "verified": False,
                    "closest_match": best_match,
                    "score": max(best_brand_score, best_full_score),
                    "match_field": "name",
                    "message": f"WARNING: Match found for '{best_match['name']}', but their registration is currently '{best_match['status']}'."
                }
        # Medium confidence (possible impersonation/lookalike)
        elif best_brand_score >= 45.0 or best_full_score >= 45.0:
            return {
                "verified": False,
                "closest_match": best_match,
                "score": max(best_brand_score, best_full_score),
                "match_field": "name",
                "message": f"NOT VERIFIED: Close match found with registered entity '{best_match['name']}' ({max(best_brand_score, best_full_score):.1f}% similarity). Impersonation risk."
            }

    # No matches above threshold
    return {
        "verified": False,
        "closest_match": None,
        "score": max(best_brand_score, best_full_score) if best_match else 0.0,
        "match_field": "none",
        "message": "NOT FOUND IN REGISTER: No registered SEBI intermediary matches this entity. Treat as high risk."
    }
