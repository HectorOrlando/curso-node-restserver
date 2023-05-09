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
Object.defineProperty(exports, "__esModule", { value: true });
exports.idIsValidated = exports.emailIsValidated = exports.isValidRole = void 0;
const User_1 = require("../models/User");
const Role_1 = require("../models/Role");
const isValidRole = (role = '') => __awaiter(void 0, void 0, void 0, function* () {
    const existRole = yield Role_1.RoleModel.findOne({ role });
    if (!existRole) {
        throw new Error(`El Role ${role} no está registrado en la base de datos.`);
    }
});
exports.isValidRole = isValidRole;
const emailIsValidated = (email = '') => __awaiter(void 0, void 0, void 0, function* () {
    // Verificar si el correo existe express-validator
    const existEmail = yield User_1.UserModel.findOne({ email });
    if (existEmail) {
        throw new Error(`El correo: ${email}, ya esta registrado.`);
    }
});
exports.emailIsValidated = emailIsValidated;
const idIsValidated = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Verificar si el id existe express-validator
    const existId = yield User_1.UserModel.findById(id);
    if (!existId) {
        throw new Error(`El ID: ${id}, no existe.`);
    }
});
exports.idIsValidated = idIsValidated;
exports.default = {
    isValidRole: exports.isValidRole,
    emailIsValidated: exports.emailIsValidated,
    idIsValidated: exports.idIsValidated
};
