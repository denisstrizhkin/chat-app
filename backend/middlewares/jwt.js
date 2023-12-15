"use strict";

import jwt from 'jsonwebtoken';

import { validateBody, getDBConnection } from "../util/util.js";
import { TABLE_USERS, USER_NAME, USER_PASSWORD, USER_ID } from "../constants.js";

const SECRET_KEY = process.env.SECRET;

export const encode = async (req, res, next) => {
  try {
    const validation = validateBody(
      req.body, { [USER_NAME]: 'string', [USER_PASSWORD]: 'string' }
    );
    if (!validation) {
      return res.status(400).json({ success: false, error: 'wrong request format' });
    }

    const name = req.body[USER_NAME];
    const password = req.body[USER_PASSWORD];

    const dbCon = await getDBConnection();
 
    const sql = `SELECT * FROM ${TABLE_USERS} WHERE ${USER_NAME} = ?`;
    const values = [ name ];

    const [result, _] = await dbCon.execute(sql, values);
    const user = result[0];

    if (user[USER_PASSWORD] !== password) {
      return res.status(400).json({ success: false, error: 'wrong password' });
    }

    const payload = { [USER_ID]: user[USER_ID], [USER_NAME]: user[USER_NAME] };   
    const authToken = jwt.sign(payload, SECRET_KEY);

    req.authToken = authToken;
    next();
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}

export const decode = (req, res, next) => {
  if (!req.headers['authorization']) {
    return res.status(400).json({ success: false, error: 'No access token provided' });
  }
  const accessToken = req.headers.authorization.split(' ')[1];

  try {
    const decoded = jwt.verify(accessToken, SECRET_KEY);
    req[USER_ID] = decoded[USER_ID];
    req[USER_NAME] = decoded[USER_NAME];
    return next();
  } catch (error) {
    return res.status(401).json({ success: false, error: error.message });
  }
}
