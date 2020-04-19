import React, { useEffect } from 'react';
// import RatingPage from '../containers/RatingPage';
import '../../reset.css';

export default function App() {

  console.log('APP');

  fetch('http:localhost:3000/api')
    .then(res => res.json())
    .then(res => {
      console.log(res);
    });



  return <h1>sup</h1>;
}
