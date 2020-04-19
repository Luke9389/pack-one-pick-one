import React, { useEffect } from 'react';
// import RatingPage from '../containers/RatingPage';
import '../../reset.css';

const BACKEND_URL = process.env.BACKEND_URL;

export default function App() {

  console.log('APP');

  fetch(`${BACKEND_URL}/api/setReview/soi`)
    .then(res => res.json())
    .then(res => {
      console.log(res);
    });



  return <h1>sup</h1>;
}
