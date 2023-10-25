// import from react
import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// import from mui
import { ButtonBase } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
// import Paper from "@mui/material/Paper";
// import { styled } from "@mui/material/styles";
// import context
import { SearchResultsContext } from "../../context/SearchResultsContext";
// import from utils
import { useTitleSelection } from "../../utils/useTitleSelection";
import Auth from "../../utils/auth";
import { QUERY_ME } from "../../utils/queries";
// import from apollo
import { useQuery } from "@apollo/client";
// import components
import LoadingClapBoard from "../../components/LoadingClapBoard";
// import styles
import styles from "./TitleSearchResults.module.css";


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
    <main className="gradientBackground">
    <Grid container sx={{ textAlign: "center", marginBottom: '4rem' }} >
      <Grid xs={12}>
      
        <h3
          style={{
            background: "linear-gradient(315deg, #185a9d 0%, #43cea2 85%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "black",
            fontFamily: "Raleway",
            fontWeight: "700",
            letterSpacing: ".2rem",
            fontSize: "2rem",
            padding: ".75rem",
          }}>
          Title Search Results
        </h3>
        
      </Grid>
      <Grid xs={12}>
      
        <h4
          style={{
            fontSize: "1.75rem",
            margin: "0",
            padding: ".5rem",
            background: "linear-gradient(315deg, #185a9d 0%, #43cea2 85%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "black",
            fontFamily: "Raleway",
            fontWeight: "700",
            letterSpacing: ".2rem",
          }}>
          Searched For: 
          <br />
          '{searchedTitle}'
        </h4>
       
      </Grid>
      <Grid xs={12} container sx={{marginTop: '2rem'}}>
        {titleSearchResults
          .filter(
            (result) =>
              result.image_url !== "https://cdn.watchmode.com/profiles/"
          ) // Filter out titles with null year

          .map((result) => (           
            <Grid xs={12} sm={6} md={4} lg={3} key={result.id} sx={{marginBottom: '4rem'}}>           
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
                <ButtonBase
                  onClick={(event) => handleTitleSelected(result.id, event)}>
                <img className={styles.poster} src={result.image_url} alt={result.title} />
                </ButtonBase>
              )}
              {/* <Button
                variant="contained"
                value={result.id}
                onClick={handleTitleSelected}>
                More Details
              </Button> */}           
            </Grid>         
          ))}
      </Grid>
    </Grid>
    </main>
  );
};

export default TitleSearchResults;
