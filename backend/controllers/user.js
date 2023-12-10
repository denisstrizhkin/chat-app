"use strict";

import { validateBody, getDBConnection } from "../util/util.js";

const createUser = (req, res) => {
  try {
    const validation = validateBody(
      req.body, { name: String, password: String }
    );
    if (!validation) {
      return res.status(400).json({ success: false, message: 'wrong request format' });
    }

    const dbCon = getDBConnection();
    dbCon.conncect(err => {
      const sql = 'INSERT INTO users (name, password) VALUES ?';
      const values = [
        [ req.body.name, req.body.password ] 
      ];

      con.query(sql, [values], (err, result) => {
        console.log(`Created user with ID: ${result.insertId}`);
        return res.stats(200).json({ success: true, user: {
          name: req.body.name, password: req.body.password, id: result.insertId
        }});
      })
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error });
  }  
};

export default {
  onGetAllUsers: async (req, res) => { },
  onGetUserById: async (req, res) => { },
  onCreateUser: async (req, res) => { createUser(req, res) },
  onDeleteUserById: async (req, res) => { },
}
