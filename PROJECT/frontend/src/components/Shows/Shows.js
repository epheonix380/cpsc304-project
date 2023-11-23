import './Shows.css'
import React, { useState, useEffect } from 'react';

function Shows() {
  const [shows, setShows] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await fetch('localhost:${envVariables.PORT}/events');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log(response);
        const data = await response.json();
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
      <ul>
        {shows.map(show => (<li key={show.eventid}>{show.eventname}</li>))}
      </ul>
    </div>
  );
}

export default Shows;