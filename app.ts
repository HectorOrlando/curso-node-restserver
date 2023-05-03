import dotenv from 'dotenv';    //  importaciones de 3º
dotenv.config();

import Server from "./models/Server";
const server = new Server();

server.listen();