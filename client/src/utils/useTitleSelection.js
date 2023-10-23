import { useContext } from "react";
import { TitleDetailsContext } from "../context/TitleDetailsContext";
import {
  fetchMoreTitleDetailsMovie,
  fetchTitleDetails,
  fetchMoreTitleDetailsTV,
  fetchTvTitle,
} from "./apiCalls";
import { CACHE_DURATION } from "./utils";
import { QUERY_ME } from "../utils/queries";
import { useNavigate } from "react-router-dom";
// import from @apollo/client
import { useQuery } from "@apollo/client";


export const useTitleSelection = () => {
  const { data } = useQuery(QUERY_ME);
  const userData = data?.me || {};
  const savedTitles = userData.savedTitles || [];
  console.log('savedTitleSelection savedTitles',savedTitles)

  let cast;
  let crew;
  const navigate = useNavigate();
  const { setSelectedTitleDetails } = useContext(TitleDetailsContext);
  
  const handleTitleSelected = async (id, event) => {
    if (event) event.preventDefault();
    // const selectedTitleId = event.target.value;
    const selectedTitleId = id;
    // console.log(selectedTitleId);

    for (let i = 0; i < savedTitles.length; i++) {
      if (savedTitles[i].id === selectedTitleId) {
        setSelectedTitleDetails(savedTitles[i])
        console.log('title data pulled from database')
        navigate("/title_details");
        window.scrollTo(0, 0);
        return;
      }  
    }

    const cachedTitleDetails = localStorage.getItem(
      `titleDetails_${selectedTitleId}`
    );
    if (cachedTitleDetails) {
      const { data, timestamp } = JSON.parse(cachedTitleDetails);
      const now = Date.now();
      if (now - timestamp < CACHE_DURATION) {
        setSelectedTitleDetails(data);
        console.log(
          "cached data retrieved for selectedTitleDetails, parsed, time checked",
          data
        );
        navigate("/title_details");
        window.scrollTo(0, 0);
      } else {
        localStorage.removeItem(`titleDetails_${selectedTitleId}`);
      }
    }
    if (!cachedTitleDetails) {
      // I want to query my database for the title details before making a fetch request
      try {
        const response = await fetchTitleDetails(selectedTitleId);
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const titleDetails = await response.json();
        console.log('New titleDetailsfetched', titleDetails)
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
        // Fetch similar titles and update 
        const similarTitleIds = titleDetails.similar_titles
          ? titleDetails.similar_titles.slice(0, 3)
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
          cast = moreTitleData2.cast;
            crew = moreTitleData2.crew;
            console.log('cast', cast);
            console.log('crew', crew);
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
          genre_names: titleDetails.genre_names,
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
          imdb_id: titleDetails.imdb_id,
          tmdb_id: titleDetails.tmdb_id
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
        window.scrollTo(0, 0);
      } catch (error) {
        console.log(error);
      }     
    }
  };
  return handleTitleSelected;
};
