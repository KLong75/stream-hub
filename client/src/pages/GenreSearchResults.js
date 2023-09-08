// import from react
import React, { useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
// import context
import { SearchResultsContext } from "../context/SearchResultsContext";
// import from mui
import Button from "@mui/material/Button";
// import from utils
import { useTitleSelection } from "../utils/useTitleSelection";

import Auth from "../utils/auth";

const GenreSearchResults = () => {
  const location = useLocation();
  const loggedIn = Auth.loggedIn();
  const searchedGenreLabel = location.state?.genre;
  const { genreSearchResults } = useContext(SearchResultsContext); // Get the data from context
  useEffect(() => {}, [genreSearchResults]);
  console.log(genreSearchResults);
  const handleTitleSelected = useTitleSelection();

  return (
    <>
      {!loggedIn ? (
        <div>
          <h2>Welcome to streamHub</h2>
          <p>Please</p>
          <Link to="/login">
            <button>Login</button>
          </Link>
          <p>Or</p>
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>
        </div>
      ) : (
        <div>
          <h3>Genre Search Results</h3>
          <h4>Results For: </h4>
          <h5>{searchedGenreLabel}</h5>
          <div>
            {genreSearchResults.map((result) => (
              <div key={result.id}>
                <p>{`${result.title}`}</p>
                {result.type && (
                  <p>
                    {result.type === "movie"
                      ? "Movie"
                      : result.type === "tv_series"
                      ? "TV Series"
                      : result.type === "tv_miniseries"
                      ? "TV Miniseries"
                      : result.type === "short_film"
                      ? "Short Film"
                      : "Unknown Type"}
                  </p>
                )}
                <p>{`${result.year}`}</p>
                <Button
                  variant="contained"
                  value={result.id}
                  onClick={handleTitleSelected}
                >
                  More Details
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default GenreSearchResults;
