import React, { useState } from 'react';
import styles from './Rating.css';

const Rating = () => {
  const [selected, setSelected] = useState('');

  return (
    <div className={styles.ratingWrapper}>
      <div className={styles.gradeList}>
        <button 
          onClick={()=>{
            setSelected('F');
          }}
          className={`${styles.grade} ${selected === 'F' ? styles.selected : ''}`}>
          F
        </button>
        <button
          onClick={() => {
            setSelected('D');
          }}
          className={`${styles.grade} ${selected === 'D' ? styles.selected : ''}`}>
          D
        </button><button
          onClick={() => {
            setSelected('C');
          }}
          className={`${styles.grade} ${selected === 'C' ? styles.selected : ''}`}>
          C
        </button><button
          onClick={() => {
            setSelected('B');
          }}
          className={`${styles.grade} ${selected === 'B' ? styles.selected : ''}`}>
          B
        </button><button
          onClick={() => {
            setSelected('A');
          }}
          className={`${styles.grade} ${selected === 'A' ? styles.selected : ''}`}>
          A
        </button>
        <button
          onClick={() => {
            setSelected('S');
          }}
          className={`${styles.grade} ${selected === 'S' ? styles.selected : ''}`}>
          S
        </button>
      </div>
    </div>
  );
};


export default Rating;
