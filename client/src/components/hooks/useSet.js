import { useState, useEffect } from 'react';
import { fetchCardsFromSet } from '../../services/backend-api';
import sortCards from '../../services/sort-cards';

const useSet = (set, sortBy, dir) => {
  const [cards, setCards] = useState(null);

  useEffect(() => {
    if(!cards) {
      fetchCardsFromSet(set)
        .then(res => {
          const sortedCards = sortCards(res, sortBy, dir);
          setCards(sortedCards);
        });
    }
  });

  return cards;

};

export default useSet;

