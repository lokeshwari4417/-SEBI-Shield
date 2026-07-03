import React, { useState } from 'react';
import { AlertOctagon, Link, AlertTriangle, ShieldCheck, FileText } from 'lucide-react';
import ScoresReportModal from './ScoresReportModal';

export default function PhishingChecker({ lang }) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const t = {
    en: {
      title: "Phishing Link & Message Checker",
      subtitle: "Paste suspicious WhatsApp alerts, Telegram tips, SMS text, or investment websites to scan for lookalike domains and scam patterns.",
      placeholder: "Paste SMS, chat message text, or website URL here...",
      btnScan: "Inspect Message/Link",
      threatScore: "Threat Score",
      verdictLabel: "Risk Assessment",
      phrasesTitle: "Flagged Content Highlights",
      reasonsTitle: "Risk Indicators Found",
      btnReport: "File Report with SCORES",
      templatesTitle: "Select Demo Template",
      safeStatus: "Source Verified Safe",
      cautionStatus: "Caution — Verify Source Details",
      dangerStatus: "High Risk — Phishing or Fraud"
    },
    hi: {
      title: "फ़िशिंग लिंक और संदेश चेकर",
      subtitle: "व्हाट्सएप अलर्ट, टेलीग्राम टिप्स, एसएमएस संदेश या निवेश वेबसाइट को चिपकाएं और लुकअलाइक डोमेन और घोटाले के पैटर्न के लिए स्कैन करें।",
      placeholder: "यहां एसएमएस, चैट संदेश टेक्स्ट, या वेबसाइट यूआरएल पेस्ट करें...",
      btnScan: "संदेश/लिंक की जांच करें",
      threatScore: "खतरे का स्कोर",
      verdictLabel: "जोखिम मूल्यांकन",
      phrasesTitle: "चिह्नित सामग्री हाइलाइट्स",
      reasonsTitle: "पाए गए जोखिम संकेतक",
      btnReport: "स्कोर (SCORES) पोर्टल पर रिपोर्ट करें",
      templatesTitle: "डेमो टेम्पलेट चुनें",
      safeStatus: "स्रोत सुरक्षित पाया गया",
      cautionStatus: "सावधानी - विवरण सत्यापित करें",
      dangerStatus: "उच्च जोखिम - फ़िशिंग या घोटाला"
    }
  }[lang || 'en'];

  const templates = [
    {
      label: "Urgent WhatsApp Scam Tip",
      text: "🚨 URGENT: Mukesh Ambani Finance Club offering guaranteed 30% weekly returns! Zero risk-free investments approved by SEBI. Slots are filling fast! Join our WhatsApp group: chat.whatsapp.com/MukeshWealthClub"
    },
    {
      label: "Typosquatted Lookalike Link",
      text: "https://sebi-gov-verification-portal.com"
    },
    {
      label: "Legitimate Exchange URL",
      text: "https://www.nseindia.com"
    }
  ];

  const handleScan = async (overrideContent) => {
    const textToScan = overrideContent || content;
    if (!textToScan.trim()) return;

    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/scan-phishing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: textToScan })
      });

      if (!response.ok) {
        throw new Error("Unable to contact phishing scanner backend.");
      }
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 60) return 'text-accent-crimson';
    if (score >= 25) return 'text-accent-gold';
    return 'text-accent-emerald';
  };

  const getVerdictLabel = (verdict) => {
    if (verdict === 'High Risk') return t.dangerStatus;
    if (verdict === 'Caution') return t.cautionStatus;
    return t.safeStatus;
  };

  // Helper to render text with highlighted spans for flagged phrases
  const renderHighlightedText = (text, flaggedPhrases) => {
    if (!flaggedPhrases || flaggedPhrases.length === 0) {
      return <p className="text-xs text-gray-300 whitespace-pre-wrap">{text}</p>;
    }

    const elements = [];
    let lastIndex = 0;
    
    // Sort by start position to process sequentially
    const sorted = [...flaggedPhrases].sort((a, b) => a.start - b.start);

    sorted.forEach((f, idx) => {
      // 1. Text before matching phrase
      if (f.start > lastIndex) {
        elements.push(text.substring(lastIndex, f.start));
      }
      
      // 2. Highlighted block with hover tooltip
      elements.push(
        <span 
          key={idx} 
          className="mx-0.5 px-1 py-0.5 rounded font-semibold bg-accent-crimson/20 border border-accent-crimson/50 text-red-300 cursor-help relative group inline"
        >
          {text.substring(f.start, f.end)}
          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1.5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-navy-950 text-white border border-navy-700 rounded-lg p-2 text-[9px] shadow-2xl w-48 z-20 font-sans leading-tight">
            <span className="font-bold text-accent-gold block border-b border-navy-800 pb-0.5 mb-1">
              {f.type}
            </span>
            Highlighted scam indicator trigger.
          </span>
        </span>
      );
      
      lastIndex = f.end;
    });

    // 3. Remaining text
    if (lastIndex < text.length) {
      elements.push(text.substring(lastIndex));
    }

    return (
      <p className="text-xs text-gray-300 leading-relaxed whitespace-pre-wrap">
        {elements}
      </p>
    );
  };

  return (
    <div className="space-y-6">
      
      {/* Title Block */}
      <div className="space-y-1">
        <h3 className="text-xl font-bold text-white flex items-center space-x-2">
          <Link className="w-6 h-6 text-accent-blue" />
          <span>{t.title}</span>
        </h3>
        <p className="text-xs text-gray-400 max-w-2xl">{t.subtitle}</p>
      </div>

      {/* Templates Row */}
      <div className="space-y-2">
        <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">{t.templatesTitle}:</span>
        <div className="flex flex-wrap gap-2">
          {templates.map((temp, idx) => (
            <button 
              key={idx}
              onClick={() => {
                setContent(temp.text);
                handleScan(temp.text);
              }}
              className="px-3 py-1.5 rounded-lg bg-navy-900 border border-navy-800 hover:border-navy-700 text-gray-300 hover:text-white transition-all text-[10px] font-medium"
            >
              {temp.label}
            </button>
          ))}
        </div>
      </div>

      {/* Text Area Input */}
      <div className="space-y-3">
        <textarea 
          rows="4"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={t.placeholder}
          className="w-full px-4 py-3 rounded-xl glass-input text-xs text-white resize-none"
        />

        <button 
          onClick={() => handleScan()}
          disabled={loading || !content.trim()}
          className="w-full py-3 rounded-xl bg-accent-blue hover:bg-sky-500 text-navy-950 font-bold transition-all text-xs shadow-md shadow-accent-blue/10 disabled:opacity-40 flex items-center justify-center space-x-2"
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-navy-950 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <span>{t.btnScan}</span>
          )}
        </button>
      </div>

      {/* Error Output */}
      {error && (
        <div className="p-4 rounded-xl bg-accent-crimson/10 border border-accent-crimson/20 text-accent-crimson text-xs">
          ⚠️ {error}
        </div>
      )}

      {/* Results Panel */}
      {result && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
          
          {/* Risk Gauge Block */}
          <div className="md:col-span-1 p-5 rounded-2xl bg-navy-900 border border-navy-800 flex flex-col items-center justify-center text-center space-y-4">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{t.threatScore}</span>
            
            <div className="relative flex items-center justify-center">
              {/* Radial Score Gauge */}
              <svg className="w-24 h-24 transform -rotate-90">
                <circle cx="48" cy="48" r="40" stroke="#1C2E4C" strokeWidth="8" fill="transparent" />
                <circle 
                  cx="48" 
                  cy="48" 
                  r="40" 
                  stroke={result.risk_score >= 60 ? "#EF4444" : result.risk_score >= 25 ? "#E5BA73" : "#10B981"} 
                  strokeWidth="8" 
                  fill="transparent" 
                  strokeDasharray={251.2}
                  strokeDashoffset={251.2 - (251.2 * result.risk_score) / 100}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <span className={`absolute text-xl font-extrabold tracking-tight ${getScoreColor(result.risk_score)}`}>
                {result.risk_score}%
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[9px] text-gray-500 font-semibold uppercase">{t.verdictLabel}</span>
              <p className={`text-sm font-bold uppercase ${getScoreColor(result.risk_score)}`}>
                {getVerdictLabel(result.verdict)}
              </p>
            </div>
          </div>

          {/* Highlights & Reasons Block */}
          <div className="md:col-span-2 p-5 rounded-2xl bg-navy-900 border border-navy-800 space-y-4">
            
            {/* Inline highlights */}
            <div className="space-y-2">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{t.phrasesTitle}</span>
              <div className="p-3.5 rounded-xl bg-navy-950 border border-navy-800 font-sans">
                {renderHighlightedText(content, result.flagged_phrases)}
              </div>
            </div>

            {/* Structured warnings list */}
            <div className="space-y-2 pt-2 border-t border-navy-800">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{t.reasonsTitle}</span>
              <ul className="space-y-2">
                {result.reasons.map((r, idx) => (
                  <li key={idx} className="text-xs text-gray-300 flex items-start space-x-2">
                    <span className="text-accent-crimson font-bold mt-0.5">•</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Grievance Report Button (Show if cautious/danger) */}
            {result.verdict !== "Safe" && (
              <div className="pt-2">
                <button 
                  onClick={() => setModalOpen(true)}
                  className="w-full py-2.5 rounded-lg bg-accent-crimson/15 border border-accent-crimson/40 hover:bg-accent-crimson text-white font-bold transition-all text-xs flex items-center justify-center space-x-2"
                >
                  <AlertOctagon className="w-4 h-4" />
                  <span>{t.reportBtn}</span>
                </button>
              </div>
            )}

          </div>

        </div>
      )}

      {/* Scores Escalation Modal */}
      <ScoresReportModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        scanData={result}
        lang={lang}
      />

    </div>
  );
}
