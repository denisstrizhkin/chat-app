"use strict";

import mysql from 'mysql2/promise';

export const getDBConnection = async () => {
  return await mysql.createConnection({
    host : process.env.DB_HOST,
    port : process.env.DB_PORT,
    database : process.env.DB_NAME,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWD
  });
};

export const validateBody = (body, fields) => {
  if (typeof fields !== 'object') {
    throw new Error('\'fields\' isn\'t a dictionary')
  }

  for (const [key, value] of Object.entries(fields)) {
    if (typeof body[key] !== value) {
      return false;
    }
  }
  
  return true
};

