import React, { useState, useEffect, useRef } from 'react';
// import getSet from '../../services/mtg-api';
import Card from '../components/Card';
import styles from './RatingPage.css';
import Rating from '../components/Rating';

const RatingPage = () => {
  const [index, setIndex] = useState(0);
  const [set, setSet] = useState([]);
  const [uri, setUri] = useState('');
  const pageLoaded = useRef(false);

  useEffect(() => {
    getSet('iko')
      .then(res => {
        setSet(res);
        return res;
      })
      .then(res => {
        setUri(res.data[index].image_uris.png);
        pageLoaded.current = true;
      });
  }, []);

  useEffect(() => {
    if(pageLoaded.current) setUri(set.data[index].image_uris.png);
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
