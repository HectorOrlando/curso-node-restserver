"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userPatch = exports.userDelete = exports.userPut = exports.userPost = exports.userGet = void 0;
const userGet = (request, response) => {
    const { id = "NO id", name = "No name", age = "No age" } = request.query; // Lectura de la query que va despues del signo de interrogación en la url " ?name=Hector&age=47 "
    response.json({
        msg: 'get API - Controller',
        id: id,
        name: name,
        age: age
    });
};
exports.userGet = userGet;
const userPost = (request, response) => {
    const { name, age } = request.body; // Lectura del body del Postman.
    response.json({
        msg: 'post API - Controller',
        name: name,
        age: age
    });
};
exports.userPost = userPost;
const userPut = (request, response) => {
    const { id } = request.params; // Lectura de los parametros de la url: id
    response.status(400).json({
        msg: 'put API - Controller',
        id: parseInt(id)
    });
};
exports.userPut = userPut;
const userDelete = (request, response) => {
    response.json({
        msg: 'delete API - Controller'
    });
};
exports.userDelete = userDelete;
const userPatch = (request, response) => {
    response.json({
        msg: 'patch API - Controller'
    });
};
exports.userPatch = userPatch;
exports.default = {
    userGet: exports.userGet,
    userPost: exports.userPost,
    userPut: exports.userPut,
    userDelete: exports.userDelete,
    userPatch: exports.userPatch
};
