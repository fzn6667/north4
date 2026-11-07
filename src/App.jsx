import React, { useState } from 'react';
import { MapContainer, TileLayer, Polyline, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Clock, UserCheck, PhoneCall, Bot, ShieldAlert } from 'lucide-react';
import SOSModal from './components/SOSModal';
import Chatbot from './components/Chatbot';

// GB Route Segments
const roadSegments = [
  {
    id: 1,
    name: "Gilgit to Khunjerab Pass (KKH Segment 1 - Clear)",
    status: "Green",
    statusText: "Open & Clear",
    cause: "Normal traffic flow up to Aliabad",
    volunteerName: "Zainab Bibi (Checkpost Warden)",
    source: "Verified Checkpost",
    updated: "15 mins ago",
    alternate: "None required",
    coords: [
      [35.9208, 74.3087],
      [35.9600, 74.3400],
      [36.0800, 74.4200],
      [36.3167, 74.6500]
    ]
  },
  {
    id: 2,
    name: "Hunza to Khunjerab Pass (KKH Segment 2 - Blocked)",
    status: "Red",
    statusText: "Blocked / Landslide & Snow",
    cause: "Heavy rockfall and snow accumulation near Passu & Sost",
    volunteerName: "Ahmed Ali (Local Rescue Volunteer)",
    source: "On-ground Field Report",
    updated: "5 mins ago",
    alternate: "Wait at Sust checkpost clearance",
    coords: [
      [36.3167, 74.6500],
      [36.3900, 74.7900],
      [36.4500, 74.8833],
      [36.7000, 75.2500],
      [36.8500, 75.4333]
    ]
  },
  {
    id: 3,
    name: "Jaglot to Skardu Road",
    status: "Yellow",
    statusText: "Caution / Rockfall Risk",
    cause: "Minor debris and wind-blown stones",
    volunteerName: "Raja Kamran (District Scout)",
    source: "Volunteer Patrol",
    updated: "40 mins ago",
    alternate: "Drive with high alertness",
    coords: [
      [35.4500, 74.8000],
      [35.5200, 75.0100],
      [35.5800, 75.1000],
      [35.6300, 75.4000],
      [35.6631, 75.5687]
    ]
  }
];

