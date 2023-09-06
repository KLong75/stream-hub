import React from "react";
import { Link } from "react-router-dom";

// import TvLoader from '../components/TvLoader';
// import Clapboard from '../components/LoadingClapBoard';
import GenreSearch from "../components/GenreSearch";
import TitleSearch from "../components/TitleSearch";
import MixedGenreMovieSearch from "../components/MixedGenreMovieSearch";
import MixedGenreTVSearch from "../components/MixedGenreTVSearch";
import SearchByGenreSourceType from "../components/SearchByGenreSourceType";
import ActorSearch from "../components/ActorSearch";
import WatchList from "../components/WatchList";

import Auth from "../utils/auth";

const HomePage = () => {
  const loggedIn = Auth.loggedIn();

  return (
    <>
      {loggedIn ? (
        <>
          <h2>Welcome {Auth.getProfile().data.username}</h2>
          <section>
            <h3>Find Something to Watch</h3>
            <GenreSearch />
            <TitleSearch />
            <MixedGenreMovieSearch />
            <MixedGenreTVSearch />
            <SearchByGenreSourceType />
            <ActorSearch />
            <WatchList />
          </section>
        </>
      ) : (
        <>
          <h2>Welcome to streamHub</h2>
          <p>Please</p>
          <Link to="/login">
            <button>Login</button>
          </Link>
          <br />
          <p>Or</p>
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>
        </>
      )}
      {/* <h2>Home Page</h2>
    <div>
     
      <GenreSearch/>
      <TitleSearch/>
      <ActorSearch/>
      <SavedTitleList/>
     
    </div> */}
    </>
  );
};

export default HomePage;
