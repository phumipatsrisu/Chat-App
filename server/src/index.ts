import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoute from "./routes/auth";
import { createServer } from "http";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";

dotenv.config();
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:5173" },
});

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api", authRoute);

connectDB();
app.get("/", (req, res) => {
  res.send("hello world!");
});

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    next(new Error("No token provided"));
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    socket.data.user = decoded.user;
    next();
  } catch (error) {
    next(new Error("Token invalid"));
  }
});

io.on("connection", (socket) => {
  console.log("เข้ามา", socket.id);

  socket.on("sendMessage", (message: string) => {
    console.log(message);
    io.emit("receiveMessage", {
      content: message,
      sender: socket.data.user.name,
    });
  });

  socket.on("disconnect", () => {
    console.log("ออกไป", socket.id);
  });
});

server.listen(port, () =>
  console.log(`Example app listening on port ${port}!`),
);
