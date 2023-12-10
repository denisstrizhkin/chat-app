"use strict";

import express from 'express';
// controllers
import * as user from '../controllers/user.js';
// middlewares
import { encode } from '../middlewares/jwt.js';

const router = express.Router();

router
  .post('/login/:userId', encode, (req, res, next) => { });

export default router;
