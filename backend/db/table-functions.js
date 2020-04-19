const client = require('./client.js');

const connectAndQuery = (query) => {

  client.connect((err) => {
    if(err) throw err;
    console.log('connected');
  });

  client.query(query, (err, res) => {
    if(err) throw err;
    console.log('SUCCESSFULLY EXECUTED', query);
  });

  client.end();
};

const tableFunctions = {
  drop: (table) => {

    if(table === 'ALL_TABLES') {
      client.connect();

      client.query('SHOW TABLES', (err, rows) => {

        rows.forEach(r => {
          client.query(`DROP TABLE IF EXISTS ${r.Tables_in_mtg}`);
        });

        client.end();

        console.log('ALL TABLES DROPPED!');
      });

    } else { connectAndQuery(`DROP TABLE IF EXISTS ${table};`); }
  },

  create: (table) => {

    let sql = '';

    if(table === 'cards') {

      sql = `CREATE TABLE cards(
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255),
      image_uri VARCHAR(1024),
      cmc TINYINT,
      type_line VARCHAR(255),
      colors VARCHAR(255),
      color_identity VARCHAR(255),
      expansion VARCHAR(255),
      rarity VARCHAR(255),
      rating_community INT,
      rating_pro INT)`;

    } else if(table === 'users') {

      sql = `CREATE TABLE users(
        id MEDIUMINT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255),
        pword VARCHAR(1024))`;

    } else {

      sql = `CREATE TABLE ${table}(
          id MEDIUMINT PRIMARY KEY AUTO_INCREMENT,
          card_id VARCHAR(255))`;
    }

    connectAndQuery(sql);
  }
};


const run = (func, arg) => {
  tableFunctions[func](arg);
};

run(process.argv[2], process.argv[3]);


