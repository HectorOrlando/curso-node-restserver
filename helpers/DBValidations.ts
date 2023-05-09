import { UserModel } from '../models/User';
import { RoleModel } from "../models/Role";

export const isValidRole = async (role: string = '') => {
    const existRole = await RoleModel.findOne({ role });
    if (!existRole) { throw new Error(`El Role ${role} no está registrado en la base de datos.`) }
}

export const emailIsValidated = async (email: string = '') => {
    // Verificar si el correo existe express-validator
    const existEmail = await UserModel.findOne({ email });
    if (existEmail) { throw new Error(`El correo: ${email}, ya esta registrado.`) }
}

export const idIsValidated = async (id: string) => {
    // Verificar si el id existe express-validator
    const existId = await UserModel.findById(id);
    if (!existId) { throw new Error(`El ID: ${id}, no existe.`) }
}

export default {
    isValidRole,
    emailIsValidated,
    idIsValidated
}