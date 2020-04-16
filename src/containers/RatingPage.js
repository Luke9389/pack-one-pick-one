import React, { useState, useEffect, useRef } from 'react';
import getSet from '../../services/mtg-api';
import Card from '../components/Card';
import styles from './RatingPage.css';

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
      <button disabled={index <= 0} onClick={previousCard}>{'<'}</button>
      <Card img={uri} />
      <button onClick={nextCard}>{'>'}</button>
    </div>
  );
};

export default RatingPage;
