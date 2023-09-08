import React from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

import TrendingMovies from "../components/TrendingMovies";
import PopularMovies from "../components/PopularMovies";
import TopRatedMovies from "../components/TopRatedMovies";
import PopularTV from "../components/PopularTV";
import TrendingTV from "../components/TrendingTV";
import TopRatedTV from "../components/TopRatedTV";

const NowTrending = () => {
  const loggedIn = Auth.loggedIn();
  return (
    <>
      {!loggedIn ? (
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
      ) : (
        <>
          <h2>Currently Trending</h2>
          <TrendingMovies />
          <PopularMovies />
          <TopRatedMovies />
          <TrendingTV />
          <PopularTV />
          <TopRatedTV />
        </>
      )}
    </>
  );
};

export default NowTrending;
