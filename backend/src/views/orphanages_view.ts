// Determines how the data from the orphanages will be visible to those who consume the API

import Orphanage from '../models/Orphanage';
import imagesView from './images_view';

// Exports a json object
export default {

    render(orphanage: Orphanage) { // Returns the orphanage in the way that it needs to be displayed to the frontend.
        return {
            id: orphanage.id,
            name: orphanage.name,
            latitude: orphanage.latitude,
            longitude: orphanage.longitude,
            about: orphanage.about,
            instructions: orphanage.instructions,
            opening_hours: orphanage.opening_hours,
            open_on_weekends: orphanage.open_on_weekends,
            images: imagesView.renderMany(orphanage.images)
        };
    },

    // Render varios orfanatos
    renderMany(orphanages: Orphanage[]) {
        return orphanages.map(orphanage => this.render(orphanage)); // Go through all the orphanages and call the render method for each one
    }
}
