"use strict";

import express from 'express';



const router = express.Router();

router
  .get('/')

  .delete('/room/:roomId', deleteController.deleteRoomById)
  .delete('/message/:messageId', deleteController.deleteMessageById)

export default router;
