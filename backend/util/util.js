"use strict";

import mysql from 'mysql';

export const getDBConnection = () => {
  return mysql.createConnection({
    host : process.env.DB_HOST,
    port : process.env.DB_PORT,
    database : process.env.DB_NAME,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWD
  });
};

export const validateBody = (body, fields) => {
  console.log(body)
  return true
};

