import http from "http";
import express from "express";
import {Server} from "socket.io";

const app = express();

const httpServer = http.createServer(app);
const wsServer = new Server(httpServer);


httpServer.listen(8000, () => console.log("app.open"));