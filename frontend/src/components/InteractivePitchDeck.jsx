import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, AlertTriangle, Cpu, TrendingUp, ShieldAlert, Award } from 'lucide-react';

export default function InteractivePitchDeck({ lang }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: {
        en: "The Problem: Synthetic Media Financial Scams",
        hi: "समस्या: सिंथेटिक मीडिया वित्तीय घोटाले"
      },
      icon: <AlertTriangle className="w-12 h-12 text-accent-crimson animate-pulse" />,
      content: {
        en: (
          <div className="space-y-4 text-gray-300">
            <p className="text-sm font-semibold text-accent-crimson border-l-2 border-accent-crimson pl-3">
              Retail investors lose crores of rupees daily to highly deceptive synthetic scams.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-navy-900 border border-navy-800 space-y-2">
                <div className="text-xs text-accent-gold font-bold uppercase tracking-wider">01. Deepfake Endorsements</div>
                <p className="text-xs text-gray-400">Scammers use AI-cloned voices and deepfaked videos of popular market experts (e.g., prominent wealth managers or SEBI officials) promising "guaranteed returns".</p>
              </div>
              <div className="p-4 rounded-xl bg-navy-900 border border-navy-800 space-y-2">
                <div className="text-xs text-accent-gold font-bold uppercase tracking-wider">02. Typosquatting / Clone Webs</div>
                <p className="text-xs text-gray-400">Clone portals resembling SEBI registries or legitimate broker domains (e.g. <code>sebi-gov.in</code> instead of <code>sebi.gov.in</code>) trick users into sending money.</p>
              </div>
              <div className="p-4 rounded-xl bg-navy-900 border border-navy-800 space-y-2">
                <div className="text-xs text-accent-gold font-bold uppercase tracking-wider">03. VIP Chat Bait Channels</div>
                <p className="text-xs text-gray-400">Users receive unsolicited stock tips via WhatsApp and Telegram groups, pressuring immediate fund transfers to personal UPI handles.</p>
              </div>
            </div>
            <div className="bg-accent-crimson/5 border border-accent-crimson/10 p-3 rounded-lg text-xs text-gray-400">
              <strong>Impact:</strong> Erosion of trust in securities markets and massive capital loss for vulnerable Tier-2 and Tier-3 city retail investors.
            </div>
          </div>
        ),
        hi: (
          <div className="space-y-4 text-gray-300">
            <p className="text-sm font-semibold text-accent-crimson border-l-2 border-accent-crimson pl-3">
              अत्यधिक भ्रामक सिंथेटिक घोटालों के कारण खुदरा निवेशक दैनिक रूप से करोड़ों रुपये गंवा रहे हैं।
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-navy-900 border border-navy-800 space-y-2">
                <div className="text-xs text-accent-gold font-bold uppercase tracking-wider">01. डीपफेक समर्थन</div>
                <p className="text-xs text-gray-400">स्कैमर लोकप्रिय बाजार विशेषज्ञों के एआई-क्लोन आवाज और डीपफेक वीडियो का उपयोग करके "गारंटीड रिटर्न" का वादा करते हैं।</p>
              </div>
              <div className="p-4 rounded-xl bg-navy-900 border border-navy-800 space-y-2">
                <div className="text-xs text-accent-gold font-bold uppercase tracking-wider">02. क्लोन वेबसाइटें</div>
                <p className="text-xs text-gray-400">सेबी रजिस्ट्री या असली ब्रोकर डोमेन से मिलती-जुलती फर्जी वेबसाइटें (जैसे <code>sebi-gov.in</code>) निवेशकों को धोखा देती हैं।</p>
              </div>
              <div className="p-4 rounded-xl bg-navy-900 border border-navy-800 space-y-2">
                <div className="text-xs text-accent-gold font-bold uppercase tracking-wider">03. वीआईपी टेलीग्राम चैनल</div>
                <p className="text-xs text-gray-400">व्हाट्सएप/टेलीग्राम समूहों के माध्यम से अनचाहे स्टॉक टिप्स दिए जाते हैं, और व्यक्तिगत यूपीआई पर तत्काल फंड भेजने के लिए दबाव डाला जाता है।</p>
              </div>
            </div>
          </div>
        )
      }
    },
    {
      title: {
        en: "The Solution: SEBI Shield AI Engine",
        hi: "समाधान: सेबी शील्ड एआई इंजन"
      },
      icon: <Cpu className="w-12 h-12 text-accent-blue" />,
      content: {
        en: (
          <div className="space-y-4 text-gray-300">
            <p className="text-sm font-semibold text-accent-blue border-l-2 border-accent-blue pl-3">
              A comprehensive screening shield analyzing advisor registrations, message phishing, and media deepfakes.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-navy-900 border border-navy-800 space-y-2">
                <div className="text-xs text-accent-blue font-bold uppercase tracking-wider">Advisor Verify</div>
                <p className="text-xs text-gray-400">Uses corporate brand name extraction and Levenshtein similarity to detect registration typos and warn about unregistered advisors.</p>
              </div>
              <div className="p-4 rounded-xl bg-navy-900 border border-navy-800 space-y-2">
                <div className="text-xs text-accent-blue font-bold uppercase tracking-wider">Phishing Scan</div>
                <p className="text-xs text-gray-400">Scans URL structures for typosquatting and checks message text for high-pressure Urgency and Guaranteed Return keywords.</p>
              </div>
              <div className="p-4 rounded-xl bg-navy-900 border border-navy-800 space-y-2">
                <div className="text-xs text-accent-blue font-bold uppercase tracking-wider">Deepfake Checker</div>
                <p className="text-xs text-gray-400">Checks video frame-blink rates, lip-sync alignments, and spectral pitch flatness to verify authenticity of advisor media clips.</p>
              </div>
            </div>
            <div className="bg-accent-emerald/5 border border-accent-emerald/10 p-3 rounded-lg text-xs text-gray-400 flex items-center justify-between">
              <span><strong>SCORES Integration:</strong> Generates a pre-filled compliance dossier with proof signature hash for easy grievance registration.</span>
              <span className="text-[10px] text-accent-emerald font-bold border border-accent-emerald/30 px-1.5 py-0.5 rounded">Ready for Pilot</span>
            </div>
          </div>
        ),
        hi: (
          <div className="space-y-4 text-gray-300">
            <p className="text-sm font-semibold text-accent-blue border-l-2 border-accent-blue pl-3">
              सलाहकार पंजीकरण, संदेश फ़िशिंग और मीडिया डीपफेक का विश्लेषण करने वाली एक व्यापक सुरक्षा कवच।
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-navy-900 border border-navy-800 space-y-2">
                <div className="text-xs text-accent-blue font-bold uppercase tracking-wider">सलाहकार सत्यापन</div>
                <p className="text-xs text-gray-400">पंजीकरण संबंधी त्रुटियों का पता लगाने और अपंजीकृत सलाहकारों के बारे में चेतावनी देने के लिए ब्रांड नाम निष्कर्षण का उपयोग करता है।</p>
              </div>
              <div className="p-4 rounded-xl bg-navy-900 border border-navy-800 space-y-2">
                <div className="text-xs text-accent-blue font-bold uppercase tracking-wider">फ़िशिंग स्कैन</div>
                <p className="text-xs text-gray-400">यूआरएल की जांच करता है और तत्काल दबाव और निश्चित लाभ वाले कीवर्ड के लिए संदेश पाठ को स्कैन करता है।</p>
              </div>
              <div className="p-4 rounded-xl bg-navy-900 border border-navy-800 space-y-2">
                <div className="text-xs text-accent-blue font-bold uppercase tracking-wider">डीपफेक चेकर</div>
                <p className="text-xs text-gray-400">सलाहकार मीडिया क्लिप की प्रामाणिकता को सत्यापित करने के लिए लिप-सिंक और आवाज की पिच के उतार-चढ़ाव की जांच करता है।</p>
              </div>
            </div>
          </div>
        )
      }
    },
    {
      title: {
        en: "Scalability, Roadmap & Expansion Plan",
        hi: "स्केलेबिलिटी और विस्तार योजना"
      },
      icon: <TrendingUp className="w-12 h-12 text-accent-emerald" />,
      content: {
        en: (
          <div className="space-y-4 text-gray-300">
            <p className="text-sm font-semibold text-accent-emerald border-l-2 border-accent-emerald pl-3">
              A phased rollout model ensuring maximum safety coverage for retail investors across India.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-navy-900 border border-navy-800 space-y-2">
                <div className="text-xs text-accent-emerald font-bold uppercase tracking-wider">Phase 1: Complaint Pre-Screen</div>
                <p className="text-xs text-gray-400">Integrate as a smart pre-screening layer in SEBI SCORES portal, generating verified proof dossier files to reduce investigation time by 40%.</p>
              </div>
              <div className="p-4 rounded-xl bg-navy-900 border border-navy-800 space-y-2">
                <div className="text-xs text-accent-emerald font-bold uppercase tracking-wider">Phase 2: Broker APIs</div>
                <p className="text-xs text-gray-400">Partner with stock exchanges and stockbrokers (Groww, Zerodha) to provide real-time registered lookups inside trading and investment apps.</p>
              </div>
              <div className="p-4 rounded-xl bg-navy-900 border border-navy-800 space-y-2">
                <div className="text-xs text-accent-emerald font-bold uppercase tracking-wider">Phase 3: Mass WhatsApp Reach</div>
                <p className="text-xs text-gray-400">Deploy via WhatsApp Business API bot. Tier-2 and Tier-3 city investors can forward forwarded chats and video tips to verify them instantly.</p>
              </div>
            </div>
            <div className="bg-navy-800/80 border border-navy-700 p-3 rounded-lg text-xs text-gray-400 flex items-center space-x-2">
              <ShieldAlert className="w-5 h-5 text-accent-gold" />
              <span><strong>Mission:</strong> Shielding 10 Crore+ Indian retail demat accounts from AI-driven financial misinformation and unregulated advisory traps.</span>
            </div>
          </div>
        ),
        hi: (
          <div className="space-y-4 text-gray-300">
            <p className="text-sm font-semibold text-accent-emerald border-l-2 border-accent-emerald pl-3">
              भारत भर के खुदरा निवेशकों के लिए अधिकतम सुरक्षा कवरेज सुनिश्चित करने वाला चरणबद्ध रोलआउट मॉडल।
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-navy-900 border border-navy-800 space-y-2">
                <div className="text-xs text-accent-emerald font-bold uppercase tracking-wider">चरण 1: शिकायत प्री-स्क्रीन</div>
                <p className="text-xs text-gray-400">सेबी स्कोर पोर्टल में प्री-स्क्रीनिंग लेयर के रूप में एकीकृत करें, जिससे जांच का समय 40% तक कम हो सके।</p>
              </div>
              <div className="p-4 rounded-xl bg-navy-900 border border-navy-800 space-y-2">
                <div className="text-xs text-accent-emerald font-bold uppercase tracking-wider">चरण 2: ब्रोकर एपीआई</div>
                <p className="text-xs text-gray-400">ट्रेडिंग ऐप्स के भीतर रीयल-टाइम सलाहकारों की सूची क्रॉस-चेक करने के लिए ब्रोकरों के साथ साझेदारी करें।</p>
              </div>
              <div className="p-4 rounded-xl bg-navy-900 border border-navy-800 space-y-2">
                <div className="text-xs text-accent-emerald font-bold uppercase tracking-wider">चरण 3: व्हाट्सएप मास रोलआउट</div>
                <p className="text-xs text-gray-400">व्हाट्सएप बिजनेस एपीआई बॉट तैनात करें। उपयोगकर्ता संदेशों को फॉरवर्ड करके तुरंत उनका जोखिम जान सकेंगे।</p>
              </div>
            </div>
          </div>
        )
      }
    }
  ];

  const next = () => setCurrentSlide((currentSlide + 1) % slides.length);
  const prev = () => setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);

  return (
    <div className="p-6 rounded-2xl glass-premium border border-navy-700 shadow-2xl relative overflow-hidden space-y-6">
      
      {/* Background Decorative Gradient */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-blue/5 rounded-full filter blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-accent-gold/5 rounded-full filter blur-3xl pointer-events-none"></div>

      {/* Top Slide Info */}
      <div className="flex items-center justify-between pb-4 border-b border-navy-800">
        <div className="flex items-center space-x-3">
          <Award className="w-5 h-5 text-accent-gold" />
          <span className="text-xs font-semibold text-gray-400 tracking-wider uppercase">
            SEBI Securities Market TechSprint 2026 — Pitch Slide {currentSlide + 1} of {slides.length}
          </span>
        </div>
        <div className="flex space-x-2">
          {slides.map((_, idx) => (
            <div 
              key={idx} 
              className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentSlide ? 'bg-accent-gold w-4' : 'bg-navy-700'}`}
            />
          ))}
        </div>
      </div>

      {/* Slide Body */}
      <div className="min-h-[280px] flex flex-col justify-center py-4 space-y-6 transition-all duration-500">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-navy-900 rounded-2xl border border-navy-800">
            {slides[currentSlide].icon}
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            {slides[currentSlide].title[lang] || slides[currentSlide].title['en']}
          </h2>
        </div>
        
        <div>
          {slides[currentSlide].content[lang] || slides[currentSlide].content['en']}
        </div>
      </div>

      {/* Slide Navigation controls */}
      <div className="flex items-center justify-between pt-4 border-t border-navy-800">
        <button 
          onClick={prev}
          className="px-4 py-2 rounded-lg bg-navy-900 border border-navy-800 text-gray-400 hover:text-white hover:border-navy-700 flex items-center space-x-1.5 transition-all text-xs font-semibold"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{lang === 'hi' ? 'पीछे' : 'Previous'}</span>
        </button>

        <span className="text-xs text-gray-500 font-mono">
          Slide {currentSlide + 1} / {slides.length}
        </span>

        <button 
          onClick={next}
          className="px-4 py-2 rounded-lg bg-navy-900 border border-navy-800 text-gray-400 hover:text-white hover:border-navy-700 flex items-center space-x-1.5 transition-all text-xs font-semibold"
        >
          <span>{lang === 'hi' ? 'आगे' : 'Next'}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
