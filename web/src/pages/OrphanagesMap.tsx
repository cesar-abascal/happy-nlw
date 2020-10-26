import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi'
import { Map, Marker, TileLayer, Popup } from 'react-leaflet';
import mapMarkerImg from '../images/map-marker.svg';
import mapIcon from '../utils/mapIcon';
import '../styles/pages/orphanages-map.css';
import api from '../services/api';

// Orphanage interface to show what information will be displayed on this page/screen
// Only the information used on this page is filled here
interface Orphanage {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}


function OrphanagesMap() {
    // Hooks -> Functions that can be called within the component. They are functions to execute some type of code

    // Hook use effect -> Param1: What action will be taken. Param2: When the function will be executed
    // Executes the action, when one of the variables inside the vector has its value changed
    // If the vector is empty, the action will run only once

    // The three most famous concepts of react are: Components, Properties and States
    // State: Any type of information that is stored within the component. Any type of information that will be handled by the component
    // Whenever there is a variable that needs to be changed by the component itself, it will be saved in the state
    
    // A list of orphanages that will start as an empty array -> []
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]); // The useState returns an array, where the first item is the list and the second is a function for updating the list

    useEffect(() => {
        api.get('orphanages').then(response => {
            // Render cycle -> Render the component again by calling 'setOrphanages'
            setOrphanages(response.data); // The 'orphanages' variable will contain the data returned by the api
        })
    }, []);

    return (
        <div id="page-map">

            <aside>
                <header>
                    <img src={ mapMarkerImg } alt="Happy" />

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                    <strong>Caçapava do Sul</strong>
                    <span>Rio Grande do Sul</span>
                </footer>

            </aside>

            <Map 
                center={[-30.5181995, -53.4858676]}
                zoom={15}
                style={{ width: '100%', height: '100%'}}
            >
                <TileLayer
                    url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />

                {orphanages.map(orphanage => {
                    // The 'map' function cycles through and returns each item in the array
                    // Thus, for each orphanage the 'marker' will be returned.
                    return(
                    <Marker key={orphanage.id} icon={mapIcon} position={[orphanage.latitude, orphanage.longitude]}>
                        <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                            {orphanage.name}
                            <Link to={`/orphanages/${orphanage.id}`}>
                                <FiArrowRight size={20} color="#FFF" />
                            </Link>
                        </Popup>
                    </Marker>
                    )
                })}
            </Map>

            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#fff" />
            </Link>
        </div>
    )
}

export default OrphanagesMap;
