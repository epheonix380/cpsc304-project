import './Shows.css'
import ShowCard from '../ShowCard/ShowCard.js'
import React, { useState, useEffect } from 'react';

function Shows() {
  const [shows, setShows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await fetch('http://127.0.0.1:3001/events');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log(response);
        const jsonResponse = await response.json();
        const data = jsonResponse.data
        console.log(data);
        setShows(data);
      } catch(error){
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchShows();
  }, []);

  if (isLoading) {
    return <div className="maincontent">Loading...</div>;
  }

  if (error) {
    return <div className="maincontent">Error: {error}</div>;
  }


  return (
    <div className="shows maincontent">
      {shows.map(show => (<ShowCard show={show}/>))}
    </div>
  );
}

export default Shows;