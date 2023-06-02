import React from 'react';
// import { Link } from 'react-router-dom';


import GenreSearch from '../components/GenreSearch';
import TitleSearch from '../components/TitleSearch';
import ActorSearch from '../components/ActorSearch';
import SavedTitleList from '../components/SavedTitleList';

const HomePage = () => {

  return (
    <>
    
    <div>Home Page
      <GenreSearch/>
      <TitleSearch/>
      <ActorSearch/>
      <SavedTitleList/>
    </div>
    
    </>
  )
  
};

export default HomePage;