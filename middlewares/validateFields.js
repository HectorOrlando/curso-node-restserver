"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFields = void 0;
const express_validator_1 = require("express-validator");
// Middlewares para validar los campos
const validateFields = (request, response, nextFunction) => {
    const errors = (0, express_validator_1.validationResult)(request);
    if (!errors.isEmpty()) {
        return response.status(400).json(errors);
    }
    // nextFunction: si pasa el 1º Middlewares, pasa a los siguientes Middleawares.
    // cuando termina todos los Middlewares pasara al controlador: routes\user.ts
    nextFunction();
};
exports.validateFields = validateFields;
exports.default = {
    validateFields: exports.validateFields
};
