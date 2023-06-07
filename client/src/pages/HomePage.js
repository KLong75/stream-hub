import React from 'react';
// import { Link } from 'react-router-dom';


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

// import { fetchSources, discoverTrendingActionMovies, trendingTvTest } from '../utils/apiCalls';

// discoverTrendingActionMovies();
// trendingTvTest();

const HomePage = () => {

  return (
    <>
    <h2>Home Page</h2>
    <div>
      <GenreSearch/>
      <TitleSearch/>
      <ActorSearch/>
      <SavedTitleList/>
      {/* <TrendingActionMovies/> */}
      {/* <TrendingAnimationMovies/> */}
      {/* <TrendingComedyMovies/>  */}
      {/* <TrendingCrimeMovies/> */}
      {/* <TrendingDocumentaryMovies/> */}
      {/* <TrendingDramaMovies/> */}
      {/* <TrendingFantasyMovies/> */}
      {/* <TrendingHorrorMovies/> */}
      {/* <TrendingScienceFictionMovies/> */}
      {/* <TrendingThrillerMovies/> */}
      <TrendingMovies/>
      <TrendingTV/>
      
    </div>
    </>
  )
  
};

export default HomePage;