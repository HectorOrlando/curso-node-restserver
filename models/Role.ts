import { Document, model, Schema } from 'mongoose';

// Define la interfaz del role
interface IRole extends Document {
    role: string
}

// Define el esquema del Role
const RoleSchema = new Schema({
    role: { type: String, require: [true, 'El rol es requerido.'] }
});

// Crear y exportar el modelo de RoleModel.
export const RoleModel = model<IRole>('Role', RoleSchema);