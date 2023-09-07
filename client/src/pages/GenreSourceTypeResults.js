// import from react
import React, { useEffect, useState, useContext } from "react";
// import from react-router
// import context
import { SearchResultsContext } from "../context/SearchResultsContext";
// import from mui
import Button from "@mui/material/Button";
// import from utils
import { useTitleSelectionTMDBId } from "../utils/useSelectedTitleTMDBId.js";

const GenreSourceTypeResults = () => {

  const { genreSourceTypeSearchResults } = useContext(SearchResultsContext);
  const [searchedGenres] = useState([]);
  const [searchedTypes] = useState([]);
  const [searchedSources] = useState([]);
  const watchModeGenreList = {
    1: "Action",
    39: "Action & Adventure",
    2: "Adventure",
    3: "Animation",
    33: "Anime",
    31: "Biography",
    4: "Comedy",
    5: "Crime",
    6: "Documentary",
    7: "Drama",
    8: "Family",
    9: "Fantasy",
    28: "Game Show",
    10: "History",
    11: "Horror",
    21: "Kids",
    12: "Music",
    32: "Musical",
    13: "Mystery",
    22: "News",
    23: "Reality",
    14: "Romance",
    40: "Sci-Fi & Fantasy",
    15: "Science Fiction",
    25: "Soap",
    29: "Sports",
    26: "Talk",
    17: "Thriller",
    18: "War",
    41: "War & Politics",
    19: "Western",
  };

  const subStreamingSourceMap = {
    203: "Netflix",
    157: "Hulu",
    26: "Amazon Prime",
    387: "Max",
    372: "Disney+",
    371: "Apple TV",
    392: "Hayu",
    444: "Paramount+",
    248: "Showtime",
    393: "Crave",
    389: "Peacock",
    395: "Crave Starz",
    425: "Stan",
    323: "STARZ",
    424: "FoxtelNow",
    408: "Sky Go",
    108: "MGM+",
    406: "Now TV",
    423: "BINGE",
    419: "BritBox UK",
    367: "Kanopy",
    159: "Hulu with Showtime",
    368: "YouTube Premium",
    249: "Showtime with Amazon Prime",
  };

  const titleTypeMap = {
    movie: "Movie",
    tv_series: "TV Series",
    tv_miniseries: "TV Mini-Series",
    short_film: "Short Film",
  };
  
  useEffect(() => {}, [genreSourceTypeSearchResults]);
  console.log(genreSourceTypeSearchResults);
  const handleTitleSelected = useTitleSelectionTMDBId();

  return (
    <>
      <h3>Genre Source Type Search Results</h3>
      <h4>You Searched For: </h4>
      <h5>
        {searchedGenres
          .map((id) => watchModeGenreList[id])
          .filter(Boolean)
          .join(", ")}
      </h5>
      <h5>
        {searchedTypes
          .map((id) => titleTypeMap[id])
          .filter(Boolean)
          .join(", ")}
      </h5>
      <h5>
        {searchedSources
          .map((id) => subStreamingSourceMap[id])
          .filter(Boolean)
          .join(", ")}
      </h5>
      <div>
        {genreSourceTypeSearchResults.map((title) => (
          <div key={title.id}>
            {title.title && <p>{title.title}</p>}
            {title.genres && (
              <p>
                {title.genres
                  .map((id) => watchModeGenreList[id])
                  .filter(Boolean)
                  .join(", ")}
              </p>
            )}
            {title.type && (
              <p>
                {title.type === "movie"
                  ? "Movie"
                  : title.type === "tv_series"
                  ? "TV Series"
                  : title.type === "tv_miniseries"
                  ? "TV Miniseries"
                  : title.type === "short_film"
                  ? "Short Film"
                  : "Unknown Type"}
              </p>
            )}
            {title.year && <p>{title.year}</p>}
            <Button
              variant="contained"
              // value={title.type + '-' + title.id}
              value={title.id}
              onClick={handleTitleSelected}
            >
              More Details
            </Button>
            <Button variant="contained" value={title.id}>
              Save To Watchlist
            </Button>
          </div>
        ))}
      </div>
    </>
  );
};

export default GenreSourceTypeResults;
