import React, { useEffect, useState } from "react";

import Button from "@mui/material/Button";

import { searchTitlesByTMDBId, fetchTitleDetails } from "../utils/apiCalls";

import { CACHE_DURATION } from "../utils/utils";

const GenreSourceTypeResults = () => {

  const [genreSourceTypeSearchResults, setGenreSourceTypeSearchResults] = useState([]);

  const [selectedTitle, setSelectedTitle] = useState("");

  // eslint-disable-next-line no-unused-vars
  const [selectedTitleDetails, setSelectedTitleDetails] = useState({});

  const [searchedGenres, setSearchedGenres] = useState([]);

  const [searchedTypes, setSearchedTypes] = useState([]);

  const [searchedSources, setSearchedSources] = useState([]);

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

  


  

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const titles = urlParams.get("titles");

    if (titles) {
      const parsedTitles = JSON.parse(decodeURIComponent(titles));
      setGenreSourceTypeSearchResults(parsedTitles);
    }

    const genres = urlParams.get("genres");
  if (genres) {
    let parsedGenres = JSON.parse(decodeURIComponent(genres));
    if (!Array.isArray(parsedGenres)) {
      parsedGenres = [parsedGenres];
    }
    setSearchedGenres(parsedGenres);
  }

  const types = urlParams.get("types");
  if (types) {
    let parsedTypes = JSON.parse(decodeURIComponent(types));
    if (!Array.isArray(parsedTypes)) {
      parsedTypes = [parsedTypes];
    }
    setSearchedTypes(parsedTypes);
  }

  const sources = urlParams.get("sources");
  if (sources) {
    let parsedSources = JSON.parse(decodeURIComponent(sources));
    if (!Array.isArray(parsedSources)) {
      parsedSources = [parsedSources];
    }
    setSearchedSources(parsedSources);
  }
  }, []);

  console.log(genreSourceTypeSearchResults);
  
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
      <h3>Genre Source Type Search Results</h3>
      <h4>You Searched For: </h4>
      <h5>{searchedGenres.map(id => watchModeGenreList[id]).filter(Boolean).join(', ')}</h5>
      <h5>{searchedTypes.filter(Boolean).join(', ')}</h5>
      <h5>{searchedSources.filter(Boolean).join(', ')}</h5>
      <div>
        {genreSourceTypeSearchResults
          .map((title) => (
            <div key={title.id}>
              {title.title && <p>{title.title}</p>}
              {title.genres && <p>{title.genres.map(id => watchModeGenreList[id]).filter(Boolean).join(', ')}</p>}
              {title.type && (<p>{title.type.charAt(0).toUpperCase() + title.type.slice(1)}</p>)}
              {title.year && <p>{title.year}</p>}
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

export default GenreSourceTypeResults;