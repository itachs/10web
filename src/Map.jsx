import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import './Map.css';

L.Icon.Default.imagePath = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/';

export const Map = ({ position, trajectoryData }) => {
  const zoom = 1;

  return (
    <MapContainer center={position} zoom={zoom} >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          ISS!!!<br/> Yayyyyyyyyy!!!!!!!
        </Popup>
      </Marker>
      {trajectoryData && (
        <Polyline
          positions={trajectoryData.map(point => [point.lat, point.lng])}
          color="blue"
        />
      )}
    </MapContainer>
  );
};
