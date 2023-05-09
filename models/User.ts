import { Document, model, Schema } from 'mongoose';

// Define la interfaz del usuario.
interface IUser extends Document {
    name: string,
    email: string,
    password: string,
    img: string,
    role: string,
    status: boolean,
    google: boolean
}

// Define el esquema del Usuario.
const UserSchema = new Schema({
    name: { type: String, require: [true, 'The name is required'] },
    email: { type: String, require: [true, 'The email is required'], unique: true },
    password: { type: String, require: [true, 'The password is required'] },
    img: { type: String },
    role: { type: String, require: true },
    status: { type: Boolean, default: true },
    google: { type: Boolean, default: false }
});

UserSchema.methods.toJSON = function () {
    const { __v, password, ...user } = this.toObject();
    return user;
}

// Crear y exportar el modelo de Usuario.
export const UserModel = model<IUser>('User', UserSchema);

/*
En este ejemplo, se define una interfaz IUser que define los atributos del modelo de Usuario, y un esquema UserSchema que define 
la estructura de la colección de Usuarios en MongoDB. 
Luego se crea el modelo UserModel utilizando la función model de Mongoose, que toma como primer parámetro el nombre del modelo ('User') y como segundo parámetro el esquema UserSchema.
Una vez que has definido el modelo de Usuario, puedes utilizar los métodos proporcionados por Mongoose 
para interactuar con la colección de Usuarios en MongoDB, como guardar, actualizar, eliminar y buscar registros.
*/