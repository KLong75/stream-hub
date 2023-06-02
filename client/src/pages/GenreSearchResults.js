import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';

import { fetchTitleDetails } from '../utils/apiCalls';

const GenreSearchResults = () => {

  const [genreSearchResults, setGenreSearchResults] = useState([]);

  const [selectedTitle, setSelectedTitle] = useState('');

  const [selectedTitleDetails, setSelectedTitleDetails] = useState({});

  console.log(selectedTitleDetails)


  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const titles = urlParams.get('titles');

    if (titles) {
      const parsedTitles = JSON.parse(decodeURIComponent(titles));
      setGenreSearchResults(parsedTitles);
    }
  }, []);

  console.log(genreSearchResults)



  const handleTitleSelected = async (event) => {
    event.preventDefault();
    setSelectedTitle(event.target.value);
    console.log(setSelectedTitle);
    console.log(event.target.value);
    const selectedTitleId = event.target.value;
    console.log(selectedTitle)
    
    try {
  
    // const response = await fetch('https://api.watchmode.com/v1/list-titles?genres=' + selectedGenreCode + '&limit=2&apiKey=SPq4jFg1pgbWR6mP6rZGPrBrNGisLbdUeu2P0TKp')
  
    const response = await fetchTitleDetails(selectedTitleId);
  
    console.log(fetchTitleDetails(selectedTitleId));
  
    if (!response.ok) {
      throw new Error('Something went wrong')
    }
  
    const  titleDetails  = await response.json();
  
    console.log(titleDetails)
  
    const titleDetailsData = {
      id: titleDetails.id,
      title: titleDetails.title,
      type: titleDetails.type,
      year: titleDetails.year,
      backdrop: titleDetails.backdrop,
      critic_score: titleDetails.critic_score,
      genre_names: titleDetails.genre_names,
      network_names: titleDetails.network_names,
      plot_overview: titleDetails.plot_overview,
      poster: titleDetails.poster,
      release_date: titleDetails.release_date,
      runtime: titleDetails.runtime,
      similar_titles: titleDetails.similar_titles,
      sources: titleDetails.sources,
      trailer: titleDetails.trailer,
      trailer_thumbnail: titleDetails.trailer_thumbnail,
      us_rating: titleDetails.us_rating,
      user_rating: titleDetails.user_rating,
      imdb_id: titleDetails.imdb_id,
    }
    
    
    console.log(titleDetailsData);
  
    setSelectedTitleDetails(titleDetailsData);
    setSelectedTitle('');
    // window.location.href = '/title_details';
    window.location.href = '/title_details?titleDetails=' + encodeURIComponent(JSON.stringify(titleDetailsData));
  
  
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <>
    <div>Genre Search Results Page</div>
    <div>
        {genreSearchResults.map((result) => (
          <div key = {result.id}>
            <p>{(`${result.title}`)}</p>
            <p>{(`${result.type}`)}</p>
            <p>{(`${result.year}`)}</p>
            <Button value={result.id} onClick={handleTitleSelected}>Select Title</Button>
          </div>
        ))}
      </div>
    
    </>
  )
  
};

export default GenreSearchResults;