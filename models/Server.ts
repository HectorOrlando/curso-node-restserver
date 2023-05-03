import express, { Application } from 'express';
import cors from 'cors';
import userRouter from '../routes/user';

class Server {
    public app: Application;
    public port: string | number;
    public usersRoutePath: string;
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.usersRoutePath = '/api/users';

        // Middlewares
        this.middlewares();
        // Rutas
        this.routes();
    }

    middlewares() {
        // CORS: es un mecanismo que permite a los navegadores web acceder a recursos de otros servidores con el permiso de estos.
        this.app.use(cors());
        // Lectura y parseo del body
        this.app.use(express.json());
        // Directorio Publico
        this.app.use(express.static('public'));;
    }

    routes() {
        // La ruta sería: this.usersRoutePath  y el controlador sería: userRouter
        this.app.use(this.usersRoutePath, userRouter);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto: ', this.port);
        });
    }

}

export default Server;
