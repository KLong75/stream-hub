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

import { fetchMixedGenreTV } from "../../utils/apiCalls";

import { CACHE_DURATION } from "../../utils/utils";

const MixedGenreTVSearch = () => {
  const [userInput, setUserInput] = useState({
    genres: [],
  });

  const [mixedGenreTvSearchResults, setMixedGenreTvSearchResults] =
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
    console.log("Searched Genres: ", searchedGenres);

    const cachedMixedGenreTvSearchResults = localStorage.getItem(
      `mixedGenreTvSearchResults_${searchedGenres}`
    );

    if (cachedMixedGenreTvSearchResults) {
      const { data, timestamp } = JSON.parse(
        cachedMixedGenreTvSearchResults
      );

      const now = Date.now();
      if (now - timestamp < CACHE_DURATION) {
        setMixedGenreTvSearchResults(data);
        console.log("Using cached mixed genre tv search results", data);
        return;
      } else {
        localStorage.removeItem(
          `mixedGenreTvSearchResults_${searchedGenres}`
        );
        console.log("Cached Data Expired and Removed");
      }
    }

    if (!cachedMixedGenreTvSearchResults) {
      try {
        const response = await fetchMixedGenreTV(searchedGenres);

        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const searchResults = await response.json();
        console.log("Mixed Genre Movie Search Results: ", searchResults);

        const searchResultsTitleData = searchResults.results.map((tvShow) => ({
          id: tvShow.id,
          title: tvShow.title,
          year: tvShow.release_date,
          type: 'tv',
          poster_url: "https://image.tmdb.org/t/p/w300/" + tvShow.poster_path,
          backdrop_url: "https://image.tmdb.org/t/p/w500/" + tvShow.backdrop_path,
          genres: tvShow.genre_ids,
        }));

        console.log("Mixed Genre Tv Search Title Data: ",searchResultsTitleData);

        const cacheData = {
          data: searchResultsTitleData,
          timestamp: Date.now(),
        };
        localStorage.setItem(
          `mixedGenreTvSearchResults_${searchedGenres}`,
          JSON.stringify(cacheData)
        );
        setUserInput({ genres: [] });
        setMixedGenreTvSearchResults(searchResultsTitleData);
        window.location.href =
          "/mixed_genre_search_results?titles=" +
          encodeURIComponent(JSON.stringify(searchResultsTitleData));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <h3>Mixed Genre TV Search</h3>
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
                    checked={userInput.genres.includes("10759")}
                    onChange={handleGenreChange}
                  />
                }
                value="10759"
                label="Action & Adventure"
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
                value="10762"
                control={
                  <Checkbox
                    onChange={handleGenreChange}
                    checked={userInput.genres.includes("10762")}
                  />
                }
                label="Kids"
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
                value="10763"
                control={
                  <Checkbox
                    onChange={handleGenreChange}
                    checked={userInput.genres.includes("10763")}
                  />
                }
                label="News"
              />
              <FormControlLabel
                value="10764"
                control={
                  <Checkbox
                    onChange={handleGenreChange}
                    checked={userInput.genres.includes("10764")}
                  />
                }
                label="Reality"
              />
              <FormControlLabel
                value="10765"
                control={
                  <Checkbox
                    onChange={handleGenreChange}
                    checked={userInput.genres.includes("10765")}
                  />
                }
                label="Sci-Fi and Fantasy"
              />
              <FormControlLabel
                value="10766"
                control={
                  <Checkbox
                    onChange={handleGenreChange}
                    checked={userInput.genres.includes("10766")}
                  />
                }
                label="Soap"
              />
              <FormControlLabel
                value="10767"
                control={
                  <Checkbox
                    onChange={handleGenreChange}
                    checked={userInput.genres.includes("10767")}
                  />
                }
                label="Talk"
              />
              <FormControlLabel
                value="10768"
                control={
                  <Checkbox
                    onChange={handleGenreChange}
                    checked={userInput.genres.includes("10768")}
                  />
                }
                label="War & Politics"
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

export default MixedGenreTVSearch;
