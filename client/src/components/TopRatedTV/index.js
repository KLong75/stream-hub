import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
// import context
import { TitleDetailsContext } from '../../context/TitleDetailsContext';

// import fetch calls
import {
  fetchTopTvPageOne,
  fetchTitleDetails,
} from "../../utils/apiCalls";


// import from material-ui
import Button from "@mui/material/Button";

// import imageNotAvailable from "../assets/no_image_available.jpg";

import { CACHE_DURATION, CACHE_DURATION_ONE_WEEK, formatDate } from "../../utils/utils";


const TopRatedTV = () => {
  const navigate = useNavigate();
  const [topRatedTv, setTopRatedTv] = useState([]);
  console.log('top rated tv: ', topRatedTv);

  // const [selectedTitle, setSelectedTitle] = useState("");

  // const [selectedTitleDetails, setSelectedTitleDetails] = useState({});
  const { setSelectedTitleDetails } = useContext(TitleDetailsContext);

  useEffect(() => {
    const getTopRatedTv = async () => {
      const cachedTopRatedTv = localStorage.getItem(
        "topRatedTv"
      );

      if (cachedTopRatedTv) {
        const { data, timestamp } = JSON.parse(cachedTopRatedTv);
        console.log("Cached Data Retrieved: cachedTrendingActAdvTv", data);
        const now = Date.now();
        if (now - timestamp < CACHE_DURATION_ONE_WEEK) {
          setTopRatedTv(data);
          return;
        } else {
          localStorage.removeItem("topRatedTv");
          console.log("Cached Data Expired and Removed");
        }
      }

      if (!cachedTopRatedTv) {
        try {
          const response = await fetchTopTvPageOne();
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

          
          setTopRatedTv(topTvShows);

          const cacheData = {
            data: topTvShows,
            timestamp: Date.now(),
          };
          localStorage.setItem(
            "topRatedTv",
            JSON.stringify(cacheData)
          );
        } catch (error) {
          console.log(error);
        }
      }
    };

    getTopRatedTv();
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
      <h3>Top Rated TV</h3>
      <div>
        {topRatedTv.map((tvShow) => (
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

export default TopRatedTV;