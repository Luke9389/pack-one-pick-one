import React from 'react';
import PropTypes from 'prop-types';
import styles from './Card.css';

const Card = ({ img }) => {

  return (
    <div className={styles.cardWrapper}>
      <img className={styles.cardImg} src={img}></img>
    </div>
  );
};

Card.propTypes = {
  img: PropTypes.string,
};

export default Card;
