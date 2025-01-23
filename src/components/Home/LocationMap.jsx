import { MapContainer, TileLayer, Marker, Tooltip, Circle } from "react-leaflet";
import L from "leaflet"; // Leaflet for custom icons
import "leaflet/dist/leaflet.css";

// Custom red marker icon
const redIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41], // Size of the icon
  iconAnchor: [12, 41], // Anchor point of the icon
  popupAnchor: [1, -34], // Popup anchor
  shadowSize: [41, 41], // Size of the shadow
});

const LocationMap = () => {
  const position = [23.884130433910936, 90.38799667444884]; // Uttara Sector 10 coordinates

  return (
    <div style={{ height: "500px", width: "100%", borderRadius: "25px", overflow: "hidden" }}>
      <MapContainer
        center={position}
        zoom={13} // Zoom level
        style={{ height: "100%", width: "100%" }}
      >
        {/* Add TileLayer for the map tiles */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Marker with custom red icon */}
        <Marker position={position} icon={redIcon}>
          {/* Tooltip that is always visible */}
          <Tooltip permanent>
            <span>Uttara Sector 10, Dhaka</span>
          </Tooltip>
        </Marker>

        {/* Red dotted circle around the marker */}
        <Circle
          center={position}
          radius={500} // Radius in meters
          pathOptions={{
            color: "red", // Border color
            fillColor: "transparent", // No fill inside the circle
            dashArray: "5, 10", // Dotted border
          }}
        />
      </MapContainer>
    </div>
  );
};

export default LocationMap;