export default function App() {
  const [selectedRoute, setSelectedRoute] = useState(roadSegments[1]);
  const [isSOSOpen, setIsSOSOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Green': return '#22c55e';
      case 'Yellow': return '#eab308';
      case 'Red': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Green': return <span className="px-2.5 py-1 bg-green-950 text-green-400 border border-green-800 text-xs font-bold rounded-full">Open (Green)</span>;
      case 'Yellow': return <span className="px-2.5 py-1 bg-yellow-950 text-yellow-400 border border-yellow-800 text-xs font-bold rounded-full">Caution (Yellow)</span>;
      case 'Red': return <span className="px-2.5 py-1 bg-red-950 text-red-400 border border-red-800 text-xs font-bold rounded-full">Blocked (Red)</span>;
      default: return <span className="px-2.5 py-1 bg-gray-800 text-gray-300 text-xs font-bold rounded-full">Unknown (Grey)</span>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-950 text-gray-100 font-sans relative">
      
      {/* Sidebar Panel */}
      <div className="w-2/5 bg-gray-900 border-r border-gray-800 flex flex-col z-10 shadow-2xl">
        <div className="p-5 border-b border-gray-800 bg-gray-950 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-extrabold text-teal-400 flex items-center gap-2">
              🏔️ The North Tourism
            </h1>
            <p className="text-xs text-gray-400 mt-1">Disaster-Resilient Route & Volunteer Intelligence</p>
          </div>
          <button 
            onClick={() => setIsChatOpen(true)}
            className="bg-teal-950 hover:bg-teal-900 border border-teal-700 text-teal-400 p-2.5 rounded-xl flex items-center gap-1.5 text-xs font-bold shadow"
          >
            <Bot size={16} /> AI Chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">GB Route Segments (Live Map)</h2>
          
          {roadSegments.map((route) => (
            <div 
              key={route.id} 
              onClick={() => setSelectedRoute(route)}
              className={`p-4 rounded-xl cursor-pointer transition border ${selectedRoute.id === route.id ? 'bg-gray-800 border-teal-500 shadow-lg' : 'bg-gray-900/60 border-gray-800 hover:bg-gray-800/40'}`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-sm text-gray-100">{route.name}</h3>
                {getStatusBadge(route.status)}
              </div>
              
              <div className="text-xs text-gray-400 mt-2 space-y-1">
                <p className="flex items-center gap-1">
                  <UserCheck size={13} className="text-teal-400" /> 
                  <span><strong>Volunteer:</strong> {route.volunteerName}</span>
                </p>
                <p className="flex items-center gap-1">
                  <Clock size={13} className="text-gray-500" /> 
                  <span>Updated: {route.updated} ({route.source})</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* SOS Footer Button */}
        <div className="p-4 bg-red-950/30 border-t border-red-900/40 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-red-400">Stranded on Route?</p>
            <p className="text-[10px] text-gray-400">Send SOS to nearby volunteers & Rescue 1122</p>
          </div>
          <button 
            onClick={() => setIsSOSOpen(true)}
            className="bg-red-600 hover:bg-red-700 text-white text-xs px-3.5 py-2 rounded-lg font-bold flex items-center gap-1.5 shadow"
          >
            <ShieldAlert size={14} /> Emergency SOS
          </button>
        </div>
      </div>

      {/* Main Map & Detailed Inspector Panel */}
      <div className="flex-1 flex flex-col relative">
        
        {/* Floating Route Intelligence Box */}
        <div className="absolute top-4 right-4 z-20 bg-gray-900/95 backdrop-blur-md border border-gray-700 p-5 rounded-2xl shadow-2xl w-96">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Segment Intelligence</span>
            {getStatusBadge(selectedRoute.status)}
          </div>
          
          <h3 className="font-bold text-base mb-2 text-white">{selectedRoute.name}</h3>
          
          <div className="space-y-2 text-xs text-gray-300 border-t border-gray-800 pt-3">
            <p><strong>Hazard / Cause:</strong> {selectedRoute.cause}</p>
            
            <div className="bg-gray-950 p-3 rounded-xl border border-teal-900/50 space-y-1">
              <p className="text-teal-300 font-semibold flex items-center gap-1">
                <UserCheck size={14} /> Reported by: {selectedRoute.volunteerName}
              </p>
              <p className="text-gray-400"><strong>Source Type:</strong> {selectedRoute.source}</p>
              <p className="text-gray-400"><strong>Timestamp:</strong> {selectedRoute.updated}</p>
            </div>

            <div className="bg-gray-800/80 p-2.5 rounded-lg border border-gray-700 mt-2">
              <strong className="text-yellow-400 block mb-0.5">Recommended Alternate:</strong> 
              {selectedRoute.alternate}
            </div>
          </div>
        </div>

        {/* Leaflet Map */}
        <div className="flex-1 w-full h-full z-0">
          <MapContainer 
            center={[36.1500, 74.8000]} 
            zoom={8} 
            scrollWheelZoom={true}
            style={{ width: '100%', height: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {roadSegments.map((route) => {
              const isSelected = selectedRoute.id === route.id;
              const color = getStatusColor(route.status);
              
              return (
                <Polyline 
                  key={route.id}
                  positions={route.coords}
                  pathOptions={{
                    color: color,
                    weight: isSelected ? 8 : 6,
                    opacity: isSelected ? 1.0 : 0.85,
                  }}
                  eventHandlers={{
                    click: () => setSelectedRoute(route),
                  }}
                >
                  <Popup>
                    <div className="text-gray-900 text-xs">
                      <strong className="text-sm">{route.name}</strong><br />
                      Status: <strong>{route.statusText}</strong><br />
                      Volunteer: {route.volunteerName}<br />
                      Updated: {route.updated}
                    </div>
                  </Popup>
                </Polyline>
              );
            })}
          </MapContainer>
        </div>

      </div>

      {/* Modals */}
      <SOSModal isOpen={isSOSOpen} onClose={() => setIsSOSOpen(false)} />
      <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

    </div>
  );
}