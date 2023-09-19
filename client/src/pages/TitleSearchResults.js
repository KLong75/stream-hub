// import from react
import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// import from mui
import Button from "@mui/material/Button";
// import context
import { SearchResultsContext } from "../context/SearchResultsContext";

import { useTitleSelection } from "../utils/useTitleSelection";
import Auth from "../utils/auth";

import { QUERY_ME } from "../utils/queries";
import { useQuery } from "@apollo/client";
import LoadingClapBoard from "../components/LoadingClapBoard";

const TitleSearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [showRedirectMessage, setShowRedirectMessage] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(Auth.loggedIn());
  const { data, loading } = useQuery(QUERY_ME);

  const savedTitleIds = data?.me.savedTitles.map((title) => title.id) || [];
  console.log("savedTitleIds", savedTitleIds);

  const searchedTitle = location.state?.searchedTitle;
  const { titleSearchResults } = useContext(SearchResultsContext); // Get the data from context
  console.log(titleSearchResults);
  const handleTitleSelected = useTitleSelection();
  
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
  }, [titleSearchResults]);

  

  if (showRedirectMessage) {
    return <div>Please login or signup</div>;
  }

  if (loading) {
    return <LoadingClapBoard />;
  }
  
  return (
    <>
      <h3>Results For:</h3>
      <h4>'{searchedTitle}'</h4>
      <div>
        {titleSearchResults
          .filter(
            (result) =>
              result.image_url !== "https://cdn.watchmode.com/profiles/"
          ) // Filter out titles with null year

          .map((result) => (
            <div key={result.id}>
              {result.title && <p>{result.title}</p>}

              {result.type && (
                <p>
                  {result.type === "movie"
                    ? "Movie"
                    : result.type === "tv_series"
                    ? "TV Series"
                    : result.type === "tv_miniseries"
                    ? "TV Miniseries"
                    : result.type === "short_film"
                    ? "Short Film"
                    : "Unknown Type"}
                </p>
              )}
              {result.year && <p>{result.year}</p>}
              {result.image_url && (
                <img src={result.image_url} alt={result.title} />
              )}
              <Button
                variant="contained"
                value={result.id}
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

export default TitleSearchResults;
