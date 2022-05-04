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

wsServer.on("connection", socket => {
    socket.on("join_room", roomName => {
        socket.join(roomName);
        console.log("timeout");
        socket.to(roomName).emit("welcome");
        console.log("welcome123");


    });
    socket.on("offer", (offer, roomName) => {
        socket.to(roomName).emit("offer", offer);
    });
    socket.on("answer", (answer, roomName) => {
        socket.to(roomName).emit("answer", answer);
    });
    socket.on("ice", (ice, roomName) => {
        socket.to(roomName).emit("ice", ice);
    })
});

const handleListen = () => {console.log("http://localhost:3000");}
httpServer.listen(5000, handleListen);