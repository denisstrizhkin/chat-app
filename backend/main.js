"use strict";

import http from "http";
import express from "express";
import logger from "morgan";
import cors from "cors";

// routes
import channelRouter from './routes/channel.js';

// controllers
import * as user from './controllers/user.js';

// middlewares
import { encode, decode } from './middlewares/jwt.js';

const app = express();

/** Get port from environment and store in Express. */
const port = process.env.PORT || "3000";
app.set("port", port);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/login', encode, (req, res, next) => {
  return res.status(200).json({ success: true, authorization: req.authToken })
});
app.post('/register', user.onRegister)

app.use("/channels", decode, channelRouter);

/** catch 404 and forward to error handler */
app.use('*', (req, res) => {
  return res.status(404).json({
    success: false,
    error: 'API endpoint doesnt exist'
  })
});

/** Create HTTP server. */
const server = http.createServer(app);
/** Listen on provided port, on all network interfaces. */
server.listen(port);
/** Event listener for HTTP server "listening" event. */
server.on("listening", () => {
  console.log(`Listening on port:: http://localhost:${port}/`)
});
