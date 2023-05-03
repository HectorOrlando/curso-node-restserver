import { Request, Response } from "express";

export const userGet = (request: Request, response: Response) => {
    const { id = "NO id", name = "No name", age = "No age" } = request.query;    // Lectura de la query que va despues del signo de interrogación en la url " ?name=Hector&age=47 "
    response.json({
        msg: 'get API - Controller',
        id: id,
        name: name,
        age: age
    });
}

export const userPost = (request: Request, response: Response) => {
    const { name, age } = request.body; // Lectura del body del Postman.
    response.json({
        msg: 'post API - Controller',
        name: name,
        age: age
    });
}

export const userPut = (request: Request, response: Response) => {
    const { id } = request.params;  // Lectura de los parametros de la url: id
    response.status(400).json({
        msg: 'put API - Controller',
        id: parseInt(id)
    });
}

export const userDelete = (request: Request, response: Response) => {
    response.json({
        msg: 'delete API - Controller'
    });
}

export const userPatch = (request: Request, response: Response) => {
    response.json({
        msg: 'patch API - Controller'
    });
}

export default {
    userGet,
    userPost,
    userPut,
    userDelete,
    userPatch
}
