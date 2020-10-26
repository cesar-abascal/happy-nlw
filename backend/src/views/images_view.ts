// Determines how the image data will be visible to those who consume the API

import Image from '../models/Image';

// Exports a json object
export default {

    render(image: Image) { // Returns the image in the way it needs to be displayed for the frontend
        return {
            id: image.id,
            url: `http://localhost:3333/uploads/${image.path}`
        };
    },

    // Render varios orfanatos
    renderMany(images: Image[]) {
        return images.map(image => this.render(image)); // Go through all the images and call the render method for each one
    }
}
