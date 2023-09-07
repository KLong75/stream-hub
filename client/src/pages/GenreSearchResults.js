// import from react
import React, { useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
// import context
import { SearchResultsContext } from "../context/SearchResultsContext";
// import from mui
import Button from "@mui/material/Button";
// import from utils
import { useTitleSelection } from "../utils/useTitleSelection";

const GenreSearchResults = () => {
  const location = useLocation();
  const searchedGenreLabel = location.state?.genre;
  const { genreSearchResults } = useContext(SearchResultsContext); // Get the data from context
  useEffect(() => {}, [genreSearchResults]);
  console.log(genreSearchResults);
  const handleTitleSelected = useTitleSelection();

  return (
    <>
      <div>Genre Search Results Page</div>
      <h4>You Searched For: </h4>
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
    </>
  );
};

export default GenreSearchResults;
