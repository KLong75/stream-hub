// import from react
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
// import context
import { TitleDetailsContext } from "../../context/TitleDetailsContext";
import { SearchResultsContext } from "../../context/SearchResultsContext";
// import api calls
import { searchByName } from "../../utils/apiCalls";
// import from material-ui
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
// import from swiper.js
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation } from "swiper/modules";
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
import SourceLink from "../../components/SourceLink";
import LoadingClapBoard from "../../components/LoadingClapBoard";
import { PaperUnderlay } from "../../components/PaperUnderlay";
import ActorSearchResultsModal from "../../components/ActorSearchResultsModal";
// import source logos
import { sourceLogos } from "../../utils/sourceLogos";
import { buySourceLogos } from "../../utils/buySourceLogos";
// import styles
import styles from "./TitleDetails.module.css";



const TitleDetails = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  // const [selectedActorData, setSelectedActorData] = useState(null);
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
  // console.log("title", title);
  const { selectedTitleDetails } = useContext(TitleDetailsContext);
  // console.log("selectedTitleDetails", selectedTitleDetails);
  const { setActorSearchResults } = useContext(SearchResultsContext);
  const [saveTitle] = useMutation(SAVE_TITLE);
  // eslint-disable-next-line no-unused-vars
  const [selectedActorName, setSelectedActorName] = useState("");

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
        setActorSearchResults(data);
        console.log("cached data retrieved, parsed, time checked", data);
        // navigate("/actor_search_results", { state: { data } });
        setModalOpen(true);
        return;
      } else {
        localStorage.removeItem(`actorSearchResults_${searchedName}`);
        // console.log("Cached Data Expired and Removed");
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
        // console.log(results);
        const actorSearchData = results.results
          .filter((actor) => {
            if (
              actor.known_for_department !== "Acting" ||
              actor.name !== searchedName ||
              (actor.profile_path === null)
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
        // console.log(searchedName);
        // navigate("/actor_search_results", { state: { data: actorSearchData } });
        setModalOpen(true);
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  const handleCloseActorModal = () => {
    setSelectedActorName("");
    setModalOpen(false);
  };


  const handleSaveTitle = async (title) => {
    const input = {
      id: title.selectedTitleDetails.id,
      title: title.selectedTitleDetails.title,
      plot_overview: title.selectedTitleDetails.plot_overview,
      poster: title.selectedTitleDetails.poster,
      backdrop: title.selectedTitleDetails.backdrop,
      release_date: title.selectedTitleDetails.release_date,
      imdb_id: title.selectedTitleDetails.imdb_id,
      tmdb_id: title.selectedTitleDetails.tmdb_id,
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
      similar_title_data: selectedTitleDetails.similar_title_data.map(
        (title) => ({
          id: title.id,
          title: title.title,
          type: title.type,
          poster: title.poster,
        })
      ),
      cast: selectedTitleDetails.cast.map((actor) => ({
        id: actor.id,
        name: actor.name,
        character: actor.character,
        known_for_department: actor.known_for_department,
      })),
      crew: selectedTitleDetails.crew.map((crewPerson) => ({
        id: crewPerson.id,
        name: crewPerson.name,
        job: crewPerson.job,
        known_for_department: crewPerson.known_for_department,
        department: crewPerson.department,
      })),
    };
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      await saveTitle({
        variables: { input },
      });
      // console.log(`Title ${input.title} saved successfully`, input);
      // console.log(input.id);
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
      <main
        className={styles.titleDetailsMain}
        style={{
          backgroundImage: `url(${selectedTitleDetails.backdrop})`,
          // backgroundSize: "cover",
          backgroundPosition: "center",
          // backgroundPosition: "top",
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
            <PaperUnderlay sx={{ marginTop: "2rem" }}>
              <h2
                style={{
                  background:
                    "linear-gradient(315deg, #185a9d 0%, #43cea2 85%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  fontFamily: "Raleway",
                  fontWeight: "700",
                  letterSpacing: ".2rem",
                  fontSize: "1.65rem",
                  marginTop: "0",
                  marginBottom: "0",
                  padding: ".25rem",
                }}>
                {selectedTitleDetails.title}
              </h2>
            </PaperUnderlay>
          </Grid>
          <Grid xs={2}></Grid>
          {selectedTitleDetails.type && (
            <>
              <Grid xs={3}></Grid>
              <Grid xs={6}>
                <PaperUnderlay sx={{ marginTop: "1rem" }}>
                  <h3
                    style={{
                      background:
                        "linear-gradient(315deg, #185a9d 0%, #43cea2 85%)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                      fontFamily: "Raleway",
                      fontWeight: "700",
                      letterSpacing: ".2rem",
                      fontSize: "1.2rem",
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
                </PaperUnderlay>
              </Grid>
              <Grid xs={3}></Grid>
            </>
          )}

          {selectedTitleDetails.genre_names &&
            selectedTitleDetails.genre_names.length > 0 && (
              <Grid container xs={12} justifyContent="center">
                {selectedTitleDetails.genre_names.map((genre) => (
                  <Grid key={genre} xs={12} md={3}>
                    <PaperUnderlay sx={{ marginTop: "1rem" }}>
                      <h4
                        style={{
                          margin: "0",
                          marginLeft: ".5rem",
                          marginRight: ".5rem",
                        }}
                        key={genre}>
                        {genre}
                      </h4>
                    </PaperUnderlay>
                  </Grid>
                ))}
              </Grid>
            )}
          <Grid xs={0} md={2}></Grid>
          <Grid container xs={12} md={2}>
            <PaperUnderlay sx={{ marginTop: "1rem" }}>
              <Grid container justifyContent="center" alignItems="center">
                {selectedTitleDetails.sources && selectedTitleDetails.sources.length === 0 &&(
                  <Grid xs={12}>
                    <h6 style={{ fontSize: "1rem" }}>Not Available For Subscription Streaming</h6>
                  </Grid>
                )}
                {selectedTitleDetails.sources && selectedTitleDetails.sources.length > 0 &&(
                  <Grid xs={12}>
                    <h6 style={{ fontSize: "1rem" }}>Watch on:</h6>
                  </Grid>
                )}
                {selectedTitleDetails.sources.map((source, index) => (
                  <Grid key={index} xs={12}>
                    <SourceLink
                      url={source.web_url}
                      logoSrc={sourceLogos[source.name]}
                    />
                  </Grid>
                ))}
              </Grid>
            </PaperUnderlay>
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
            <PaperUnderlay sx={{ marginTop: "1rem" }}>
              <Grid container justifyContent="center" alignItems="center">
                {selectedTitleDetails.buy_sources && selectedTitleDetails.buy_sources.length === 0 &&(
                  <Grid xs={12}>
                    <h6 style={{ fontSize: "1rem" }}>Not Available For Purchase or Rent</h6>
                  </Grid>
                )}
                {selectedTitleDetails.buy_sources && selectedTitleDetails.buy_sources.length > 0 && (
                  <Grid xs={12}>
                    <h6 style={{ fontSize: "1rem" }}>Rent or Buy:</h6>
                  </Grid>
                )}
                {selectedTitleDetails.buy_sources.map((source, index) => (
                  <Grid key={index} xs={12}>
                    <SourceLink
                      url={source.web_url}
                      logoSrc={buySourceLogos[source.name]}
                    />
                  </Grid>
                ))}
              </Grid>
            </PaperUnderlay>
          </Grid>
          <Grid xs={0} md={2}></Grid>

          {selectedTitleDetails.plot_overview && (
            <>
              <Grid xs={1}></Grid>
              <Grid xs={10}>
                <PaperUnderlay sx={{ marginTop: "1rem" }}>
                  <p style={{ marginLeft: ".5rem", marginRight: ".5rem" }}>
                    {selectedTitleDetails.plot_overview}
                  </p>
                </PaperUnderlay>
              </Grid>
              <Grid xs={1}></Grid>
            </>
          )}
          {selectedTitleDetails.us_rating && (
            <>
              <Grid xs={5}></Grid>
              <Grid xs={2}>
                <PaperUnderlay sx={{ marginTop: "1rem" }}>
                  <h5
                    style={{
                      marginLeft: ".5rem",
                      marginRight: ".5rem",
                      marginTop: "0",
                      marginBottom: "0",
                    }}>
                    Rated {selectedTitleDetails.us_rating}
                  </h5>
                </PaperUnderlay>
              </Grid>
              <Grid xs={5}></Grid>
            </>
          )}
          {selectedTitleDetails.release_date && (
            <>
              <Grid xs={4}></Grid>
              <Grid xs={4}>
                <PaperUnderlay sx={{ marginTop: "1rem" }}>
                  <h5
                    style={{
                      marginLeft: ".5rem",
                      marginRight: ".5rem",
                      marginTop: "0",
                      marginBottom: "0",
                    }}>
                    Released on {formatDate(selectedTitleDetails.release_date)}
                  </h5>
                </PaperUnderlay>
              </Grid>
              <Grid xs={4}></Grid>
            </>
          )}
          <Grid xs={2}></Grid>
          <Grid xs={8}>
            <PaperUnderlay sx={{ marginTop: "1rem" }}>
              <Grid
                container
                justifyContent={"center"}
                alignItems={"center"}
                textAlign={"center"}
                xs={12}>
                {selectedTitleDetails.cast &&
                  selectedTitleDetails.cast.length > 0 &&
                  selectedTitleDetails.cast.map((castMember) => (
                    <Grid
                      xs={12}
                      sm={6}
                      key={castMember.id}
                      style={{ fontSize: "1rem" }}>
                      <Button
                        value={castMember.name}
                        onClick={(e) => {
                          // console.log("Button clicked:", e.currentTarget.value);
                          handleActorNameClicked(e);
                        }}
                        style={{
                          color: "black",
                          textTransform: "none",
                          fontSize: "1rem",
                          marginTop: ".5rem",
                        }}
                        type="submit">
                        <span style={{ display: "" }}>{castMember.name}</span>
                      </Button>
                      <span
                        style={{
                          display: "block",
                          marginBottom: ".25rem",
                        }}>
                        as {castMember.character}
                      </span>
                    </Grid>
                  ))}
              </Grid>
            </PaperUnderlay>
          </Grid>
          <Grid xs={2}></Grid>
          {selectedTitleDetails.crew && (
            <>
              <Grid xs={4}></Grid>
              <Grid xs={4}>
                {selectedTitleDetails.crew &&
                  selectedTitleDetails.crew.length > 0 &&
                  selectedTitleDetails.crew.map((crewMember) => (
                    <PaperUnderlay
                      key={crewMember.id}
                      sx={{ marginTop: "1rem" }}>
                      <Grid xs={12} container sx={{width: 'fit-content(20em)'}}>
                        <Grid xs={12}>
                          <h5 style={{ margin: "0" }}>Directed By:</h5>
                        </Grid>
                        <Grid xs={12} key={crewMember.id}>
                          <h5 style={{ margin: "0" }} key={crewMember.id}>
                            {crewMember.name}
                          </h5>
                        </Grid>
                      </Grid>
                    </PaperUnderlay>
                  ))}
              </Grid>
              <Grid xs={4}></Grid>
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
        <PaperUnderlay sx={{ marginTop: "3rem", marginBottom: "2rem" }}>
          <h6 className={styles.swiperTitle}>You Might Also Like:</h6>
        </PaperUnderlay>
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
          {selectedTitleDetails.similar_title_data.map((similarTitle) => (
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
        <ActorSearchResultsModal open={modalOpen} onClose={handleCloseActorModal} />
      </main>
    </>
  );
};
export default TitleDetails;
