import axios from 'axios'; // Use the axios library to communicate with the api


const api = axios.create({
    baseURL: 'http://localhost:3333',
});

export default api;
