import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import { UserModel } from '../models/User';

export const userGet = async (request: Request, response: Response) => {
    const { limit = 5, from = 0 } = request.query;
    const query = { status: true };
    // Esto es un Promesa de  2 await (1º total y 2º users), cuando resuelva los 2 nos retorna las 2 respuestas gracias al destructurin de array.
    const [total, users] = await Promise.all([
        UserModel.count(query),
        UserModel.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    response.json({
        total,
        users
    });


}

export const userPost = async (request: Request, response: Response) => {

    const { name, email, password, role } = request.body; // Lectura del body del Postman, hago destructurin solo para traerme lo que necesito {name, email, password, role}
    const user = new UserModel({ name, email, password, role });   // Creo una instancia user de mi modelo UserModel

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();    // Guardo el registro en la base de datos.    

    response.json({
        user: user
    });
}

export const userPut = async (request: Request, response: Response) => {
    const { id } = request.params;
    const { password, google, email, ...resto } = request.body;

    if (password) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }
    const user = await UserModel.findByIdAndUpdate(id, resto);

    response.json({
        user: user
    });
}

export const userDelete = async (request: Request, response: Response) => {
    const { id } = request.params;
    // Fisicamente lo borramos.
    // const user = await UserModel.findByIdAndDelete(id);

    // Lo recomendado:
    // cambiarle el estado a false para poder conservar el usuario y no perder la entidad referencial.
    const user = await UserModel.findByIdAndUpdate(id, { status: false });

    response.json({
        user
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
