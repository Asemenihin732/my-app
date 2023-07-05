import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cl from "./distance.module.css";
import ymaps from 'ymaps';
import { YMaps, Map, Placemark, Circle, SearchControl, ZoomControl, Polyline, useYMaps, createClass, templateLayoutFactory} from '@pbe/react-yandex-maps';
const API_KEY = '65060aa0-dc9e-44cf-930a-f2c8ebbc4a29';



const YAmap = () => {

    const [center, setCenter] = useState([55.751574, 37.573856]);
    const [placemarkCoords, setPlacemarkCoords] = useState([55.751574, 37.573856]);
    const [zoom, setZoom] = useState(18); // Уровень масштабирования карты
    const [distance, setDistance] = useState(100);
    var type = 'yandex#satellite';

    const handleMapClick = (event) => {
        const clickedCoords = event.get("coords"); 
        setPlacemarkCoords(clickedCoords);
        setCenter(clickedCoords);
        if (zoom > 12) {
            setDistance(100 * Math.pow(2, 18 - zoom));
        }
        else {
            setDistance(5000);
        }
        getNearestCity(placemarkCoords[0], placemarkCoords[1]);
    };

    const getNearestCity = async (latitude, longitude) => {
        try {
            const response = await axios.get(
                "https://geocode-maps.yandex.ru/1.x/?apikey=65060aa0-dc9e-44cf-930a-f2c8ebbc4a29&lang=ru_RU&geocode=${longitude},${latitude}&kind=locality&results=1&format=json"
            );

            const nearestCity = response.data.response.GeoObjectCollection.featureMember[0].GeoObject;

            const cityName = nearestCity.name;
            
            console.log('Nearest city: ', cityName);
            console.log(placemarkCoords);
        } catch (error) {
            console.error('Ошибка при получении ближайшего города:', error);
        }
    };

    const handleZoomChange = (e) => {
        const newZoom = e.get('newZoom');
        setZoom(newZoom);
        console.log(zoom);
        if (zoom > 13) {
            setDistance(100 * Math.pow(2, 18 - newZoom));
        }
        else {
            setDistance(5000);
        }
        console.log(distance);
    }

    const lays = ymaps.templateLayoutFactory.createClass('<input type="text" value={${distance}} style={z-index: 5000; background-color: #24B3F2; width: 45px; height: 19px; border: solid #24B3F2; border-radius: 15px;} />',
        {
            build:
                function () {

                }
        }
    );

    return (
        <div>  
            <text value={placemarkCoords} />
            <text value={100 * Math.pow(2, 18 - zoom)} />
            <YMaps >
                <div id='map'>
                    <Map
                        onClick={handleMapClick}
                        state={{ center, zoom, type }} 
                        width="100vw"
                        height="100vh"
                        onBoundsChange={handleZoomChange}
                        searchControlProvider = 'yandex#search'
                        modules={["templateLayoutFactory", "layout.Image"]}
                    >
                        
                    {placemarkCoords && (
                            <>
                               
                                <Circle
                                    geometry={[placemarkCoords, distance]}
                                options={{
                                    strokeColor: "#fff",
                                    strokeStyle: "dot",
                                    strokeWidth: 5,
                                    fillColor: "#fff",
                                    fillOpacity: 0,
                                    draggable: false,
                                    
                                }}
                                        />
                                    
                                    <input type="text" value={distance} className={cl.ttx} />
                              
                                <Placemark
                                    geometry={placemarkCoords}
                                    options={{
                                        iconLayout: 'default#image',
                                        iconImageHref: "https://psv4.userapi.com/c909328/u496498425/docs/d40/873729c74bf9/Bulavka_2.png?extra=OtIKZjLzneDVi6BJw0aNjz0ewFgIM3bmMvuBCsWMjqlUnQFz9AxBiJdePOV8GbJ1r2lRHAJ3u3tczEnBt_b5h2JsdtlKmP2-LCcHEfliEv9P9aKeCv1UoMbpreKZr0IIaep8WJ51fojm9a43gMbYCgj8",
                                        iconImageSize: [25.54 * 2.5, 55.59 * 2],
                                        
									}}
                                />
                                <Placemark
                                    geometry={placemarkCoords}
                                    options={{
                                        iconLayout: lays,
                                    }}
                                />
                        </>
                        )}

                </Map>
                </div>
            </YMaps>
        </div>
                   
    );
}

export default YAmap;