'use strict';
const sqlite3 = require('sqlite3');
const path = require('path');

const dataPath = path.join(__dirname, '../data/data.db');

const db = new sqlite3.Database(dataPath);

module.exports = db;
