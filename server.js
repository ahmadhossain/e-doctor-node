const express = require("express");
const cors = require("cors");
const http = require("http");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const { Server } = require("socket.io");

const conversationRoute = require("./routes/conversation");
const postsRoute = require("./routes/posts");
const doctorsRoute = require("./routes/doctors");
const loginRoute = require("./routes/login");

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const app = express();
const port = 8080;

async function main() {
  dotenv.config();

  app.use(cors());
  app.use(express.json());
  app.use(morgan("common"));
  app.use(helmet());

  app.use("/api/conversation", conversationRoute);
  app.use("/api/posts", postsRoute);
  app.use("/api/doctors", doctorsRoute);
  app.use("/api/login", loginRoute);

  app.get("/", (req, res) => {
    res.send("welcome to homepage");
  });

  // Register API routes
  // app.use("/api/v1/post", PostRouter);

  // Catch unregistered routes
  app.all("*", (req, res) => {
    res.status(404).json({ error: `Route ${req.originalUrl} not found` });
  });

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

main()
  .then(async () => {
    await prisma.$connect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   console.log(`User Connected: ${socket.id}`);

//   //   socket.on("join_room", (data) => {
//   //     socket.join(data);
//   //   });

//   //   socket.on("send_message", (data) => {
//   //     socket.to(data.room).emit("receive_message", data);
//   //   });

//   socket.on("message", ({ message }) => {
//     console.log(message);
//     socket.broadcast.emit("message", { message });
//   });

//   socket.emit("me", socket.id);

//   socket.on("disconnect", () => {
//     socket.broadcast.emit("callEnded");
//   });

//   socket.on("callUser", ({ userToCall, signalData, from, name }) => {
//     // io.to(userToCall).emit("callUser", { signal: signalData, from, name });
//     io.emit("callUser", { signal: signalData, from, name });
//   });

//   socket.on("answerCall", (data) => {
//     // io.to(data.to).emit("callAccepted", data.signal);
//     io.emit("callAccepted", data.signal);
//   });
// });

// server.listen(5000, () => {
//   console.log("SERVER IS RUNNING");
// });
