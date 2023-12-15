"use strict";

import { validateBody, getDBConnection } from "../util/util.js";

import { TABLE_USERS, USER_NAME, USER_PASSWORD, USER_ID } from "../constants.js";

export const onRegister = async (req, res) => {
  try {
    const validation = validateBody(
      req.body, { [USER_NAME]: 'string', [USER_PASSWORD]: 'string' }
    );
    if (!validation) {
      return res.status(400).json({ success: false, error: 'wrong request format' });
    }

    const { name, password } = req.body;

    if (!name.match(/^[a-zA-Z0-9]{4,10}$/)) {
      return res.status(400).json({ success: false, error: 'wrong username format' }); 
    }

    if (!password.match(/^[a-zA-Z0-9]{8,20}$/)) {
      return res.status(400).json({ success: false, error: 'wrong password format' }); 
    }

    const dbCon = await getDBConnection();
      
    const sql = `INSERT INTO ${TABLE_USERS} (${USER_NAME}, ${USER_PASSWORD}) VALUES (?, ?)`;
    const values = [ name, password ] ;

    const [result, _] = await dbCon.execute(sql, values);

    return res.status(200).json({ success: true, user: {
      [USER_NAME]: name, [USER_PASSWORD]: password, [USER_ID]: result.insertId
    }});
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }  
};

// export const onGetAllUsers = async(req, res) => {
//   try {
//     const dbCon = await getDBConnection();

//     const sql = `SELECT * FROM ${TABLE_USERS}`;

//     const [result, _] = await dbCon.execute(sql);

//     return res.status(200).json({ success: true, users: result });
//   } catch (err) {
//     return res.status(500).json({ success: false, error: err.message });
//   }
// };

// export const onGetUserById = async(req, res) => {
//   try {
//     const dbCon = await getDBConnection();

//     const sql = `SELECT * FROM ${TABLE_USERS} WHERE ${USER_ID} = ?`;
//     const values = [req.params.id];

//     const [result, _] = await dbCon.execute(sql, values);

//     console.log(result.length);
//     if (result.length === 0) {
//       return res.status(400).json({ success: false, message: 'user does not exist' });
//     }

//     return res.status(200).json({ success: true, users: result });
//   } catch (err) {
//     return res.status(500).json({ success: false, error: err.message });
//   }
// };
