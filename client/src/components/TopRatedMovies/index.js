// import from react
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
// import context
import { TitleDetailsContext } from '../../context/TitleDetailsContext';
// import fetch calls
import {
  fetchTopMoviesPageOne,
  fetchTitleDetails,
} from "../../utils/apiCalls";

// import from material-ui
import Button from "@mui/material/Button";

// import imageNotAvailable from "../assets/no_image_available.jpg";

import { CACHE_DURATION, CACHE_DURATION_ONE_WEEK, formatDate } from "../../utils/utils";

const TopRatedMovies = () => {
  const navigate = useNavigate();
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  console.log(topRatedMovies);

  // const [selectedTitle, setSelectedTitle] = useState("");

  // const [selectedTitleDetails, setSelectedTitleDetails] = useState({});

  const { setSelectedTitleDetails } = useContext(TitleDetailsContext);

  useEffect(() => {
    const getTopRatedMovies = async () => {
      const cachedTopRatedMovies = localStorage.getItem(
        "topRatedMovies"
      );

      if (cachedTopRatedMovies) {
        const { data, timestamp } = JSON.parse(cachedTopRatedMovies);
        console.log("Cached Data Retrieved: cachedTopRatedMovies", data);
        const now = Date.now();
        if (now - timestamp < CACHE_DURATION_ONE_WEEK) {
          setTopRatedMovies(data);
          return;
        } else {
          localStorage.removeItem("topRatedMovies");
          console.log("Cached Data Expired and Removed");
        }
      }

      if (!cachedTopRatedMovies) {
        try {
          const response = await fetchTopMoviesPageOne();
          const data = await response.json();
          console.log(data);
          const topMovies = data.results.map((movie) => ({
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            backdrop_path: movie.backdrop_path,
            overview: movie.overview,
            release_date: formatDate(movie.release_date),
            genre: movie.genre_ids,
          }));


          setTopRatedMovies(topMovies);

          const cacheData = {
            data: topMovies,
            timestamp: Date.now(),
          };
          localStorage.setItem(
            "topRatedMovies",
            JSON.stringify(cacheData)
          );
        } catch (error) {
          console.log(error);
        }
      }
    };

    getTopRatedMovies();
  }, []);

  const handleTitleSelected = async (event) => {
    event.preventDefault();
    const selectedTitleId = event.target.value;
    console.log(selectedTitleId);

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
        window.scrollTo(0, 0);
        navigate("/title_details");
        return;
      } else {
        localStorage.removeItem(`titleDetails_${selectedTitleId}`);
        console.log("Cached Data Expired and Removed");
      }
    }

    if (!cachedTitleDetails) {
      try {
        const response = await fetchTitleDetails(selectedTitleId);

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
          runtime: titleDetails.runtime_minutes,
          similar_titles: titleDetails.similar_titles
            ? titleDetails.similar_titles.slice(0, 5)
            : [],
          sources: titleDetails.sources.filter((source) => source.type === "sub"),
          buy_sources: uniqueBuySources,
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
        window.scrollTo(0, 0);
        navigate("/title_details");
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <>
      <h3>Top Rated Movies</h3>
      <div>
        {topRatedMovies.map((movie) => (
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

export default TopRatedMovies;