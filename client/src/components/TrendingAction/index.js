// import from react
import React, { useState, useEffect } from "react";

// import fetch calls
import {
  fetchTrendingActionMovies,
  searchTitlesByTMDBId,
  fetchTitleDetails,
} from "../../utils/apiCalls";

// import from material-ui
import Button from "@mui/material/Button";

// import imageNotAvailable from "../assets/no_image_available.jpg";

import { CACHE_DURATION, CACHE_DURATION_ONE_WEEK } from "../../utils/utils";

const TrendingAction = () => {
  const [trendingActionMovies, setTrendingActionMovies] = useState([]);
  console.log(trendingActionMovies);

  const [selectedTitle, setSelectedTitle] = useState("");

  const [selectedTitleDetails, setSelectedTitleDetails] = useState({});

  useEffect(() => {
    const getTrendingActionMovies = async () => {
      const cachedTrendingActionMovies = localStorage.getItem(
        "trendingActionMovies"
      );

      if (cachedTrendingActionMovies) {
        const { data, timestamp } = JSON.parse(cachedTrendingActionMovies);
        console.log("Cached Data Retrieved: cachedTrendingActionMovies", data);
        const now = Date.now();
        if (now - timestamp < CACHE_DURATION_ONE_WEEK) {
          setTrendingActionMovies(data);
          return;
        } else {
          localStorage.removeItem("trendingActionMovies");
          console.log("Cached Data Expired and Removed");
        }
      }

      if (!cachedTrendingActionMovies) {
        try {
          const response = await fetchTrendingActionMovies();
          const data = await response.json();
          console.log(data);
          const allMovies = data.results.map((movie) => ({
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            backdrop_path: movie.backdrop_path,
            overview: movie.overview,
            release_date: movie.release_date,
            genre: movie.genre_ids,
          }));

          const filteredTrendingActionMovies = allMovies.filter((movie) =>
            movie.genre.includes(28)
          );

          const filteredOutMovies = allMovies.filter(
            (movie) => !movie.genre.includes(28)
          );
          console.log(
            "Filtered out movies: ",
            filteredOutMovies.map((movie) => ({
              title: movie.title,
              genre: movie.genre,
            }))
          );

          setTrendingActionMovies(filteredTrendingActionMovies);

          const cacheData = {
            data: filteredTrendingActionMovies,
            timestamp: Date.now(),
          };
          localStorage.setItem(
            "trendingActionMovies",
            JSON.stringify(cacheData)
          );
        } catch (error) {
          console.log(error);
        }
      }
    };

    getTrendingActionMovies();
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
      <h3>Trending Action Movies</h3>
      <div>
        {trendingActionMovies.map((movie) => (
          <div key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
              alt={movie.title}
            />
            <p>{movie.title}</p>
            <p>{movie.release_date}</p>
            <p>{movie.overview}</p>
            <Button
              variant="contained"
              value={`movie-${movie.id}`}
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

export default TrendingAction;
