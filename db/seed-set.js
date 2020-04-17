const client = require('./client.js');
const getSet = require('../services/mtg-api');

// eslint-disable-next-line no-undef
const set = process.argv[2];

client.connect((err) => {
  if(err) throw err;
  console.log('connected');
});

const getColors = (colors) => {
  if(!colors.length) return 'Colorless';
  return colors.join();
};

function seedData(set, page) {
  getSet(set, page)
    .then(res => {
      const data = res.data;
      data.forEach(c => {
        console.log('inserted', c.name);
        return client.query(
          `INSERT INTO cards(id, name, image_uri, cmc, type_line, colors, expansion, rarity) 
        VALUES(?,?,?,?,?,?,?,?);`,
          [
            c.id,
            c.name,
            c.image_uris.png,
            c.cmc,
            c.type_line,
            getColors(c.colors),
            c.set,
            c.rarity
          ]
        );
      });
      return [res.has_more, page];
    })
    .then(([hasMore, currentPage]) => {
      if(hasMore) {
        seedData(set, currentPage + 1);
      } else {
        client.end();
      }
    });
}

seedData(set, 1);
