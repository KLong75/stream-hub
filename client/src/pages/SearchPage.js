import React from 'react';
import { Link } from 'react-router-dom';


import GenreSearch from '../components/GenreSearch';
import TitleSearch from '../components/TitleSearch';
import ActorSearch from '../components/ActorSearch';
import SearchByGenreSourceType from '../components/SearchByGenreSourceType';
import MixedGenreMovieSearch from '../components/MixedGenreMovieSearch';
import MixedGenreTVSearch from '../components/MixedGenreTVSearch';

import Auth from '../utils/auth';

const SearchPage = () => {
  const loggedIn = Auth.loggedIn();
  console.log("SearchPage rendered")



  return (
    <>
    {loggedIn ? (
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
  ) : (
    <>
      <h2>Welcome to streamHub</h2>
      <p>Please</p>
      <Link to="/login">
        <button>Login</button>
      </Link>
      <p>or</p>
      <Link to="/signup">
        <button>Signup</button>
      </Link>
    </>
  )}
  </>
  );

  
};

export default SearchPage;