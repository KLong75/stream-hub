import React from 'react';
// import { Link } from 'react-router-dom';

import TvLoader from '../components/TvLoader';
import Clapboard from '../components/LoadingClapBoard';
import GenreSearch from '../components/GenreSearch';
import TitleSearch from '../components/TitleSearch';
import ActorSearch from '../components/ActorSearch';
import SavedTitleList from '../components/SavedTitleList';

import { fetchSources, fetchTitlesBySource } from '../utils/apiCalls';

// import { fetchSources, discoverTrendingActionMovies, trendingTvTest } from '../utils/apiCalls';

// discoverTrendingActionMovies();
// trendingTvTest();
// fetchSources();
// fetchTitlesBySource();


const HomePage = () => {

  return (
    <>
    <h2>Home Page</h2>
    <div>
      {/* <Clapboard/> */}
      {/* <TvLoader/> */}
      <GenreSearch/>
      <TitleSearch/>
      <ActorSearch/>
      <SavedTitleList/>
      {/* <TrendingMovies/> */}
      {/* <TrendingTV/> */}
    </div>
    </>
  )
  
};

export default HomePage;