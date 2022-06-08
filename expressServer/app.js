
const express = require('express')
const socketio = require('socket.io')
const http = require('https')

const cors = require('cors')
const router = require('./router')
const axios = require("axios");
const fs = require('fs');
const options = {
    key: fs.readFileSync('./localhost.pem',"utf-8"),
    cert: fs.readFileSync('./localhost-key.pem', "utf-8")
};

const PORT = process.env.PORT || 4000
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const app = express()
const server = http.createServer({
        key: fs.readFileSync(__dirname + '/key.pem', 'utf-8'),
        cert: fs.readFileSync(__dirname + '/cert.pem', 'utf-8'),
    },
    app)
const io = socketio(server,{
    cors:{
        origin:"*",
    }
})
app.use(cors())
app.use(router)

let room = {
}

io.on('connection', (socket) => {
    socket.on("join", (roomId)=> {
        socket.join(roomId);
        room[socket.id] = roomId;
        axios.post("https://10.20.11.94:8080/addUser", {"roomId":roomId,"userName":socket.id } )
            .then( () =>{
                axios.get("https://10.20.11.94:8080/getUsers/"+roomId).then(e => {
                    let users = e.data;
                    socket.to(roomId).emit("welcome", socket.id);
                    console.log("users", users);
                    console.log("roomId", roomId);
                }).catch(e => console.log(e))}
            )
            .catch((e) => {
                console.log(e)
            })
    });

    socket.on("offer", (roomId, e) => {

        console.log("offer");
        socket.to(roomId).emit("offer", e);
    });

    socket.on("answer", (e) => {
        socket.to(e.room).emit("answer", e);
    });

    socket.on("ice", (e) => {
        socket.to(e.room).emit("ice", e)
        console.log("ice");
    })


    socket.on("disconnect", (e) => {
        console.log("disconnt")
        if(room[socket.id]){
            const roomId = room[socket.id];
            axios.post("https://10.20.11.94:8080/removeUser", {"roomId":roomId , "userName":socket.id});

            delete room[socket.id];

            console.log("연결 종료", socket.id);
            console.log("연결 방이름", roomId);

            socket.to(roomId).emit("exit", socket.id);
        }

        socket.to(e.room).emit("exit", socket.id)
    })
})
server.listen(PORT, () => console.log(`서버가 ${PORT} 에서 시작되었어요`))