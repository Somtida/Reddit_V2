'use strict';
// const sqlite3 = require('sqlite3');
// const path = require('path');
//
// const dataPath = path.join(__dirname, '../data/data.db');
//
// const db = new sqlite3.Database(dataPath);
//
// const mysql = require('mysql');

let db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.MYSQL_PASSWORD,
  database: 'firstTest'
});

db.connect();

module.exports = db;
