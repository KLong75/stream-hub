// import from React
import React, { useEffect, useState } from "react";

// import from Material UI
import FormGroup from "@mui/material/FormGroup";
// import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// import MenuItem from "@mui/material";
// import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
// import InputLabel from "@mui/material/InputLabel";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FormLabel } from "@mui/material";

import { fetchMixedGenreMovies } from "../../utils/apiCalls";

import { CACHE_DURATION } from "../../utils/utils";

const MixedGenreMovieSearch = () => {
  const [userInput, setUserInput] = useState({
    genres: [],
  });

  const [mixedGenreMovieSearchResults, setMixedGenreMovieSearchResults] =
    useState([]);

  useEffect(() => {
    console.log("State has changed: ", userInput);
  }, [userInput]);

  const handleGenreChange = (event) => {
    const { value, checked } = event.target;
    console.log("Genre checkbox change: ", { value, checked });
    setUserInput((prevUserInput) => {
      // Check if the checkbox was checked or unchecked
      if (checked) {
        // Add the selected genre to the array
        return { ...prevUserInput, genres: [...prevUserInput.genres, value] };
      } else {
        // Remove the unselected genre from the array
        return {
          ...prevUserInput,
          genres: prevUserInput.genres.filter((genre) => genre !== value),
        };
      }
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("User input: ", userInput);

    const searchedGenres = userInput.genres.join(",");

    const cachedMixedGenreMovieSearchResults = localStorage.getItem(
      `mixedGenreMovieSearchResults_${searchedGenres}`
    );

    if (cachedMixedGenreMovieSearchResults) {
      const { data, timestamp } = JSON.parse(
        cachedMixedGenreMovieSearchResults
      );

      const now = Date.now();
      if (now - timestamp < CACHE_DURATION) {
        setMixedGenreMovieSearchResults(data);
        console.log("Using cached mixed genre movie search results", data);
        return;
      } else {
        localStorage.removeItem(
          `mixedGenreMovieSearchResults_${searchedGenres}`
        );
        console.log("Cached Data Expired and Removed");
      }
    }

    if (!cachedMixedGenreMovieSearchResults) {
      try {
        const response = await fetchMixedGenreMovies(searchedGenres);

        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const searchResults = await response.json();
        console.log("Mixed Genre Movie Search Results: ", searchResults);

        const searchResultsTitleData = searchResults.results.map((movie) => ({
          id: movie.id,
          title: movie.title,
          year: movie.release_date.slice(0, 4),
          type: 'movie',
          poster_url: "https://image.tmdb.org/t/p/w300/" + movie.poster_path,
          backdrop_url: "https://image.tmdb.org/t/p/w500/" + movie.backdrop_path,
          genres: movie.genre_ids,
        }));

        console.log("Mixed Genre Movie Search Title Data: ",searchResultsTitleData);

        const cacheData = {
          data: searchResultsTitleData,
          timestamp: Date.now(),
        };
        localStorage.setItem(
          `mixedGenreMovieSearchResults_${searchedGenres}`,
          JSON.stringify(cacheData)
        );
        setUserInput({ genres: [] });
        setMixedGenreMovieSearchResults(searchResultsTitleData);
        // window.location.href =
        //   "/mixed_genre_search_results?titles=" +
        //   encodeURIComponent(JSON.stringify(searchResultsTitleData));
        window.location.href =
  "/mixed_genre_search_results?titles=" +
  encodeURIComponent(JSON.stringify(searchResultsTitleData)) +
  "&genres=" +
  encodeURIComponent(JSON.stringify(userInput.genres));

      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <h3>Mixed Genre Movie Search</h3>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <FormLabel>Select Genre</FormLabel>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>What are you in the mood for?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <h4>Select any combination</h4>
              <p>
                <em>
                  Looking for an extra-terrestrial romance? A crime thriller? A hilarious horror movie? We've got you covered. Select any combination of genres to find the perfect movie for your mood.
                  <br />
                  <strong>Note: The more genres you select, the fewer results you will get.
                  </strong>
                </em>
              </p>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={userInput.genres.includes("28")}
                    onChange={handleGenreChange}
                  />
                }
                value="28"
                label="Action"
              />
         
              <FormControlLabel
                value="12"
                control={
                  <Checkbox
                    onChange={handleGenreChange}
                    checked={userInput.genres.includes("12")}
                  />
                }
                label="Adventure"
              />
              <FormControlLabel
                value="16"
                control={
                  <Checkbox
                    onChange={handleGenreChange}
                    checked={userInput.genres.includes("16")}
                  />
                }
                label="Animation"
              />
              <FormControlLabel
                value="35"
                control={
                  <Checkbox
                    onChange={handleGenreChange}
                    checked={userInput.genres.includes("35")}
                  />
                }
                label="Comedy"
              />
              <FormControlLabel
                value="80"
                control={
                  <Checkbox
                    onChange={handleGenreChange}
                    checked={userInput.genres.includes("80")}
                  />
                }
                label="Crime"
              />
              <FormControlLabel
                value="99"
                control={
                  <Checkbox
                    onChange={handleGenreChange}
                    checked={userInput.genres.includes("99")}
                  />
                }
                label="Documentary"
              />
              <FormControlLabel
                value="18"
                control={
                  <Checkbox
                    onChange={handleGenreChange}
                    checked={userInput.genres.includes("18")}
                  />
                }
                label="Drama"
              />
              <FormControlLabel
                value="10751"
                control={
                  <Checkbox
                    onChange={handleGenreChange}
                    checked={userInput.genres.includes("10751")}
                  />
                }
                label="Family"
              />
              <FormControlLabel
                value="14"
                control={
                  <Checkbox
                    onChange={handleGenreChange}
                    checked={userInput.genres.includes("14")}
                  />
                }
                label="Fantasy"
              />
              <FormControlLabel
                value="36"
                control={
                  <Checkbox
                    onChange={handleGenreChange}
                    checked={userInput.genres.includes("36")}
                  />
                }
                label="History"
              />
              <FormControlLabel
                value="27"
                control={
                  <Checkbox
                    onChange={handleGenreChange}
                    checked={userInput.genres.includes("27")}
                  />
                }
                label="Horror"
              />
              
              <FormControlLabel
                value="10402"
                control={
                  <Checkbox
                    onChange={handleGenreChange}
                    checked={userInput.genres.includes("10402")}
                  />
                }
                label="Music"
              />
            
              <FormControlLabel
                value="9648"
                control={
                  <Checkbox
                    onChange={handleGenreChange}
                    checked={userInput.genres.includes("9648")}
                  />
                }
                label="Mystery"
              />
              <FormControlLabel
                value="10749"
                control={
                  <Checkbox
                    onChange={handleGenreChange}
                    checked={userInput.genres.includes("10749")}
                  />
                }
                label="Romance"
              />
              <FormControlLabel
                value="878"
                control={
                  <Checkbox
                    onChange={handleGenreChange}
                    checked={userInput.genres.includes("878")}
                  />
                }
                label="Science Fiction"
              />
              <FormControlLabel
                value="53"
                control={
                  <Checkbox
                    onChange={handleGenreChange}
                    checked={userInput.genres.includes("53")}
                  />
                }
                label="Thriller"
              />
              <FormControlLabel
                value="10752"
                control={
                  <Checkbox
                    onChange={handleGenreChange}
                    checked={userInput.genres.includes("10752")}
                  />
                }
                label="War"
              />
              <FormControlLabel
                value="37"
                control={
                  <Checkbox
                    onChange={handleGenreChange}
                    checked={userInput.genres.includes("37")}
                  />
                }
                label="Western"
              />
            </AccordionDetails>
          </Accordion>
        </FormGroup>

        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </>
  );
};

export default MixedGenreMovieSearch;
