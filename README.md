# SEBI Shield 🛡️
**AI-Powered Deepfake & Phishing Detection for Indian Securities Market Investors**

SEBI Shield is a high-fidelity prototype web application developed for the **SEBI Securities Market TechSprint (GFF 2026)**. The application targets the challenge track *"AI-driven detection of synthetic media and phishing attacks in securities markets,"* protecting retail investors from fraudulent investment tips, deepfaked advisor promotions, typosquatted broker websites, and unverified advisory chats received on WhatsApp, Telegram, or SMS.

---

## 🌟 Core Features

1. **Universal Shield Scanner (Unified Dashboard)**:
   - Evaluates risk inputs in parallel: advisor name lookups, link/message check, and audio-video uploads.
   - Calculates a consolidated threat score using defensive aggregation logic.
   - Triggers a mock pre-filled **SEBI SCORES Grievance Escalation Form** containing the parsed digital evidence and proof hashes.

2. **Intermediary Verification Module**:
   - Cross-checks broker, advisor (RIA), research analyst (RA), or portfolio manager details against a mock official registry of ~50 records.
   - Uses brand token extraction and fuzzy Levenshtein distance (via `rapidfuzz`) to warn users about close lookalikes (impersonation fraud) and suspended licenses.

3. **Phishing Link & Message Checker**:
   - Checks URLs against exchange/official whitelists and flags typosquatted lookalike domains (e.g. `sebi-gov-reg.in`).
   - Scans text messages for high-urgency FOMO tactics and illegal returns promises, highlighting flagged phrases inline with interactive warning tooltips.

4. **Media Authenticity Scanner**:
   - Analyzes uploaded short audio/video clips for synthetic footprints.
   - Checks metrics including video frame blink rate anomalies, audio-to-video lip-sync alignments, and speech pitch standard deviations.

5. **WhatsApp Bot Simulator**:
   - A mock mobile WhatsApp chat interface where users can "forward" screenshots, links, or texts to receive automated risk assessments, showing real-world scale readiness.

6. **TechSprint Extras**:
   - **Interactive Pitch Slides**: Built directly into the application tab.
   - **Interactive Architecture Diagram**: Details data pipelines visually on hover.

---

## 🛠️ Technology Stack
* **Frontend**: React.js (Vite) + Tailwind CSS + Lucide Icons
* **Backend**: Python 3.11 + FastAPI + Uvicorn
* **Algorithms / NLP**: RapidFuzz (fuzzy matching), Regular Expressions, and heuristic A/V metadata scoring
* **Testing**: Pytest

---

## 📁 Project Directory Structure
```text
sebi/
├── backend/
│   ├── database.py          # Registry of ~50 brokers & advisors (Active/Suspended)
│   ├── fuzzy_matcher.py     # Fuzzy brand matching and registration validations
│   ├── phishing_scanner.py  # Typo domain lookup and text keyword scanner
│   ├── media_scanner.py     # Voice pitch contour & video blink rate heuristics
│   ├── main.py              # FastAPI endpoints & CORS configurations
│   ├── test_backend.py      # Pytest validation tests
│   └── requirements.txt     # Python backend dependencies
├── frontend/
│   ├── src/
│   │   ├── components/      # Modular tab views (Unified, Registry, Phishing, WhatsApp, Pitch, Diagram)
│   │   ├── App.jsx          # Main landing layout & English/Hindi locale
│   │   ├── index.css        # Tailwind styling & glassmorphic custom utilities
│   │   └── main.jsx         # React mounting entrypoint
│   ├── index.html
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
├── run.py                   # Multi-process orchestrator launcher script
├── .gitignore               # Excludes dependencies, pycache, & IDE metadata
└── README.md                # Documentation (This file)
