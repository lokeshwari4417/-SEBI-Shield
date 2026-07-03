import React, { useState } from 'react';
import { X, Send, Award, FileText, CheckCircle } from 'lucide-react';

export default function ScoresReportModal({ isOpen, onClose, scanData, lang }) {
  if (!isOpen) return null;

  const [submitted, setSubmitted] = useState(false);
  const [complaintId, setComplaintId] = useState('');
  const [complainantName, setComplainantName] = useState('Logeshwari S.');
  const [complainantPan, setComplainantPan] = useState('ABCDE1234F');
  const [additionalRemarks, setAdditionalRemarks] = useState('');

  const t = {
    en: {
      header: "SEBI SCORES Grievance Mockup Portal",
      category: "Complaint Category",
      entityName: "Entity Name / Advisor Name",
      regNo: "SEBI Registration Number",
      evidence: "Evidence & AI Findings",
      complainantName: "Investor Name",
      complainantPan: "Investor PAN Card (Mock)",
      remarks: "Additional Grievance Details",
      btnSubmit: "Submit Grievance to SCORES",
      successHeader: "Grievance Registered Successfully!",
      successText: "This is a hackathon simulation. In production, this would trigger an official SEBI SCORES grievance dossier under section 15C of the SEBI Act.",
      regNoLabel: "Registration ID",
      close: "Close Portal"
    },
    hi: {
      header: "सेबी स्कोर शिकायत मॉकअप पोर्टल",
      category: "शिकायत श्रेणी",
      entityName: "इकाई का नाम / सलाहकार का नाम",
      regNo: "सेबी पंजीकरण संख्या",
      evidence: "साक्ष्य और एआई निष्कर्ष",
      complainantName: "निवेशक का नाम",
      complainantPan: "निवेशक पैन कार्ड (मॉक)",
      remarks: "अतिरिक्त शिकायत विवरण",
      btnSubmit: "शिकायत दर्ज करें (स्कोर पोर्टल)",
      successHeader: "शिकायत सफलतापूर्वक दर्ज की गई!",
      successText: "यह एक हैकाथॉन सिमुलेशन है। वास्तविक सेवा में, यह सेबी अधिनियम की धारा 15सी के तहत एक आधिकारिक शिकायत डॉसियर दर्ज करेगा।",
      regNoLabel: "पंजीकरण आईडी",
      close: "पोर्टल बंद करें"
    }
  }[lang || 'en'];

  const handleSubmit = (e) => {
    e.preventDefault();
    const randomId = `SEBI/E/2026/${Math.floor(100000 + Math.random() * 900000)}`;
    setComplaintId(randomId);
    setSubmitted(true);
  };

  // Extract relevant evidence text from scanData
  const getEvidenceText = () => {
    if (!scanData) return "General suspicious market advisory reported.";
    let text = "";
    if (scanData.filename) {
      text += `[Media Scan: ${scanData.filename}] `;
      text += `Verdict: ${scanData.verdict} (Risk: ${scanData.risk_score}%). `;
      if (scanData.anomalies) {
        text += `Flagged Indicators: ${scanData.anomalies.map(a => `${a.metric} (${a.value}) - ${a.status}`).join(', ')}`;
      }
    } else if (scanData.domain || scanData.is_link) {
      text += `[Phishing URL Check] Domain: ${scanData.domain || 'Unverified'}. `;
      text += `Verdict: ${scanData.verdict} (Risk: ${scanData.risk_score}%). `;
      text += `Reasons: ${scanData.reasons?.join('; ') || ''}`;
    } else if (scanData.flagged_phrases) {
      text += `[Message Check] Text scanned. Verdict: ${scanData.verdict} (Risk: ${scanData.risk_score}%). `;
      text += `Keywords flagged: ${scanData.flagged_phrases.map(f => f.phrase).join(', ')}. `;
      text += `Indicators: ${scanData.reasons?.join('; ') || ''}`;
    } else if (scanData.closest_match) {
      text += `[Broker Impersonation Check] Queried Name: ${scanData.closest_match.name}. `;
      text += `Status: ${scanData.closest_match.status}. Registration No: ${scanData.closest_match.registration_number}. `;
      text += `Details: ${scanData.message || ''}`;
    } else {
      text += "Suspicious investment tip promising guaranteed high returns.";
    }
    return text;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl glass-premium shadow-2xl border border-accent-gold/20">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-navy-900 to-navy-800 border-b border-navy-700">
          <div className="flex items-center space-x-3">
            <Award className="w-6 h-6 text-accent-gold" />
            <span className="font-semibold text-lg tracking-wide text-white">{t.header}</span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {!submitted ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  {t.category}
                </label>
                <select className="w-full px-3 py-2 rounded-lg bg-navy-900 border border-navy-700 text-white focus:outline-none focus:border-accent-blue text-sm">
                  <option>Unregistered Financial Advisory (RIA Scam)</option>
                  <option>Deepfake/AI Impersonation of Market Experts</option>
                  <option>Phishing Website Cloning Broker Portal</option>
                  <option>Unregulated WhatsApp/Telegram Tips Channel</option>
                  <option>Guaranteed Return Promises</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  {t.entityName}
                </label>
                <input 
                  type="text" 
                  value={scanData?.closest_match?.name || scanData?.domain || "Unknown/Suspicious Entities"} 
                  readOnly 
                  className="w-full px-3 py-2 rounded-lg bg-navy-900/50 border border-navy-800 text-gray-300 text-sm cursor-not-allowed"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  {t.regNo}
                </label>
                <input 
                  type="text" 
                  value={scanData?.closest_match?.registration_number || "NOT FOUND - Impersonator"} 
                  readOnly 
                  className="w-full px-3 py-2 rounded-lg bg-navy-900/50 border border-navy-800 text-gray-300 text-sm cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  UPI ID / Website Associated
                </label>
                <input 
                  type="text" 
                  value={scanData?.closest_match?.website || scanData?.closest_match?.upi_id || scanData?.domain || "N/A"} 
                  readOnly 
                  className="w-full px-3 py-2 rounded-lg bg-navy-900/50 border border-navy-800 text-gray-300 text-sm cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                {t.evidence}
              </label>
              <textarea 
                rows="3" 
                value={getEvidenceText()} 
                readOnly
                className="w-full px-3 py-2 rounded-lg bg-navy-950/60 border border-navy-800 text-accent-blue font-mono text-xs cursor-not-allowed"
              />
            </div>

            <div className="border-t border-navy-800 my-4 pt-4"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  {t.complainantName}
                </label>
                <input 
                  type="text" 
                  value={complainantName} 
                  onChange={(e) => setComplainantName(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-lg bg-navy-900 border border-navy-700 text-white focus:outline-none focus:border-accent-blue text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  {t.complainantPan}
                </label>
                <input 
                  type="text" 
                  value={complainantPan} 
                  onChange={(e) => setComplainantPan(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-lg bg-navy-900 border border-navy-700 text-white focus:outline-none focus:border-accent-blue text-sm uppercase"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                {t.remarks}
              </label>
              <textarea 
                rows="2" 
                value={additionalRemarks} 
                onChange={(e) => setAdditionalRemarks(e.target.value)}
                placeholder="Paste details of chat conversation, loss incurred, or other relevant descriptions..."
                className="w-full px-3 py-2 rounded-lg bg-navy-900 border border-navy-700 text-white focus:outline-none focus:border-accent-blue text-sm"
              />
            </div>

            <div className="pt-2">
              <button 
                type="submit" 
                className="w-full py-3 rounded-lg bg-gradient-to-r from-accent-gold to-yellow-600 hover:from-yellow-600 hover:to-accent-gold text-navy-950 font-bold transition-all shadow-lg shadow-accent-gold/15 flex items-center justify-center space-x-2 text-sm"
              >
                <Send className="w-4 h-4" />
                <span>{t.btnSubmit}</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="p-8 text-center space-y-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-emerald/20 border border-accent-emerald/40 text-accent-emerald floating-element">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">{t.successHeader}</h3>
              <p className="text-xs text-accent-gold font-mono tracking-wider font-semibold">
                {t.regNoLabel}: {complaintId}
              </p>
            </div>

            <p className="text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
              {t.successText}
            </p>

            <div className="p-4 rounded-xl bg-navy-900/60 border border-navy-800 text-left font-mono text-[10px] text-gray-400 max-h-[140px] overflow-y-auto space-y-1">
              <div className="text-accent-blue font-semibold border-b border-navy-800 pb-1 mb-1 flex items-center justify-between">
                <span>Dossier Metadata Package</span>
                <span className="text-[8px] bg-navy-800 px-1 py-0.5 rounded text-gray-300">Prefilled Hash Valid</span>
              </div>
              <div>Timestamp: {new Date().toISOString()}</div>
              <div>Target Entity: {scanData?.closest_match?.name || scanData?.domain || "Unknown/Suspicious Entity"}</div>
              <div>Grievant Name: {complainantName} (PAN: {complainantPan})</div>
              <div>Evidence Summary: {getEvidenceText().substring(0, 120)}...</div>
            </div>

            <div className="flex space-x-3 justify-center pt-2">
              <button 
                onClick={() => {
                  alert("Dossier JSON summary report exported successfully (simulated PDF download).");
                }}
                className="px-4 py-2 rounded-lg bg-navy-800 border border-navy-700 text-white hover:bg-navy-700 text-xs font-semibold flex items-center space-x-1.5 transition-all"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Download Report Dossier</span>
              </button>
              <button 
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="px-4 py-2 rounded-lg bg-accent-blue hover:bg-sky-500 text-navy-950 font-bold text-xs transition-all"
              >
                {t.close}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
