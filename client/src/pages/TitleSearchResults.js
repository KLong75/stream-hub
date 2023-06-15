import React, { useEffect, useState } from "react";
// import { Link } from 'react-router-dom';

import Button from "@mui/material/Button";

import { fetchTitleDetails } from "../utils/apiCalls";

const CACHE_DURATION = 30 * 24 * 60 * 60 * 1000; // 30 days

const TitleSearchResults = () => {
  const [titleSearchResults, setTitleSearchResults] = useState([]);

  const [selectedTitle, setSelectedTitle] = useState("");

  // eslint-disable-next-line no-unused-vars
  const [selectedTitleDetails, setSelectedTitleDetails] = useState({});

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const titles = urlParams.get("titles");

    if (titles) {
      const parsedTitles = JSON.parse(decodeURIComponent(titles));
      setTitleSearchResults(parsedTitles);
    }
  }, []);

  console.log(titleSearchResults);

  const handleTitleSelected = async (event) => {
    event.preventDefault();
    setSelectedTitle(event.target.value);
    console.log(event.target.value);
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
        window.location.href =
          "/title_details?titleDetails=" +
          encodeURIComponent(JSON.stringify(data));
        return;
      } else {
        localStorage.removeItem(`titleDetails_${selectedTitleId}`);
        console.log("Cached Data Expired and Removed");
      }
    }

    if (!cachedTitleDetails) {
      try {
        const response = await fetchTitleDetails(selectedTitleId);
        console.log(fetchTitleDetails(selectedTitleId));

        if (!response.ok) {
          throw new Error("Something went wrong");
        }

        const titleDetails = await response.json();

        console.log(titleDetails);
        
        const rentBuySourceNamesToInclude = [ 'iTunes', 'Google Play', 'Amazon', 'YouTube' ]

        const uniqueBuySources = [];
        const buySourceNames = new Set();

        titleDetails.sources.filter((source) => {
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

        const uniqueRentSources = [];
        const rentSourceNames = new Set();

        titleDetails.sources.filter((source) => {
          if (
            source.type === "rent" &&
            rentBuySourceNamesToInclude.some((name) => name === source.name)
          ) {
            if (!rentSourceNames.has(source.name)) {
              rentSourceNames.add(source.name);
              uniqueRentSources.push(source);
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
          runtime: titleDetails.runtime_minutes,
          // similar_titles: titleDetails.similar_titles.slice(0, 5),
          similar_titles: titleDetails.similar_titles
            ? titleDetails.similar_titles.slice(0, 5)
            : [],
          sources: titleDetails.sources.filter(
            (source) => source.type === "sub"
          ),
          // buy_sources: titleDetails.sources.filter(
          //   (source) => source.type === "buy" && rentBuySourceNamesToInclude.some(name => name === source.name)
          // ),
          buy_sources: uniqueBuySources,
          rent_sources: uniqueRentSources,
          // rent_sources: titleDetails.sources.filter(
          //   (source) => source.type === "rent" && rentBuySourceNamesToInclude.some(name => name === source.name)),
          // trailer: titleDetails.trailer,
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
