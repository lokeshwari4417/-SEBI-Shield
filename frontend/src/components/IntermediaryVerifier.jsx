import React, { useState } from 'react';
import { Search, ShieldAlert, ShieldCheck, CheckCircle2, AlertTriangle, ExternalLink, HelpCircle } from 'lucide-react';
import ScoresReportModal from './ScoresReportModal';

export default function IntermediaryVerifier({ lang }) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const t = {
    en: {
      title: "Intermediary Registry Verifier",
      subtitle: "Verify registration details of stock brokers, mutual funds, investment advisors (RIAs), and research analysts.",
      placeholder: "Enter Advisor Name, Registration No. (e.g. INZ000203235), UPI ID, or Website...",
      btnSearch: "Verify Registry",
      statusActive: "Active & Registered",
      statusSuspended: "Registration Suspended",
      statusInvestigating: "Under Active Investigation",
      unverified: "Unregistered Entity",
      similarityAlert: "Possible Brand Impersonation Alert",
      closestMatch: "Closest Registered Match",
      regNo: "SEBI Registration ID",
      email: "Compliance Contact Email",
      website: "Registered Official Website",
      upi: "Registered UPI Handle",
      reportBtn: "Report Scammer to SCORES",
      samplesTitle: "Quick Test Scenarios",
      matchDetails: "Match Confidence Score"
    },
    hi: {
      title: "मध्यस्थ रजिस्ट्री सत्यापन",
      subtitle: "स्टॉक ब्रोकर, म्यूचुअल फंड, निवेश सलाहकार (RIA) और अनुसंधान विश्लेषकों के पंजीकरण विवरण को सत्यापित करें।",
      placeholder: "सलाहकार का नाम, पंजीकरण संख्या (जैसे INZ000203235), यूपीआई आईडी या वेबसाइट दर्ज करें...",
      btnSearch: "रजिस्ट्री सत्यापित करें",
      statusActive: "सक्रिय और पंजीकृत",
      statusSuspended: "पंजीकरण निलंबित",
      statusInvestigating: "सक्रिय जांच के तहत",
      unverified: "अपंजीकृत इकाई",
      similarityAlert: "संभावित ब्रांड प्रतिरूपण चेतावनी",
      closestMatch: "निकटतम पंजीकृत मिलान",
      regNo: "सेबी पंजीकरण आईडी",
      email: "अनुपालन ईमेल",
      website: "पंजीकृत आधिकारिक वेबसाइट",
      upi: "पंजीकृत यूपीआई हैंडल",
      reportBtn: "स्कैमर की शिकायत दर्ज करें (स्कोर)",
      samplesTitle: "त्वरित परीक्षण परिदृश्य",
      matchDetails: "मिलान सटीकता स्कोर"
    }
  }[lang || 'en'];

  const samples = [
    { label: "Zerodha (Active Broker)", query: "Zerodha Broking Limited" },
    { label: "Zerroda (Fuzzy/Scam)", query: "Zerroda Financials" },
    { label: "Nikhil Kamath (Active Advisor)", query: "Nikhil Kamath" },
    { label: "Guaranteed Returns (Suspended)", query: "Guaranteed Returns Advisory" },
    { label: "Unknown (Not Registered)", query: "Scam Advisory Capital Pvt Ltd" }
  ];

  const handleVerify = async (searchQuery) => {
    const q = searchQuery || query;
    if (!q.trim()) return;

    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/verify-intermediary?query=${encodeURIComponent(q)}`);
      if (!response.ok) {
        throw new Error("Unable to contact verification backend.");
      }
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBg = (status) => {
    if (status === 'Active') return 'bg-accent-emerald/20 text-accent-emerald border-accent-emerald/30';
    if (status === 'Suspended') return 'bg-accent-crimson/20 text-accent-crimson border-accent-crimson/30';
    return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
  };

  return (
    <div className="space-y-6">
      
      {/* Title block */}
      <div className="space-y-1">
        <h3 className="text-xl font-bold text-white flex items-center space-x-2">
          <CheckCircle2 className="w-6 h-6 text-accent-blue" />
          <span>{t.title}</span>
        </h3>
        <p className="text-xs text-gray-400 max-w-2xl">{t.subtitle}</p>
      </div>

      {/* Verification input field */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
            placeholder={t.placeholder}
            className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-xs text-white"
          />
          <Search className="w-5 h-5 text-gray-500 absolute left-3 top-3.5" />
        </div>
        
        <button 
          onClick={() => handleVerify()}
          disabled={loading || !query.trim()}
          className="px-6 py-3 rounded-xl bg-accent-blue hover:bg-sky-500 text-navy-950 font-bold transition-all text-xs shadow-md shadow-accent-blue/10 disabled:opacity-40 flex items-center justify-center space-x-2"
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-navy-950 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <span>{t.btnSearch}</span>
          )}
        </button>
      </div>

      {/* Quick Test Samples */}
      <div className="space-y-2">
        <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">{t.samplesTitle}:</span>
        <div className="flex flex-wrap gap-2">
          {samples.map((s, idx) => (
            <button 
              key={idx}
              onClick={() => {
                setQuery(s.query);
                handleVerify(s.query);
              }}
              className="px-3 py-1.5 rounded-lg bg-navy-900 border border-navy-800 hover:border-navy-700 text-gray-300 hover:text-white transition-all text-[10px] font-medium"
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 rounded-xl bg-accent-crimson/10 border border-accent-crimson/20 text-accent-crimson text-xs">
          ⚠️ {error}
        </div>
      )}

      {/* Results Display */}
      {result && (
        <div className="animate-fadeIn">
          {result.verified ? (
            /* VERIFIED SUCCESS CARD */
            <div className="p-6 rounded-2xl bg-gradient-to-br from-navy-900 to-navy-950 border border-accent-emerald/30 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-navy-800 pb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-accent-emerald/10 text-accent-emerald rounded-xl border border-accent-emerald/20">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-md font-bold text-white leading-tight">
                      {result.closest_match.name}
                    </h4>
                    <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mt-0.5">
                      {result.closest_match.type}
                    </p>
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${getStatusBg(result.closest_match.status)}`}>
                  {t.statusActive}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{t.regNo}</span>
                  <p className="text-white font-mono text-xs">{result.closest_match.registration_number}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{t.email}</span>
                  <p className="text-white">{result.closest_match.email}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{t.website}</span>
                  <p className="text-accent-blue hover:underline flex items-center space-x-1">
                    <a href={result.closest_match.website} target="_blank" rel="noreferrer">
                      {result.closest_match.website}
                    </a>
                    <ExternalLink className="w-3 h-3 inline" />
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{t.upi}</span>
                  <p className="text-white font-mono">{result.closest_match.upi_id}</p>
                </div>
              </div>
            </div>
          ) : (
            /* UNVERIFIED / WARNING CARD */
            <div className="p-6 rounded-2xl bg-gradient-to-br from-navy-900 to-navy-950 border border-accent-crimson/30 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-navy-800 pb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-accent-crimson/10 text-accent-crimson rounded-xl border border-accent-crimson/20 animate-pulse">
                    <ShieldAlert className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-md font-bold text-white leading-tight">
                      {t.unverified}
                    </h4>
                    <p className="text-[10px] text-accent-crimson font-bold uppercase tracking-wider mt-0.5">
                      {result.closest_match ? t.similarityAlert : "Not Found in Registry"}
                    </p>
                  </div>
                </div>
                
                {result.closest_match && (
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${getStatusBg(result.closest_match.status)}`}>
                    {result.closest_match.status === 'Suspended' ? t.statusSuspended : t.statusInvestigating}
                  </span>
                )}
              </div>

              {/* Explanatory Message */}
              <p className="text-xs text-gray-300 leading-normal bg-navy-950/40 p-3 rounded-lg border border-navy-800">
                {result.message}
              </p>

              {result.closest_match && (
                <div className="p-4 rounded-xl bg-navy-950 border border-navy-800 space-y-3">
                  <div className="text-xs font-bold text-white flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 text-accent-gold" />
                    <span>{t.closestMatch} (For Reference)</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-[9px] text-gray-500 uppercase font-bold">{t.closestMatch} Name</span>
                      <p className="text-gray-300 font-semibold">{result.closest_match.name}</p>
                    </div>
                    <div>
                      <span className="text-[9px] text-gray-500 uppercase font-bold">{t.regNo}</span>
                      <p className="text-gray-300 font-mono">{result.closest_match.registration_number}</p>
                    </div>
                    <div>
                      <span className="text-[9px] text-gray-500 uppercase font-bold">{t.website}</span>
                      <p className="text-accent-blue">{result.closest_match.website}</p>
                    </div>
                    <div>
                      <span className="text-[9px] text-gray-500 uppercase font-bold">{t.matchDetails}</span>
                      <p className="text-accent-gold font-mono font-bold">{result.score.toFixed(0)}% Similarity</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex pt-2">
                <button 
                  onClick={() => setModalOpen(true)}
                  className="w-full py-2.5 rounded-lg bg-accent-crimson hover:bg-red-500 text-white font-bold transition-all text-xs flex items-center justify-center space-x-2"
                >
                  <ShieldAlert className="w-4 h-4" />
                  <span>{t.reportBtn}</span>
                </button>
              </div>
            </div>
          )}
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
