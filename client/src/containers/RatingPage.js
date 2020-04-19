import React, { useState, useEffect, useRef } from 'react';
import useSet from '../components/hooks/useSet';
import Card from '../components/Card';
import styles from './RatingPage.css';
import Rating from '../components/Rating';

const RatingPage = () => {
  const [index, setIndex] = useState(0);
  const [uri, setUri] = useState('');
  const pageLoaded = useRef(false);
  const cards = useSet('iko', 'cmc', 'desc');

  useEffect(() => {
    if(cards) {
      setUri(cards[0].image_uri);
      pageLoaded.current = true;
    }
  }, [cards]);

  useEffect(() => {
    if(pageLoaded.current) setUri(cards[index].image_uri);
  }, [index]);

  const nextCard = () => {
    setIndex(index + 1);
  };

  const previousCard = () => {
    if(index <= 0) return;
    setIndex(index - 1);
  };

  return (
    <div className={styles.ratingPageWrapper}>
      <h1 className={styles.title}>Ikoria Set Review</h1>
      <button className={`${styles.button} ${styles.buttonLeft}`} disabled={index <= 0} onClick={previousCard}>{'◁'}</button>
      <Card img={uri} />
      <button className={`${styles.button} ${styles.buttonRight}`} onClick={nextCard}>{'◁'}</button>
      <Rating />
    </div>
  );
};

export default RatingPage;
