'use client';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

// Fix icônes manquantes dans Leaflet avec Webpack / Next.js
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
});

export default function MapLeftlet() {
    return (
        <MapContainer
            center={[5.345317, -4.024429]} // Paris par défaut
            zoom={13}
            scrollWheelZoom={true}
            // style={{ height: '300px', width: '100%', borderRadius: '12px' }}
            className="h-full w-full rounded-[1.2rem]"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={[5.345317, -4.024429]}>
                <Popup>
                    📍 <b>Paris</b>
                    <br />
                    Exemple de popup avec Leaflet.
                </Popup>
            </Marker>
        </MapContainer>
    );
}
