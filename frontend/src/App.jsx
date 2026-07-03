import React, { useState } from 'react';
import { Shield, CheckCircle2, Link as LinkIcon, Smartphone, Cpu, Award, Globe, HelpCircle } from 'lucide-react';

import UnifiedScanner from './components/UnifiedScanner';
import IntermediaryVerifier from './components/IntermediaryVerifier';
import PhishingChecker from './components/PhishingChecker';
import WhatsAppBot from './components/WhatsAppBot';
import InteractivePitchDeck from './components/InteractivePitchDeck';
import ArchitectureDiagram from './components/ArchitectureDiagram';

export default function App() {
  const [lang, setLang] = useState('en');
  const [activeTab, setActiveTab] = useState('scanner');

  const locale = {
    en: {
      title: "SEBI Shield",
      tagline: "AI-Powered Deepfake & Phishing Protection for Securities Market Investors",
      disclaimer: "⚠️ Prototype for hackathon demo — not an official SEBI product. Detection scores are illustrative.",
      tabScanner: "Universal Check",
      tabRegistry: "Advisor Registry",
      tabPhishing: "Phishing Checker",
      tabBot: "WhatsApp Simulator",
      tabPitch: "Interactive Pitch",
      tabArch: "Architecture Flow",
      footer: "SEBI Securities Market TechSprint — GFF 2026 Submission. Shielding retail wealth with trust-aligned AI."
    },
    hi: {
      title: "सेबी शील्ड",
      tagline: "प्रतिभूति बाजार निवेशकों के लिए एआई-संचालित डीपफेक और फ़िशिंग सुरक्षा",
      disclaimer: "⚠️ हैकाथॉन प्रोटोटाइप डेमो - आधिकारिक सेबी उत्पाद नहीं। स्कोर केवल उदाहरण के लिए हैं।",
      tabScanner: "यूनिवर्सल चेक",
      tabRegistry: "सलाहकार रजिस्ट्री",
      tabPhishing: "फ़िशिंग चेकर",
      tabBot: "व्हाट्सएप सिम्युलेटर",
      tabPitch: "इंटरएक्टिव पिच",
      tabArch: "आर्किटेक्चर फ्लो",
      footer: "सेबी प्रतिभूति बाजार टेकस्प्रिंट — जीएफएफ 2026 प्रस्तुति। एआई-सुरक्षा से खुदरा पूंजी की रक्षा।"
    }
  }[lang];

  return (
    <div className="min-h-screen bg-[#060B13] flex flex-col justify-between text-gray-200">
      
      {/* Top Disclaimer Banner */}
      <div className="bg-[#1e140f] border-b border-yellow-600/20 py-2.5 px-4 text-center">
        <span className="text-[10px] md:text-xs font-bold text-accent-gold tracking-wide">
          {locale.disclaimer}
        </span>
      </div>

      {/* Header Area */}
      <header className="px-4 md:px-8 py-5 border-b border-navy-800 bg-[#0B1220]/60 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo Brand */}
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-gold to-yellow-600 flex items-center justify-center shadow-lg shadow-accent-gold/15">
              <Shield className="w-6 h-6 text-navy-950 stroke-[2.5]" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-white flex items-center">
                <span>{locale.title}</span>
                <span className="ml-2 text-[8px] bg-navy-800 text-accent-gold px-1.5 py-0.5 rounded font-mono font-bold tracking-wider uppercase border border-accent-gold/20">
                  Secures
                </span>
              </h1>
              <p className="text-[10px] md:text-[11px] text-gray-400 font-semibold tracking-wide max-w-lg">
                {locale.tagline}
              </p>
            </div>
          </div>

          {/* Language Selector */}
          <div className="flex items-center space-x-2">
            <Globe className="w-4 h-4 text-gray-400" />
            <button 
              onClick={() => setLang('en')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                lang === 'en' ? 'bg-accent-blue text-navy-950 shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              English
            </button>
            <button 
              onClick={() => setLang('hi')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                lang === 'hi' ? 'bg-accent-blue text-navy-950 shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              हिंदी
            </button>
          </div>

        </div>
      </header>

      {/* Main App Workspace Layout */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-8 space-y-6">
        
        {/* Navigation Tabs bar */}
        <div className="flex flex-wrap border-b border-navy-800 gap-1 md:gap-2">
          
          <button 
            onClick={() => setActiveTab('scanner')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center space-x-1.5 ${
              activeTab === 'scanner' 
                ? 'border-accent-blue text-accent-blue' 
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>{locale.tabScanner}</span>
          </button>

          <button 
            onClick={() => setActiveTab('registry')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center space-x-1.5 ${
              activeTab === 'registry' 
                ? 'border-accent-blue text-accent-blue' 
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{locale.tabRegistry}</span>
          </button>

          <button 
            onClick={() => setActiveTab('phishing')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center space-x-1.5 ${
              activeTab === 'phishing' 
                ? 'border-accent-blue text-accent-blue' 
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <LinkIcon className="w-4 h-4" />
            <span>{locale.tabPhishing}</span>
          </button>

          <button 
            onClick={() => setActiveTab('bot')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center space-x-1.5 ${
              activeTab === 'bot' 
                ? 'border-accent-blue text-accent-blue' 
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>{locale.tabBot}</span>
          </button>

          <button 
            onClick={() => setActiveTab('pitch')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center space-x-1.5 ${
              activeTab === 'pitch' 
                ? 'border-accent-blue text-accent-blue' 
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>{locale.tabPitch}</span>
          </button>

          <button 
            onClick={() => setActiveTab('arch')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center space-x-1.5 ${
              activeTab === 'arch' 
                ? 'border-accent-blue text-accent-blue' 
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>{locale.tabArch}</span>
          </button>

        </div>

        {/* Dynamic Display Panel container */}
        <div className="p-4 md:p-6 rounded-2xl glass border border-navy-800 shadow-xl bg-[#090F1B]/40">
          
          {activeTab === 'scanner' && <UnifiedScanner lang={lang} />}
          {activeTab === 'registry' && <IntermediaryVerifier lang={lang} />}
          {activeTab === 'phishing' && <PhishingChecker lang={lang} />}
          {activeTab === 'bot' && <WhatsAppBot lang={lang} />}
          {activeTab === 'pitch' && <InteractivePitchDeck lang={lang} />}
          {activeTab === 'arch' && <ArchitectureDiagram lang={lang} />}

        </div>

      </main>

      {/* Footer Area */}
      <footer className="border-t border-navy-900 bg-[#04080F] px-4 py-6 text-center">
        <p className="text-[10px] md:text-xs text-gray-500 font-mono tracking-wide">
          {locale.footer}
        </p>
      </footer>

    </div>
  );
}
