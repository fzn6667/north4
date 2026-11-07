import { MapPin, Mountain, ShieldCheck } from 'lucide-react'

export default function Sidebar({ onSOS }) {
  return (
    <aside className="sidebar">
      <div className="side-card welcome-card">
        <p className="eyebrow">TRAVEL WITH AWARENESS</p>
        <h2>Explore the North, safely.</h2>
        <p>Plan your journey with regional guidance and safety information.</p>
      </div>

      <div className="side-card">
        <h3>Quick overview</h3>
        <div className="info-row"><MapPin size={18} /><span>Gilgit-Baltistan</span></div>
        <div className="info-row"><Mountain size={18} /><span>Mountain destinations</span></div>
        <div className="info-row"><ShieldCheck size={18} /><span>Safety guidance prototype</span></div>
      </div>

      <div className="side-card alert-card">
        <h3>Need emergency help?</h3>
        <p>Use the SOS demo to view the emergency confirmation interface.</p>
        <button className="primary-button" onClick={onSOS}>Open SOS panel</button>
      </div>

      <p className="sidebar-note">Demo content only. Verify local conditions before travelling.</p>
    </aside>
  )
}
