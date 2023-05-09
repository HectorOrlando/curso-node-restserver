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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_1 = __importDefault(require("../routes/user"));
const config_1 = require("../database/config");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || 3000;
        this.usersRoutePath = '/api/users';
        // Conectar a base de datos
        this.connectDB();
        // Middlewares
        this.middlewares();
        // Rutas
        this.routes();
    }
    // conexion a la base de datos
    connectDB() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, config_1.dbConnection)();
        });
    }
    middlewares() {
        // CORS: es un mecanismo que permite a los navegadores web acceder a recursos de otros servidores con el permiso de estos.
        this.app.use((0, cors_1.default)());
        // Lectura y parseo del body
        this.app.use(express_1.default.json());
        // Directorio Publico
        this.app.use(express_1.default.static('public'));
        ;
    }
    routes() {
        // La ruta sería: this.usersRoutePath  y el controlador sería: userRouter
        this.app.use(this.usersRoutePath, user_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto: ', this.port);
        });
    }
}
exports.default = Server;
