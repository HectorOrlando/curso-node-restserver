"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleModel = void 0;
const mongoose_1 = require("mongoose");
// Define el esquema del Role
const RoleSchema = new mongoose_1.Schema({
    role: { type: String, require: [true, 'El rol es requerido.'] }
});
// Crear y exportar el modelo de RoleModel.
exports.RoleModel = (0, mongoose_1.model)('Role', RoleSchema);
