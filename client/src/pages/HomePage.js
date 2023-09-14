import React from "react";
import { Link, useParams } from "react-router-dom";
// import components
// import TvLoader from '../components/TvLoader';
import GenreSearch from "../components/GenreSearch";
import TitleSearch from "../components/TitleSearch";
import MixedGenreMovieSearch from "../components/MixedGenreMovieSearch";
import MixedGenreTVSearch from "../components/MixedGenreTVSearch";
import SearchByGenreSourceType from "../components/SearchByGenreSourceType";
import ActorSearch from "../components/ActorSearch";
import WatchList from "../components/WatchList";
import LoadingClapboard from "../components/LoadingClapBoard";
// import ParallaxSwiper from "../components/ParallaxSwiper";

import Auth from "../utils/auth";

import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";

const HomePage = () => {
  const loggedIn = Auth.loggedIn();
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_ME : QUERY_ME, {
    variables: { username: userParam },
  });
  const user = data?.me || {};

  if (loading) {
    return (
      <div>
        Loading...
        <LoadingClapboard />
      </div>);
  }

  return (
    <>
      {loggedIn ? (
        <>
          <h2>Welcome {user.username}</h2>
          <section>
            <h3>Find Something to Watch</h3>
            <GenreSearch />
            <TitleSearch />
            <MixedGenreMovieSearch />
            <MixedGenreTVSearch />
            <SearchByGenreSourceType />
            <ActorSearch />
            <WatchList />
            <Link to="/account_settings">Account Settings</Link>
          </section>
        </>
      ) : (
        <>
          <h2>Welcome to streamHub</h2>
          <p>Please</p>
          <Link to="/login">
            <button>Login</button>
          </Link>
          <p>Or</p>
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>
        </>
      )}
    </>
  );
};

export default HomePage;
