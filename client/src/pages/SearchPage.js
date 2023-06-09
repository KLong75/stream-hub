import React from 'react';
// import { Link } from 'react-router-dom';


import GenreSearch from '../components/GenreSearch';
import TitleSearch from '../components/TitleSearch';
import ActorSearch from '../components/ActorSearch';
import SearchByGenreSourceType from '../components/SearchByGenreSourceType';



const SearchPage = () => {
console.log("SearchPage rendered")
  return (
    <>
    
    <div>Search Page
      
        <GenreSearch />

        <TitleSearch/>
     
        <ActorSearch/>
        
        <SearchByGenreSourceType/>
      
    </div>
   
    </>
  )
  
};

export default SearchPage;