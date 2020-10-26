// Configuration of how uploads will be performed within the application

import multer from 'multer'; // Library to handle uploading files within nodejs
import path from 'path';


// Exports a json object with settings.
export default {
    // diskStorage -> To save the images to the disc
    storage: multer.diskStorage({
        destination: path.join(__dirname, '..', '..', 'uploads'), // Equals to ../../uploads | Because of the cross-platform
        filename: (request, file, cb) => { // Function to generate a name for the file
            const fileName = `${Date.now()}-${file.originalname}`; // Renames the file to 'timestamp-original' name

            cb(null, fileName); // In the callback (cb), the first parameter always receives an error, and the second parameter the result
        }
    })
};
