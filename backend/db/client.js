const mysql = require('mysql');
const client = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mtg'
});

// eslint-disable-next-line no-undef
module.exports = client;
