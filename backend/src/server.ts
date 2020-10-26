import express from 'express';
import './database/connection';
import 'express-async-errors'; // Enables error return in async
import path from 'path';
import cors from 'cors';
import routes from './routes'
import errorHandler from './errors/handler';


const app = express();

// To release access for all frontends. So everyone can consume the API
app.use(cors());

// Enable express to understand that the body will be sent in json
app.use(express.json());

// Important to come after express.json()
app.use(routes);

// Creates the address to access the uploads (images)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads'))) // path -> The same as '../uploads'

// Enables the return of errors using the default that was defined in 'errorHandler'
app.use(errorHandler);

// Starts the API
app.listen(3333);


// Route = Group
// Resource = Users

// Methods HTTP = GET, POST, PUT, DELETE
//  GET = Get information (list, item) - Unique that the browser can use in tests
//  POST = Create information
//  PUT = Edit information
//  DELETE = Delete information

// Parameters
//  Query Params: http://localhost:3333/users?search=cesar
//  Route Params: http://localhost:3333/users/1 (Identify a resource)
//      Route Params: DELETE http://localhost:3333/users/1 (Delete user 1)
//  Body: http://localhost:3333/users (Send data)
