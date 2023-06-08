import React, { useEffect, useState } from "react";
import { searchTitlesByTMDBId, fetchTitleDetails } from "../utils/apiCalls";

import Button from "@mui/material/Button";

import imageNotAvailable from "../assets/images/no_image_available.jpg";

import { CACHE_DURATION } from "../utils/utils";

const ActorSearchResults = () => {
  const [actorSearchResults, setActorSearchResults] = useState([]);

  const [selectedTitle, setSelectedTitle] = useState("");

  const [selectedTitleDetails, setSelectedTitleDetails] = useState({});

  console.log(selectedTitleDetails);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const actors = urlParams.get("actors");

    if (actors) {
      const parsedActors = JSON.parse(decodeURIComponent(actors));
      setActorSearchResults(parsedActors);
    }
  }, []);

  console.log(actorSearchResults);

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
        trailer: titleDetails.trailer,
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
      <h3>Actor Search Results</h3>
      <div className="search-results-container">
        {actorSearchResults
          .filter((result) => result.known_for.length > 0)
        .map((result) => (
          <div key={result.id}>
            <p>{`${result.name}`}</p>
            <p>{`${result.job}`}</p>
            {/* {result.image_url ? (
            <img src={result.image_url} alt={result.name} />
            ) : (
            <p>No image available</p>
            )} */}

            {result.image_url ? (
              <img
                src={result.image_url}
                alt={result.name}
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            ) : (
              <div>
                <p>No image available</p>
                <img src={imageNotAvailable} alt="Unavailable" />
              </div>
            )}

            <p>Known For: </p>
            {/* Iterate through known_for array */}
            {result.known_for.map((knownForItem) => (
              <div key={knownForItem.id}>
                <p>{knownForItem.title}</p>
                <img
                  src={
                    "https://image.tmdb.org/t/p/w200/" +
                    knownForItem.poster_path
                  }
                  alt={knownForItem.title}
                />
                <p>{knownForItem.overview}</p>
                <Button
                  variant="contained"
                  value={knownForItem.media_type + "-" + knownForItem.id}
                  onClick={handleTitleSelected}
                >
                  More Details
                </Button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default ActorSearchResults;
