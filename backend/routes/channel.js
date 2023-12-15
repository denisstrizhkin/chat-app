"use strict";

import express from 'express';

import * as channelController from '../controllers/channel';

const router = express.Router();

router
  .get('/', channelController.onGetUserChannels)
  .get('/messages', channelController.onGetChannelMessages)
  .post('/', channelController.onCreateChannel)
  .post('/join/:id', channelController.onJoinChannel)
  .post('/messages', channelController.onCreateMessage)
  .delete('/leave/:id', channelController.onLeaveChannel)
  .delete('/', channelController.onDeleteChannel)

export default router;
