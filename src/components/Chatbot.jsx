import React, { useState } from 'react';
import { MessageSquare, Send, Bot, User, ShieldCheck } from 'lucide-react';

export default function Chatbot({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    { 
      sender: 'bot', 
      text: "Hello! I am North AI, your grounded travel assistant for Gilgit-Baltistan. Ask me about road statuses, weather, or routes." 
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    // Simulate RAG (Retrieval-Augmented Generation) grounded response matching proposal guidelines
    setTimeout(() => {
      let botResponse = "";
      const query = userMsg.toLowerCase();

      if (query.includes('khunjerab') || query.includes('kkh') || query.includes('passu')) {
        botResponse = "📌 **Status:** Blocked (Red)\n📍 **Where:** Hunza to Khunjerab Pass (KKH)\n🕒 **Updated:** 10 mins ago\n🔍 **Source:** Ahmed Ali (Local Rescue Volunteer)\n➡️ **Next step:** Wait at Sust checkpost for clearance.";
      } else if (query.includes('gilgit') || query.includes('hunza')) {
        botResponse = "📌 **Status:** Open & Clear (Green)\n📍 **Where:** Gilgit to Hunza KKH\n🕒 **Updated:** 25 mins ago\n🔍 **Source:** Verified Checkpost Warden\n➡️ **Next step:** Normal travel flow, safe to proceed.";
      } else if (query.includes('skardu') || query.includes('jaglot')) {
        botResponse = "📌 **Status:** Caution / Rockfall Risk (Yellow)\n📍 **Where:** Jaglot to Skardu Road\n🕒 **Updated:** 40 mins ago\n🔍 **Source:** Raja Kamran (District Scout)\n➡️ **Next step:** Drive with high alertness, watch for minor debris.";
      } else {
        botResponse = "⚠️ **No recent verified update found.** For safety reasons, please check with local checkposts or trigger an emergency SOS if stranded.";
      }

      setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
      setLoading(false);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 w-96 bg-gray-900 border border-teal-600/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-gray-100 font-sans">
      
      {/* Header */}
      <div className="bg-gray-950 p-4 border-b border-gray-800 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-teal-950 text-teal-400 rounded-lg border border-teal-800">
            <Bot size={18} />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">North AI Assistant</h3>
            <p className="text-[10px] text-teal-400 flex items-center gap-1">
              <ShieldCheck size={10} /> Grounded RAG Verified Data
            </p>
          </div>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-white font-bold text-sm">✕</button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-4 h-80 overflow-y-auto space-y-3 bg-gray-900/50 text-xs">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.sender === 'bot' && (
              <div className="w-6 h-6 rounded-full bg-teal-950 border border-teal-800 flex items-center justify-center text-teal-400 shrink-0">
                <Bot size={12} />
              </div>
            )}
            <div className={`p-3 rounded-xl max-w-[80%] whitespace-pre-line leading-relaxed ${
              msg.sender === 'user' 
                ? 'bg-teal-600 text-white rounded-br-none' 
                : 'bg-gray-950 border border-gray-800 text-gray-200 rounded-bl-none shadow-inner'
            }`}>
              {msg.text}
            </div>
            {msg.sender === 'user' && (
              <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 shrink-0">
                <User size={12} />
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex gap-2 items-center text-gray-400 italic">
            <Bot size={14} className="animate-spin text-teal-400" /> Searching verified North database...
          </div>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSendMessage} className="p-3 bg-gray-950 border-t border-gray-800 flex gap-2">
        <input 
          type="text" 
          placeholder="Ask about road conditions (e.g., Khunjerab)..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-xs text-gray-200 focus:outline-none focus:border-teal-500"
        />
        <button 
          type="submit"
          className="bg-teal-600 hover:bg-teal-700 text-white p-2.5 rounded-xl transition flex items-center justify-center shadow"
        >
          <Send size={14} />
        </button>
      </form>

    </div>
  );
}