// import from react
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
// import context
import { TitleDetailsContext } from "../../context/TitleDetailsContext";
import { SearchResultsContext } from "../../context/SearchResultsContext";
// import api calls
import {
  fetchMoreTitleDetailsMovie,
  fetchTitleDetails,
  searchByName,
  fetchMoreTitleDetailsTV,
  fetchTvTitle,
} from "../../utils/apiCalls";
// import from material-ui
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

// import { styled } from '@mui/material/styles';
import Grid from "@mui/material/Unstable_Grid2/Grid2";
// import from swiper.js
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Navigation,
  // Pagination,
  // Parallax,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
// import from utils
import { CACHE_DURATION, formatDate } from "../../utils/utils";
import Auth from "../../utils/auth";
import { useTitleSelection } from "../../utils/useTitleSelection";
import { SAVE_TITLE } from "../../utils/mutations";
import { QUERY_ME } from "../../utils/queries";
// import from apollo client
import { useMutation, useQuery } from "@apollo/client";
// import components
import LoadingClapBoard from "../../components/LoadingClapBoard";

// import source logos
import DisneyPlusLogo from "../../assets/icons/DisneyPlusLogo.png";
// import styles
import styles from "./TitleDetails.module.css";

const TitleDetails = () => {
  const loggedIn = Auth.loggedIn();
  const navigate = useNavigate();
  const [showRedirectMessage, setShowRedirectMessage] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(Auth.loggedIn());
  useEffect(() => {
    if (!isAuthenticated) {
      setShowRedirectMessage(true);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [navigate, isAuthenticated]);
  useEffect(() => {
    setIsAuthenticated(Auth.loggedIn());
  }, []);

  const { data, loading } = useQuery(QUERY_ME);

  const savedTitleIds = data?.me.savedTitles.map((title) => title.id) || [];
  // console.log("savedTitleIds", savedTitleIds);

  const title = useContext(TitleDetailsContext);
  console.log("title", title);
  const { selectedTitleDetails } = useContext(TitleDetailsContext);
  // console.log("selectedTitleDetails", selectedTitleDetails);
  const { setActorSearchResults } = useContext(SearchResultsContext);
  const [saveTitle] = useMutation(SAVE_TITLE);
  const [moreDetails, setMoreDetails] = useState({});
  const [similarTitlesDetails, setSimilarTitlesDetails] = useState([]);
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

  // eslint-disable-next-line no-unused-vars
  const [selectedActorName, setSelectedActorName] = useState("");

  useEffect(() => {
    if (selectedTitleDetails) {
      const sources = selectedTitleDetails.sources || [];
      // console.log(sources);
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
      // console.log(imdbId);

      const cachedMoreDetailsMovie = localStorage.getItem(
        `moreDetailsMovie-${imdbId}`
      );
      // console.log("cached data retrieved", cachedMoreDetailsMovie);

      if (cachedMoreDetailsMovie) {
        const { data, timestamp } = JSON.parse(cachedMoreDetailsMovie);

        const now = Date.now();

        if (now - timestamp < 86400000) {
          setMoreDetails(data);
          console.log("cached data retrieved, parsed, time checked", data);
          return;
        } else {
          localStorage.removeItem(`moreDetailsMovie-${imdbId}`);
          // console.log("Cached Data Expired and Removed");
        }
      }

      if (!cachedMoreDetailsMovie) {
        console.log("no cached data found");
        try {
          const response = await fetchMoreTitleDetailsMovie(imdbId);
          // console.log(response);

          if (!response.ok) {
            throw new Error("Something went wrong");
          }

          const moreDetailsFetched = await response.json();
          setMoreDetails(moreDetailsFetched);

          // console.log(moreDetailsFetched);

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
      // console.log(tvShowTitle);

      const cachedMoreDetailsTV = localStorage.getItem(
        `moreDetailsTV-${tvShowTitle}`
      );
      // console.log("cached data retrieved: cachedMoreDetailsTV");

      if (cachedMoreDetailsTV) {
        const { data, timestamp } = JSON.parse(cachedMoreDetailsTV);

        const now = Date.now();

        if (now - timestamp < CACHE_DURATION) {
          setMoreDetails(data);
          // console.log("cached data retrieved, parsed, time checked", data);
          return;
        } else {
          localStorage.removeItem(`moreDetailsTV-${tvShowTitle}`);
          // console.log("Cached Data Expired and Removed");
        }
      }

      if (!cachedMoreDetailsTV) {
        // console.log("no cached data found");
        try {
          const response = await fetchTvTitle(tvShowTitle);
          // console.log(response);

          if (!response.ok) {
            throw new Error("Something went wrong");
          }

          const moreTitleData = await response.json();

          const titleTmdbId = moreTitleData.results[0].id;
          // console.log(titleTmdbId);

          const response2 = await fetchMoreTitleDetailsTV(titleTmdbId);
          // console.log(response2);

          if (!response2.ok) {
            throw new Error("Something went wrong");
          }

          const moreTvDetailsFetched = await response2.json();
          // console.log(moreTvDetailsFetched);
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
      const fetchedSimilarTitles = [];
      if (
        !selectedTitleDetails.similar_titles ||
        selectedTitleDetails.similar_titles.length === 0
      ) {
        return; // Don't proceed if there are no similar titles
      }

      const similarTitles = selectedTitleDetails.similar_titles.slice(0, 20); // Adjust # of similar titles to fetch here
      // console.log(similarTitles)

      for (const similarTitleId of similarTitles) {
        const cachedSimilarTitles = localStorage.getItem(
          `similarTitles-${similarTitleId}`
        );
        // console.log("cached data retrieved: cachedSimilarTitles", cachedSimilarTitles);

        if (cachedSimilarTitles) {
          const { data, timestamp } = JSON.parse(cachedSimilarTitles);
          const now = Date.now();

          if (now - timestamp < CACHE_DURATION) {
            fetchedSimilarTitles.push(data);
            // console.log("cached data retrieved, parsed, time checked", data);
            continue;
          } else {
            localStorage.removeItem(`similarTitles-${similarTitleId}`);
            // console.log("Cached Data Expired and Removed");
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
          // console.log('similarTitleData', similarTitleData);
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
            trailer_thumbnail: similarTitleData.trailer_thumbnail,
          };

          fetchedSimilarTitles.push(similarTitleDetails);
          // console.log(similarTitleDetails);

          const cacheData = {
            data: similarTitleDetails,
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

  const handleTitleSelected = useTitleSelection();

  useEffect(() => {
    if (selectedTitleDetails) {
      navigate("/title_details");
    }
  }, [selectedTitleDetails, navigate]);

  const handleActorNameClicked = async (event) => {
    event.preventDefault();
    const searchedName = event.currentTarget.value;
    // console.log("searched name", searchedName);

    const cachedActorSearchResults = localStorage.getItem(
      `actorSearchResults_${searchedName}`
    );

    if (cachedActorSearchResults) {
      const { data, timestamp } = JSON.parse(cachedActorSearchResults);
      const now = Date.now();
      if (now - timestamp < CACHE_DURATION) {
        setSelectedActorName(data);
        // console.log("cached data retrieved, parsed, time checked", data);
        navigate("/actor_search_results", { state: { data } });
        return;
      } else {
        localStorage.removeItem(`actorSearchResults_${searchedName}`);
        console.log("Cached Data Expired and Removed");
      }
    }

    if (!cachedActorSearchResults) {
      try {
        const response = await searchByName(searchedName);
        // console.log(searchByName(searchedName));

        if (!response.ok) {
          throw new Error("Something went wrong");
        }

        const results = await response.json();
        console.log(results);

        const actorSearchData = results.results
          .filter((actor) => {
            if (
              actor.known_for_department !== "Acting" ||
              actor.name !== searchedName
            ) {
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
        // console.log(actorSearchData);
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
        // console.log(searchedName);
        navigate("/actor_search_results", { state: { data: actorSearchData } });
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  const handleSaveTitle = async (title) => {
    // console.log(title);
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
        web_url: source.web_url,
      })),
      buy_sources: title.selectedTitleDetails.buy_sources.map((source) => ({
        source_id: source.source_id,
        name: source.name,
        web_url: source.web_url,
        type: source.type,
      })),
    };
    // console.log("title to save", input);
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
      console.log(input.id);
    } catch (err) {
      console.error(err);
    }
  };

  if (showRedirectMessage) {
    return <div>Please login or signup</div>;
  }

  if (loading) {
    return <LoadingClapBoard />;
  }

  return (
    <>
      {!loggedIn ? (
        navigate("/")
      ) : (
        <main
          style={{
            backgroundImage: `url(${selectedTitleDetails.backdrop})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            minHeight: "100vh",
            minWidth: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Grid
            container
            justifyContent="center"
            textAlign="center"
            alignItems="center">
            <Grid xs={2}></Grid>
            <Grid xs={8}>
              <Paper sx={{ marginTop: "2rem" }}>
                <h2
                  style={{
                    background:
                      "linear-gradient(315deg, #185a9d 0%, #43cea2 85%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    fontFamily: "monospace",
                    fontWeight: "700",
                    letterSpacing: ".2rem",
                    fontSize: "2rem",
                    marginTop: "0",
                    marginBottom: "0",
                    padding: ".25rem",
                  }}>
                  {selectedTitleDetails.title}
                </h2>
              </Paper>
            </Grid>
            <Grid xs={2}></Grid>
            {selectedTitleDetails.type && (
              <>
                <Grid xs={5}></Grid>
                <Grid xs={2}>
                  <Paper sx={{ marginTop: "1rem" }}>
                    <h3
                      style={{
                        background:
                          "linear-gradient(315deg, #185a9d 0%, #43cea2 85%)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                        fontFamily: "monospace",
                        fontWeight: "700",
                        letterSpacing: ".2rem",
                        fontSize: "1.5rem",
                        marginTop: "0",
                        marginBottom: "0",
                        padding: ".5rem",
                      }}>
                      {selectedTitleDetails.type === "movie"
                        ? "Movie"
                        : selectedTitleDetails.type === "tv_series"
                        ? "TV Series"
                        : selectedTitleDetails.type === "tv_miniseries"
                        ? "TV Miniseries"
                        : selectedTitleDetails.type === "short_film"
                        ? "Short Film"
                        : "Unknown Type"}
                    </h3>
                  </Paper>
                </Grid>
                <Grid xs={5}></Grid>
              </>
            )}

            {selectedTitleDetails.genre_names &&
              selectedTitleDetails.genre_names.length > 0 && (
                <Grid container xs={12} justifyContent="center">
                  {selectedTitleDetails.genre_names.map((genre) => (
                    <>
                      <Grid xs={2}>
                        <Paper sx={{ marginTop: "1rem" }}>
                          <h4 style={{ margin: "0" }} key={genre}>
                            {genre}
                          </h4>
                        </Paper>
                      </Grid>
                    </>
                  ))}
                </Grid>
              )}
            <Grid xs={0} md={2}></Grid>
            <Grid container xs={12} md={2}>
              <Paper sx={{marginTop: '1rem'}}>
                <Grid container justifyContent='center' alignItems='center'>
              {/* Not Available} */}
              {notAvailable && (
                <Grid xs={12}>
                  <span>{notAvailable}</span>
                </Grid>
              )}

              {selectedTitleDetails.sources && (               
                <Grid xs={12}>
                  <h6 style={{fontSize: '1rem'}}>Watch on:</h6>
                </Grid>
              )}
                           
              {/* Netflix button */}
              {netflixUrl && (
                <Grid xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    href={netflixUrl}
                    target="_blank"
                    rel="noopener noreferrer">
                    Netflix
                  </Button>
                </Grid>
              )}
              {/* Amazon Prime button */}
              {amazonPrimeUrl && (
                <Grid xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    href={amazonPrimeUrl}
                    target="_blank"
                    rel="noopener noreferrer">
                    Prime Video
                  </Button>
                </Grid>
              )}
              {/* Hulu button */}
              {huluUrl && (
                <Grid xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    href={huluUrl}
                    target="_blank"
                    rel="noopener noreferrer">
                    Watch on Hulu
                  </Button>
                </Grid>
              )}
              {/* Max button */}
              {maxUrl && (
                <Grid xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    href={maxUrl}
                    target="_blank"
                    rel="noopener noreferrer">
                    Watch on Max
                  </Button>
                </Grid>
              )}
              {/* Disney Plus button */}
              {disneyPlusUrl && (
                <Grid xs={12}>
                  <a
                    href={disneyPlusUrl}
                    target="_blank"
                    rel="noopener noreferrer">
                    <img
                      style={{ height: "4rem" }}
                      src={DisneyPlusLogo}
                      alt="Disney+ Logo"
                    />
                  </a>
                </Grid>
              )}
              {/* Apple TV button */}
              {appleTvUrl && (
                <Grid xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    href={appleTvUrl}
                    target="_blank"
                    rel="noopener noreferrer">
                    Watch on Apple TV
                  </Button>
                </Grid>
              )}
              {/* Peacock Button */}
              {peacockUrl && (
                <Grid xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    href={peacockUrl}
                    target="_blank"
                    rel="noopener noreferrer">
                    Watch on Peacock
                  </Button>
                </Grid>
              )}

              {/* Paramount Plus Button */}
              {paramountPlusUrl && (
                <Grid xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    href={paramountPlusUrl}
                    target="_blank"
                    rel="noopener noreferrer">
                    Watch on Paramount+
                  </Button>
                </Grid>               
              )}  
              </Grid>
              </Paper>          
            </Grid>

            {selectedTitleDetails.poster && (
              <Grid xs={12} md={4} sx={{ marginTop: "2rem" }}>
                <img
                  className={styles.poster}
                  src={selectedTitleDetails.poster}
                  alt="show poster"
                />
                <Grid xs={12} sx={{ marginTop: ".5rem" }}>
                  <Button
                    disabled={savedTitleIds.includes(selectedTitleDetails.id)}
                    variant="contained"
                    onClick={() => handleSaveTitle(title)}>
                    {savedTitleIds.includes(selectedTitleDetails.id)
                      ? "Title Saved!"
                      : "Save to Watchlist"}
                  </Button>
                </Grid>
              </Grid>
            )}
            <Grid container xs={12} md={2}>
            <Paper sx={{marginTop: '1rem'}}>
                <Grid container justifyContent='center' alignItems='center'>
              {/*purchase buttons*/}
              {selectedTitleDetails.buy_sources && (
                <Grid xs={12}>
                  <h6 style={{fontSize: '1rem'}}>Rent or Buy:</h6>
                </Grid>
              )}

              {/* Not Available} */}
              {buyNotAvailable && (
                <Grid xs={12}>
                  <span>{buyNotAvailable}</span>
                </Grid>
              )}
              {/* Buy on Amazon Button */}
              {buyAmazonUrl && (
                <Grid xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    href={buyAmazonUrl}
                    target="_blank"
                    rel="noopener noreferrer">
                    Amazon
                  </Button>
                </Grid>
              )}

              {/* Buy on iTunes Button */}
              {buyItunesUrl && (
                <Grid xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    href={buyItunesUrl}
                    target="_blank"
                    rel="noopener noreferrer">
                    iTunes
                  </Button>
                </Grid>
              )}
              {/* buy on google play button */}
              {buyGooglePlayUrl && (
                <Grid xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    href={buyGooglePlayUrl}
                    target="_blank"
                    rel="noopener noreferrer">
                    Google Play
                  </Button>
                </Grid>
              )}
              {/* buy on youtube button */}
              {buyYouTubeUrl && (
                <Grid xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    href={buyYouTubeUrl}
                    target="_blank"
                    rel="noopener noreferrer">
                    Youtube
                  </Button>
                </Grid>
              )}
              </Grid>
              </Paper>

            </Grid>
            <Grid xs={0} md={2}></Grid>

            {/* <Grid xs={12} sx={{ marginTop: ".5rem" }}>
              <Button
                disabled={savedTitleIds.includes(selectedTitleDetails.id)}
                variant="contained"
                onClick={() => handleSaveTitle(title)}>
                {savedTitleIds.includes(selectedTitleDetails.id)
                  ? "Title Saved!"
                  : "Save to Watchlist"}
              </Button>
            </Grid> */}

            {selectedTitleDetails.plot_overview && (
              <>
                <Grid xs={1}></Grid>
                <Grid xs={10}>
                  <Paper sx={{ marginTop: "1rem" }}>
                    <p>{selectedTitleDetails.plot_overview}</p>
                  </Paper>
                </Grid>
                <Grid xs={1}></Grid>
              </>
            )}
            {selectedTitleDetails.us_rating && (
              <>
                <Grid xs={5}></Grid>
                <Grid xs={2}>
                  <Paper sx={{ marginTop: "1rem" }}>
                    <h5 style={{ margin: "0", padding: "0" }}>
                      Rated {selectedTitleDetails.us_rating}
                    </h5>
                  </Paper>
                </Grid>
                <Grid xs={5}></Grid>
              </>
            )}

            {selectedTitleDetails.release_date && (
              <>
                <Grid xs={4}></Grid>
                <Grid xs={4}>
                  <Paper sx={{ marginTop: "1rem" }}>
                    <h5 style={{ margin: "0" }}>
                      Released on{" "}
                      {formatDate(selectedTitleDetails.release_date)}
                    </h5>
                  </Paper>
                </Grid>
                <Grid xs={4}></Grid>
              </>
            )}

            <Grid xs={2}></Grid>
            <Grid xs={8}>
              <Paper sx={{ marginTop: "1rem" }}>
                <Grid
                  container
                  justifyContent={"center"}
                  alignItems={"center"}
                  textAlign={"center"}
                  xs={12}>
                  {moreDetails &&
                    moreDetails.cast &&
                    moreDetails.cast.length > 0 &&
                    moreDetails.cast
                      .slice(0, Math.min(10, moreDetails.cast.length))
                      .map((castMember) => (
                        <Grid
                          xs={12}
                          sm={6}
                          // md={4}
                          // lg={3}
                          // xl={2}
                          key={castMember.id}
                          style={{ fontSize: "1rem" }}>
                          <Button
                            value={castMember.name}
                            onClick={(e) => {
                              console.log(
                                "Button clicked:",
                                e.currentTarget.value
                              );
                              handleActorNameClicked(e);
                            }}
                            style={{
                              color: "black",
                              textTransform: "none",
                              fontSize: "1rem",
                              marginTop: ".5rem",
                            }}
                            type="submit">
                            <span style={{ display: "" }}>
                              {castMember.name}
                            </span>
                          </Button>
                          <span style={{ display: "block" }}>
                            as {castMember.character}
                          </span>
                        </Grid>
                      ))}
                </Grid>
              </Paper>
            </Grid>
            <Grid xs={2}></Grid>

            {moreDetails &&
              moreDetails.crew &&
              moreDetails.crew.some(
                (crewMember) => crewMember.job === "Director"
              ) && (
                <>
                  <Grid xs={5}></Grid>
                  <Grid xs={2}>
                    <Paper sx={{ marginTop: "1rem" }}>
                      <Grid xs={12} container>
                        <Grid xs={12}>
                          <h5 style={{ margin: "0" }}>Directed By:</h5>
                        </Grid>
                        {moreDetails.crew
                          .filter((crewMember) => crewMember.job === "Director")
                          .map((crewMember) => (
                            <Grid xs={12}>
                              <h5 style={{ margin: "0" }} key={crewMember.id}>
                                {crewMember.name}
                              </h5>
                            </Grid>
                          ))}
                      </Grid>
                    </Paper>
                  </Grid>
                  <Grid xs={5}></Grid>
                </>
              )}

            {selectedTitleDetails.trailer && (
              <Grid xs={12}>
                {selectedTitleDetails.trailer.includes("youtube") ? (
                  <iframe
                    width="560rem"
                    height="315rem"
                    src={selectedTitleDetails.trailer}
                    title="YouTube video player"
                    className={styles.trailerIframe}
                    allowFullScreen={true}></iframe>
                ) : (
                  <a
                    href={selectedTitleDetails.trailer}
                    target="_blank"
                    rel="noreferrer">
                    <img
                      width="560"
                      height="315"
                      src={selectedTitleDetails.trailer_thumbnail}
                      alt="trailer thumbnail"
                    />
                  </a>
                )}
              </Grid>
            )}
          </Grid>

          <Paper sx={{ marginTop: "3rem" }}>
            <h6 className={styles.swiperTitle}>You Might Also Like:</h6>
          </Paper>

          <Swiper
            style={{
              "--swiper-navigation-color": "#000000",
              marginBottom: "6rem",
              marginTop: "1rem",
            }}
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            navigation={true}
            modules={[EffectCoverflow, Navigation]}
            className={styles.similarTitleSwiper}>
            {similarTitlesDetails.map((similarTitle) => (
              <SwiperSlide
                key={similarTitle.id}
                className={styles.similarTitleSlide}
                style={{
                  backgroundImage: `url(${similarTitle.poster}), linear-gradient(315deg, #43cea2 0%,  #185a9d 85%)`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
                onClick={() => handleTitleSelected(similarTitle.id)}>
                <h6 className={styles.similarTitleSlideTitle}>
                  {similarTitle.title}
                </h6>
                <h6 className={styles.similarTitleSlideType}>
                  {similarTitle.type === "movie"
                    ? "Movie"
                    : similarTitle.type === "tv_series"
                    ? "TV Series"
                    : similarTitle.type === "tv_miniseries"
                    ? "TV Miniseries"
                    : similarTitle.type === "short_film"
                    ? "Short Film"
                    : "Unknown Type"}
                </h6>
              </SwiperSlide>
            ))}
          </Swiper>
        </main>
      )}
    </>
  );
};

export default TitleDetails;

{
  /* {selectedTitleDetails.sources && (
              <Grid xs={12}>
                <p>Watch on:</p>
              </Grid>
            )} */
}

{
  /* Not Available} */
}
{
  /* {notAvailable && (
              <Grid xs={12}>
                <span>{notAvailable}</span>
              </Grid>
            )} */
}

{
  /* Netflix button */
}
{
  /* {netflixUrl && (
              <Grid xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  href={netflixUrl}
                  target="_blank"
                  rel="noopener noreferrer">
                  Watch on Netflix
                </Button>
              </Grid>
            )} */
}
{
  /* Amazon Prime button */
}
{
  /* {amazonPrimeUrl && (
              <Grid xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  href={amazonPrimeUrl}
                  target="_blank"
                  rel="noopener noreferrer">
                  Watch on Amazon Prime
                </Button>
              </Grid>
            )} */
}
{
  /* Hulu button */
}
{
  /* {huluUrl && (
              <Grid xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  href={huluUrl}
                  target="_blank"
                  rel="noopener noreferrer">
                  Watch on Hulu
                </Button>
              </Grid>
            )} */
}
{
  /* Max button */
}
{
  /* {maxUrl && (
              <Grid xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  href={maxUrl}
                  target="_blank"
                  rel="noopener noreferrer">
                  Watch on Max
                </Button>
              </Grid>
            )} */
}
{
  /* Disney Plus button */
}
{
  /* {disneyPlusUrl && (
              <Grid xs={12}>
                <a
                  href={disneyPlusUrl}
                  target="_blank"
                  rel="noopener noreferrer">
                  <img
                    style={{ height: "4rem" }}
                    src={DisneyPlusLogo}
                    alt="Disney+ Logo"
                  />
                </a>
              </Grid>
            )} */
}
{
  /* Apple TV button */
}
{
  /* {appleTvUrl && (
              <Grid xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  href={appleTvUrl}
                  target="_blank"
                  rel="noopener noreferrer">
                  Watch on Apple TV
                </Button>
              </Grid>
            )} */
}
{
  /* Peacock Button */
}
{
  /* {peacockUrl && (
              <Grid xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  href={peacockUrl}
                  target="_blank"
                  rel="noopener noreferrer">
                  Watch on Peacock
                </Button>
              </Grid>
            )} */
}

{
  /* Paramount Plus Button */
}
{
  /* {paramountPlusUrl && (
              <Grid xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  href={paramountPlusUrl}
                  target="_blank"
                  rel="noopener noreferrer">
                  Watch on Paramount+
                </Button>
              </Grid>
            )} */
}

{
  /* Hayu Button */
}
{
  /* {hayuUrl && (
              <Grid xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  href={hayuUrl}
                  target="_blank"
                  rel="noopener noreferrer">
                  Watch on Hayu
                </Button>
              </Grid>
            )} */
}

{
  /* Showtime Button */
}
{
  /* {showtimeUrl && (
              <Grid xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  href={showtimeUrl}
                  target="_blank"
                  rel="noopener noreferrer">
                  Watch on Showtime
                </Button>
              </Grid>
            )} */
}

{
  /* Crave Button */
}
{
  /* {craveUrl && (
              <Grid xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  href={craveUrl}
                  target="_blank"
                  rel="noopener noreferrer">
                  Watch on Crave
                </Button>
              </Grid>
            )} */
}

{
  /* Crave Starz Button */
}
{
  /* {craveStarzUrl && (
              <Grid xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  href={craveStarzUrl}
                  target="_blank"
                  rel="noopener noreferrer">
                  Watch on Crave Starz
                </Button>
              </Grid>
            )} */
}

{
  /* Stan Button */
}
{
  /* {stanUrl && (
              <Grid xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  href={stanUrl}
                  target="_blank"
                  rel="noopener noreferrer">
                  Watch on Stan
                </Button>
              </Grid>
            )} */
}

{
  /* Starz Button */
}
{
  /* {starzUrl && (
              <Grid xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  href={starzUrl}
                  target="_blank"
                  rel="noopener noreferrer">
                  Watch on Starz
                </Button>
              </Grid>
            )} */
}

{
  /* Foxtel Now Button */
}
{
  /* {foxtelNowUrl && (
              <Grid xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  href={foxtelNowUrl}
                  target="_blank"
                  rel="noopener noreferrer">
                  Watch on Foxtel Now
                </Button>
              </Grid>
            )} */
}

{
  /* Sky Go Button */
}
{
  /* {skyGoUrl && (
              <Grid xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  href={skyGoUrl}
                  target="_blank"
                  rel="noopener noreferrer">
                  Watch on Sky Go
                </Button>
              </Grid>
            )} */
}

{
  /*MGM Plus Button */
}
{
  /* {mgmPlusUrl && (
              <Grid xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  href={mgmPlusUrl}
                  target="_blank"
                  rel="noopener noreferrer">
                  Watch on MGM Plus
                </Button>
              </Grid>
            )} */
}

{
  /* {nowTvUrl && (
              <Grid xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  href={nowTvUrl}
                  target="_blank"
                  rel="noopener noreferrer">
                  Watch on Now TV
                </Button>
              </Grid>
            )} */
}

{
  /* {bingeUrl && (
              <Button
                variant="contained"
                color="primary"
                href={bingeUrl}
                target="_blank"
                rel="noopener noreferrer">
                Watch on BINGE
              </Button>
            )}

            {britboxUrl && (
              <Button
                variant="contained"
                color="primary"
                href={britboxUrl}
                target="_blank"
                rel="noopener noreferrer">
                Watch on Britbox UK
              </Button>
            )}

            {kanopyUrl && (
              <Button
                variant="contained"
                color="primary"
                href={kanopyUrl}
                target="_blank"
                rel="noopener noreferrer">
                Watch on Kanopy
              </Button>
            )}

           
            {youTubePremiumUrl && (
              <Button
                variant="contained"
                color="primary"
                href={youTubePremiumUrl}
                target="_blank"
                rel="noopener noreferrer">
                Watch on Youtube Premium
              </Button>
            )}

            
            {fuboTvUrl && (
              <Button
                variant="contained"
                color="primary"
                href={fuboTvUrl}
                target="_blank"
                rel="noopener noreferrer">
                Watch on fuboTV
              </Button>
            )} */
}

{
  /*purchase buttons*/
}
{
  /* {selectedTitleDetails.buy_sources && (
              <Grid xs={12}>
                <p>Rent or Buy:</p>
              </Grid>
            )} */
}

{
  /* Not Available} */
}
{
  /* {buyNotAvailable && (
              <Grid xs={12}>
                <span>{buyNotAvailable}</span>
              </Grid>
            )} */
}
{
  /* Buy on Amazon Button */
}
{
  /* {buyAmazonUrl && (
              <Grid xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  href={buyAmazonUrl}
                  target="_blank"
                  rel="noopener noreferrer">
                  Amazon
                </Button>
              </Grid>
            )} */
}

{
  /* Buy on iTunes Button */
}
{
  /* {buyItunesUrl && (
              <Grid xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  href={buyItunesUrl}
                  target="_blank"
                  rel="noopener noreferrer">
                  iTunes
                </Button>
              </Grid>
            )} */
}
{
  /* buy on google play button */
}
{
  /* {buyGooglePlayUrl && (
              <Grid xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  href={buyGooglePlayUrl}
                  target="_blank"
                  rel="noopener noreferrer">
                  Google Play
                </Button>
              </Grid>
            )} */
}
{
  /* buy on youtube button */
}
{
  /* {buyYouTubeUrl && (
              <Grid xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  href={buyYouTubeUrl}
                  target="_blank"
                  rel="noopener noreferrer">
                  Youtube
                </Button>
              </Grid>
            )} */
}
