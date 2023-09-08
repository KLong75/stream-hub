// import from react
import React, { useState, useEffect,  useContext } from "react";
import { useNavigate } from "react-router-dom";

import Auth from "../utils/auth";
// import context
import { SearchResultsContext } from "../context/SearchResultsContext";
// import from mui
import Button from "@mui/material/Button";
// import images
import imageNotAvailable from "../assets/images/no_image_available.jpg";
// import from utils
import { useTitleSelectionTMDBId } from '../utils/useTitleSelectionTMDBId';

const ActorSearchResults = () => {
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
      <h3>Actor Search Results</h3>
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
                  <img
                    src={
                      "https://image.tmdb.org/t/p/w200/" +
                      knownForItem.poster_path
                    }
                    alt={knownForItem.title}
                  />
                  <p>{knownForItem.overview}</p>
                  <Button
                    variant="contained"
                    value={knownForItem.media_type + "-" + knownForItem.id}
                    onClick={handleTitleSelected}
                  >
                    More Details
                  </Button>
                </div>
              ))}
            </div>
          ))}
      </div>
    </>
  );
};

export default ActorSearchResults;