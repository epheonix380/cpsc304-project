import './Shows.css'
import ShowCard from '../ShowCard/ShowCard.js'
import React, { useState, useEffect } from 'react';

function Shows() {
  const [shows, setShows] = useState([]);
  const [minCosts, setMinCosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_URL}/events`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // console.log(response);
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

    const fetchLowestCosts = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_URL}//tickets/low`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // console.log(response);
        const jsonResponse = await response.json();
        const data = jsonResponse.data
        console.log(data);
        setMinCosts(data);
      } catch(error){
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchShowsAndCosts = async () => {
      await fetchShows();
      await fetchLowestCosts();
    }
    fetchShowsAndCosts();
    
  }, []);

  if (isLoading) {
    return <div className="maincontent">Loading...</div>;
  }

  if (error) {
    return <div className="maincontent">Error: {error}</div>;
  }
  

  return (
    <div className="shows maincontent">
      {shows.map(show => (<ShowCard show={show} />))}
    </div>
  );
}



export default Shows;






