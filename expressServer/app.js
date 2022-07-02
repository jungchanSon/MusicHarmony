const express = require("express");
const socketio = require("socket.io");
const http = require("https");

const cors = require("cors");
const router = require("./router");
const axios = require("axios");
const fs = require("fs");
const options = {
  key: fs.readFileSync("./localhost.pem", "utf-8"),
  cert: fs.readFileSync("./localhost-key.pem", "utf-8"),
};

const PORT = process.env.PORT || 4000;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const app = express();
const server = http.createServer(
  // express server 생성
  // server은 변수에 담은 이유는 http.createServer 메소드는 서버를 생성하는 작업을 하고 난 후 생성한 서버 객체를 리턴한다
  // 즉 생성된 서버를 제어하기 위해 server변수에 담는 것이다
  {
    key: fs.readFileSync(__dirname + "/key.pem", "utf-8"),
    cert: fs.readFileSync(__dirname + "/cert.pem", "utf-8"),
  },
  app
);

// 서버 안에 SocketIO를 만드는구나
// CORS는 한 웹사이트의 스크립트가 외부 페이지의 정보에 접근할 수 없다는 규약
const io = socketio(server, {
  cors: {
    origin: "*",
  },
});
app.use(cors());
app.use(router);

let room = {};



io.on("connection", (socket) => {
  socket.on("join", (roomId) => {
    socket.join(roomId);// join이 비동기 아닌가?
    room[socket.id] = roomId;
    axios
      .post("https://localhost:4000/addUser", {
        roomId: roomId,
        userName: socket.id,
      })
      .then(() => {
        axios
          .get("https://localhost:4000/getUsers/" + roomId)
          .then((e) => {
            let users = e.data;
            socket.to(roomId).emit("welcome", socket.id);
            console.log("users", users);
            console.log("roomId", roomId);
          })
          .catch((e) => console.log(e));
      })
      .catch((e) => {
        console.log(e);
      });
  });

  socket.on("offer", (roomId, e) => {
    console.log("offer");
    socket.to(roomId).emit("offer", e);
  });

  socket.on("answer", (e) => {
    socket.to(e.room).emit("answer", e);
  });

  socket.on("ice", (e) => {
    socket.to(e.room).emit("ice", e);
    console.log("ice");
  });

  socket.on("disconnect", (e) => {
    console.log("disconnt");
    if (room[socket.id]) {
      const roomId = room[socket.id];
      axios.post("https://localhost:4000/removeUser", {
        roomId: roomId,
        userName: socket.id,
      });

      delete room[socket.id];

      console.log("연결 종료", socket.id);
      console.log("연결 방이름", roomId);

      socket.to(roomId).emit("exit", socket.id);
    }

    socket.to(e.room).emit("exit", socket.id);
  });
});

// 변수 PORT에서 서버가 시작되었음을 알 수 있다.
server.listen(PORT, () => console.log(`서버가 ${PORT} 에서 시작되었어요`));
