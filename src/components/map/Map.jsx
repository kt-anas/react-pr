import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 37.7749,
  lng: -122.4194,
};

const locations = [
  { lat: 37.7749, lng: -122.4194 },
  { lat: 34.0522, lng: -118.2437 },
  { lat: 40.7128, lng: -74.006 },
];

const GoogleMapComponent = () => {
  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={5}>
        {locations.map((location, index) => (
          <Marker key={index} position={location} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
