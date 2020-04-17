import React, { useEffect } from 'react';
// import RatingPage from '../containers/RatingPage';
import '../../reset.css';

export default function App() {

  //USE HOOKS FOR EXPRESS API CALL

  console.log('APP');

  useEffect(() => {
    async function getData() {
      const data = await fetch('/api');
      console.log(data.json());
    }
    getData();
  }, []);

  return <h1>sup</h1>;
}

