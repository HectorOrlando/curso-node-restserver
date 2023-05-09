import { Router } from "express";
import { check } from "express-validator";
import { userGet, userPost, userPut, userDelete, userPatch } from '../controllers/userController';
import { validateFields } from "../middlewares/validateFields";
import { isValidRole, emailIsValidated, idIsValidated } from "../helpers/DBValidations";

const router: Router = Router();

router.get('/', userGet);

router.post('/',
    [
        // Middlewares para checkear 
        check('name', 'The Name is requiered').notEmpty(),
        check('email').custom(emailIsValidated),
        check('password', 'The password must be greater than 6 letters.').isLength({ min: 6 }),
        check('role').custom(isValidRole),
        validateFields, // Middlewares para validar los campos
    ], userPost // userPorts: es el controlador
);

router.put('/:id', [
    check('id', 'No es un ID válido.').isMongoId(),
    check('id').custom(idIsValidated),
    check('role').custom(isValidRole),
    validateFields
], userPut);

router.delete('/:id', [
    check('id', 'No es un ID válido.').isMongoId(),
    check('id').custom(idIsValidated),
    validateFields
], userDelete);

router.patch('/', userPatch);

export default router;
