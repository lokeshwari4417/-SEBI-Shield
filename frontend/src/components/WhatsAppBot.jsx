import React, { useState, useEffect, useRef } from 'react';
import { Send, User, ChevronRight, CheckCheck, Smile, Paperclip } from 'lucide-react';

export default function WhatsAppBot({ lang }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: {
        en: "Namaste! Welcome to SEBI Shield Verification Bot. 🙏\n\nForward any suspicious investment tip, stock advisory link, WhatsApp group invitation, or advisor details here. I will instantly cross-check them against the SEBI official database and scan for deepfakes or phishing links.",
        hi: "नमस्ते! सेबी शील्ड सत्यापन बॉट में आपका स्वागत है। 🙏\n\nकिसी भी संदिग्ध निवेश टिप, स्टॉक सलाहकार लिंक, व्हाट्सएप समूह आमंत्रण, या सलाहकार विवरण को यहाँ फॉरवर्ड करें। मैं तुरंत सेबी के आधिकारिक डेटाबेस और फ़िशिंग लिंक की जांच करूँगा।"
      },
      time: '17:50',
      status: 'read'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const templates = [
    {
      label: "Scam Text Message",
      text: "URGENT! SEBI official recommends guaranteed 30% daily returns! Risk-free investment. Send fund to upi: getrich@ybl. Join: t.me/insiderprofit"
    },
    {
      label: "Fake SEBI Link",
      text: "http://sebi-verification-returns.in"
    },
    {
      label: "Legit Broker Link",
      text: "https://groww.in"
    }
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (textToSend) => {
    if (!textToSend.trim()) return;

    // 1. Add user message
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: textToSend,
      time: timeStr,
      status: 'sent'
    };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Update status to delivered
    setTimeout(() => {
      setMessages(prev => prev.map(m => m.id === userMsg.id ? { ...m, status: 'delivered' } : m));
    }, 600);

    // 2. Fetch verdict from backend api
    try {
      const response = await fetch('http://127.0.0.1:8000/api/scan-phishing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: textToSend })
      });
      const data = await response.json();
      
      // Update user message status to read
      setMessages(prev => prev.map(m => m.id === userMsg.id ? { ...m, status: 'read' } : m));

      // Construct bot reply
      let botResponse = "";
      if (data.verdict === "High Risk") {
        botResponse = `🔴 *HIGH RISK DETECTED* 🔴\n\n*Overall Verdict:* High Risk (${data.risk_score}% threat score)\n\n⚠️ *Alert:* This message contains serious indicators of financial fraud:\n${data.reasons.map(r => `• ${r}`).join('\n')}\n\n*Action Recommended:* Do NOT transfer money. Block this sender and report to SEBI SCORES portal.`;
      } else if (data.verdict === "Caution") {
        botResponse = `🟡 *CAUTION ADVISED* 🟡\n\n*Overall Verdict:* Suspicious (${data.risk_score}% threat score)\n\n⚠️ *Warnings:*:\n${data.reasons.map(r => `• ${r}`).join('\n')}\n\n*Action Recommended:* Do not click any links. Double check details in the registry tab.`;
      } else {
        botResponse = `🟢 *VERIFIED SAFE* 🟢\n\n*Overall Verdict:* Safe (${data.risk_score}% threat score)\n\n✅ *Details:* ${data.reasons[0]}\n\nThis source matches registered SEBI entities. Safe to proceed.`;
      }

      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          sender: 'bot',
          text: botResponse,
          time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'read'
        }]);
      }, 1500);

    } catch (err) {
      console.error(err);
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          sender: 'bot',
          text: "Sorry, I am unable to connect to the SEBI Shield Core API. Please ensure the backend server is running locally.",
          time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'read'
        }]);
      }, 1500);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-h-[620px]">
      
      {/* Templates Column */}
      <div className="lg:col-span-1 p-4 rounded-xl bg-navy-900 border border-navy-800 space-y-4">
        <h4 className="text-xs font-bold text-accent-gold uppercase tracking-wider">Quick Simulation Templates</h4>
        <p className="text-[11px] text-gray-400">Click any scenario block to "forward" a message to the bot and test the automated scanning response:</p>
        <div className="space-y-3">
          {templates.map((t, idx) => (
            <button 
              key={idx}
              onClick={() => handleSend(t.text)}
              className="w-full p-3 rounded-lg bg-navy-950 border border-navy-800 hover:border-accent-blue hover:bg-navy-900 text-left transition-all space-y-1 group"
            >
              <div className="text-[10px] text-accent-blue font-bold flex items-center justify-between">
                <span>{t.label}</span>
                <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-[10px] text-gray-400 line-clamp-2 italic">"{t.text}"</p>
            </button>
          ))}
        </div>
        <div className="bg-navy-950 p-3 rounded-lg border border-navy-800 space-y-1">
          <div className="text-[9px] text-gray-500 uppercase font-bold">Integration Tip</div>
          <p className="text-[9px] text-gray-500 leading-normal">In production, this runs on the WhatsApp Business API sandbox. Investors can save the number (+91 22 2644 9000) and query directly.</p>
        </div>
      </div>

      {/* WhatsApp Window */}
      <div className="lg:col-span-3 rounded-xl border border-navy-800 overflow-hidden flex flex-col h-[550px] relative bg-[#0b141a]">
        
        {/* Background Wallpaper Pattern (simulated) */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-repeat bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')]"></div>

        {/* WhatsApp Header */}
        <div className="px-4 py-3 bg-[#202c33] flex items-center justify-between border-b border-[#2f3b43] relative z-10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-accent-blue/15 border border-accent-blue/30 flex items-center justify-center font-bold text-accent-blue">
              SS
            </div>
            <div>
              <h4 className="text-sm font-bold text-white leading-tight">SEBI Shield Verification Bot</h4>
              <p className="text-[10px] text-accent-emerald flex items-center space-x-1 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-ping inline-block"></span>
                <span>Active Protection</span>
              </p>
            </div>
          </div>
          <span className="text-[10px] bg-[#111b21] px-2 py-1 rounded text-[#8696a0] font-semibold tracking-wider">
            OFFICIAL SECURE
          </span>
        </div>

        {/* Chat Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 relative z-10">
          {messages.map((m) => {
            const isUser = m.sender === 'user';
            return (
              <div 
                key={m.id} 
                className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[75%] rounded-xl px-3 py-2 text-xs shadow-md whitespace-pre-wrap leading-relaxed ${
                    isUser 
                      ? 'bg-[#005c4b] text-white rounded-tr-none' 
                      : 'bg-[#202c33] text-[#e9edef] rounded-tl-none border border-[#2f3b43]'
                  }`}
                >
                  {typeof m.text === 'object' ? (m.text[lang] || m.text['en']) : m.text}
                  <div className="text-[8px] text-[#8696a0] mt-1.5 text-right flex items-center justify-end space-x-1">
                    <span>{m.time}</span>
                    {isUser && (
                      <span>
                        {m.status === 'sent' && <span className="text-gray-500">✓</span>}
                        {m.status === 'delivered' && <span className="text-gray-400">✓✓</span>}
                        {m.status === 'read' && <span className="text-accent-blue">✓✓</span>}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-[#202c33] text-gray-400 rounded-xl rounded-tl-none px-4 py-2.5 text-xs flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce delay-150"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce delay-300"></span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-[#202c33] border-t border-[#2f3b43] flex items-center space-x-3 relative z-10">
          <div className="flex space-x-2 text-gray-400">
            <Smile className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
            <Paperclip className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
          </div>
          
          <input 
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend(inputText)}
            placeholder={lang === 'hi' ? 'संदेश टाइप करें...' : 'Type a message...'}
            className="flex-1 bg-[#2a3942] border-none rounded-lg px-3 py-2 text-white placeholder-gray-500 text-xs focus:outline-none focus:ring-1 focus:ring-accent-blue"
          />

          <button 
            onClick={() => handleSend(inputText)}
            disabled={!inputText.trim()}
            className="p-2 rounded-full bg-[#00a884] hover:bg-[#008f72] text-white disabled:opacity-40 disabled:hover:bg-[#00a884] transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}
