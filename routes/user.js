"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const userController_1 = require("../controllers/userController");
const validateFields_1 = require("../middlewares/validateFields");
const DBValidations_1 = require("../helpers/DBValidations");
const router = (0, express_1.Router)();
router.get('/', userController_1.userGet);
router.post('/', [
    // Middlewares para checkear 
    (0, express_validator_1.check)('name', 'The Name is requiered').notEmpty(),
    (0, express_validator_1.check)('email').custom(DBValidations_1.emailIsValidated),
    (0, express_validator_1.check)('password', 'The password must be greater than 6 letters.').isLength({ min: 6 }),
    (0, express_validator_1.check)('role').custom(DBValidations_1.isValidRole),
    validateFields_1.validateFields, // Middlewares para validar los campos
], userController_1.userPost // userPorts: es el controlador
);
router.put('/:id', [
    (0, express_validator_1.check)('id', 'No es un ID válido.').isMongoId(),
    (0, express_validator_1.check)('id').custom(DBValidations_1.idIsValidated),
    (0, express_validator_1.check)('role').custom(DBValidations_1.isValidRole),
    validateFields_1.validateFields
], userController_1.userPut);
router.delete('/:id', [
    (0, express_validator_1.check)('id', 'No es un ID válido.').isMongoId(),
    (0, express_validator_1.check)('id').custom(DBValidations_1.idIsValidated),
    validateFields_1.validateFields
], userController_1.userDelete);
router.patch('/', userController_1.userPatch);
exports.default = router;
