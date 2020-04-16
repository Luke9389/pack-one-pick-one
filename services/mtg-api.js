export default function getSet(set = '') {
  return fetch(`https://api.scryfall.com/cards/search?q=set:${set}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json());
}

