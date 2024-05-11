import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
const containerStyle = {
  width: 'auto',
  height: '200px',
};

const Map = ({ onSelectLocation, setSelectedLocation,setPosition,position,userLocation,setUserLocation ,loading,latitudee,longitudee}) => {
 


  const customIcon = L.icon({
    iconUrl: '/Freshmarkericonwobg.png',
    iconSize: [50, 50],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const LocationMarker = () => {

    const map = useMapEvents({
      click(e) {
        setPosition(e.latlng);
        onSelectLocation(e.latlng); // Llama a la función proporcionada por el componente principal
        setSelectedLocation(e.latlng)
      },
    });
    return position === null ? null : (
      <Marker position={position} icon={customIcon} draggable={true}>
        <Popup>Ubicación seleccionada</Popup>
      </Marker>
    );
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className='m-4 '>
      {userLocation && (
        <MapContainer center={userLocation} zoom={15} style={containerStyle}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/*  <Marker position={userLocation} icon={customIcon}  >
            <Popup>Tu ubicación</Popup>
          </Marker> */}
          <LocationMarker />
        </MapContainer>
      )}
      <p className='text-sm '>Por favor, ajuste la ubicación si es necesario.</p>
    </div>
  );
};

export default Map;
