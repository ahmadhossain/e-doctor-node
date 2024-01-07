const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
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

  //   socket.on("join_room", (data) => {
  //     socket.join(data);
  //   });

  //   socket.on("send_message", (data) => {
  //     socket.to(data.room).emit("receive_message", data);
  //   });

  socket.on("message", ({ message }) => {
    console.log(message);
    socket.broadcast.emit("message", { message });
  });

  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });

  socket.on("callUser", ({ userToCall, signalData, from, name }) => {
    // io.to(userToCall).emit("callUser", { signal: signalData, from, name });
    io.emit("callUser", { signal: signalData, from, name });
  });

  socket.on("answerCall", (data) => {
    // io.to(data.to).emit("callAccepted", data.signal);
    io.emit("callAccepted", data.signal);
  });
});

server.listen(5000, () => {
  console.log("SERVER IS RUNNING");
});
