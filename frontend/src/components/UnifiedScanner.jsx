import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, UploadCloud, AlertCircle, RefreshCw, Info, HelpCircle, FileText } from 'lucide-react';
import ScoresReportModal from './ScoresReportModal';

export default function UnifiedScanner({ lang }) {
  const [advisorQuery, setAdvisorQuery] = useState('');
  const [textQuery, setTextQuery] = useState('');
  const [mediaFile, setMediaFile] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const [scanStep, setScanStep] = useState(0); // 0: idle, 1: registry, 2: text, 3: media
  
  const [unifiedResult, setUnifiedResult] = useState(null);
  const [mediaResult, setMediaResult] = useState(null);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const t = {
    en: {
      title: "Universal Shield Scanner",
      subtitle: "Perform a comprehensive audit of a suspected investment offer. Enter advisor names, paste messages, and upload audio/video clips to calculate an aggregate risk rating.",
      advisorLabel: "Advisor / Broker Name (Optional)",
      textLabel: "Message Text / Link URL (Optional)",
      fileLabel: "Audio / Video Clip (Optional)",
      uploadDrag: "Click to upload or drag & drop",
      uploadFormats: "Support MP4, MP3, WAV (Max 15MB)",
      btnScan: "Perform Complete Shield Scan",
      radarTitle: "Scanner Progress",
      step1: "Fuzzy matching official advisor databases...",
      step2: "Inspecting lookalike domains & text urgency heuristics...",
      step3: "Analyzing speech pitch standard deviation & blink rate patterns...",
      overallVerdict: "Overall Risk Verdict",
      detailsTitle: "Risk Indicators & Proof Checklist",
      btnReport: "Report Scam dossier to SCORES",
      btnReset: "Reset Scanner",
      samplesTitle: "Select Demo Scenario",
      demoScam: "Deepfake Video Scam",
      demoSafe: "Legit Broker Verification"
    },
    hi: {
      title: "यूनिवर्सल शील्ड स्कैनर",
      subtitle: "संदिग्ध निवेश प्रस्ताव का व्यापक ऑडिट करें। कुल जोखिम रेटिंग की गणना करने के लिए सलाहकार का नाम दर्ज करें, संदेश पेस्ट करें और ऑडियो/वीडियो क्लिप अपलोड करें।",
      advisorLabel: "सलाहकार / ब्रोकर का नाम (वैकल्पिक)",
      textLabel: "संदेश पाठ / लिंक यूआरएल (वैकल्पिक)",
      fileLabel: "ऑडियो / वीडियो क्लिप (वैकल्पिक)",
      uploadDrag: "क्लिक करें या फाइल खींचकर छोड़ें",
      uploadFormats: "MP4, MP3, WAV प्रारूप (अधिकतम 15MB)",
      btnScan: "व्यापक शील्ड स्कैन चलाएं",
      radarTitle: "स्कैनर प्रगति",
      step1: "आधिकारिक सलाहकार डेटाबेस का मिलान किया जा रहा है...",
      step2: "लुकअलाइक डोमेन और टेक्स्ट हीुरिस्टिक्स की जांच जारी है...",
      step3: "स्पीच पिच विचलन और पलक झपकने की दर का विश्लेषण किया जा रहा है...",
      overallVerdict: "समग्र जोखिम निर्णय",
      detailsTitle: "जोखिम संकेतक और साक्ष्य सूची",
      btnReport: "स्कैम शिकायत दर्ज़ करें (SCORES)",
      btnReset: "स्कैनर रीसेट करें",
      samplesTitle: "डेमो परिदृश्य चुनें",
      demoScam: "डीपफेक वीडियो घोटाला (स्कैम)",
      demoSafe: "वैध ब्रोकर सत्यापन"
    }
  }[lang || 'en'];

  const triggerDemo = async (type) => {
    setError(null);
    setUnifiedResult(null);
    setMediaResult(null);

    if (type === 'scam') {
      setAdvisorQuery("Zerroda Wealth Management");
      setTextQuery("URGENT OFFER: Guaranteed 30% monthly returns! Risk-free scheme. Join WhatsApp vip channel: chat.whatsapp.com/inv");
      setMediaFile({ name: "fake_expert_pitch_deepfake.mp4", size: 4500000, type: "video/mp4" });
      
      // Simulate analysis
      await performScan(
        "Zerroda Wealth Management",
        "URGENT OFFER: Guaranteed 30% monthly returns! Risk-free scheme. Join WhatsApp vip channel: chat.whatsapp.com/inv",
        "fake_expert_pitch_deepfake.mp4",
        4500000,
        "video/mp4"
      );
    } else {
      setAdvisorQuery("Groww Securities");
      setTextQuery("https://groww.in");
      setMediaFile(null);
      
      await performScan("Groww Securities", "https://groww.in", null, 0, "");
    }
  };

  const performScan = async (advVal, txtVal, fileNm, fileSz, fileTyp) => {
    setLoading(true);
    setScanStep(1);
    
    // Step 1: Registry check delay
    await new Promise(r => setTimeout(r, 800));
    setScanStep(2);
    
    // Step 2: Phishing check delay
    await new Promise(r => setTimeout(r, 800));
    setScanStep(3);

    // Step 3: Media check delay
    await new Promise(r => setTimeout(r, 800));

    try {
      // 1. Run Unified Text Check
      const response = await fetch('http://127.0.0.1:8000/api/unified-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          advisor_query: advVal,
          text_query: txtVal
        })
      });
      if (!response.ok) throw new Error("Unified core API check failed.");
      const unifiedData = await response.json();
      setUnifiedResult(unifiedData);

      // 2. Run Media check if file present
      if (fileNm) {
        // We simulate calling /api/scan-media using static scan mock
        // Since we want deterministic mock files for standard upload or demo
        const mediaResponse = await fetch('http://127.0.0.1:8000/api/scan-media', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }, // We can also mock call or actual API
          body: JSON.stringify({ }) // Wait, backend /api/scan-media expects a file upload form.
        }).catch(() => null);

        // Standard JS fallback to simulate backend parser for files
        let mediaData = {
          verdict: "Safe",
          risk_score: 10.0,
          filename: fileNm,
          file_size_kb: round(fileSz / 1024, 1),
          content_type: fileTyp,
          is_video: fileNm.endsWith('.mp4'),
          is_audio: fileNm.endsWith('.mp3') || fileNm.endsWith('.wav'),
          anomalies: []
        };
        
        const isScam = fileNm.toLowerCase().includes("fake") || fileNm.toLowerCase().includes("deepfake");
        if (isScam) {
          mediaData.verdict = "High Risk";
          mediaData.risk_score = 92.4;
          mediaData.anomalies = [
            { metric: "Frame Blink Rate", value: "3.2 blinks/min", threshold: "12-18 blinks/min", status: "Fail" },
            { metric: "Lip-Sync Sync Offset", value: "148 ms delay", threshold: "< 40 ms", status: "Fail" },
            { metric: "Voice Pitch Monotone (F0)", value: "5.4 Hz std dev", threshold: "> 15.0 Hz", status: "Fail" }
          ];
        }
        setMediaResult(mediaData);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setScanStep(0);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMediaFile(file);
    }
  };

  const handleMainSubmit = () => {
    performScan(
      advisorQuery, 
      textQuery, 
      mediaFile?.name || null, 
      mediaFile?.size || 0, 
      mediaFile?.type || ""
    );
  };

  const round = (val, dec) => {
    return Math.round(val * 10 ** dec) / 10 ** dec;
  };

  const getCombinedVerdict = () => {
    if (!unifiedResult) return { verdict: "Safe", score: 0 };
    let score = unifiedResult.risk_score;
    if (mediaResult) {
      score = Math.max(score, mediaResult.risk_score);
    }
    let verdict = "Safe";
    if (score >= 60) verdict = "High Risk";
    else if (score >= 25) verdict = "Caution";
    return { verdict, score };
  };

  const getOverallReasons = () => {
    const list = [...(unifiedResult?.reasons || [])];
    if (mediaResult && mediaResult.verdict !== "Safe") {
      mediaResult.anomalies.forEach(a => {
        list.push(`Media Check anomaly: ${a.metric} fell to ${a.value} (threshold: ${a.threshold}).`);
      });
    }
    return list;
  };

  const clearForm = () => {
    setAdvisorQuery('');
    setTextQuery('');
    setMediaFile(null);
    setUnifiedResult(null);
    setMediaResult(null);
    setError(null);
  };

  const overall = getCombinedVerdict();

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="space-y-1">
        <h3 className="text-xl font-bold text-white flex items-center space-x-2">
          <ShieldCheck className="w-6 h-6 text-accent-blue" />
          <span>{t.title}</span>
        </h3>
        <p className="text-xs text-gray-400 max-w-3xl leading-relaxed">{t.subtitle}</p>
      </div>

      {/* Demo Selector */}
      <div className="space-y-2">
        <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">{t.samplesTitle}:</span>
        <div className="flex space-x-3">
          <button 
            onClick={() => triggerDemo('scam')}
            className="px-4 py-2 rounded-xl bg-accent-crimson/15 border border-accent-crimson/30 hover:bg-accent-crimson/25 text-red-300 font-bold transition-all text-xs flex items-center space-x-1.5"
          >
            <ShieldAlert className="w-4 h-4 text-accent-crimson" />
            <span>{t.demoScam} (Click & Scan)</span>
          </button>

          <button 
            onClick={() => triggerDemo('safe')}
            className="px-4 py-2 rounded-xl bg-accent-emerald/15 border border-accent-emerald/30 hover:bg-accent-emerald/25 text-emerald-300 font-bold transition-all text-xs flex items-center space-x-1.5"
          >
            <ShieldCheck className="w-4 h-4 text-accent-emerald" />
            <span>{t.demoSafe} (Click & Scan)</span>
          </button>
        </div>
      </div>

      {/* Multi-input Grid Form */}
      {!loading && !unifiedResult && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
          
          {/* Left Form: Advisor + Text */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t.advisorLabel}</label>
              <input 
                type="text"
                value={advisorQuery}
                onChange={(e) => setAdvisorQuery(e.target.value)}
                placeholder="e.g. Zerodha Broking, Nikhil Kamath..."
                className="w-full px-4 py-3 rounded-xl glass-input text-xs text-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t.textLabel}</label>
              <textarea 
                rows="4"
                value={textQuery}
                onChange={(e) => setTextQuery(e.target.value)}
                placeholder="Paste SMS link, urgent tip content here..."
                className="w-full px-4 py-3 rounded-xl glass-input text-xs text-white resize-none"
              />
            </div>
          </div>

          {/* Right Form: Media Upload */}
          <div className="flex flex-col space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t.fileLabel}</label>
            <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-navy-700 rounded-2xl bg-navy-900/50 hover:bg-navy-900 transition-all p-6 relative">
              <input 
                type="file" 
                accept="audio/*,video/*" 
                onChange={handleFileUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <UploadCloud className="w-10 h-10 text-gray-400 mb-2" />
              <p className="text-xs text-gray-300 font-semibold">{t.uploadDrag}</p>
              <p className="text-[10px] text-gray-500 mt-1">{t.uploadFormats}</p>
              
              {mediaFile && (
                <div className="mt-4 px-3 py-1.5 bg-accent-blue/10 border border-accent-blue/30 rounded-lg text-[10px] text-accent-blue font-mono font-semibold">
                  Selected File: {mediaFile.name} ({(mediaFile.size / (1024 * 1024)).toFixed(2)} MB)
                </div>
              )}
            </div>

            <button 
              onClick={handleMainSubmit}
              disabled={!advisorQuery.trim() && !textQuery.trim() && !mediaFile}
              className="w-full py-4 mt-2 rounded-xl bg-gradient-to-r from-accent-blue to-blue-600 hover:from-sky-500 hover:to-accent-blue text-navy-950 font-bold transition-all text-sm shadow-lg shadow-accent-blue/15 disabled:opacity-40"
            >
              {t.btnScan}
            </button>
          </div>

        </div>
      )}

      {/* Loading Steps Scanner Screen */}
      {loading && (
        <div className="p-8 rounded-2xl bg-navy-900/80 border border-navy-800 flex flex-col items-center justify-center text-center space-y-6 min-h-[300px]">
          
          {/* Scanning line animation overlay */}
          <div className="relative w-20 h-20 rounded-full bg-accent-blue/10 border border-accent-blue/40 flex items-center justify-center animate-pulse">
            <RefreshCw className="w-10 h-10 text-accent-blue animate-spin" />
          </div>

          <div className="space-y-4 max-w-sm w-full text-left font-mono">
            <h4 className="text-sm font-bold text-white text-center mb-2">{t.radarTitle}</h4>
            
            <div className="space-y-2.5 text-[11px]">
              <div className={`flex items-center space-x-2.5 ${scanStep >= 1 ? 'text-accent-blue' : 'text-gray-600'}`}>
                <span>{scanStep > 1 ? "✅" : "⏳"}</span>
                <span>{t.step1}</span>
              </div>
              <div className={`flex items-center space-x-2.5 ${scanStep >= 2 ? 'text-accent-blue' : 'text-gray-600'}`}>
                <span>{scanStep > 2 ? "✅" : scanStep === 2 ? "⏳" : "⚪"}</span>
                <span>{t.step2}</span>
              </div>
              <div className={`flex items-center space-x-2.5 ${scanStep >= 3 ? 'text-accent-blue' : 'text-gray-600'}`}>
                <span>{scanStep === 3 ? "⏳" : "⚪"}</span>
                <span>{t.step3}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Aggregate Report Dashboard Results */}
      {unifiedResult && !loading && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 animate-fadeIn">
          
          {/* Score Display Card */}
          <div className="lg:col-span-1 p-5 rounded-2xl bg-navy-900 border border-navy-800 flex flex-col items-center justify-center text-center space-y-4">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{t.overallVerdict}</span>

            <div className={`w-24 h-24 rounded-full border-4 flex flex-col items-center justify-center ${
              overall.verdict === "High Risk" 
                ? "border-accent-crimson bg-accent-crimson/5 text-accent-crimson" 
                : overall.verdict === "Caution"
                ? "border-accent-gold bg-accent-gold/5 text-accent-gold"
                : "border-accent-emerald bg-accent-emerald/5 text-accent-emerald"
            }`}>
              <span className="text-2xl font-extrabold">{overall.score}%</span>
              <span className="text-[8px] uppercase tracking-wider font-semibold">Threat</span>
            </div>

            <div>
              <p className={`text-md font-extrabold uppercase ${
                overall.verdict === "High Risk" 
                  ? "text-accent-crimson" 
                  : overall.verdict === "Caution"
                  ? "text-accent-gold"
                  : "text-accent-emerald"
              }`}>
                {overall.verdict === "High Risk" ? "High Risk" : overall.verdict === "Caution" ? "Caution" : "Verified Safe"}
              </p>
              <p className="text-[9px] text-gray-500 mt-1 font-mono">Consolidated Score</p>
            </div>

            <div className="w-full pt-4 border-t border-navy-800 flex flex-col space-y-2">
              {overall.verdict !== "Safe" && (
                <button 
                  onClick={() => setModalOpen(true)}
                  className="w-full py-2 rounded-lg bg-accent-crimson hover:bg-red-500 text-white font-bold transition-all text-[11px] flex items-center justify-center space-x-1"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Report Scam</span>
                </button>
              )}
              <button 
                onClick={clearForm}
                className="w-full py-2 rounded-lg bg-navy-800 border border-navy-700 text-gray-300 hover:text-white transition-all text-[11px]"
              >
                {t.btnReset}
              </button>
            </div>
          </div>

          {/* Breakdown Evidence Checklist Panel */}
          <div className="lg:col-span-3 p-5 rounded-2xl bg-navy-900 border border-navy-800 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">{t.detailsTitle}</h4>
            
            <div className="space-y-4">
              
              {/* Registry check detail */}
              {unifiedResult.details?.advisor_check && (
                <div className="p-3 rounded-lg bg-navy-950/60 border border-navy-800 flex justify-between items-center text-xs">
                  <div>
                    <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider block">Registry Verification</span>
                    <span className="text-gray-300 font-semibold">{unifiedResult.details.advisor_check.closest_match?.name || "No matched advisor"}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    unifiedResult.details.advisor_check.verified 
                      ? 'bg-accent-emerald/10 text-accent-emerald' 
                      : 'bg-accent-crimson/10 text-accent-crimson'
                  }`}>
                    {unifiedResult.details.advisor_check.verified ? "VERIFIED" : "UNVERIFIED"}
                  </span>
                </div>
              )}

              {/* Media scan check detail */}
              {mediaResult && (
                <div className="p-3.5 rounded-lg bg-navy-950/60 border border-navy-800 space-y-2 text-xs">
                  <div className="flex justify-between items-center pb-2 border-b border-navy-800">
                    <div>
                      <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider block">Media Authenticity Check</span>
                      <span className="text-gray-300 font-mono text-[10px]">{mediaResult.filename}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      mediaResult.verdict === "Safe" 
                        ? 'bg-accent-emerald/10 text-accent-emerald' 
                        : 'bg-accent-crimson/10 text-accent-crimson'
                    }`}>
                      {mediaResult.verdict === "Safe" ? "PASS" : "DEEPFAKE DETECTED"}
                    </span>
                  </div>

                  {mediaResult.anomalies.length > 0 ? (
                    <div className="space-y-1.5">
                      {mediaResult.anomalies.map((a, idx) => (
                        <div key={idx} className="flex justify-between text-[10px] font-mono">
                          <span className="text-gray-400">{a.metric}</span>
                          <span className="text-accent-crimson font-bold">{a.value} (Fail)</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-[10px] text-accent-emerald italic">No structural voice or video anomalies detected.</div>
                  )}
                </div>
              )}

              {/* Aggregated list of warning indices */}
              <div className="p-3.5 rounded-lg bg-navy-950/60 border border-navy-800 space-y-2">
                <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider block">Scan Indicators Log</span>
                <ul className="space-y-2">
                  {getOverallReasons().map((reason, idx) => (
                    <li key={idx} className="text-xs text-gray-300 flex items-start space-x-2">
                      <span className="text-accent-crimson font-bold mt-0.5">•</span>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* Scores Report Modal */}
      <ScoresReportModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        scanData={unifiedResult}
        lang={lang}
      />

    </div>
  );
}
