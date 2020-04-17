const client = require('./client.js');

const dropTables = 'DROP TABLE IF EXISTS cards';
const createTables = `CREATE TABLE cards(
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255),
        image_uri VARCHAR(1024),
        cmc TINYINT,
        type_line VARCHAR(255),
        colors VARCHAR(255),
        expansion VARCHAR(255),
        rarity VARCHAR(255),
        rating_community INT,
        rating_pro INT)`;

client.connect((err) => {
  if(err) throw err;
  console.log('connected');
});

client.query(dropTables, (err, res) => {
  if(err) throw err;
  console.log('drop tables successful!', res);
});

client.query(createTables, (err, res) => {
  if(err) throw err;
  console.log('create tables successful!', res);
});

client.end((err) => {
  if(err) throw err;
});
