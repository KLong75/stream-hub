import React from 'react';
// import { Link } from 'react-router-dom';


import GenreSearch from '../components/GenreSearch';
import TitleSearch from '../components/TitleSearch';
import ActorSearch from '../components/ActorSearch';
import SavedTitleList from '../components/SavedTitleList';
import TrendingAction from '../components/TrendingAction';
import TrendingAnimation from '../components/TrendingAnimation';
import TrendingComedy from '../components/TrendingComedy';
import TrendingCrime from '../components/TrendingCrime';
import TrendingDocumentary from '../components/TrendingDocumentary';
import TrendingDrama from '../components/TrendingDrama';
import TrendingFantasy from '../components/TrendingFantasy';
import TrendingHorror from '../components/TrendingHorror';
import TrendingScienceFiction from '../components/TrendingScienceFiction';
import TrendingThriller from '../components/TrendingThriller';
import TrendingMovies from '../components/TrendingMovies';
import TrendingTV from '../components/TrendingTV';

import { discoverTrendingActionMovies, trendingTvTest } from '../utils/apiCalls';

// discoverTrendingActionMovies();
trendingTvTest();

const HomePage = () => {

  return (
    <>
    
    <div>Home Page
      <GenreSearch/>
      <TitleSearch/>
      <ActorSearch/>
      <SavedTitleList/>
      {/* <TrendingAction/> */}
      {/* <TrendingAnimation/> */}
      {/* <TrendingComedy/>  */}
      {/* <TrendingCrime/> */}
      {/* <TrendingDocumentary/> */}
      {/* <TrendingDrama/> */}
      {/* <TrendingFantasy/> */}
      {/* <TrendingHorror/> */}
      {/* <TrendingScienceFiction/> */}
      {/* <TrendingThriller/> */}
      {/* <TrendingMovies/> */}
      {/* <TrendingTV/> */}
      
    </div>
    </>
  )
  
};

export default HomePage;