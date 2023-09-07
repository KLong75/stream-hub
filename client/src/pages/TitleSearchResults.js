// import from react
import React, { useEffect, useContext } from "react";
// import from mui
import Button from "@mui/material/Button";
// import context
import { SearchResultsContext } from "../context/SearchResultsContext";

import { useTitleSelection } from '../utils/useTitleSelection';

const TitleSearchResults = () => {
  
  const { titleSearchResults } = useContext(SearchResultsContext); // Get the data from context
  console.log(titleSearchResults);
  useEffect(() => {}, [titleSearchResults]);
  const handleTitleSelected = useTitleSelection();


  return (
    <>
      <h3>Title Search Results Page</h3>
      <div>
        {titleSearchResults
          .filter(
            (result) =>
              result.image_url !== "https://cdn.watchmode.com/profiles/"
          ) // Filter out titles with null year

          .map((result) => (
            <div key={result.id}>
              {result.title && <p>{result.title}</p>}

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
              {result.year && <p>{result.year}</p>}
              {result.image_url && (
                <img src={result.image_url} alt={result.title} />
              )}
              <Button
                variant="contained"
                value={result.id}
                onClick={handleTitleSelected}
              >
                More Details
              </Button>
              <Button variant="contained" value={result.id}>
                Save To Watchlist
              </Button>
            </div>
          ))}
      </div>
    </>
  );
};

export default TitleSearchResults;
