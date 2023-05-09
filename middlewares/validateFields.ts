import { Request, Response, NextFunction } from "express";
import { validationResult } from 'express-validator';

// Middlewares para validar los campos
export const validateFields = (request: Request, response: Response, nextFunction: NextFunction) => {

    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json(errors);
    }
    // nextFunction: si pasa el 1º Middlewares, pasa a los siguientes Middleawares.
    // cuando termina todos los Middlewares pasara al controlador: routes\user.ts
    nextFunction();
}

export default {
    validateFields
}