import React from 'react';
// import { Link } from 'react-router-dom';

import TvLoader from '../components/TvLoader';
import Clapboard from '../components/LoadingClapBoard';
import GenreSearch from '../components/GenreSearch';
import TitleSearch from '../components/TitleSearch';
import ActorSearch from '../components/ActorSearch';
import SavedTitleList from '../components/SavedTitleList';
import TrendingActionMovies from '../components/TrendingActionMovies';
import TrendingAnimationMovies from '../components/TrendingAnimationMovies';
import TrendingComedyMovies from '../components/TrendingComedyMovies';
import TrendingCrimeMovies from '../components/TrendingCrimeMovies';
import TrendingDocumentaryMovies from '../components/TrendingDocumentaryMovies';
import TrendingDramaMovies from '../components/TrendingDramaMovies';
import TrendingFantasyMovies from '../components/TrendingFantasyMovies';
import TrendingHorrorMovies from '../components/TrendingHorrorMovies';
import TrendingScienceFictionMovies from '../components/TrendingScienceFictionMovies';
import TrendingThrillerMovies from '../components/TrendingThrillerMovies';
import TrendingMovies from '../components/TrendingMovies';
import TrendingTV from '../components/TrendingTV';
import TrendingActAdvTv from '../components/TrendingActAdvTv';
import TrendingDocTv from '../components/TrendingDocTv';
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