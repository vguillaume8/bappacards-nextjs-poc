'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Typography } from '@mui/material';

// Fix leaflet default marker icons broken by webpack/Next.js module bundling
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const createColoredIcon = (color: string) =>
  new L.DivIcon({
    className: 'custom-map-marker',
    html: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="24" height="36" style="filter: drop-shadow(0 2px 2px rgba(0,0,0,0.5));">
        <path fill="${color}" d="M12 0C5.4 0 0 5.4 0 12c0 7.2 12 24 12 24s12-16.8 12-24c0-6.6-5.4-12-12-12zm0 18c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z"/>
        <circle fill="white" cx="12" cy="12" r="4"/>
      </svg>
    `,
    iconSize: [24, 36],
    iconAnchor: [12, 36],
    popupAnchor: [0, -34],
  });

const CHART_COLORS = [
  '#1976d2',
  '#9c27b0',
  '#2e7d32',
  '#ed6c02',
  '#0288d1',
  '#d32f2f',
  '#7b1fa2',
  '#795548',
  '#607d8b',
  '#00796b',
];

export interface LocationMapProps {
  cities: Array<{ name: string; count: number; lat: number; lng: number }>;
}

export default function LocationMap({ cities }: LocationMapProps) {
  // Compute a reasonable center: average lat/lng of all cities
  const center: [number, number] =
    cities.length > 0
      ? [
          cities.reduce((s, c) => s + c.lat, 0) / cities.length,
          cities.reduce((s, c) => s + c.lng, 0) / cities.length,
        ]
      : [20, 0];

  return (
    <MapContainer
      center={center}
      zoom={cities.length === 1 ? 8 : 3}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {cities.map((city, index) => (
        <Marker
          key={city.name}
          position={[city.lat, city.lng]}
          icon={createColoredIcon(CHART_COLORS[index % CHART_COLORS.length])}
        >
          <Popup>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {city.name}
            </Typography>
            <Typography variant="body2">{city.count} taps</Typography>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
