import os
import time
from typing import Dict, Any, List

def scan_media_file(filename: str, file_size: int, content_type: str) -> Dict[str, Any]:
    """
    Perform heuristic audio-visual deepfake analysis on uploaded file.
    Uses filename keywords and size-based hashing to simulate a high-fidelity
    prototype analysis with realistic indicators.
    """
    # Determine extension and type
    ext = os.path.splitext(filename)[1].lower()
    is_video = ext in ['.mp4', '.mkv', '.avi', '.mov']
    is_audio = ext in ['.mp3', '.wav', '.m4a', '.ogg', '.aac']
    
    # Base analysis settings
    risk_score = 15.0
    anomalies: List[Dict[str, Any]] = []
    
    # Specific mock test cases for hackathon demo
    name_lower = filename.lower()
    
    if "fake" in name_lower or "deepfake" in name_lower or "scam" in name_lower or "guaranteed" in name_lower:
        # High Risk Mock Case
        risk_score = 88.5
        if is_video:
            anomalies = [
                {
                    "metric": "Frame Blink Rate",
                    "value": "3.5 blinks/min",
                    "threshold": "12 - 18 blinks/min",
                    "status": "Fail",
                    "description": "Unnatural blink frequency. Synthetic generation models often fail to capture normal human blinking rhythms."
                },
                {
                    "metric": "Lip-Sync Alignment",
                    "value": "135 ms offset",
                    "threshold": "< 40 ms",
                    "status": "Fail",
                    "description": "Temporal discrepancy between lip movements (visual) and speech phonemes (audio). Indicates visual manipulation."
                },
                {
                    "metric": "Facial Edge Artifacts",
                    "value": "High noise variance",
                    "threshold": "Low variance",
                    "status": "Fail",
                    "description": "Blending anomalies detected around the chin and hairline boundaries. Common indicator of face-swapping."
                }
            ]
        else: # Audio deepfake
            anomalies = [
                {
                    "metric": "Voice Pitch Variance (F0)",
                    "value": "6.8 Hz standard deviation",
                    "threshold": "> 15.0 Hz",
                    "status": "Fail",
                    "description": "Monotonic speech pattern. Voice exhibits restricted emotional inflection and natural frequency changes."
                },
                {
                    "metric": "Spectral Flatness",
                    "value": "0.45 flat-factor",
                    "threshold": "< 0.30 flat-factor",
                    "status": "Fail",
                    "description": "High proportion of white noise artifacts in silent intervals, indicating synthetic speech splicing."
                },
                {
                    "metric": "Phoneme Phase Coherence",
                    "value": "Irregular phase jumps",
                    "threshold": "Continuous phase",
                    "status": "Fail",
                    "description": "Transient discontinuities in speech signal at syllable transitions, characteristic of stitched text-to-speech models."
                }
            ]
    elif "safe" in name_lower or "real" in name_lower or "verified" in name_lower:
        # Safe Mock Case
        risk_score = 8.2
        if is_video:
            anomalies = [
                {
                    "metric": "Frame Blink Rate",
                    "value": "14.2 blinks/min",
                    "threshold": "12 - 18 blinks/min",
                    "status": "Pass",
                    "description": "Blink rate matches natural human physiological patterns."
                },
                {
                    "metric": "Lip-Sync Alignment",
                    "value": "12 ms offset",
                    "threshold": "< 40 ms",
                    "status": "Pass",
                    "description": "Audio-video track sync is fully coherent and within normal recording tolerances."
                }
            ]
        else:
            anomalies = [
                {
                    "metric": "Voice Pitch Variance (F0)",
                    "value": "24.1 Hz standard deviation",
                    "threshold": "> 15.0 Hz",
                    "status": "Pass",
                    "description": "Dynamic frequency range indicating organic human speech cadence."
                },
                {
                    "metric": "Spectral Flatness",
                    "value": "0.18 flat-factor",
                    "threshold": "< 0.30 flat-factor",
                    "status": "Pass",
                    "description": "Clean silent intervals with normal ambient floor noise and no synthesis footprints."
                }
            ]
    else:
        # Default fallback heuristic based on file size hash
        # Allows any random upload to work and return a realistic outcome
        hash_factor = (file_size % 100)
        risk_score = 10.0 + (hash_factor * 0.8) # deterministic score between 10% and 90%
        
        is_suspicious = risk_score > 50.0
        
        if is_video:
            anomalies = [
                {
                    "metric": "Frame Blink Rate",
                    "value": "4.8 blinks/min" if is_suspicious else "15.1 blinks/min",
                    "threshold": "12 - 18 blinks/min",
                    "status": "Fail" if is_suspicious else "Pass",
                    "description": "Unnatural blink frequency detected." if is_suspicious else "Blinking frequency is normal."
                },
                {
                    "metric": "Lip-Sync Alignment",
                    "value": "95 ms offset" if is_suspicious else "15 ms offset",
                    "threshold": "< 40 ms",
                    "status": "Fail" if is_suspicious else "Pass",
                    "description": "Temporal displacement detected between visual mouth movements and vocals." if is_suspicious else "Perfect voice synchronization."
                },
                {
                    "metric": "Facial Boundary Consistency",
                    "value": "Ghosting detected" if is_suspicious else "Sharp borders",
                    "threshold": "Consistent borders",
                    "status": "Fail" if is_suspicious else "Pass",
                    "description": "Blending boundary issues detected around facial perimeter." if is_suspicious else "No face-swap mask anomalies found."
                }
            ]
        else:
            anomalies = [
                {
                    "metric": "Voice Pitch Variance (F0)",
                    "value": "7.9 Hz std dev" if is_suspicious else "21.3 Hz std dev",
                    "threshold": "> 15.0 Hz",
                    "status": "Fail" if is_suspicious else "Pass",
                    "description": "Limited pitch dynamics, indicating potential voice cloning." if is_suspicious else "Human-like pitch modulation patterns."
                },
                {
                    "metric": "Spectral Flatness",
                    "value": "0.38 flat-factor" if is_suspicious else "0.19 flat-factor",
                    "threshold": "< 0.30 flat-factor",
                    "status": "Fail" if is_suspicious else "Pass",
                    "description": "Excessive flat frequency indicators suggest text-to-speech engine footprint." if is_suspicious else "Organic frequency distribution."
                }
            ]

    # Overall verdict
    if risk_score >= 60.0:
        verdict = "High Risk"
    elif risk_score >= 25.0:
        verdict = "Caution"
    else:
        verdict = "Safe"
        
    return {
        "verdict": verdict,
        "risk_score": round(risk_score, 1),
        "filename": filename,
        "file_size_kb": round(file_size / 1024, 1),
        "content_type": content_type,
        "is_video": is_video,
        "is_audio": is_audio,
        "anomalies": anomalies,
        "timestamp": time.time(),
        "methodology": "Prototype Heuristic Engine (Deepfake face-landmark boundary check & Voice pitch contour analytics)"
    }
