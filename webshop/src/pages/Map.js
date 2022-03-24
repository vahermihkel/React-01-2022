import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import SendEmail from '../components/SendEmail';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25,41], 
  iconAnchor: [12,41]
});

L.Marker.prototype.options.icon = DefaultIcon;

function Map() {
  return (
  <>
    <SendEmail />
    <MapContainer id="map" center={[59.42, 24.73]} zoom={10}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[59.42255308832916, 24.793866995352428]}>
        <Popup>
          Ülemiste keskus <br /> Avatud 9-17
        </Popup>
      </Marker>
      <Marker position={[59.42761753518854, 24.723142512627945]}>
        <Popup>
          Kristiine keskus <br /> Avatud 9-19
        </Popup>
      </Marker>
    </MapContainer>
  </>)
}

export default Map;