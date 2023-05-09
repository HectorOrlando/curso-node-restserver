"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
// Define el esquema del Usuario.
const UserSchema = new mongoose_1.Schema({
    name: { type: String, require: [true, 'The name is required'] },
    email: { type: String, require: [true, 'The email is required'], unique: true },
    password: { type: String, require: [true, 'The password is required'] },
    img: { type: String },
    role: { type: String, require: true },
    status: { type: Boolean, default: true },
    google: { type: Boolean, default: false }
});
UserSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v, password } = _a, user = __rest(_a, ["__v", "password"]);
    return user;
};
// Crear y exportar el modelo de Usuario.
exports.UserModel = (0, mongoose_1.model)('User', UserSchema);
/*
En este ejemplo, se define una interfaz IUser que define los atributos del modelo de Usuario, y un esquema UserSchema que define
la estructura de la colección de Usuarios en MongoDB.
Luego se crea el modelo UserModel utilizando la función model de Mongoose, que toma como primer parámetro el nombre del modelo ('User') y como segundo parámetro el esquema UserSchema.
Una vez que has definido el modelo de Usuario, puedes utilizar los métodos proporcionados por Mongoose
para interactuar con la colección de Usuarios en MongoDB, como guardar, actualizar, eliminar y buscar registros.
*/ 
