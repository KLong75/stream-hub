import React from 'react';
// import { Link } from 'react-router-dom';


import GenreSearch from '../components/GenreSearch';
import TitleSearch from '../components/TitleSearch';
import ActorSearch from '../components/ActorSearch';
import SearchByGenreSourceType from '../components/SearchByGenreSourceType';
import MixedGenreMovieSearch from '../components/MixedGenreMovieSearch';
import MixedGenreTVSearch from '../components/MixedGenreTVSearch';



const SearchPage = () => {
console.log("SearchPage rendered")
  return (
    <>
    
    <div>Search Page
      
        <GenreSearch />

        <TitleSearch/>
     
        <ActorSearch/>

        <MixedGenreMovieSearch />

        <MixedGenreTVSearch />
        
        <SearchByGenreSourceType/>
      
    </div>
   
    </>
  )
  
};

export default SearchPage;