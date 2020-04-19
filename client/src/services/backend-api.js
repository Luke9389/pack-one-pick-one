const BACKEND_URL = process.env.BACKEND_URL;

export function fetchCardsFromSet(set) {

  return fetch(`${BACKEND_URL}/api/${set}`)
    .then(res => res.json())
    .then(res => res);
}

