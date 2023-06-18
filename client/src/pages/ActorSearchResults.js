// import from react
import React, { useEffect, useState, useContext } from "react";
// import from react-router
import { useNavigate } from "react-router-dom";
// import context
import { SearchResultsContext } from "../context/SearchResultsContext";
import { TitleDetailsContext } from "../context/TitleDetailsContext";
// import from mui
import Button from "@mui/material/Button";
// import from utils
import { searchTitlesByTMDBId, fetchTitleDetails } from "../utils/apiCalls";
import { CACHE_DURATION } from "../utils/utils";
// import images
import imageNotAvailable from "../assets/images/no_image_available.jpg";

const ActorSearchResults = () => {
  const navigate = useNavigate();
  const { actorSearchResults } = useContext(SearchResultsContext); // Get the data from context
  // const [actorSearchResults, setActorSearchResults] = useState([]);
  const { setSelectedTitleDetails } = useContext(TitleDetailsContext);
  const [selectedTitle, setSelectedTitle] = useState("");

  // const [selectedTitleDetails, setSelectedTitleDetails] = useState({});

  console.log(actorSearchResults);

  useEffect(() => {}, [actorSearchResults]);

  console.log(actorSearchResults);

  const handleTitleSelected = async (event) => {
    event.preventDefault();
    setSelectedTitle(event.target.value);
    const selectedTitleId = event.target.value;
    console.log(selectedTitle);

    const cachedTitleDetails = localStorage.getItem(
      `titleDetails_${selectedTitleId}`
    );
    console.log(
      "Cached Data Retrieved: cachedTitleDetails",
      cachedTitleDetails
    );
    if (cachedTitleDetails) {
      const { data, timestamp } = JSON.parse(cachedTitleDetails);

      console.log(CACHE_DURATION);

      const now = Date.now();
      console.log(now - timestamp);
      if (now - timestamp < CACHE_DURATION) {
        setSelectedTitleDetails(data);
        console.log("cached data retrieved, parsed, time checked", data);
        navigate("/title_details");
        return;
      } else {
        localStorage.removeItem(`titleDetails_${selectedTitleId}`);
        console.log("Cached Data Expired and Removed");
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

        const rentBuySourceNamesToInclude = [ 'iTunes', 'Google Play', 'Amazon', 'YouTube' ]

        const uniqueBuySources = [];
        const buySourceNames = new Set();

        titleDetails.sources.forEach((source) => {
          if (
              source.type === "buy" &&
              rentBuySourceNamesToInclude.some((name) => name === source.name)
          ) {
              if (!buySourceNames.has(source.name)) {
                  buySourceNames.add(source.name);
                  uniqueBuySources.push(source);
              }
          }
      });

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
          similar_titles: titleDetails.similar_titles
            ? titleDetails.similar_titles.slice(0, 5)
            : [],
          sources: titleDetails.sources.filter(
            (source) => source.type === "sub"
          ),
          buy_sources: uniqueBuySources,
          trailer:
            titleDetails.trailer && titleDetails.trailer.includes("youtube")
              ? titleDetails.trailer.replace(/watch\?v=/, "embed/")
              : titleDetails.trailer,
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
        navigate("/title_details");
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
