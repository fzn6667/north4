import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'

// Configure marker assets for Vite.
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

const sampleLocations = [
  { position: [35.9208, 74.3144], title: 'Gilgit', detail: 'Sample regional marker' },
  { position: [35.3418, 74.8560], title: 'Astore', detail: 'Sample destination marker' },
]

export default function HazardMap() {
  return (
    <div className="map-container">
      <MapContainer center={[35.65, 74.55]} zoom={8} scrollWheelZoom className="leaflet-map">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {sampleLocations.map((location) => (
          <Marker key={location.title} position={location.position}>
            <Popup>
              <strong>{location.title}</strong><br />
              {location.detail}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
