import React, { useState } from 'react';
import { ArrowDown, Cpu, Database, Server, Smartphone, ShieldCheck, FileText } from 'lucide-react';

export default function ArchitectureDiagram({ lang }) {
  const [activeNode, setActiveNode] = useState(null);

  const nodes = [
    {
      id: 'client',
      title: 'Investor Client UI',
      subtitle: 'React SPA / Web App',
      icon: <Smartphone className="w-6 h-6 text-accent-blue" />,
      color: 'border-accent-blue/30 hover:border-accent-blue bg-accent-blue/5',
      desc: 'The visual web app used by retail investors. Provides forms for advisor verification, text links phishing scanning, and media file uploads. Translates UI labels to Hindi and English.'
    },
    {
      id: 'gateway',
      title: 'API Gateway (FastAPI)',
      subtitle: 'Python Async Controller',
      icon: <Server className="w-6 h-6 text-indigo-400" />,
      color: 'border-indigo-400/30 hover:border-indigo-400 bg-indigo-400/5',
      desc: 'Main gateway running on FastAPI. Routes incoming requests, parses multipart media files, applies CORS policies, and coordinates parallel analysis across detection engines.'
    },
    {
      id: 'engine-verify',
      title: 'Fuzzy Intermediary Matcher',
      subtitle: 'RapidFuzz Brand Matching',
      icon: <Database className="w-6 h-6 text-accent-gold" />,
      color: 'border-accent-gold/30 hover:border-accent-gold bg-accent-gold/5',
      desc: 'Strips generic corporate suffixes (e.g. Broking, Wealth, Ltd) to extract brand roots. Calculates Levenshtein similarity against ~50 SEBI records. Flags close-but-unregistered names as impersonation risks.'
    },
    {
      id: 'engine-phish',
      title: 'Phishing Keyword Engine',
      subtitle: 'Lookalike Typosquat & NLP Heuristics',
      icon: <Cpu className="w-6 h-6 text-accent-crimson" />,
      color: 'border-accent-crimson/30 hover:border-accent-crimson bg-accent-crimson/5',
      desc: 'Matches domains against official whitelists. Detects lookalikes (e.g., typosquatting of sebi.gov.in). Evaluates text message content for urgent FOMO triggers and guaranteed return claims.'
    },
    {
      id: 'engine-media',
      title: 'Media Authenticity Scanner',
      subtitle: 'Lip-Sync & Spectral Flatness checks',
      icon: <ShieldCheck className="w-6 h-6 text-accent-emerald" />,
      color: 'border-accent-emerald/30 hover:border-accent-emerald bg-accent-emerald/5',
      desc: 'Examines uploaded audio/video for anomalies: frame blink rates (fail <12/min), temporal lip-sync alignment offsets (>40ms), voice pitch contours variance (TTS footprint <15Hz std-dev).'
    },
    {
      id: 'scores',
      title: 'Mock SEBI SCORES Portal',
      subtitle: 'Grievance Dossier Generator',
      icon: <FileText className="w-6 h-6 text-amber-500" />,
      color: 'border-amber-500/30 hover:border-amber-500 bg-amber-500/5',
      desc: 'Packages the verified scam indicators (with proof metadata hashes) into a pre-filled complaint form, simulating direct legal escalation under SEBI Section 15C.'
    }
  ];

  return (
    <div className="p-6 rounded-2xl glass-premium border border-navy-700 shadow-2xl relative overflow-hidden space-y-6">
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="border-b border-navy-800 pb-3">
        <h3 className="text-lg font-bold text-white flex items-center space-x-2">
          <Cpu className="w-5 h-5 text-accent-blue" />
          <span>Interactive SEBI Shield System Architecture</span>
        </h3>
        <p className="text-xs text-gray-400 mt-1">
          {lang === 'hi' 
            ? 'सिस्टम प्रवाह और डेटा मार्ग को समझने के लिए किसी भी नोड पर माउस ले जाएं (होवर करें)'
            : 'Hover or click on any node component to inspect its data flow, algorithm mechanics, and responsibilities.'}
        </p>
      </div>

      {/* Grid Architecture Flow */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative pt-2">
        
        {/* Column 1: Client Front */}
        <div className="flex flex-col justify-center items-center space-y-4">
          <div className="text-[10px] uppercase tracking-widest text-accent-blue font-bold">Client Layer</div>
          <div 
            className={`w-full p-4 rounded-xl border glass transition-all duration-300 cursor-pointer ${activeNode?.id === 'client' ? 'ring-2 ring-accent-blue border-accent-blue' : ''} ${nodes[0].color}`}
            onMouseEnter={() => setActiveNode(nodes[0])}
            onMouseLeave={() => setActiveNode(null)}
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-navy-950 rounded-lg">{nodes[0].icon}</div>
              <div>
                <h4 className="text-sm font-bold text-white">{nodes[0].title}</h4>
                <p className="text-[10px] text-gray-400">{nodes[0].subtitle}</p>
              </div>
            </div>
          </div>
          <ArrowDown className="w-5 h-5 text-navy-600 hidden lg:block rotate-90" />
          <ArrowDown className="w-5 h-5 text-navy-600 lg:hidden" />
          
          <div className="text-[10px] uppercase tracking-widest text-amber-500 font-bold">Escalation</div>
          <div 
            className={`w-full p-4 rounded-xl border glass transition-all duration-300 cursor-pointer ${activeNode?.id === 'scores' ? 'ring-2 ring-amber-500 border-amber-500' : ''} ${nodes[5].color}`}
            onMouseEnter={() => setActiveNode(nodes[5])}
            onMouseLeave={() => setActiveNode(null)}
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-navy-950 rounded-lg">{nodes[5].icon}</div>
              <div>
                <h4 className="text-sm font-bold text-white">{nodes[5].title}</h4>
                <p className="text-[10px] text-gray-400">{nodes[5].subtitle}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Column 2: API Gateway */}
        <div className="flex flex-col justify-center items-center space-y-4">
          <div className="text-[10px] uppercase tracking-widest text-indigo-400 font-bold">Backend Gateway</div>
          <div 
            className={`w-full p-4 rounded-xl border glass transition-all duration-300 cursor-pointer ${activeNode?.id === 'gateway' ? 'ring-2 ring-indigo-400 border-indigo-400' : ''} ${nodes[1].color}`}
            onMouseEnter={() => setActiveNode(nodes[1])}
            onMouseLeave={() => setActiveNode(null)}
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-navy-950 rounded-lg">{nodes[1].icon}</div>
              <div>
                <h4 className="text-sm font-bold text-white">{nodes[1].title}</h4>
                <p className="text-[10px] text-gray-400">{nodes[1].subtitle}</p>
              </div>
            </div>
          </div>
          <div className="text-[10px] text-gray-500 font-semibold uppercase">API Dispatch Layer</div>
          <div className="w-0.5 h-16 bg-gradient-to-b from-indigo-400/80 to-navy-700 hidden lg:block"></div>
        </div>

        {/* Column 3: Processing Engines */}
        <div className="flex flex-col justify-between space-y-4">
          <div className="text-[10px] uppercase tracking-widest text-accent-gold font-bold text-center lg:text-left">Detection Processing Engines</div>
          
          {/* Registry Verify */}
          <div 
            className={`p-4 rounded-xl border glass transition-all duration-300 cursor-pointer ${activeNode?.id === 'engine-verify' ? 'ring-2 ring-accent-gold border-accent-gold' : ''} ${nodes[2].color}`}
            onMouseEnter={() => setActiveNode(nodes[2])}
            onMouseLeave={() => setActiveNode(null)}
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-navy-950 rounded-lg">{nodes[2].icon}</div>
              <div>
                <h4 className="text-sm font-bold text-white">{nodes[2].title}</h4>
                <p className="text-[10px] text-gray-400">{nodes[2].subtitle}</p>
              </div>
            </div>
          </div>

          {/* Phishing Check */}
          <div 
            className={`p-4 rounded-xl border glass transition-all duration-300 cursor-pointer ${activeNode?.id === 'engine-phish' ? 'ring-2 ring-accent-crimson border-accent-crimson' : ''} ${nodes[3].color}`}
            onMouseEnter={() => setActiveNode(nodes[3])}
            onMouseLeave={() => setActiveNode(null)}
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-navy-950 rounded-lg">{nodes[3].icon}</div>
              <div>
                <h4 className="text-sm font-bold text-white">{nodes[3].title}</h4>
                <p className="text-[10px] text-gray-400">{nodes[3].subtitle}</p>
              </div>
            </div>
          </div>

          {/* Media Check */}
          <div 
            className={`p-4 rounded-xl border glass transition-all duration-300 cursor-pointer ${activeNode?.id === 'engine-media' ? 'ring-2 ring-accent-emerald border-accent-emerald' : ''} ${nodes[4].color}`}
            onMouseEnter={() => setActiveNode(nodes[4])}
            onMouseLeave={() => setActiveNode(null)}
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-navy-950 rounded-lg">{nodes[4].icon}</div>
              <div>
                <h4 className="text-sm font-bold text-white">{nodes[4].title}</h4>
                <p className="text-[10px] text-gray-400">{nodes[4].subtitle}</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Explanatory node details panel */}
      <div className="mt-4 p-4 rounded-xl bg-navy-900/60 border border-navy-800 transition-all duration-300 min-h-[100px]">
        {activeNode ? (
          <div className="space-y-1.5 animate-fadeIn">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold text-accent-gold uppercase font-mono">Module Detail:</span>
              <span className="text-sm font-bold text-white">{activeNode.title}</span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">{activeNode.desc}</p>
          </div>
        ) : (
          <p className="text-xs text-gray-500 italic text-center py-4">
            {lang === 'hi'
              ? 'विश्लेषण विवरण और एल्गोरिदम स्पष्टीकरण देखने के लिए किसी ब्लॉक के ऊपर माउस घुमाएं।'
              : 'Hover over any system architecture node to see detailed code execution steps and underlying algorithms.'}
          </p>
        )}
      </div>
    </div>
  );
}
