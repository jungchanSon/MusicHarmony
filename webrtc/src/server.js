import express from "express";
import http from "http";
import WebSocket from "ws";
import {log} from "nodemon/lib/utils";
import SocketIO from "socket.io";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname +"/views")
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"))

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer)

const handleListen = () => {console.log("http://localhost:3000");}
httpServer.listen(3000, handleListen);