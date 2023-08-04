const express = require("express");
const app = express();
const { Server } = require('socket.io');
const http = require("http")
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });
  
  io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
  
//     socket.on("join_room", (data) => {
//       socket.join(data);
//     });
  
    socket.on('message', (data) => {
        console.log(data.newtext);  
       io.emit("receive_message", data.newtext);
    });
  });
  
  server.listen(8080, () => {
    console.log("SERVER IS RUNNING");
  });
