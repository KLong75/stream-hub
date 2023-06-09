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

import { fetchTitlesByGenreSourceType } from "../../utils/apiCalls";

import { CACHE_DURATION } from "../../utils/utils";
import { FormLabel } from "@mui/material";

const SearchByGenreSourceType = () => {
  const [userInput, setUserInput] = useState({
    genres: [],
    source: [],
    type: [],
  });

  const [genreSourceTypeResults, setGenreSourceTypeResults] = useState([]);

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

  const handleTypeChange = (event) => {
    const { value, checked } = event.target;
    console.log("Type checkbox change: ", { value, checked });
    setUserInput((prevUserInput) => {
      if (checked) {
        return { ...prevUserInput, type: [...prevUserInput.type, value] };
      } else {
        return {
          ...prevUserInput,
          type: prevUserInput.type.filter((type) => type !== value),
        };
      }
    });
  };

  const handleSourceChange = (event) => {
    const { value, checked } = event.target;
    setUserInput((prevUserInput) => {
      if (checked) {
        return { ...prevUserInput, source: [...prevUserInput.source, value] };
      } else {
        return {
          ...prevUserInput,
          source: prevUserInput.source.filter((source) => source !== value),
        };
      }
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Perform any necessary actions with the selected values
    console.log(userInput.genres, userInput.type, userInput.source); // Example: Output selected options to the console

    // Convert arrays to comma-separated strings for the API call
    const genres = userInput.genres.join(",");
    const sources = userInput.source.join(",");
    const types = userInput.type.join(",");

    const cachedGenreSourceTypeResults = localStorage.getItem(
      `genreSourceType_${genres}_${sources}_${types}`
    );

    if (cachedGenreSourceTypeResults) {
      const { data, timestamp } = JSON.parse(cachedGenreSourceTypeResults);

      const now = Date.now();
      if (now - timestamp < CACHE_DURATION) {
        setGenreSourceTypeResults(data);
        console.log("Using cached data", data);
        window.location.href =
          "/search_results?titles=" + encodeURIComponent(JSON.stringify(data));
        return;
      } else {
        localStorage.removeItem(
          `genreSourceType_${genres}_${sources}_${types}`
        );
        console.log("Cached Data Expired and Removed");
      }
    }

    if (!cachedGenreSourceTypeResults) {
      try {
        console.log(
          `Making API request with - Genres: ${genres}, Sources: ${sources}, Types: ${types}`
        );

        const response = await fetchTitlesByGenreSourceType(
          sources,
          genres,
          types
        );

        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const { titles } = await response.json();

        console.log(titles);

        if (titles.length === 0) {
          alert("No results found. Please try again.");
          return;
        }
        if (titles === undefined) {
          alert("No results found. Please try again.");
          return;
        }

 

        const titleData = titles.map((titles) => ({
          id: titles.id,
          title: titles.title,
          type: titles.type,
          year: titles.year,
        }));

        setGenreSourceTypeResults(titleData);

        console.log(titleData);
        console.log(`genres: ${genres}, sources: ${sources}, types: ${types}`);

        const cacheData = {
          data: titleData,
          timestamp: Date.now(),
        };
        localStorage.setItem(
          `genreSourceType_${genres}_${sources}_${types}`,
          JSON.stringify(cacheData)
        );

        setUserInput({
          genres: [],
          source: [],
          type: [],
        });
        // window.location.href =
        //   "/search_results?titles=" +
        //   encodeURIComponent(JSON.stringify(titleData));
        window.location.href =
          "/genre_source_type_search_results?titles=" +
          encodeURIComponent(JSON.stringify(titleData)) + "&genres=" + encodeURIComponent(JSON.stringify(genres)) + "&sources=" + encodeURIComponent(JSON.stringify(sources)) + "&types=" + encodeURIComponent(JSON.stringify(types));
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <>
      <h3>Search By Combination of Genre, Source, and Type</h3>
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
              <h4>For Best Results Select One Genre</h4>
              <p><em>Please note that searching for Sci-Fi and Romance won't give you a list of alien love stories. It will give you a list of titles mixed with both Science Fiction AND Romance.</em></p>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={userInput.genres.includes("1")}
                    onChange={handleGenreChange}
                  />
                }
                value="1"
                label="Action"
              />
              <FormControlLabel
                value="39"
                control={
                  <Checkbox
                    onChange={handleGenreChange}
                    checked={userInput.genres.includes("39")}
                  />
                }
                label="Action & Adventure"
              />
              <FormControlLabel
                value="2"
                control={
                  <Checkbox
                    onChange={handleGenreChange}
                    checked={userInput.genres.includes("2")}
                  />
                }
                label="Adventure"
              />
              <FormControlLabel
                value="3"
                control={
                  <Checkbox
                    onChange={handleGenreChange}
                    checked={userInput.genres.includes("3")}
                  />
                }
                label="Animation"
              />
              <FormControlLabel
                value="33"
                control={
                  <Checkbox
                    onChange={handleGenreChange}
                    checked={userInput.genres.includes("33")}
                  />
                }
                label="Anime"
              />
              <FormControlLabel 
                value="31"
                control={
                  <Checkbox
                    onChange={handleGenreChange}
                    checked={userInput.genres.includes("31")}
                  />
                }
                label="Biography"
              />
              <FormControlLabel
                value="4"
                control={
                  <Checkbox
                    onChange={handleGenreChange}
                    checked={userInput.genres.includes("4")}
                  />
                }
                label="Comedy"
              />
              <FormControlLabel
                value="5"
                control={
                  <Checkbox
                    onChange={handleGenreChange}
                    checked={userInput.genres.includes("5")}
                  />
                }
                label="Crime"
              />
              <FormControlLabel
                value="6"
                control={
                  <Checkbox
                    onChange={handleGenreChange}
                    checked={userInput.genres.includes("6")}
                  />
                }
                label="Documentary"
              />
              <FormControlLabel
                value="7"
                control={
                  <Checkbox
                    onChange={handleGenreChange}
                    checked={userInput.genres.includes("7")}
                  />
                }
                label="Drama"
              />
              <FormControlLabel
                value="8"
                control={
                  <Checkbox
                    onChange={handleGenreChange}
                    checked={userInput.genres.includes("8")}
                  />
                }
                label="Family"
              />
              <FormControlLabel
                value="9"
                control={
                  <Checkbox
                    onChange={handleGenreChange}
                    checked={userInput.genres.includes("9")}
                  />
                }
                label="Fantasy"
              />
              <FormControlLabel
                value="10"
                control={
                  <Checkbox
                    onChange={handleGenreChange}
                    checked={userInput.genres.includes("10")}
                  />
                }
                label="History"
              />
              <FormControlLabel
                value="11"
                control={
                  <Checkbox
                    onChange={handleGenreChange}
                    checked={userInput.genres.includes("11")}
                  />
                }
                label="Horror"
              />
              <FormControlLabel
                value="21"
                control={
                  <Checkbox
                    onChange={handleGenreChange}
                    checked={userInput.genres.includes("21")}
                  />
                }
                label="Kids"
              />
              <FormControlLabel
                value="12"
                control={
                  <Checkbox
                    onChange={handleGenreChange}
                    checked={userInput.genres.includes("12")}
                  />
                }
                label="Music"
              />
              <FormControlLabel
                value="32"
                control={
                  <Checkbox
                    onChange={handleGenreChange}
                    checked={userInput.genres.includes("32")}
                  />
                }
                label="Musical"
              />
              <FormControlLabel
                value="13"
                control={
                  <Checkbox
                    onChange={handleGenreChange}
                    checked={userInput.genres.includes("13")}
                  />
                }
                label="Mystery"
              />
              <FormControlLabel
                value="22"
                control={
                  <Checkbox
                    onChange={handleGenreChange}
                    checked={userInput.genres.includes("22")}
                  />
                }
                label="News"
              />
              <FormControlLabel
                value="23"
                control={
                  <Checkbox
                    onChange={handleGenreChange}
                    checked={userInput.genres.includes("23")}
                  />
                }
                label="Reality"
              />
              <FormControlLabel
                value="14"
                control={
                  <Checkbox
                    onChange={handleGenreChange}
                    checked={userInput.genres.includes("14")}
                  />
                }
                label="Romance"
              />

              <FormControlLabel
                value="40"
                control={
                  <Checkbox
                    onChange={handleGenreChange}
                    checked={userInput.genres.includes("40")}
                  />
                }
                label="Sci-Fi & Fantasy"
              />
              <FormControlLabel
                value="15"
                control={
                  <Checkbox
                    onChange={handleGenreChange}
                    checked={userInput.genres.includes("15")}
                  />
                }
                label="Science Fiction"
              />
              <FormControlLabel
                value="25"
                control={
                  <Checkbox
                    onChange={handleGenreChange}
                    checked={userInput.genres.includes("25")}
                  />
                }
                label="Soap"
              />
              <FormControlLabel
                value="29"
                control={
                  <Checkbox
                    onChange={handleGenreChange}
                    checked={userInput.genres.includes("29")}
                  />
                }
                label="Sports"
              />
              <FormControlLabel
                value="26"
                control={
                  <Checkbox
                    onChange={handleGenreChange}
                    checked={userInput.genres.includes("26")}
                  />
                }
                label="Talk"
              />
              <FormControlLabel
                value="17"
                control={
                  <Checkbox
                    onChange={handleGenreChange}
                    checked={userInput.genres.includes("17")}
                  />
                }
                label="Thriller"
              />
              <FormControlLabel
                value="18"
                control={
                  <Checkbox
                    onChange={handleGenreChange}
                    checked={userInput.genres.includes("18")}
                  />
                }
                label="War"
              />
              <FormControlLabel
                value="41"
                control={
                  <Checkbox
                    onChange={handleGenreChange}
                    checked={userInput.genres.includes("41")}
                  />
                }
                label="War & Politics"
              />
              <FormControlLabel
                value="19"
                control={
                  <Checkbox
                    onChange={handleGenreChange}
                    checked={userInput.genres.includes("19")}
                  />
                }
                label="Western"
              />
            </AccordionDetails>
          </Accordion>

          <FormLabel>Select Type(s)</FormLabel>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                Looking for a new show to binge or movie for tonight?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <h4>Select any combination</h4>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={userInput.type.includes("movie")}
                    onChange={handleTypeChange}
                    value="movie"
                  />
                }
                label="Movie"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={userInput.type.includes("tv_series")}
                    onChange={handleTypeChange}
                    value="tv_series"
                  />
                }
                label="TV Series"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={userInput.type.includes("tv_miniseries")}
                    onChange={handleTypeChange}
                    value="tv_miniseries"
                  />
                }
                label="TV Mini-Series"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={userInput.type.includes("tv_special")}
                    onChange={handleTypeChange}
                    value="tv_special"
                  />
                }
                label="TV Special"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={userInput.type.includes("short_film")}
                    onChange={handleTypeChange}
                    value="short_film"
                  />
                }
                label="Short Film"
              />
            </AccordionDetails>
          </Accordion>
          {/* Sources  */}
          <FormLabel>Select Streaming Service(s)</FormLabel>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Search all major (and some minor) streaming platforms</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <h4>Select any combination</h4>

              <FormControlLabel
                control={
                  <Checkbox
                    checked={userInput.source.includes("26")}
                    onChange={handleSourceChange}
                    value="26"
                  />
                }
                label="Amazon Prime"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={userInput.source.includes("371")}
                    onChange={handleSourceChange}
                    value="371"
                  />
                }
                label="AppleTV"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={userInput.source.includes("372")}
                    onChange={handleSourceChange}
                    value="372"
                  />
                }
                label="Disney+"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={userInput.source.includes("157")}
                    onChange={handleSourceChange}
                    value="157"
                  />
                }
                label="Hulu"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={userInput.source.includes("387")}
                    onChange={handleSourceChange}
                    value="387"
                  />
                }
                label="Max"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={userInput.source.includes("203")}
                    onChange={handleSourceChange}
                    value="203"
                  />
                }
                label="Netflix"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={userInput.source.includes("444")}
                    onChange={handleSourceChange}
                    value="444"
                  />
                }
                label="Paramount+"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={userInput.source.includes("389")}
                    onChange={handleSourceChange}
                    value="389"
                  />
                }
                label="Peacock"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={userInput.source.includes("232")}
                    onChange={handleSourceChange}
                    value="232"
                  />
                }
                label="Starz"
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

export default SearchByGenreSourceType;
