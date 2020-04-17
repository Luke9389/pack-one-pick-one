const superagent = require('superagent');

function getSet(set = '', page = 1) {
  return superagent.get(`https://api.scryfall.com/cards/search?q=set:${set}&page=${page}`)
    .then(res => {
      return res.body;
    });
}

module.exports = getSet;
