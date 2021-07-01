import axios from 'axios';
import React, { useState, useEffect } from 'react';
import BrewItem from './BrewItem';

function BrewList({ p = 1 }) {
  const [brews, setBrews] = useState([]);
  const [page, setPage] = useState(p);

  useEffect(() => {
    axios
      .get('https://api.openbrewerydb.org/breweries?page=' + page)
      .then((response) => {
        setBrews(response.data);
      });
  }, [page]);

  return (
    <>
      <ul>
        {brews.map((brew) => (
          <BrewItem key={brew.id} {...brew} />
        ))}
      </ul>
      <button
        style={{
          display: page > 1 ? 'inline' : 'none',
        }}
        type='button'
        onClick={() => setPage(page - 1)}
      >
        -
      </button>
      <button
        style={{
          display: brews.length > 0 ? 'inline' : 'none',
        }}
        type='button'
        onClick={() => setPage(page + 1)}
      >
        +
      </button>
    </>
  );
}

export default BrewList;
