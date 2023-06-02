import React from 'react';
// import { Link } from 'react-router-dom';


import GenreSearch from '../components/GenreSearch';
import TitleSearch from '../components/TitleSearch';
import ActorSearch from '../components/ActorSearch';



const SearchPage = () => {
console.log("SearchPage rendered")
  return (
    <>
    
    <div>Search Page
      <div>
        <GenreSearch />
      </div>
      <div>
        <TitleSearch/>
      </div>
      <div>
        <ActorSearch/>
      </div>
    </div>
   
    </>
  )
  
};

export default SearchPage;