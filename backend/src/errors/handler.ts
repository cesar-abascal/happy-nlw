// Arquivo para tratarmos os erros ocorridos e transparecer ao consumidor da API apenas o que desejarmos

import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup'; // Pega os error de validacao do yup


/*
Defines the error model to be returned
{
    "name": ['required', 'minimum characters'],
    "latitude": ['required'],
    ...
}
*/

// Define the format of errors with Yup
interface ValidationErrors {
    [key: string]: string[];
}


const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
    if(error instanceof ValidationError) {
        let errors: ValidationErrors = {};

        error.inner.forEach(err => { // Go through each of the errors
            errors[err.path] = err.errors;
        });

        return response.status(400).json({ message: 'Validation fails', errors }); // 400 = Bad request error
    }

    console.error(error);

    return response.status(500).json({ message: 'Internal server error'} );
}

export default errorHandler;
