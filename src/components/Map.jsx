import { useNavigate, useSearchParams } from 'react-router-dom';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import styles from './Map.module.css';
import { useEffect, useState } from 'react';
import { useCities } from '../contexts/CitiesContext';
import Button from './Button';
import { useGeolocation } from '../hooks/useGeolocation';

function Map() {

    // Include Leaflet css in index.css file

    const [searchParams, setSearchParams] = useSearchParams();
    const [mapPosition, setMapPosition] = useState([40, 0]);
    const { cities } = useCities();
    const { isLoading: isLoadingPosition, position: geolocationPosition, getPosition } = useGeolocation();

    const mapLat = searchParams.get('lat');
    const mapLng = searchParams.get('lng');

    useEffect(function () {
        if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    }, [mapLat, mapLng]);

    useEffect(function () {
        if (geolocationPosition) setMapPosition([
            geolocationPosition.lat, geolocationPosition.lng
        ]);
    }, [geolocationPosition]);

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
            {!geolocationPosition && <Button type='position' onClick={getPosition}>
                {isLoadingPosition ? 'Loading...' : 'Use your position'}
            </Button>}
            <MapContainer center={mapPosition} zoom={6} scrollWheelZoom={true} className={styles.map}>
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

                <ChangeCenter position={mapPosition} />
                <DetectClick />

            </MapContainer>


        </div>
    );
}

function ChangeCenter({ position }) {

    const map = useMap();

    map.setView(position);
    return null;

}

function DetectClick() {

    const navigate = useNavigate();

    useMapEvents({
        click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    });

    return null;
}

export default Map;
