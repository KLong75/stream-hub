// import from react
import React, { useState, useContext } from "react";
// import from react-router
import { useNavigate } from "react-router-dom";
// import context
import { SearchResultsContext } from "../../context/SearchResultsContext";
// import from mui
import { TextField, MenuItem } from "@mui/material";
// import from utils
import { searchByGenre } from "../../utils/apiCalls";
import { CACHE_DURATION } from "../../utils/utils";

const genreOptions = [
  {
    value: "1",
    label: "Action",
  },
  {
    value: "39",
    label: "Action & Adventure",
  },
  {
    value: "2",
    label: "Adventure",
  },
  {
    value: "3",
    label: "Animation",
  },
  {
    value: "33",
    label: "Anime",
  },
  {
    value: "31",
    label: "Biography",
  },
  {
    value: "4",
    label: "Comedy",
  },
  {
    value: "5",
    label: "Crime",
  },
  {
    value: "6",
    label: "Documentary",
  },
  {
    value: "7",
    label: "Drama",
  },
  {
    value: "8",
    label: "Family",
  },
  {
    value: "9",
    label: "Fantasy",
  },
  {
    value: "28",
    label: "Game Show",
  },
  {
    value: "10",
    label: "History",
  },
  {
    value: "11",
    label: "Horror",
  },
  {
    value: "21",
    label: "Kids",
  },
  {
    value: "12",
    label: "Music",
  },
  {
    value: "32",
    label: "Musical",
  },
  {
    value: "13",
    label: "Mystery",
  },
  {
    value: "22",
    label: "News",
  },
  {
    value: "23",
    label: "Reality",
  },
  {
    value: "14",
    label: "Romance",
  },
  {
    value: "40",
    label: "Sci-Fi & Fantasy",
  },
  {
    value: "15",
    label: "Science Fiction",
  },
  {
    value: "25",
    label: "Soap",
  },
  {
    value: "29",
    label: "Sports",
  },
  {
    value: "26",
    label: "Talk",
  },
  {
    value: "17",
    label: "Thriller",
  },
  {
    value: "18",
    label: "War",
  },
  {
    value: "41",
    label: "War & Politics",
  },
  {
    value: "19",
    label: "Western",
  },
];

const GenreSearch = () => {
  // eslint-disable-next-line no-unused-vars
  const { genreSearchResults, setGenreSearchResults } =
    useContext(SearchResultsContext); // <- use the context
  const navigate = useNavigate();

  const [selectedGenre, setSelectedGenre] = useState("");

  // eslint-disable-next-line no-unused-vars
  const [selectedGenreCode, setSelectedGenreCode] = useState("");

  const handleChange = async (event) => {
    event.preventDefault();
    setSelectedGenre(event.target.value);
    setSelectedGenreCode(event.target.value);
    console.log(event.target.value);
    const selectedGenreCode = event.target.value;

    const cachedGenreSearchResults = localStorage.getItem(
      `genreSearchResults_${selectedGenreCode}`
    );
    console.log(
      "Cached Genre Search Results Retrieved:",
      cachedGenreSearchResults
    );

    if (cachedGenreSearchResults) {
      const { data, timestamp } = JSON.parse(cachedGenreSearchResults);
      console.log("Stored Data Retrieved:", data);
      console.log("Stored Timestamp:", timestamp);
      console.log("Current Time:", Date.now());
      const now = Date.now();
      if (now - timestamp < CACHE_DURATION) {
        setGenreSearchResults(data);
        console.log("Using Cached Data:", data);
        navigate("/search_results", { state: { titles: data } }); // <- navigate with useNavigate
        return;
      } else {
        localStorage.removeItem(`genreSearchResults_${selectedGenreCode}`);
        console.log("Cached Data Expired and Removed");
      }
    }

    if (!cachedGenreSearchResults) {
      try {
        const response = await searchByGenre(selectedGenreCode);
        console.log(searchByGenre(selectedGenreCode));

        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const { titles } = await response.json();

        console.log(titles);

        const titleData = titles.map((titles) => ({
          id: titles.id,
          title: titles.title,
          type: titles.type,
          year: titles.year,
        }));

        console.log(titleData);

        setGenreSearchResults(titleData);
        // setSelectedGenre('');

        const cacheData = {
          data: titleData,
          timestamp: Date.now(),
        };
        localStorage.setItem(
          `genreSearchResults_${selectedGenreCode}`,
          JSON.stringify(cacheData)
        );
        const selectedGenreLabel = genreOptions.find(
          (option) => option.value === selectedGenreCode
        )?.label;

        navigate("/search_results", {
          state: { titles: titleData, genre: selectedGenreLabel },
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div>
      <h4>Browse Movies and TV Shows by Genre From All Available Sources</h4>
      <TextField
        required
        id="genre-select"
        select
        size="small"
        label="Select Genre"
        value={selectedGenre}
        onChange={handleChange}
        helperText="Please select a genre"
      >
        {genreOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
};

export default GenreSearch;
