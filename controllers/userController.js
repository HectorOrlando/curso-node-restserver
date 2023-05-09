"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userPatch = exports.userDelete = exports.userPut = exports.userPost = exports.userGet = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = require("../models/User");
const userGet = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit = 5, from = 0 } = request.query;
    const query = { status: true };
    // Esto es un Promesa de  2 await (1º total y 2º users), cuando resuelva los 2 nos retorna las 2 respuestas gracias al destructurin de array.
    const [total, users] = yield Promise.all([
        User_1.UserModel.count(query),
        User_1.UserModel.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ]);
    response.json({
        total,
        users
    });
});
exports.userGet = userGet;
const userPost = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, role } = request.body; // Lectura del body del Postman, hago destructurin solo para traerme lo que necesito {name, email, password, role}
    const user = new User_1.UserModel({ name, email, password, role }); // Creo una instancia user de mi modelo UserModel
    // Encriptar la contraseña
    const salt = bcryptjs_1.default.genSaltSync();
    user.password = bcryptjs_1.default.hashSync(password, salt);
    yield user.save(); // Guardo el registro en la base de datos.    
    response.json({
        user: user
    });
});
exports.userPost = userPost;
const userPut = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    const _a = request.body, { password, google, email } = _a, resto = __rest(_a, ["password", "google", "email"]);
    if (password) {
        // Encriptar la contraseña
        const salt = bcryptjs_1.default.genSaltSync();
        resto.password = bcryptjs_1.default.hashSync(password, salt);
    }
    const user = yield User_1.UserModel.findByIdAndUpdate(id, resto);
    response.json({
        user: user
    });
});
exports.userPut = userPut;
const userDelete = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    // Fisicamente lo borramos.
    // const user = await UserModel.findByIdAndDelete(id);
    // Lo recomendado:
    // cambiarle el estado a false para poder conservar el usuario y no perder la entidad referencial.
    const user = yield User_1.UserModel.findByIdAndUpdate(id, { status: false });
    response.json({
        user
    });
});
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
