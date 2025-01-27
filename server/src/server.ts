import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import authRoute from "../routes/authRoute";
import { connectDatabase } from "../database/config";
import cors from "cors";
import { Request, Response } from "express";
import cookieParser from "cookie-parser";
import http from "http";
import { Server, Socket } from "socket.io";
import Document from "../model/document";
dotenv.config();
connectDatabase();
const app = express();
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: process.env.CLIENT_URL, methods: ["GET", "POST"] },
});

// Define types for socket events
interface DocumentData {
  data: object;
}

interface Delta {
  ops: any[];
}
const findOrCreateDocument = async (docId: string): Promise<DocumentData> => {
  let document = await Document.findById(docId);
  if (!document) {
    document = await Document.create({ _id: docId, data: "" });
  }
  return document;
};

io.on("connection", (socket: Socket) => {
  console.log("A user connected:", socket.id);

  socket.on("join-document", async (docId: string) => {
    const document = await findOrCreateDocument(docId);
    socket.join(docId);
    socket.emit("load-document", document.data);

    socket.on("send-changes", (delta: Delta) => {
      socket.broadcast.to(docId).emit("receive-changes", delta);
    });

    socket.on("save-document", async (data: any) => {
      await Document.findByIdAndUpdate(docId, { data });
    });
  });
});

app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use("/auth", authRoute);
app.get("/ping", (req: Request, res: Response) => {
  res.json({ pong: true });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
