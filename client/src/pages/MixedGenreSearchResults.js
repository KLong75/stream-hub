import React, { useEffect, useState } from "react";

import Button from "@mui/material/Button";

import { searchTitlesByTMDBId, fetchTitleDetails } from "../utils/apiCalls";

import { CACHE_DURATION } from "../utils/utils";



const MixedGenreSearchResults = () => {
  const [mixedGenreSearchResults, setMixedGenreSearchResults] = useState([]);

  const [selectedTitle, setSelectedTitle] = useState("");

  const [searchedGenres, setSearchedGenres] = useState([]);
  
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
  
  


  

  // eslint-disable-next-line no-unused-vars
  const [selectedTitleDetails, setSelectedTitleDetails] = useState({});

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const titles = urlParams.get("titles");

    if (titles) {
      const parsedTitles = JSON.parse(decodeURIComponent(titles));
      setMixedGenreSearchResults(parsedTitles);
    }

    const genres = urlParams.get("genres");

    if (genres) {
      const parsedGenres = JSON.parse(decodeURIComponent(genres));
      setSearchedGenres(parsedGenres);
    }
  }, []);

  

  console.log(mixedGenreSearchResults);
  
  const handleTitleSelected = async (event) => {
    event.preventDefault();
    setSelectedTitle(event.target.value);
    console.log(event.target.value);
    const selectedTitleId = event.target.value;
    console.log(selectedTitle);

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
        window.location.href ='/title_details?titleDetails=' + encodeURIComponent(JSON.stringify(data));
        return;
      } else {
        localStorage.removeItem(`titleDetails_${selectedTitleId}`);
        console.log('Cached Data Expired and Removed');
      }
    }

    if (!cachedTitleDetails) {

    try {
      const response = await searchTitlesByTMDBId(selectedTitleId);

      console.log(fetchTitleDetails(selectedTitleId));

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const titleDetails = await response.json();

      console.log(titleDetails);

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
        similar_titles: titleDetails.similar_titles ? titleDetails.similar_titles.slice(0, 5) : [],
        sources: titleDetails.sources.filter((source) => source.type === "sub"),
        // trailer: titleDetails.trailer,
        // trailer: titleDetails.trailer.replace(/watch\?v=/, 'embed/'),
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
      localStorage.setItem(
        `titleDetails_${selectedTitleId}`,
        JSON.stringify(cacheData)
      );
      window.location.href =
        "/title_details?titleDetails=" +
        encodeURIComponent(JSON.stringify(titleDetailsData));
    } catch (err) {
      console.error(err);
    }
  }
};

  return (
    <>
      <h3>Mixed Genre Search Results</h3>
      <h4>You Searched For: {searchedGenres.map(id => genreList[id]).filter(Boolean).join(', ')}</h4>
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