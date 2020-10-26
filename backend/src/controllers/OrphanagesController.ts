import { Request, Response } from 'express'; // Imports Request and Response to use in typing.
import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';
import orphanageView from '../views/orphanages_view';
import * as Yup from 'yup'; // It imports everything from yup, as it does not have an 'export default' in its construction


// Exports a json object
export default {

    // Function to list orphanages
    async index(request: Request, response: Response) {
        const orphanagesRepository = getRepository(Orphanage);

        const orphanages = await orphanagesRepository.find({
            relations: ['images'] // To return to the image information
        });

        return response.json(orphanageView.renderMany(orphanages)); // The render will 'filter' what should be returned. The view will determine what should and shouldn't be returned
    },

    // Function to show details of an orphanage
    async show(request: Request, response: Response) {
        const { id } = request.params;

        const orphanagesRepository = getRepository(Orphanage);

        const orphanage = await orphanagesRepository.findOneOrFail(id, {
            relations: ['images'] // To return to the image information
        }); // Attempts to find an orphanage with the id or returns an error

        return response.json(orphanageView.render(orphanage)); // The render will 'filter' what should be returned. The view will determine what should and shouldn't be returned
    },

    // Function to create an orphanage
    async create(request: Request, response: Response) {

        // Destructuring the request data
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        } = request.body;
        
        const orphanagesRepository = getRepository(Orphanage);

        const requestImages = request.files as Express.Multer.File[]; // as Express.Multer.File[] -> Informs the code that it is an array of multer files
        
        const images = requestImages.map(image => {
            return { path: image.filename }
        })

        // Establishes the data body of the orphanage
        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends: open_on_weekends === 'true', // If 'true', set it to true, as Yup will receive a boolean and not a string. And if different, use false
            images
        };

        // Establishes the schema of how the body data MUST BE
        const schema = Yup.object().shape({
            name: Yup.string().required(), // To validate 'name' as a required string
            latitude: Yup.number().required(), // To validate 'latitude' as a required number
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300), // To validate 'about' as a required string of a maximum of 300 characters
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(), // To validate 'open_on_weeknds' as a required boolean
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required() // To validate 'path' as ​​a required string
                })
            ) // To validate 'images' as an object
        });

        // Validates the body data following the rules defined in schema
        await schema.validate(data, {
            abortEarly: false // Forces all errors to return at the same time, not one at a time. Validates everything and then returns errors, if they exist
        });

        // Create a new orphanage
        const orphanage = orphanagesRepository.create(data);
        
        // Save the orphanage to the database
        await orphanagesRepository.save(orphanage); // Asynchronous. It takes a while to run.
        
        return response.status(201).json({ orphanage }) // <- The status 201 indicates that something has been created
    }
};
