import 'leaflet/dist/leaflet.css';
import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

import Box from '@mui/material/Box';

export default function OSMMap() {
  const position: [number, number] = [33.4484, -112.0740];

  return (
    <Box sx={{ width: '100%', height: '100%', minHeight: 150 }}>
      <MapContainer 
        center={position} 
        zoom={10} 
        scrollWheelZoom={true}
        style={{ height: '100%', minHeight: 150, width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </Box>
  );
}