// import from react
import React, { useState, useEffect,  useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Auth from "../../utils/auth";
// import context
import { SearchResultsContext } from "../../context/SearchResultsContext";
// import from mui
import { ButtonBase, Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
// import from swiper.js
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination, Parallax } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
// import components
import VerticalCardSwipeGallery from "../../components/VerticalCardSwipeGallery";
// import images
import imageNotAvailable from "../../assets/images/no_image_available.jpg";
// import from utils
import { useTitleSelectionTMDBId } from '../../utils/useTitleSelectionTMDBId';

const ActorSearchResults = () => {
  const location = useLocation();
const searchTerm = location.state.searchTerm;
  const navigate = useNavigate();
  const { actorSearchResults } = useContext(SearchResultsContext); // Get the data from context
  // const [actorSearchResults, setActorSearchResults] = useState([]);
  console.log(actorSearchResults);
  useEffect(() => {}, [actorSearchResults]);
  console.log(actorSearchResults);
  const handleTitleSelected = useTitleSelectionTMDBId();

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
  }, [actorSearchResults]);

  if (showRedirectMessage) {
    return <div>Please login or signup</div>;
  }

  return (
    <>
      <Grid container sx={{ textAlign: "center" }}>
            <Grid xs={12}>
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
                  fontSize: "2rem",
                  marginTop: "0",
                  marginBottom: "0",
                  padding: ".5rem",
                }}>Actor Search Results</h3>
                 <h4
                style={{
                  fontSize: "1.75rem",
                  margin: "0",
                  padding: ".5rem",
                  background:
                    "linear-gradient(315deg, #185a9d 0%, #43cea2 85%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  fontFamily: "monospace",
                  fontWeight: "700",
                  letterSpacing: ".2rem",
                }}>
                Searched for: "{searchTerm}"
              </h4>
            </Grid>
          </Grid>
                
      <div className="search-results-container">
        {actorSearchResults
          .filter((result) => result.known_for.length > 0)
          .map((result) => (
            <div key={result.id}>
              <p>{`${result.name}`}</p>
              <p>{`${result.job}`}</p>
              {result.image_url ? (
                <img
                  src={result.image_url}
                  alt={result.name}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              ) : (
                <div>
                  <p>No image available</p>
                  <img src={imageNotAvailable} alt="Unavailable" />
                </div>
              )}

              <p>Known For: </p>
              {/* Iterate through known_for array */}
              {result.known_for.map((knownForItem) => (
                <div key={knownForItem.id}>
                  <p>{knownForItem.title}</p>
                  <ButtonBase                
                          onClick={() =>
                            handleTitleSelected(
                              `${knownForItem.media_type + "-" + knownForItem.id}`
                            )
                          }>
                  <img
                    src={
                      "https://image.tmdb.org/t/p/w200/" +
                      knownForItem.poster_path
                    }
                    alt={knownForItem.title}
                  />
                  </ButtonBase>
                  <p>{knownForItem.overview}</p>
                  {/* <Button
                    variant="contained"
                    value={knownForItem.media_type + "-" + knownForItem.id}
                    onClick={handleTitleSelected}
                  >
                    More Details
                  </Button> */}
                </div>
              ))}
            </div>
          ))}
      </div>
    </>
  );
};

export default ActorSearchResults;