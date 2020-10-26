import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';

import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import { FiPlus } from 'react-icons/fi';
import Sidebar from '../components/Sidebar';
import mapIcon from '../utils/mapIcon';
import '../styles/pages/create-orphanage.css';
import api from '../services/api';



export default function OrphanagesMap() {
    // Has the 'push' method of react-router-dom
    const history = useHistory();

    // To save the latitude and longitude entered by the user
    const [position, setPosition] = useState({ latitude: 0, longitude: 0 })
    // To save the name of the orphanage
    const [name, setName] = useState('');
    // To save the description of the orphanage
    const [about, setAbout] = useState('');
    // To save the instructions from the orphanage
    const [instructions, setInstructions] = useState('');
    // To save the opening hours of the orphanage
    const [opening_hours, setOpeningHours] = useState('');
    // To save the opening flag on weekends at the orphanage
    const [open_on_weekends, setOpenOnWeekends] = useState(true);
    // To save the orphanage image files
    const [images, setImages] = useState<File[]>([]);
    // To save the preview of the selected images
    const [previewImages, setPreviewImages] = useState<string[]>([]);


    // Function to capture the user's click on the map
    function handleMapClick(event: LeafletMouseEvent) {
        // latlng variable disruption
        const { lat, lng } = event.latlng

        setPosition({
            latitude: lat,
            longitude: lng
        });
    }

    // Function to retrieve the image files informed by the user
    function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
        if(!event.target.files) {
            return;
        }

        const selectedImages = Array.from(event.target.files);
        setImages(selectedImages);

        const selectedImagesPreview = selectedImages.map(image => {
            return URL.createObjectURL(image)
        });
        setPreviewImages(selectedImagesPreview)
    }

    // Function to submit data to the backend
    async function handleSubmit(event: FormEvent) {
        event.preventDefault(); // Disables the form reload when the user presses the submit button, or press enter

        // Position variable disruption
        const { latitude, longitude } = position;

        // Form data
        // JSON structures don't support image files, so it's necessary to use this approach
        const data = new FormData();
        // Write the form data
        data.append('name', name);
        data.append('about', about);
        data.append('latitude', String(latitude));
        data.append('longitude', String(longitude));
        data.append('instructions', instructions);
        data.append('opening_hours', opening_hours);
        data.append('open_on_weekends', String(open_on_weekends));
        images.forEach(image => {
            data.append('images', image);
        })

        // Make the call to the api, submit the data and wait for the answer
        await api.post('orphanages', data)

        // After receiving the response, it displays an alert message
        alert('Cadastro realizado com sucesso!')

        // Directs the user to the map screen
        history.push('/app')
    }

    // Returns the HTML of the page
    return (
        <div id="page-create-orphanage">
            <Sidebar />

            <main>
                <form onSubmit={handleSubmit} className="create-orphanage-form">
                    <fieldset>
                        <legend>Dados</legend>

                        <Map
                            center={[-30.5181995, -53.4858676]}
                            style={{ width: '100%', height: 280 }}
                            zoom={15}
                            onClick={handleMapClick}
                        >
                            <TileLayer
                                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                            />

                            {   // React's if structure
                                position.latitude != 0 && (
                                    <Marker
                                        interactive={false}
                                        icon={mapIcon}
                                        position={[
                                            position.latitude,
                                            position.longitude
                                        ]}
                                    />
                                )
                            }
                        </Map>

                        <div className="input-block">
                            <label htmlFor="name">Nome</label>
                            <input id="name" value={name} onChange={event => setName(event.target.value)} />
                        </div>

                        <div className="input-block">
                            <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
                            <textarea id="name" value={about} onChange={event => setAbout(event.target.value)} maxLength={300} />
                        </div>

                        <div className="input-block">
                            <label htmlFor="images">Fotos</label>

                            <div className="images-container">
                                {previewImages.map(image => {
                                    return (
                                        <img key={image} src={image} alt={name} />
                                    )
                                })}
                                <label htmlFor="image[]" className="new-image">
                                    <FiPlus size={24} color="#15b6d6" />
                                </label>
                            </div>

                            <input multiple type="file" id="image[]" onChange={handleSelectImages} />
                            
                        </div>
                    </fieldset>
                
                    <fieldset>
                        <legend>Visitação</legend>

                        <div className="input-block">
                            <label htmlFor="instructions">Instruções</label>
                            <textarea id="instructions" value={instructions} onChange={event => setInstructions(event.target.value)} />
                        </div>

                        <div className="input-block">
                            <label htmlFor="opening_hours">Horário de funcionamento</label>
                            <input id="opening_hours" value={opening_hours} onChange={event => setOpeningHours(event.target.value)} />
                        </div>

                        <div className="input-block">
                            <label htmlFor="open_on_weekends">Atende fim de semana</label>
                            <div className="button-select">
                                <button
                                    type="button"
                                    className={open_on_weekends ? 'active' : ''}
                                    onClick={() => setOpenOnWeekends(true)} >Sim</button>
                                <button
                                    type="button"
                                    className={!open_on_weekends ? 'active' : ''}
                                    onClick={() => setOpenOnWeekends(false)} >Não</button>
                            </div>
                        </div>
                    </fieldset>

                    <button className="confirm-button" type="submit">
                        Confirmar
                    </button>

                </form>
            </main>

        </div>
    )

}
