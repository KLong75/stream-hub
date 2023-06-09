import React, { useState, useEffect } from "react";

// import fetch calls
import {
  fetchTrendingDramaTv,
  searchTitlesByTMDBId,
  fetchTitleDetails,
} from "../../utils/apiCalls";


// import from material-ui
import Button from "@mui/material/Button";

// import imageNotAvailable from "../assets/no_image_available.jpg";

import { CACHE_DURATION, CACHE_DURATION_ONE_WEEK, formatDate } from "../../utils/utils";


const TrendingDramaTv = () => {
  const [trendingDramaTv, setTrendingDramaTv] = useState([]);
  console.log(trendingDramaTv);

  const [selectedTitle, setSelectedTitle] = useState("");

  const [selectedTitleDetails, setSelectedTitleDetails] = useState({});

  useEffect(() => {
    const getTrendingDramaTv = async () => {
      const cachedTrendingDramaTv = localStorage.getItem(
        "trendingDramaTv"
      );

      if (cachedTrendingDramaTv) {
        const { data, timestamp } = JSON.parse(cachedTrendingDramaTv);
        console.log("Cached Data Retrieved: cachedTrendingDramaTv", data);
        const now = Date.now();
        if (now - timestamp < CACHE_DURATION_ONE_WEEK) {
          setTrendingDramaTv(data);
          return;
        } else {
          localStorage.removeItem("trendingDramaTv");
          console.log("Cached Data Expired and Removed");
        }
      }

      if (!cachedTrendingDramaTv) {
        try {
          const response = await fetchTrendingDramaTv();
          const data = await response.json();
          console.log(data);
          const topTvShows = data.results.map((tvShow) => ({
            id: tvShow.id,
            title: tvShow.name,
            poster_path: tvShow.poster_path,
            backdrop_path: tvShow.backdrop_path,
            overview: tvShow.overview,
            first_air_date: formatDate(tvShow.first_air_date),
            genre: tvShow.genre_ids,
          }));

          
          setTrendingDramaTv(topTvShows);

          const cacheData = {
            data: topTvShows,
            timestamp: Date.now(),
          };
          localStorage.setItem(
            "trendingDramaTv",
            JSON.stringify(cacheData)
          );
        } catch (error) {
          console.log(error);
        }
      }
    };

    getTrendingDramaTv();
  }, []);

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
          similar_titles: titleDetails.similar_titles
            ? titleDetails.similar_titles.slice(0, 5)
            : [],
          sources: titleDetails.sources.filter(
            (source) => source.type === "sub"
          ),
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
      <h3>Trending Drama TV Shows</h3>
      <div>
        {trendingDramaTv.map((tvShow) => (
          <div key={tvShow.id}>
            <img
              src={`https://image.tmdb.org/t/p/w200/${tvShow.poster_path}`}
              alt={tvShow.title}
            />
            <p>{tvShow.title}</p>
            <p>Released on {tvShow.first_air_date}</p>
            <p>{tvShow.overview}</p>
            <Button
              variant="contained"
              value={`tv-${tvShow.id}`}
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

export default TrendingDramaTv;