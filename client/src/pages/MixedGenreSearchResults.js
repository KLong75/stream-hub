// import from react
import React, { useEffect, useState, useContext } from "react";
import { useLocation } from 'react-router-dom';
// import context
import { SearchResultsContext } from "../context/SearchResultsContext";
// import from mui
import Button from "@mui/material/Button";
// import from utils
import { useTitleSelectionTMDBId } from '../utils/useTitleSelectionTMDBId';

const MixedGenreSearchResults = () => {
  const location = useLocation();
  const searchedGenresFromRouter = location.state?.genres || [];
  const { mixedGenreSearchResults, } = useContext(SearchResultsContext); 
  const [searchedGenres] = useState(searchedGenresFromRouter);
  
  const genreList = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    53: "Thriller",
    10752: "War",
    37: "Western",
    10759: "Action & Adventure",
    10762: "Kids",
    10763: "News",
    10764: "Reality",
    10765: "Sci-Fi & Fantasy",
    10766: "Soap",
    10767: "Talk",
    10768: "War & Politics",
  };

  useEffect(() => {}, [mixedGenreSearchResults]);
  console.log(mixedGenreSearchResults);

  const handleTitleSelected = useTitleSelectionTMDBId();

  return (
    <>
      <h3>Mixed Genre Search Results</h3>
      <h4>Search Results For: {searchedGenres.map(id => genreList[id]).filter(Boolean).join(', ')}</h4>

      <div>
        {mixedGenreSearchResults
          .map((title) => (
            <div key={title.id}>
              {title.title && <p>{title.title}</p>}
              {title.genres && <p>{title.genres.map(id => genreList[id]).filter(Boolean).join(', ')}</p>}
              {title.type && (<p>{title.type.charAt(0).toUpperCase() + title.type.slice(1)}</p>)}
              {title.year && <p>{title.year}</p>}
              {title.poster_url && (
                <img src={title.poster_url} alt={title.title} />
              )}
              {title.backdrop_url && ( 
                <img src={title.backdrop_url} alt={title.title} />
              )}
              <Button
                variant="contained"
                value={title.type + '-' + title.id}
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
}

export default MixedGenreSearchResults;