'use strict';


 const mysql = require('mysql');
console.log('process.env.MYSQL_PASSWORD:', process.env.MYSQL_PASSWORD);
let db = mysql.createConnection(process.env.JAWSDB_URL || {
  host: 'localhost',
  user: 'root',
  password: process.env.MYSQL_PASSWORD,
  database: 'firstTest'
});

db.connect();

module.exports = db;
