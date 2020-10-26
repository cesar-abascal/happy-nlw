import { Router } from 'express';
import multer from 'multer';
import OrphanagesController from './controllers/OrphanagesController';
import uploadConfig from './config/upload';

const routes = Router();
const upload = multer(uploadConfig);

// MVC
// Model - Representividade de uma entidade (dado) na aplicacao. Praticamente a representacao de uma tabela no banco
// View - Como as coisas ficam disponiveis para o frontend
// Controllers - Logica das rotas
// Padrao do controler - index (lista), show (detalhes), create (cria), update, delete

// MVC
// Model: Representation of an entity (data) in the application. Virtually the representation of a table in the database
// View: How things become available to the frontend
// Controllers: Logic of routes
// Controller pattern: index (list), show (details), create (creates), update, delete

// Route to call the method that lists an orphanage
routes.get('/orphanages', OrphanagesController.index); // It is allowed to use the same create address, as long as they are different methods (verbs)
// Route to call the method that shows the details of an orphanage
routes.get('/orphanages/:id', OrphanagesController.show);
// Route to call the method that creates a new orphanage
routes.post('/orphanages', upload.array('images'), OrphanagesController.create); // Array to allow the upload of a series of images. 'images' -> Name of the field to receive the images

export default routes;
