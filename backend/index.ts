import http from "http";
import express from "express";
import logger from "morgan";
import cors from "cors";

import indexRouter from "./routes/index";
import userRouter from "./routes/user";
import chatRoomRouter from "./routes/chatRoom";
import deleteRouter from "./routes/delete";

import { decode } from "./middlewares/jwt";
import "./config/mongo";

const app = express();

const port = process.env.NODE_PORT || "3000";
app.set("port", port);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/room", decode, chatRoomRouter);
app.use("/delete", deleteRouter);

app.use("*", (req, res) => {
    return res.status(404).json({
        success: false,
        message: "API endpoint doesnt exist",
    });
});

const server = http.createServer(app);
server.listen(port);
server.on("listening", () => {
    console.log(`Listening on port: ${port}/`);
});
