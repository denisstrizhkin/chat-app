"use strict";

import { validateBody, getDBConnection } from "../util/util.js";

import { 
  TABLE_USERS, USER_NAME, USER_ID,
  TABLE_CHANNELS, CHANNEL_ID, CHANNEL_NAME, CHANNEL_CREATOR,
  TABLE_MESSAGES, MESSAGE_ID, MESSAGE_NAME, MESSAGE_AUTHOR,
    MESSAGE_DATE, MESSAGE_CHANNEL, MESSAGE_BODY,
  TABLE_CHANNEL_USERS, CHANNEL_USERS_CHANNEL, CHANNEL_USERS_USER
} from "../constants.js";

export const onCreateChannel = async (req, res) => {
  try {
    const validation = validateBody(
      req.body, { [CHANNEL_NAME]: 'string' }
    );
    if (!validation) {
      return res.status(400).json({ success: false, error: 'wrong request format' });
    }

    const { name } = req.body;

    const user_id = req[USER_ID];
    const user_name = req[USER_NAME];

    if (!name.match(/^[a-zA-Z0-9\s]{4,20}$/)) {
      return res.status(400).json({ success: false, error: 'wrong name format' }); 
    }

    const dbCon = await getDBConnection();
      
    const sql = `INSERT INTO ${TABLE_CHANNELS}
      (${CHANNEL_NAME}, ${CHANNEL_CREATOR}) VALUES (?, ?)`;
    const values = [ name, user_id ] ;

    const [result, _] = await dbCon.execute(sql, values);

    return res.status(200).json({ success: true, channel: {
      [CHANNEL_NAME]: name, [CHANNEL_CREATOR]: user_id, [CHANNEL_ID]: result.insertId
    }});
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }  
};

export const onGetUserChannels = async (req, res) => {
  try {
    const user_id = req[USER_ID];

    const dbCon = await getDBConnection();
      
    const sql_joined = `SELECT * FROM ${TABLE_CHANNEL_USERS}
      WHERE ${CHANNEL_USERS_USER} = ?`;
    const values_joined = [ user_id ] ;

    const [joined, ] = await dbCon.execute(sql_joined, values_joined);

    const getChannelInfo = async channel_id => {
      const sql = `SELECT * FROM ${TABLE_CHANNELS}
        WHERE ${CHANNEL_ID} = ?`;
      const values = [ channel_id ];

      const [result, ] = await dbCon.execute(sql, values);
      return result[0];
    }
    
    const result_joined = await Promise.all(
      joined.map(val => getChannelInfo(val[CHANNEL_USERS_CHANNEL]))
    );

    const sql_created = `SELECT * FROM ${TABLE_CHANNELS}
      WHERE ${CHANNEL_CREATOR} = ?`;
    const values_created = [ user_id ] ;

    const [result_created, ] = await dbCon.execute(sql_created, values_created);

    return res.status(200).json(
      { success: true, channels: result_created.concat(result_joined) }
    );
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }  
};

export const onGetChannelMessages = async (req, res) => {
  try {
    const channel_id = req.params.id;
    // const user_id = req[USER_ID];

    const dbCon = await getDBConnection();
      
    const sql = `SELECT * FROM ${TABLE_MESSAGES}
      WHERE ${MESSAGE_CHANNEL} = ?`;
    const values = [ channel_id ] ;

    const [result, _] = await dbCon.execute(sql, values);

    const getAuthorName = async msg => {
      const sql = `SELECT ${USER_NAME} FROM ${TABLE_USERS}
        WHERE ${USER_ID} = ?`
      const values = [ msg[MESSAGE_AUTHOR] ]
      const [result, _] = await dbCon.execute(sql, values);

      msg[MESSAGE_AUTHOR] = result[0][USER_NAME];
      return msg;
    }

    const messages = await Promise.all(result.map(msg => getAuthorName(msg)));

    return res.status(200).json({ success: true, messages: messages });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }  
};

export const onJoinChannel = async (req, res) => {
  try {
    const channel_id = req.params.id;
    const user_id = req[USER_ID];

    const dbCon = await getDBConnection();
      
    const sql = `INSERT INTO ${TABLE_CHANNEL_USERS}
      (${CHANNEL_USERS_CHANNEL}, ${CHANNEL_USERS_USER}) VALUES (?, ?)`;
    const values = [ channel_id, user_id ] ;

    await dbCon.execute(sql, values);

    return res.status(200).json({ success: true, message: 'joined channel' });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }  
};

export const onCreateMessage = async (req, res) => {
  try {
    const validation = validateBody(
      req.body, { [CHANNEL_ID]: 'string', [MESSAGE_BODY]: 'string' }
    );
    if (!validation) {
      return res.status(400).json({ success: false, error: 'wrong request format' });
    }

    const channel_id = req.body[CHANNEL_ID];
    const body = req.body[MESSAGE_BODY];
    const user_id = req[USER_ID];

    const date = new Date();
    const datetime = date.getUTCFullYear() + '-' +
      ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
      ('00' + date.getUTCDate()).slice(-2) + ' ' + 
      ('00' + date.getUTCHours()).slice(-2) + ':' + 
      ('00' + date.getUTCMinutes()).slice(-2) + ':' + 
      ('00' + date.getUTCSeconds()).slice(-2);

    if (body.length > 500) {
      return res.status(400).json(
        { success: false, error: 'max message length is 500' }
      );
    }

    const dbCon = await getDBConnection();
      
    const sql = `INSERT INTO ${TABLE_MESSAGES}
      (${MESSAGE_BODY}, ${MESSAGE_AUTHOR}, ${MESSAGE_CHANNEL}, ${MESSAGE_DATE})
      VALUES (?, ?, ?, ?)`;
    const values = [ body, user_id, channel_id, datetime ] ;

    const [result, ] = await dbCon.execute(sql, values);

    return res.status(200).json(
      { success: true, message: `created message ${result.insertId}` }
    );
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }  
};

export const onLeaveChannel = async (req, res) => {};

export const onDeleteChannel = async (req, res) => {};

