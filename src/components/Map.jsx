import { useNavigate, useSearchParams } from 'react-router-dom';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import styles from './Map.module.css';
import { useState } from 'react';
import { useCities } from '../contexts/CitiesContext';

function Map() {

    // Include Leaflet css in index.css file

    const [searchParams, setSearchParams] = useSearchParams();
    const [mapPosition, setMapPosition] = useState([40, 0]);
    const { cities } = useCities();

    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');

    const navigate = useNavigate();

    // return (
    //     <div className={styles.mapContainer} onClick={() => navigate("form")}>
    //         Position: {lat}, {lng}
    //         <div>
    //             <button onClick={() => {
    //                 setSearchParams({ lat: 50, lng: 23 });
    //             }}>Change</button>
    //         </div>
    //     </div>
    // );
    return (
        <div className={styles.mapContainer}>
            <MapContainer center={mapPosition} zoom={13} scrollWheelZoom={true} className={styles.map}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {cities.map((city) => (
                    <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
                        <Popup>
                            <span>{city.emoji}</span> <span>{city.cityName}</span>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}

export default Map;
