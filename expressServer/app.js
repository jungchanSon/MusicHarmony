// const http = require('http');
// const express = require('express');
// const Server = require('socket.io');
// const cors = require('cors');
//
// const app = express();
// app.use((req, res) => {
//     res.header("Access-Control-Allow-Origin", "*"); // 모든 도메인 허용
// });
// app.get("/", (req, res) => {
//     res.send({ response: 'Server is up and running' }).status(200)
// });
// const httpServer = http.createServer(app);
// const wsServer = Server(httpServer);
//
//
//
//
//
// wsServer.on("connection", socket => {
//     socket.on("offer", (data) => console.log(data))
// });
// httpServer.listen(8000, () => console.log("app.open"));

const express = require('express')
const socketio = require('socket.io')
const http = require('http')

const cors = require('cors')
const router = require('./router')

const PORT = process.env.PORT || 8000


const app = express()
const server = http.createServer(app)
const io = socketio(server,{
    cors:{
        origin:"*",
    }
})
app.use(cors())
app.use(router)
io.on('connection', (socket) => {
    console.log('새로운 connectoin이 발생하였습니다.')
    socket.on('offer', (data) => console.log(data))
    socket.on('disconnect', () => {
        console.log('유저가 떠났어요.')
    })
})
server.listen(PORT, () => console.log(`서버가 ${PORT} 에서 시작되었어요`))