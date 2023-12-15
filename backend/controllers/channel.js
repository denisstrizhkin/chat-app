"use strict";

import { validateBody, getDBConnection } from "../util/util.js";

import { 
  TABLE_USERS, USER_NAME, USER_ID,
  TABLE_CHANNELS, CHANNEL_ID, CHANNEL_NAME, CHANNEL_CREATOR,
  TABLE_MESSAGES, MESSAGE_ID, MESSAGE_NAME, MESSAGE_AUTHOR,
    MESSAGE_DATE, MESSAGE_CHANNEL
} from "../constants.js";

export const onCreateChannel = async (req, res) => {
  try {
    const validation = validateBody(
      req.body, { [CHANNEL_NAME]: 'string' }
    );
    if (!validation) {
      return res.status(400).json({ success: false, message: 'wrong request format' });
    }

    const { name } = req.body;

    const { user_id, user_name } = req;

    if (!name.match(/^[a-zA-Z0-9\s]{4,20}$/)) {
      return res.status(400).json({ success: false, message: 'wrong name format' }); 
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

