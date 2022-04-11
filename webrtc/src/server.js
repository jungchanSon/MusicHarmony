import express from "express";
import http from "http";
import WebSocket from "ws";
import {log} from "nodemon/lib/utils";
const app = express();

app.set("view engine", "pug");
app.set("views", __dirname +"/views")
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
 app.get("/*", (req, res) => res.redirect("/"))
const server = http.createServer(app);
const wss = new WebSocket.Server({ server })

const sockets = [];

wss.on("connection", (socket) =>{
    sockets.push(socket);
    console.log("conneted");
    socket.on("close", () => console.log("Disconnect"));
    socket.on("message", (msg)=>{
        console.log(msg);
    });
    socket.send("hello!");
})

const handleListen = () => {console.log("http://localhost:3000");}
server.listen(3000, handleListen);