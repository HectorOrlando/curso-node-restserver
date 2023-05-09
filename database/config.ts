import mongoose from "mongoose";

export const dbConnection = async () => {
    const mongodbCnn = process.env.MONGODB_CNN;

    if (!mongodbCnn) {
        throw new Error("La variable de entorno MONGODB_CNN no está definida");
    }

    try {
        await mongoose.connect(mongodbCnn);
        console.log('Base de datos online...');
    } catch (error) {
        throw new Error('Error a la hora de iniciar la base de datos');
    }
}

export default {
    dbConnection
}
