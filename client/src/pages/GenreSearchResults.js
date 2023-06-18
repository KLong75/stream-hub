// import from react
import React, { useEffect, useState, useContext } from "react";
// import from react-router
import { useNavigate } from "react-router-dom";
// import context
import { SearchResultsContext } from '../context/SearchResultsContext'; 
import { TitleDetailsContext } from '../context/TitleDetailsContext';
// import from mui
import Button from "@mui/material/Button";
// import from utils
import { fetchTitleDetails } from "../utils/apiCalls";
import { CACHE_DURATION } from '../utils/utils';

const GenreSearchResults = () => {
  const navigate = useNavigate();
  const { genreSearchResults } = useContext(SearchResultsContext); // Get the data from context
  const { setSelectedTitleDetails } = useContext(TitleDetailsContext);

  useEffect(() => {}, [genreSearchResults]);

  console.log(genreSearchResults);

  const handleTitleSelected = async (event) => {
    event.preventDefault();
    // setSelectedTitle(event.target.value);
    const selectedTitleId = event.target.value;
    console.log(selectedTitleId);

    const cachedTitleDetails = localStorage.getItem(
      `titleDetails_${selectedTitleId}`
    );
    console.log("Cached Data Retrieved: cachedTitleDetails", cachedTitleDetails);
    if (cachedTitleDetails) {
      const { data, timestamp } = JSON.parse(cachedTitleDetails);

      console.log(CACHE_DURATION);

      const now = Date.now();
      console.log(now - timestamp);
      if (now - timestamp < CACHE_DURATION) {
        setSelectedTitleDetails(data);
        console.log('cached data retrieved, parsed, time checked',data)
        navigate('/title_details')
        // window.location.href ='/title_details?titleDetails=' + encodeURIComponent(JSON.stringify(data));
        return;
      } else {
        localStorage.removeItem(`titleDetails_${selectedTitleId}`);
        console.log('Cached Data Expired and Removed');
      }
    }

    if (!cachedTitleDetails) {
      try {
        const response = await fetchTitleDetails(selectedTitleId);

        if (!response.ok) {
          throw new Error("Something went wrong");
        }

        const  titleDetails  = await response.json();

        console.log("New Data Retrieved:", titleDetails);

        const titleDetailsData = {
          id: titleDetails.id,
          title: titleDetails.title,
          type: titleDetails.type,
          year: titleDetails.year,
          backdrop: titleDetails.backdrop,
          critic_score: titleDetails.critic_score,
          genre_names: titleDetails.genre_names,
          network_names: titleDetails.network_names,
          plot_overview: titleDetails.plot_overview,
          poster: titleDetails.poster,
          release_date: titleDetails.release_date,
          runtime: titleDetails.runtime,
          similar_titles: titleDetails.similar_titles.slice(0, 5) ?? [],
          sources: titleDetails.sources.filter(
            (source) => source.type === "sub"
          ),
          purchase_sources: titleDetails.sources.filter(
            (source) => source.type === "purchase"
          ),
          trailer: titleDetails.trailer && titleDetails.trailer.includes('youtube') ? titleDetails.trailer.replace(/watch\?v=/, 'embed/') : titleDetails.trailer,
          trailer_thumbnail: titleDetails.trailer_thumbnail,
          us_rating: titleDetails.us_rating,
          user_rating: titleDetails.user_rating,
          imdb_id: titleDetails.imdb_id,
        };

        console.log(titleDetailsData);

        setSelectedTitleDetails(titleDetailsData);

        const cacheData = {
          data: titleDetailsData,
          timestamp: Date.now(),
        };
        localStorage.setItem(`titleDetails_${selectedTitleId}`, JSON.stringify(cacheData));
        navigate('/title_details');
      } catch (error) {
        console.log(error);
      }
    };
  };

  return (
    <>
      <div>Genre Search Results Page</div>
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
