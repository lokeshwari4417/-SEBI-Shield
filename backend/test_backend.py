import pytest
from fuzzy_matcher import match_intermediary, clean_url
from phishing_scanner import scan_link_or_message, check_lookalike_domains
from media_scanner import scan_media_file

def test_clean_url():
    assert clean_url("https://www.zerodha.com/about/") == "zerodha.com"
    assert clean_url("http://groww.in") == "groww.in"
    assert clean_url("sebi.gov.in") == "sebi.gov.in"

def test_intermediary_exact_match():
    # Test registration number match
    res = match_intermediary("INZ000203235")
    assert res["verified"] is True
    assert res["closest_match"]["name"] == "Zerodha Broking Limited"
    assert res["score"] == 100.0

def test_intermediary_fuzzy_match():
    # Close name match (should verify)
    res1 = match_intermediary("Zerodha Broking Ltd")
    assert res1["verified"] is True
    assert res1["score"] >= 85.0
    
    # Typosquatting / Possible Impersonation match
    res2 = match_intermediary("Zerroda Financials")
    assert res2["verified"] is False
    assert res2["closest_match"]["name"] == "Zerodha Broking Limited"
    assert 45.0 <= res2["score"] <= 100.0
    assert "NOT VERIFIED" in res2["message"]

def test_phishing_link_whitelist():
    # Whitelisted domain
    res = scan_link_or_message("https://sebi.gov.in/grievances.html")
    assert res["verdict"] == "Safe"
    assert res["risk_score"] == 0

def test_phishing_lookalike():
    # Typosquatted lookalike
    res = scan_link_or_message("https://sebi-verification.in")
    assert res["verdict"] == "High Risk"
    assert res["risk_score"] >= 60
    assert any("lookalike" in r.lower() for r in res["reasons"])

def test_phishing_text_keywords():
    # Guaranteed returns text
    res = scan_link_or_message("Get rich quick! We offer guaranteed 30% monthly profit risk-free. Join our whatsapp group.")
    assert res["verdict"] == "High Risk"
    assert len(res["flagged_phrases"]) >= 3

def test_media_scanner_cases():
    # High risk mock video
    res = scan_media_file("fake_advisor_deepfake.mp4", 500000, "video/mp4")
    assert res["verdict"] == "High Risk"
    assert res["risk_score"] > 80.0
    assert len(res["anomalies"]) > 0
    
    # Safe mock audio
    res2 = scan_media_file("real_advisor_pitch.wav", 120000, "audio/wav")
    assert res2["verdict"] == "Safe"
    assert res2["risk_score"] < 10.0
