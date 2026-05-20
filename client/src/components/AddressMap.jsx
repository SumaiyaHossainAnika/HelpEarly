import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const DEFAULT_MAP_ADDRESS = 'Dhaka, Bangladesh';
const DEFAULT_COORDS = [23.8103, 90.4125];
const geocodeCache = new Map();

async function geocodeAddress(address, signal) {
  const query = address?.trim() || DEFAULT_MAP_ADDRESS;
  if (geocodeCache.has(query)) return geocodeCache.get(query);

  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(query)}`,
    { signal }
  );
  const data = await res.json();
  const firstResult = data?.[0];
  const coords = firstResult
    ? [Number(firstResult.lat), Number(firstResult.lon)]
    : DEFAULT_COORDS;

  geocodeCache.set(query, coords);
  return coords;
}

export function addressPlaceholder() {
  return 'House 12, Road 8, Block C, Banani, Dhaka';
}

export default function AddressMap({ address, label = 'Address preview' }) {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const markerRef = useRef(null);
  const [mapStatus, setMapStatus] = useState('Loading interactive map...');

  useEffect(() => {
    if (!address?.trim()) return undefined;

    const controller = new AbortController();
    setMapStatus('Loading interactive map...');

    geocodeAddress(address, controller.signal)
      .then((coords) => {
        if (!mapContainerRef.current) return;

        if (!mapRef.current) {
          mapRef.current = L.map(mapContainerRef.current, {
            center: coords,
            zoom: 15,
            dragging: true,
            scrollWheelZoom: true,
            doubleClickZoom: true,
            touchZoom: true,
            keyboard: true,
          });

          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; OpenStreetMap contributors',
          }).addTo(mapRef.current);
        } else {
          mapRef.current.setView(coords, mapRef.current.getZoom() || 15);
        }

        if (markerRef.current) {
          markerRef.current.setLatLng(coords);
        } else {
          markerRef.current = L.circleMarker(coords, {
            radius: 8,
            color: '#2563eb',
            fillColor: '#3b82f6',
            fillOpacity: 0.9,
            weight: 3,
          }).addTo(mapRef.current);
        }

        markerRef.current.bindPopup(address).openPopup();
        mapRef.current.invalidateSize();
        setMapStatus('');
      })
      .catch((error) => {
        if (error.name === 'AbortError') return;
        setMapStatus('Map preview unavailable. Use Open map for the full view.');
      });

    return () => controller.abort();
  }, [address]);

  useEffect(() => {
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markerRef.current = null;
      }
    };
  }, []);

  if (!address?.trim()) return null;

  return (
    <div className="address-preview">
      <div className="address-preview-header">
        <span><i className="fas fa-location-dot"></i> {label}</span>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
          target="_blank"
          rel="noreferrer"
        >
          Open map
        </a>
      </div>
      <p>{address}</p>
      <div
        ref={mapContainerRef}
        className="address-map-canvas"
        role="application"
        aria-label={`Interactive map for ${address}`}
      />
      {mapStatus && <small className="address-map-status">{mapStatus}</small>}
    </div>
  );
}
