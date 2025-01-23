import React from 'react';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import { decode } from '@googlemaps/polyline-codec';
import { RunRecord } from '../lib/types';
import 'leaflet/dist/leaflet.css';

interface RunningMapProps {
  runs: RunRecord[];
}

export const RunningMap: React.FC<RunningMapProps> = ({ runs }) => {
  // 解码所有轨迹
  const tracks = runs.map(run => {
    const coordinates = run.summary_polyline ? decode(run.summary_polyline) : [];
    return coordinates.map(([lat, lng]) => ({ lat, lng }));
  });

  // 找到所有轨迹点的边界
  const bounds = tracks.reduce((acc, track) => {
    track.forEach(point => {
      acc.minLat = Math.min(acc.minLat, point.lat);
      acc.maxLat = Math.max(acc.maxLat, point.lat);
      acc.minLng = Math.min(acc.minLng, point.lng);
      acc.maxLng = Math.max(acc.maxLng, point.lng);
    });
    return acc;
  }, { minLat: 90, maxLat: -90, minLng: 180, maxLng: -180 });

  // 计算中心点
  const center = {
    lat: (bounds.minLat + bounds.maxLat) / 2,
    lng: (bounds.minLng + bounds.maxLng) / 2
  };

  return (
      <div className="h-[500px] rounded-lg overflow-hidden">
        <MapContainer
          center={[center.lat, center.lng] as LatLngExpression}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          className="z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            className="map-tiles"
          />
          {tracks.map((track, index) => (
            <Polyline
              key={index}
              positions={track.map(point => [point.lat, point.lng])}
              color="#4ade80"
              weight={3}
              opacity={0.8}
            />
          ))}
        </MapContainer>
      </div>
  );
};