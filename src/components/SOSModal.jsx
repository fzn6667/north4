import React, { useState } from 'react';
import { AlertTriangle, ShieldAlert, PhoneCall, CheckCircle, Send } from 'lucide-react';

export default function SOSModal({ isOpen, onClose }) {
  const [sosSent, setSosSent] = useState(false);
  const [sosStatus, setSosStatus] = useState('Sent'); // Sent -> Assigned -> En route -> Resolved
  const [formData, setFormData] = useState({
    needType: 'Stranded / Blocked',
    groupSize: '2',
    details: 'Vehicle stuck due to sudden rockfall near segment.',
    phone: '+92 300 1234567'
  });

  const handleDispatchSOS = (e) => {
    e.preventDefault();
    setSosSent(true);
    // Simulate live socket/status updates for FYP demo
    setTimeout(() => setSosStatus('Assigned (Admin Notified)'), 2000);
    setTimeout(() => setSosStatus('En route (Rescue Team Dispatched)'), 4500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-gray-900 border border-red-800 rounded-2xl w-full max-w-md p-6 shadow-2xl text-gray-100">
        
        <div className="flex justify-between items-center border-b border-gray-800 pb-3 mb-4">
          <h2 className="text-lg font-bold text-red-500 flex items-center gap-2">
            <ShieldAlert className="animate-pulse" size={22} /> Emergency SOS Dispatch
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-sm font-bold">✕</button>
        </div>

        {!sosSent ? (
          <form onSubmit={handleDispatchSOS} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Emergency Type</label>
              <select 
                value={formData.needType}
                onChange={(e) => setFormData({...formData, needType: e.target.value})}
                className="w-full bg-gray-950 border border-gray-700 rounded-lg p-2.5 text-xs text-gray-200"
              >
                <option value="Stranded / Blocked">Stranded / Road Blocked</option>
                <option value="Medical Emergency">Medical Emergency / Injury</option>
                <option value="Vehicle Breakdown">Vehicle Breakdown / Shelter Needed</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Group Size</label>
                <input 
                  type="number" 
                  value={formData.groupSize}
                  onChange={(e) => setFormData({...formData, groupSize: e.target.value})}
                  className="w-full bg-gray-950 border border-gray-700 rounded-lg p-2.5 text-xs text-gray-200"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Contact Number</label>
                <input 
                  type="text" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-gray-950 border border-gray-700 rounded-lg p-2.5 text-xs text-gray-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Situation Details / Location Note</label>
              <textarea 
                rows="3"
                value={formData.details}
                onChange={(e) => setFormData({...formData, details: e.target.value})}
                className="w-full bg-gray-950 border border-gray-700 rounded-lg p-2.5 text-xs text-gray-200"
              ></textarea>
            </div>

            <div className="bg-red-950/40 border border-red-900/50 p-3 rounded-lg flex items-center justify-between">
              <span className="text-xs text-red-300">Direct Rescue Fallback:</span>
              <a href="tel:1122" className="bg-red-700 hover:bg-red-600 text-white text-xs px-3 py-1.5 rounded font-bold flex items-center gap-1">
                <PhoneCall size={13} /> Call 1122
              </a>
            </div>

            <button 
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg transition"
            >
              <Send size={16} /> Broadcast SOS Distress Signal
            </button>
          </form>
        ) : (
          <div className="space-y-5 text-center py-4">
            <div className="inline-flex p-3 bg-red-950/60 rounded-full border border-red-600 text-red-500 animate-bounce">
              <AlertTriangle size={32} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">SOS Signal Broadcasted!</h3>
              <p className="text-xs text-gray-400 mt-1">Your location and requirements have been routed to GB Admin & nearby volunteers.</p>
            </div>

            {/* Live Case Status Tracker */}
            <div className="bg-gray-950 p-4 rounded-xl border border-gray-800 text-left space-y-2">
              <p className="text-xs font-bold text-teal-400 uppercase tracking-wider">Live Case Tracker</p>
              <div className="flex items-center gap-2 text-xs text-gray-300">
                <CheckCircle size={14} className="text-green-500" />
                <span>Current Status: <strong className="text-yellow-400">{sosStatus}</strong></span>
              </div>
            </div>

            <button 
              onClick={() => { setSosSent(false); onClose(); }}
              className="w-full bg-gray-800 hover:bg-gray-700 text-gray-200 font-bold py-2.5 rounded-xl text-xs"
            >
              Close Tracker
            </button>
          </div>
        )}

      </div>
    </div>
  );
}