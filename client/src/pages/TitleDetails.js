// import from react
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
// import context
import { TitleDetailsContext } from "../context/TitleDetailsContext";
import { SearchResultsContext } from "../context/SearchResultsContext";
// import api calls
import {
  fetchMoreTitleDetailsMovie,
  fetchTitleDetails,
  searchByName,
  fetchMoreTitleDetailsTV,
  fetchTvTitle,
} from "../utils/apiCalls";
// import from material-ui
import Button from "@mui/material/Button";
// import from utils
import { CACHE_DURATION, formatDate } from "../utils/utils";
import { saveTitleIds, getSavedTitleIds } from '../utils/savedTitleIdsLocalStorage';
import Auth from "../utils/auth";

import { useMutation } from "@apollo/client";
import { SAVE_TITLE } from "../utils/mutations";



const TitleDetails = () => {
  const [savedTitleIds, setSavedTitleIds] = useState(getSavedTitleIds); // [1, 2, 3, 4, 5
  console.log(getSavedTitleIds);
  console.log(savedTitleIds);
  useEffect(() => {
    return () => saveTitleIds(savedTitleIds);
  });

  const navigate = useNavigate();

  const title = useContext(TitleDetailsContext);

  const [saveTitle] = useMutation(SAVE_TITLE);

  const { selectedTitleDetails, setSelectedTitleDetails } =
    useContext(TitleDetailsContext);
  const { setActorSearchResults } = useContext(SearchResultsContext);

  const [selectedTitle, setSelectedTitle] = useState("");
  // const [selectedTitleDetails, setSelectedTitleDetails] = useState({});
  const [moreDetails, setMoreDetails] = useState({});
  const [similarTitlesDetails, setSimilarTitlesDetails] = useState([]);
   // eslint-disable-next-line no-unused-vars
   const [selectedActorName, setSelectedActorName] = useState("");
  // const [setSelectedActorName] = useState("");
  // const [similarTitles, setSimilarTitles] = useState([]);

  const [appleTvUrl, setAppleTvUrl] = useState("");
  const [netflixUrl, setNetflixUrl] = useState("");
  const [huluUrl, setHuluUrl] = useState("");
  const [amazonPrimeUrl, setAmazonPrimeUrl] = useState("");
  const [maxUrl, setMaxUrl] = useState("");
  const [disneyPlusUrl, setDisneyPlusUrl] = useState("");
  const [peacockUrl, setPeacockUrl] = useState("");
  const [hayuUrl, setHayuUrl] = useState("");
  const [paramountPlusUrl, setParamountPlusUrl] = useState("");
  const [showtimeUrl, setShowtimeUrl] = useState("");
  const [craveUrl, setCraveUrl] = useState("");
  const [craveStarzUrl, setCraveStarzUrl] = useState("");
  const [stanUrl, setStanUrl] = useState("");
  const [starzUrl, setStarzUrl] = useState("");
  const [foxtelNowUrl, setFoxtelNowUrl] = useState("");
  const [skyGoUrl, setSkyGoUrl] = useState("");
  const [mgmPlusUrl, setMgmPlusUrl] = useState("");
  const [nowTvUrl, setNowTvUrl] = useState("");
  const [bingeUrl, setBingeUrl] = useState("");
  const [britboxUrl, setBritboxUrl] = useState("");
  const [kanopyUrl, setKanopyUrl] = useState("");
  const [huluWithShowtimeUrl, setHuluWithShowtimeUrl] = useState("");
  const [youTubePremiumUrl, setYouTubePremiumUrl] = useState("");
  const [showtimeAmazonPrimeUrl, setShowtimeAmazonPrimeUrl] = useState("");
  const [fuboTvUrl, setFuboTvUrl] = useState("");
  const [notAvailable, setNotAvailable] = useState("");
  const [buyAmazonUrl, setBuyAmazonUrl] = useState("");
  const [buyItunesUrl, setBuyItunesUrl] = useState("");
  const [buyGooglePlayUrl, setBuyGooglePlayUrl] = useState("");
  const [buyYouTubeUrl, setBuyYouTubeUrl] = useState("");
  const [buyNotAvailable, setBuyNotAvailable] = useState("");

  useEffect(() => {
    if (selectedTitleDetails) {
      const sources = selectedTitleDetails.sources || [];
      console.log(sources);
      const appleTv = sources.filter((source) => source.source_id === 371);
      const netflix = sources.filter((source) => source.source_id === 203);
      const hulu = sources.filter((source) => source.source_id === 157);
      const amazonPrime = sources.filter((source) => source.source_id === 26);
      const max = sources.filter((source) => source.source_id === 387);
      const disneyPlus = sources.filter((source) => source.source_id === 372);
      const peacock = sources.filter((source) => source.source_id === 389);
      const hayu = sources.filter((source) => source.source_id === 392);
      const paramountPlus = sources.filter(
        (source) => source.source_id === 444
      );
      const showtime = sources.filter((source) => source.source_id === 248);
      const crave = sources.filter((source) => source.source_id === 393);
      const craveStarz = sources.filter((source) => source.source_id === 395);
      const stan = sources.filter((source) => source.source_id === 425);
      const starz = sources.filter((source) => source.source_id === 232);
      const foxtelNow = sources.filter((source) => source.source_id === 424);
      const skyGo = sources.filter((source) => source.source_id === 408);
      const mgmPlus = sources.filter((source) => source.source_id === 108);
      const nowTv = sources.filter((source) => source.source_id === 406);
      const binge = sources.filter((source) => source.source_id === 423);
      const britbox = sources.filter((source) => source.source_id === 419);
      const kanopy = sources.filter((source) => source.source_id === 367);
      const huluWithShowtime = sources.filter(
        (source) => source.source_id === 159
      );
      const youTubePremium = sources.filter(
        (source) => source.source_id === 368
      );
      const showtimeAmazonPrime = sources.filter(
        (source) => source.source_id === 249
      );
      const fuboTv = sources.filter((source) => source.source_id === 373);

      const buy_sources = selectedTitleDetails.buy_sources || [];
      console.log(buy_sources);
      const buyAmazon = buy_sources.filter((source) => source.source_id === 24);
      const buyItunes = buy_sources.filter(
        (source) => source.source_id === 349
      );
      const buyGooglePlay = buy_sources.filter(
        (source) => source.source_id === 140
      );
      const buyYouTube = buy_sources.filter(
        (source) => source.source_id === 344
      );

      if (sources.length === 0) {
        const notAvailable = "Not Available on Subscription Streaming Services";
        setNotAvailable(notAvailable);
      }

      if (buy_sources.length === 0) {
        const buyNotAvailable = "Not Available for Purchase or Rent";
        setBuyNotAvailable(buyNotAvailable);
      }
      if (appleTv.length >= 1) {
        const appleTvUrl = appleTv[0].web_url;
        setAppleTvUrl(appleTvUrl);
        console.log(appleTvUrl);
      }
      if (netflix.length >= 1) {
        const netflixUrl = netflix[0].web_url;
        setNetflixUrl(netflixUrl);
      }
      if (hulu.length >= 1) {
        const huluUrl = hulu[0].web_url;
        setHuluUrl(huluUrl);
      }
      if (amazonPrime.length >= 1) {
        const amazonPrimeUrl = amazonPrime[0].web_url;
        setAmazonPrimeUrl(amazonPrimeUrl);
      }
      if (max.length >= 1) {
        const maxUrl = max[0].web_url;
        setMaxUrl(maxUrl);
      }
      if (disneyPlus.length >= 1) {
        const disneyPlusUrl = disneyPlus[0].web_url;
        setDisneyPlusUrl(disneyPlusUrl);
      }
      if (peacock.length >= 1) {
        const peacockUrl = peacock[0].web_url;
        setPeacockUrl(peacockUrl);
      }
      if (hayu.length >= 1) {
        const hayuUrl = hayu[0].web_url;
        setHayuUrl(hayuUrl);
      }
      if (paramountPlus.length >= 1) {
        const paramountPlusUrl = paramountPlus[0].web_url;
        setParamountPlusUrl(paramountPlusUrl);
      }
      if (showtime.length >= 1) {
        const showtimeUrl = showtime[0].web_url;
        setShowtimeUrl(showtimeUrl);
      }
      if (crave.length >= 1) {
        const craveUrl = crave[0].web_url;
        setCraveUrl(craveUrl);
      }
      if (craveStarz.length >= 1) {
        const craveStarzUrl = craveStarz[0].web_url;
        setCraveStarzUrl(craveStarzUrl);
      }
      if (stan.length >= 1) {
        const stanUrl = stan[0].web_url;
        setStanUrl(stanUrl);
      }
      if (starz.length >= 1) {
        const starzUrl = starz[0].web_url;
        setStarzUrl(starzUrl);
      }
      if (foxtelNow.length >= 1) {
        const foxtelNowUrl = foxtelNow[0].web_url;
        setFoxtelNowUrl(foxtelNowUrl);
      }
      if (skyGo.length >= 1) {
        const skyGoUrl = skyGo[0].web_url;
        setSkyGoUrl(skyGoUrl);
      }
      if (mgmPlus.length >= 1) {
        const mgmPlusUrl = mgmPlus[0].web_url;
        setMgmPlusUrl(mgmPlusUrl);
      }
      if (nowTv.length >= 1) {
        const nowTvUrl = nowTv[0].web_url;
        setNowTvUrl(nowTvUrl);
      }
      if (binge.length >= 1) {
        const bingeUrl = binge[0].web_url;
        setBingeUrl(bingeUrl);
      }
      if (britbox.length >= 1) {
        const britboxUrl = britbox[0].web_url;
        setBritboxUrl(britboxUrl);
      }
      if (kanopy.length >= 1) {
        const kanopyUrl = kanopy[0].web_url;
        setKanopyUrl(kanopyUrl);
      }
      if (huluWithShowtime.length >= 1) {
        const huluWithShowtimeUrl = huluWithShowtime[0].web_url;
        setHuluWithShowtimeUrl(huluWithShowtimeUrl);
      }
      if (youTubePremium.length >= 1) {
        const youTubePremiumUrl = youTubePremium[0].web_url;
        setYouTubePremiumUrl(youTubePremiumUrl);
      }
      if (showtimeAmazonPrime.length >= 1) {
        const showtimeAmazonPrimeUrl = showtimeAmazonPrime[0].web_url;
        setShowtimeAmazonPrimeUrl(showtimeAmazonPrimeUrl);
      }
      if (fuboTv.length >= 1) {
        const fuboTvUrl = fuboTv[0].web_url;
        setFuboTvUrl(fuboTvUrl);
      }
      // purchase sources
      if (buyAmazon.length >= 1) {
        const buyAmazonUrl = buyAmazon[0].web_url;
        setBuyAmazonUrl(buyAmazonUrl);
      }
      if (buyItunes.length >= 1) {
        const buyItunesUrl = buyItunes[0].web_url;
        setBuyItunesUrl(buyItunesUrl);
      }
      if (buyGooglePlay.length >= 1) {
        const buyGooglePlayUrl = buyGooglePlay[0].web_url;
        setBuyGooglePlayUrl(buyGooglePlayUrl);
      }
      if (buyYouTube.length >= 1) {
        const buyYouTubeUrl = buyYouTube[0].web_url;
        setBuyYouTubeUrl(buyYouTubeUrl);
      }
    }
    // watch the line below. is selectedTitleDetails needed in dependency array?
  }, [selectedTitleDetails]);

  useEffect(() => {
    const getMoreDetailsMovie = async () => {
      const imdbId = selectedTitleDetails.imdb_id;
      console.log(imdbId);

      const cachedMoreDetailsMovie = localStorage.getItem(
        `moreDetailsMovie-${imdbId}`
      );
      console.log("cached data retrieved", cachedMoreDetailsMovie);

      if (cachedMoreDetailsMovie) {
        const { data, timestamp } = JSON.parse(cachedMoreDetailsMovie);

        const now = Date.now();

        if (now - timestamp < 86400000) {
          setMoreDetails(data);
          console.log("cached data retrieved, parsed, time checked", data);
          return;
        } else {
          localStorage.removeItem(`moreDetailsMovie-${imdbId}`);
          console.log("Cached Data Expired and Removed");
        }
      }

      if (!cachedMoreDetailsMovie) {
        console.log("no cached data found");
        try {
          const response = await fetchMoreTitleDetailsMovie(imdbId);
          console.log(response);

          if (!response.ok) {
            throw new Error("Something went wrong");
          }

          const moreDetailsFetched = await response.json();
          setMoreDetails(moreDetailsFetched);

          console.log(moreDetailsFetched);

          const cacheData = {
            data: moreDetailsFetched,
            timestamp: Date.now(),
          };
          localStorage.setItem(
            `moreDetailsMovie-${imdbId}`,
            JSON.stringify(cacheData)
          );
        } catch (err) {
          console.error(err);
        }
      }
    };

    const getMoreDetailsTV = async () => {
      const tvShowTitle = selectedTitleDetails.title;
      console.log(tvShowTitle);

      const cachedMoreDetailsTV = localStorage.getItem(
        `moreDetailsTV-${tvShowTitle}`
      );
      console.log("cached data retrieved: cachedMoreDetailsTV");

      if (cachedMoreDetailsTV) {
        const { data, timestamp } = JSON.parse(cachedMoreDetailsTV);

        const now = Date.now();

        if (now - timestamp < CACHE_DURATION) {
          setMoreDetails(data);
          console.log("cached data retrieved, parsed, time checked", data);
          return;
        } else {
          localStorage.removeItem(`moreDetailsTV-${tvShowTitle}`);
          console.log("Cached Data Expired and Removed");
        }
      }

      if (!cachedMoreDetailsTV) {
        console.log("no cached data found");
        try {
          const response = await fetchTvTitle(tvShowTitle);
          console.log(response);

          if (!response.ok) {
            throw new Error("Something went wrong");
          }

          const moreTitleData = await response.json();

          const titleTmdbId = moreTitleData.results[0].id;
          console.log(titleTmdbId);

          const response2 = await fetchMoreTitleDetailsTV(titleTmdbId);
          console.log(response2);

          if (!response2.ok) {
            throw new Error("Something went wrong");
          }

          const moreTvDetailsFetched = await response2.json();
          console.log(moreTvDetailsFetched);
          setMoreDetails(moreTvDetailsFetched);

          const cacheData = {
            data: moreTvDetailsFetched,
            timestamp: Date.now(),
          };
          localStorage.setItem(
            `moreDetailsTV-${tvShowTitle}`,
            JSON.stringify(cacheData)
          );
        } catch (err) {
          console.error(err);
        }
      }
    };

    if (selectedTitleDetails.imdb_id && selectedTitleDetails.type === "movie") {
      getMoreDetailsMovie();
    }

    if (
      selectedTitleDetails.imdb_id &&
      selectedTitleDetails.type === "tv_series"
    ) {
      getMoreDetailsTV();
    }
  }, [selectedTitleDetails]);

  useEffect(() => {
    const getSimilarTitles = async () => {
      if (
        !selectedTitleDetails.similar_titles ||
        selectedTitleDetails.similar_titles.length === 0
      ) {
        return; // Don't proceed if there are no similar titles
      }

      const similarTitles = selectedTitleDetails.similar_titles.slice(0, 3); // Adjust # of similar titles to fetch here
      const fetchedSimilarTitles = [];

      for (const similarTitleId of similarTitles) {
        const cachedSimilarTitles = localStorage.getItem(
          `similarTitles-${similarTitleId}`
        );
        console.log("cached data retrieved: cachedSimilarTitles");

        if (cachedSimilarTitles) {
          const { data, timestamp } = JSON.parse(cachedSimilarTitles);
          const now = Date.now();

          if (now - timestamp < CACHE_DURATION) {
            setSimilarTitlesDetails(data);
            console.log("cached data retrieved, parsed, time checked", data);
            return;
          } else {
            localStorage.removeItem(`similarTitles-${similarTitleId}`);
            console.log("Cached Data Expired and Removed");
          }
        } else {
          console.log("no cached data found");
        }

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
            plot_overview: similarTitleData.plot_overview,
            poster: similarTitleData.poster,
            trailer:
              similarTitleData.trailer &&
              similarTitleData.trailer.includes("youtube")
                ? similarTitleData.trailer.replace(/watch\?v=/, "embed/")
                : similarTitleData.trailer,
          };

          fetchedSimilarTitles.push(similarTitleDetails);
          console.log(similarTitleDetails);

          const cacheData = {
            data: fetchedSimilarTitles,
            timestamp: Date.now(),
          };
          localStorage.setItem(
            `similarTitles-${similarTitleId}`,
            JSON.stringify(cacheData)
          );
        } catch (err) {
          console.error(err);
        }
      }
      console.log("Fetched similar titles:", fetchedSimilarTitles);
      setSimilarTitlesDetails(fetchedSimilarTitles);
    };

    getSimilarTitles();
  }, [selectedTitleDetails]);

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
        navigate(`/title_details`);
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
        console.log("New Data Retrieved:", titleDetails);
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
          similar_titles: titleDetails.similar_titles.slice(0, 5) ?? [],
          sources: titleDetails.sources.filter(
            (source) => source.type === "sub"
          ),
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

        const cacheData = {
          data: titleDetailsData,
          timestamp: Date.now(),
        };
        localStorage.setItem(
          `titleDetails_${selectedTitleId}`,
          JSON.stringify(cacheData)
        );
        setSelectedTitleDetails(titleDetailsData);
        navigate(`/title_details`);
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    if (selectedTitleDetails) {
      navigate("/title_details");
    }
  }, [selectedTitleDetails, navigate]);

  const handleActorNameClicked = async (actorName) => {
    // event.preventDefault();
    console.log(actorName);
    const searchedName = actorName;
    setSelectedActorName(searchedName);
    // console.log(selectedActorName);

    const cachedActorSearchResults = localStorage.getItem(
      `actorSearchResults_${searchedName}`
    );

    if (cachedActorSearchResults) {
      const { data, timestamp } = JSON.parse(cachedActorSearchResults);
      const now = Date.now();
      if (now - timestamp < CACHE_DURATION) {
        setSelectedActorName(data);
        console.log("cached data retrieved, parsed, time checked", data);
        window.scrollTo(0, 0);
        navigate("/actor_search_results", { state: { data } });
        // setSearchTerm("");
        return;
      } else {
        localStorage.removeItem(`actorSearchResults_${searchedName}`);
        console.log("Cached Data Expired and Removed");
      }
    }

    if (!cachedActorSearchResults) {
      try {
        const response = await searchByName(searchedName);

        console.log(searchByName(searchedName));

        if (!response.ok) {
          throw new Error("Something went wrong");
        }

        const results = await response.json();
        console.log(results);

        const actorSearchData = results.results
          .filter((actor) => {
            if (actor.known_for_department !== "Acting") {
              return false;
            }
            // Check the 'known_for' array for any object where 'adult' is true
            for (let i = 0; i < actor.known_for.length; i++) {
              if (actor.known_for[i].adult === true) {
                return false;
              }
            }
            // If the actor passed the previous checks, include them in the results
            return true;
          })
          .slice(0, 8)
          .map((actor) => ({
            id: actor.id,
            name: actor.name,
            job: actor.known_for_department,
            known_for: actor.known_for,
            poster_url:
              actor.known_for.length > 0
                ? "https://image.tmdb.org/t/p/w500/" +
                  actor.known_for[0].poster_path
                : "",
            image_url: "https://image.tmdb.org/t/p/w200" + actor.profile_path,
          }));
        console.log(actorSearchData);
        // setSearchTerm("");
        setActorSearchResults(actorSearchData);
        const cacheData = {
          data: actorSearchData,
          timestamp: Date.now(),
        };
        localStorage.setItem(
          `actorSearchResults_${searchedName}`,
          JSON.stringify(cacheData)
        );
        console.log(searchedName);
        // window.scrollTo(0, 0);
        navigate("/actor_search_results", { state: { data: actorSearchData } });
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  const handleSaveTitle = async (title) => {
    console.log(title);
    const input = {
      id: title.selectedTitleDetails.id,
      title: title.selectedTitleDetails.title,
      plot_overview: title.selectedTitleDetails.plot_overview,
      poster: title.selectedTitleDetails.poster,
      backdrop: title.selectedTitleDetails.backdrop,
      release_date: title.selectedTitleDetails.release_date,
      us_rating: title.selectedTitleDetails.us_rating,
      genre_names: title.selectedTitleDetails.genre_names,
      type: title.selectedTitleDetails.type,
      year: title.selectedTitleDetails.year,
      trailer: title.selectedTitleDetails.trailer,
      trailer_thumbnail: title.selectedTitleDetails.trailer_thumbnail,
      sources: title.selectedTitleDetails.sources.map((source) => ({
        source_id: source.source_id,
        name: source.name,
        web_url: source.web_url,}),
      ),
      buy_sources: title.selectedTitleDetails.buy_sources.map((source) => ({
        source_id: source.source_id,
        name: source.name,
        web_url: source.web_url,
        type: source.type,}),
      ),
  
      
    };
    console.log('title to save', input);
    // const titleToSave = titleId;
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      await saveTitle({
        variables: { input },
      });
      console.log(`Title ${input.title} saved successfully`, input);
      setSavedTitleIds([...savedTitleIds, input.id])
      console.log(input.id);
      console.log(savedTitleIds);
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <>
      <div>
        <h2>{selectedTitleDetails.title}</h2>
        {selectedTitleDetails.poster && (
          <img src={selectedTitleDetails.poster} alt="show poster" />
        )}

        {selectedTitleDetails.type && (
          <p>
            {selectedTitleDetails.type === "movie"
              ? "Movie"
              : selectedTitleDetails.type === "tv_series"
              ? "TV Series"
              : selectedTitleDetails.type === "tv_miniseries"
              ? "TV Miniseries"
              : selectedTitleDetails.type === "short_film"
              ? "Short Film"
              : "Unknown Type"}
          </p>
        )}
        {selectedTitleDetails.release_date && (
          <p>Released on {formatDate(selectedTitleDetails.release_date)}</p>
        )}
        {selectedTitleDetails.runtime && (
          <p>Runtime: {selectedTitleDetails.runtime} minutes</p>
        )}
        {selectedTitleDetails.us_rating && (
          <p>Rated {selectedTitleDetails.us_rating}</p>
        )}
        {/* <p>User Score: {selectedTitleDetails.user_rating}</p> */}

        {/* {selectedTitleDetails.critic_score && <p>Critic Score: {selectedTitleDetails.critic_score}</p>} */}
        {selectedTitleDetails.genre_names &&
          selectedTitleDetails.genre_names.length > 0 && (
            <div>
              <p>Genres:</p>
              {selectedTitleDetails.genre_names.map((genre) => (
                <p key={genre}>{genre}</p>
              ))}
            </div>
          )}
        {selectedTitleDetails.network_names &&
          selectedTitleDetails.network_names.length > 0 && (
            <p>Network: {selectedTitleDetails.network_names}</p>
          )}

        {selectedTitleDetails.backdrop && (
          <img src={selectedTitleDetails.backdrop} alt="show backdrop" />
        )}

        {selectedTitleDetails.plot_overview && (
          <p>Plot Overview: {selectedTitleDetails.plot_overview}</p>
        )}
        <div>
          {moreDetails && moreDetails.cast && moreDetails.cast.length > 0 && (
            <p>Cast:</p>
          )}
          {moreDetails &&
            moreDetails.cast &&
            moreDetails.cast.length > 0 &&
            moreDetails.cast
              .slice(0, Math.min(10, moreDetails.cast.length))
              .map((castMember) => (
                <p key={castMember.id} style={{ fontSize: "1rem" }}>
                  <Button
                    style={{
                      color: "black",
                      textTransform: "none",
                      fontSize: "1rem",
                    }}
                    onClick={() => handleActorNameClicked(castMember.name)}
                  >
                    {castMember.name}
                  </Button>
                  as {castMember.character}
                </p>
              ))}
        </div>
        <div>
          {moreDetails &&
            moreDetails.crew &&
            moreDetails.crew.some(
              (crewMember) => crewMember.job === "Director"
            ) && (
              <>
                <p>Directed by:</p>
                {moreDetails.crew
                  .filter((crewMember) => crewMember.job === "Director")
                  .map((crewMember) => (
                    <p key={crewMember.id}>{crewMember.name}</p>
                  ))}
              </>
            )}
        </div>

        {selectedTitleDetails.sources && <p>Subscription Streaming:</p>}

        {/* Not Available} */}
        {notAvailable && <span>{notAvailable}</span>}

        {/* Netflix button */}
        {netflixUrl && (
          <Button
            variant="contained"
            color="primary"
            href={netflixUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch on Netflix
          </Button>
        )}
        {/* Amazon Prime button */}
        {amazonPrimeUrl && (
          <Button
            variant="contained"
            color="primary"
            href={amazonPrimeUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch on Amazon Prime
          </Button>
        )}
        {/* Hulu button */}
        {huluUrl && (
          <Button
            variant="contained"
            color="primary"
            href={huluUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch on Hulu
          </Button>
        )}
        {/* Max button */}
        {maxUrl && (
          <Button
            variant="contained"
            color="primary"
            href={maxUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch on Max
          </Button>
        )}
        {/* Disney Plus button */}
        {disneyPlusUrl && (
          <Button
            variant="contained"
            color="primary"
            href={disneyPlusUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch on Disney Plus
          </Button>
        )}
        {/* Apple TV button */}
        {appleTvUrl && (
          <Button
            variant="contained"
            color="primary"
            href={appleTvUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch on Apple TV
          </Button>
        )}
        {/* Peacock Button */}
        {peacockUrl && (
          <Button
            variant="contained"
            color="primary"
            href={peacockUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch on Peacock
          </Button>
        )}
        {/* Hayu Button */}
        {hayuUrl && (
          <Button
            variant="contained"
            color="primary"
            href={hayuUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch on Hayu
          </Button>
        )}

        {/* Paramount Plus Button */}
        {paramountPlusUrl && (
          <Button
            variant="contained"
            color="primary"
            href={paramountPlusUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch on Paramount+
          </Button>
        )}

        {/* Showtime Button */}
        {showtimeUrl && (
          <Button
            variant="contained"
            color="primary"
            href={showtimeUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch on Showtime
          </Button>
        )}

        {/* Crave Button */}
        {craveUrl && (
          <Button
            variant="contained"
            color="primary"
            href={craveUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch on Crave
          </Button>
        )}

        {/* Crave Starz Button */}
        {craveStarzUrl && (
          <Button
            variant="contained"
            color="primary"
            href={craveStarzUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch on Crave Starz
          </Button>
        )}

        {/* Stan Button */}
        {stanUrl && (
          <Button
            variant="contained"
            color="primary"
            href={stanUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch on Stan
          </Button>
        )}

        {/* Starz Button */}
        {starzUrl && (
          <Button
            variant="contained"
            color="primary"
            href={starzUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch on Starz
          </Button>
        )}

        {/* Foxtel Now Button */}
        {foxtelNowUrl && (
          <Button
            variant="contained"
            color="primary"
            href={foxtelNowUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch on Foxtel Now
          </Button>
        )}

        {/* Sky Go Button */}
        {skyGoUrl && (
          <Button
            variant="contained"
            color="primary"
            href={skyGoUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch on Sky Go
          </Button>
        )}

        {/*MGM Plus Button */}
        {mgmPlusUrl && (
          <Button
            variant="contained"
            color="primary"
            href={mgmPlusUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch on MGM Plus
          </Button>
        )}

        {/* Now TV Button */}
        {nowTvUrl && (
          <Button
            variant="contained"
            color="primary"
            href={nowTvUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch on Now TV
          </Button>
        )}

        {/* Binge Button */}
        {bingeUrl && (
          <Button
            variant="contained"
            color="primary"
            href={bingeUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch on BINGE
          </Button>
        )}

        {/* Britbox Button */}
        {britboxUrl && (
          <Button
            variant="contained"
            color="primary"
            href={britboxUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch on Britbox UK
          </Button>
        )}

        {/* Kanopy Button */}
        {kanopyUrl && (
          <Button
            variant="contained"
            color="primary"
            href={kanopyUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch on Kanopy
          </Button>
        )}

        {/* Hulu With Showtime Button */}
        {huluWithShowtimeUrl && (
          <Button
            variant="contained"
            color="primary"
            href={huluWithShowtimeUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch on Hulu With Showtime
          </Button>
        )}

        {/* Youtube Premium Button */}
        {youTubePremiumUrl && (
          <Button
            variant="contained"
            color="primary"
            href={youTubePremiumUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch on Youtube Premium
          </Button>
        )}

        {/* Showtime via Amazon Prime Button */}
        {showtimeAmazonPrimeUrl && (
          <Button
            variant="contained"
            color="primary"
            href={showtimeAmazonPrimeUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch on Showtime via Amazon Prime
          </Button>
        )}

        {/* fuboTV Button */}
        {fuboTvUrl && (
          <Button
            variant="contained"
            color="primary"
            href={fuboTvUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch on fuboTV
          </Button>
        )}

        {/*purchase buttons*/}
        {selectedTitleDetails.buy_sources && (
          <p>Available to Rent or Buy on:</p>
        )}

        {/* Not Available} */}
        {buyNotAvailable && <span>{buyNotAvailable}</span>}
        {/* Buy on Amazon Button */}
        {buyAmazonUrl && (
          <Button
            variant="contained"
            color="primary"
            href={buyAmazonUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Amazon
          </Button>
        )}

        {/* Buy on iTunes Button */}
        {buyItunesUrl && (
          <Button
            variant="contained"
            color="primary"
            href={buyItunesUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            iTunes
          </Button>
        )}
        {/* buy on google play button */}
        {buyGooglePlayUrl && (
          <Button
            variant="contained"
            color="primary"
            href={buyGooglePlayUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Play
          </Button>
        )}
        {/* buy on youtube button */}
        {buyYouTubeUrl && (
          <Button
            variant="contained"
            color="primary"
            href={buyYouTubeUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Youtube
          </Button>
        )}
        {selectedTitleDetails.trailer && (
          <>
            <p>Trailer:</p>{" "}
            {selectedTitleDetails.trailer.includes("youtube") ? (
              <iframe
                width="560rem"
                height="315rem"
                // width="400rem"
                // height="200rem"
                src={selectedTitleDetails.trailer}
                title="YouTube video player"
                style={{
                  border: "2px",
                  borderStyle: "solid",
                  borderColor: "black",
                }}
                // allow="encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen={true}
              ></iframe>
            ) : (
              <a
                href={selectedTitleDetails.trailer}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  width="560"
                  height="315"
                  src={selectedTitleDetails.trailer_thumbnail}
                  alt="trailer thumbnail"
                />
              </a>
              // width="400rem"
              // height="200rem"
            )}
          </>
        )}
        <Button 
          // value={title} 
          variant="contained"
          onClick={() => handleSaveTitle(title)}
        >
          Save to Watchlist
        </Button>
        <p>Related Titles: </p>
        {similarTitlesDetails.map((similarTitle) => (
          <React.Fragment key={similarTitle.id}>
            <p>{similarTitle.title}</p>
            <img src={similarTitle.poster} alt="similar title poster" />
            <p>{similarTitle.plot_overview}</p>

            {similarTitle.trailer &&
            similarTitle.trailer.trim() !== "" &&
            similarTitle.trailer.includes("youtube") ? (
              <iframe
                width="560rem"
                height="315rem"
                src={similarTitle.trailer}
                title="YouTube video player"
                style={{
                  border: "2px",
                  borderStyle: "solid",
                  borderColor: "black",
                }}
                allowFullScreen={true}
              ></iframe>
            ) : similarTitle.trailer && similarTitle.trailer.trim() !== "" ? (
              <a href={similarTitle.trailer} target="_blank" rel="noreferrer">
                Watch Trailer
              </a>
            ) : null}

            <Button
              variant="contained"
              value={similarTitle.id}
              onClick={handleTitleSelected}
            >
              More Details
            </Button>
            <Button variant="contained" value={similarTitle.id}>
              Save to Watchlist
            </Button>
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default TitleDetails;
