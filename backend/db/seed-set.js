// This script should be accessed from the terminal.
// For example: 
//   npm run seed 'iko'
// will seed data from Ikoria.

const client = require('./client.js');
const getSet = require('../services/mtg-api');
const getCardData = require('../services/get-card-data');

client.connect();

// get the set name to seed
// eslint-disable-next-line no-undef
const set = process.argv[2];

//recursive function
function seedData(set, page) {
  client.query(
    `CREATE TABLE IF NOT EXISTS ${set}_reviews(
    id MEDIUMINT PRIMARY KEY AUTO_INCREMENT,
    user_id VARCHAR(255) REFERENCES users(id));`, 
    function (err, rows, fields) {
      if(err) throw err;
      console.log(`created table: ${set}_reviews`);
    });
  getSet(set, page)
    .then(res => {
      res.data.forEach(c => {
        const cardData = getCardData(c.layout, c);
        //   cardData: {
        //   id: '610bb98c-d66a-44cc-92e2-a80d700b59e4',
        //   name: 'Parcelbeast',
        //   image_uri: 'https://img.scryfall.com/cards/png/front/6/1/610bb98c-d66a-44cc-92e2-a80d700b59e4.png?1586266302',
        //   cmc: 4,
        //   type_line: 'Creature — Elemental Beast',
        //   colors: 'G,U',
        //   color_identity: 'G,U',
        //   expansion: 'iko',
        //   rarity: 'uncommon'
        // }
        client.query(
          `ALTER TABLE ${set}_reviews
          ADD COLUMN \`${cardData.name}\` TEXT NOT NULL`, 
          function (err, rows, fields) {
          if(err) throw err;
        });
        return client.query(
          `INSERT INTO cards(${Object.keys(cardData).join(', ')}) 
          VALUES(${'?, '.repeat(Object.keys(cardData).length - 1)}?);`,
          Object.values(cardData)
        );
      });

      //res.has_more is a boolean indicating is there is another page of data available
      return res.has_more;
    })

    .then(hasMore => { hasMore ? seedData(set, page + 1) : client.end(); });

}

seedData(set, 1);
