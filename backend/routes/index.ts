import express from "express";
// controllers
import users from "../controllers/user";
// middlewares
import { encode } from "../middlewares/jwt";

const router = express.Router();

router.post("/login/:userId", encode, (req, res, next) => {});

export default router;
