// This script should be accessed from the terminal. 
// For example: 
//   npm run seed 'iko'
// will seed data from Ikoria.

const client = require('./client.js');
const getSet = require('../services/mtg-api');

client.connect();

// get the set name to seed
// eslint-disable-next-line no-undef
const set = process.argv[2];

//recursive function
function seedData(set, page) {
  getSet(set, page)
    .then(res => {
      res.data.forEach(c => {

        //ES6 guarantees object key order for non-integer keys
        const cardData = {
          'id': c.id,
          'name': c.name,
          'image_uri': c.image_uris.png,
          'cmc': c.cmc,
          'type_line': c.type_line,
          'colors': c.colors.length ? c.colors.join() : 'C',
          'color_identity': c.color_identity.length ? c.color_identity.join() : 'C',
          'expansion': c.set,
          'rarity': c.rarity
        };

        console.log(cardData.name);

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
