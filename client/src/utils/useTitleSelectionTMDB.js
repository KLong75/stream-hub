// import from react
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// import context
import { TitleDetailsContext } from "../context/TitleDetailsContext";
// import fetch calls
import {  
  searchTitlesByTMDBId,  
  fetchMoreTitleDetailsMovie,
  fetchTitleDetails,
  fetchMoreTitleDetailsTV,
  fetchTvTitle, } from "./apiCalls";
// impor from utils
import { CACHE_DURATION } from "./utils";
import { QUERY_ME } from "../utils/queries";
// import from @apollo/client
import { useQuery } from "@apollo/client";


export const useTitleSelectionTMDBId = () => {
  const { data } = useQuery(QUERY_ME);
  const userData = data?.me || {};
  const savedTitles = userData.savedTitles || [];
  // console.log('useIMDBId savedTitles', savedTitles)
  let cast;
  let crew;
  const navigate = useNavigate();
  const { setSelectedTitleDetails } = useContext(TitleDetailsContext);

  const handleTitleSelectedTMDBId = async (id, event) => {
    if (event) event.preventDefault();
    const selectedTitleId = String(id);
    // console.log(selectedTitleId);
    const numericPartOfId = selectedTitleId.match(/\d+/)[0];
    const tmdbIdNumber = parseInt(numericPartOfId);
    // console.log(tmdbIdNumber);

    for (let i = 0; i < savedTitles.length; i++) {
      // console.log(savedTitles[i].tmdb_id)
      if (savedTitles[i].tmdb_id === tmdbIdNumber) {
        setSelectedTitleDetails(savedTitles[i])
        // console.log('title data pulled from database', savedTitles[i])
        navigate("/title_details");
        window.scrollTo(0, 0);
        return;
      }   
    }
    
    const cachedTitleDetails = localStorage.getItem(
      `titleDetails_${selectedTitleId}`
    );
    // console.log(
    //   "Cached Data Retrieved: cachedTitleDetails",
    //   cachedTitleDetails
    // );
    if (cachedTitleDetails) {
      const { data, timestamp } = JSON.parse(cachedTitleDetails);
      // console.log(CACHE_DURATION);
      const now = Date.now();
      // console.log(now - timestamp);
      if (now - timestamp < CACHE_DURATION) {
        setSelectedTitleDetails(data);
        // console.log("cached data retrieved, parsed, time checked", data);
        navigate("/title_details");
        window.scrollTo(0, 0);
      } else {
        localStorage.removeItem(`titleDetails_${selectedTitleId}`);
        // console.log("Cached Data Expired and Removed");
      }
    }
    if (!cachedTitleDetails) {
      try {
        const response = await searchTitlesByTMDBId(selectedTitleId);
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const titleDetails = await response.json();
        console.log("New Data Retrieved:", titleDetails);
        const rentBuySourceNamesToInclude = [
          "iTunes",
          "Google Play",
          "Amazon",
          "YouTube",
        ];
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
        const similarTitleIds = titleDetails.similar_titles
          ? titleDetails.similar_titles.slice(0, 10)
          : [];
        const fetchedSimilarTitles = [];
        for (const similarTitleId of similarTitleIds) {     
          try {
            const response = await fetchTitleDetails(similarTitleId);
            if (!response.ok) {
              throw new Error("Something went wrong");
            }
            const similarTitleData = await response.json();
            const similarTitleDetails = {
              id: similarTitleData.id,
              title: similarTitleData.title,
              type: similarTitleData.type,
              poster: similarTitleData.poster,
            };
            fetchedSimilarTitles.push(similarTitleDetails);
          } catch (err) {
            console.error(err);
          }
        }

        if (titleDetails.type === "movie" || titleDetails.type === "short_film") {
          try {
            const getMoreDetailsMovie = await fetchMoreTitleDetailsMovie(titleDetails.imdb_id);
            if (!getMoreDetailsMovie.ok) {
              throw new Error("Something went wrong fetching cast and crew");
            }
            const moreMovieDetailsFetched = await getMoreDetailsMovie.json();
            cast = moreMovieDetailsFetched.cast;
            crew = moreMovieDetailsFetched.crew;
          }     
          catch (err) {
            console.error(err);
          };
        } else if (titleDetails.type.includes("tv")) {
          try {
            const tvShowTitle = titleDetails.title;
            const tvTitleResponse = await fetchTvTitle(tvShowTitle);
            if (!tvTitleResponse.ok) {
              throw new Error("Something went wrong fetching cast and crew");
            }
            const moreTitleData = await tvTitleResponse.json();
            const tvTitleImdbId = moreTitleData.results[0].id;
            const tvTitleResponse2 = await fetchMoreTitleDetailsTV(tvTitleImdbId);
            if (!tvTitleResponse2.ok) {
              throw new Error("Something went wrong fetching cast and crew");
            }
            const moreTitleData2 = await tvTitleResponse2.json();
            // console.log('moreTitleData2', moreTitleData2);
            cast = moreTitleData2.cast;
            crew = moreTitleData2.crew;
            // console.log('cast', cast);
            // console.log('crew', crew);
          }
          catch (err) {
            console.error(err);
          };
        }

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
          similar_title_data: fetchedSimilarTitles,
          sources: titleDetails.sources.filter(
            (source) => source.type === "sub"
          ),
          buy_sources: uniqueBuySources,
          trailer:
            titleDetails.trailer && titleDetails.trailer.includes("youtube")
              ? titleDetails.trailer.replace(/watch\?v=/, "embed/")
              : titleDetails.trailer,
          trailer_thumbnail: titleDetails.trailer_thumbnail,
          cast: cast.slice(0,8),
          crew: crew.filter((member) => member.job === "Director"),
          us_rating: titleDetails.us_rating,
          user_rating: titleDetails.user_rating,
          imdb_id: titleDetails.imdb_id,
          tmdb_id: titleDetails.tmdb_id,
        };
        // console.log('titleDetailsData', titleDetailsData);
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
        window.scrollTo(0, 0);
        // console.log('navitgated to title details')
      } catch (error) {
        console.log(error);
      }
    }
  };

  return handleTitleSelectedTMDBId;
};