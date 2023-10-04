import { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FilterIcon from "@mui/icons-material/Tune";
import Grid from "@mui/material/Unstable_Grid2";
import FilterSection from "../FilterSection";

const defaultTypeFilter = {
  Movie: false,
  TV: false,
};

const defaultSourceFilter = {
  AmazonPrime: false,
  AppleTV: false,
  DisneyPlus: false,
  Hulu: false,
  Max: false,
  Netflix: false,
  ParamountPlus: false,
  Peacock: false,
  Starz: false,
};

const defaultGenreFilter = {
  Action: false,
  ActionAdventure: false,
  Adventure: false,
  Animation: false,
  Anime: false,
  Biography: false,
  Comedy: false,
  Crime: false,
  Documentary: false,
  Drama: false,
  Family: false,
  Fantasy: false,
  History: false,
  Horror: false,
  Kids: false,
  Music: false,
  Musical: false,
  Mystery: false,
  News: false,
  Reality: false,
  Romance: false,
  ScienceFiction: false,
  SciFiFantasy: false,
  Soap: false,
  Sports: false,
  Talk: false,
  Thriller: false,
  War: false,
  WarPolitics: false,
  Western: false,
};

const mapUiGenreToActualGenre = (uiGenre) => {
  const map = {
    ActionAdventure: "Action & Adventure",
  };

  return map[uiGenre] || uiGenre;
};

const FilterTitles = ({ setFilters }) => {
  const [typeFilter, setTypeFilter] = useState(defaultTypeFilter);

  const [sourceFilter, setSourceFilter] = useState(defaultSourceFilter);

  const [genreFilter, setGenreFilter] = useState(defaultGenreFilter);

  const handleTypeChange = (event) => {
    setTypeFilter({
      ...typeFilter,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSourceChange = (event) => {
    setSourceFilter({
      ...sourceFilter,
      [event.target.name]: event.target.checked,
    });
  };

  const handleGenreChange = (event) => {
    setGenreFilter({
      ...genreFilter,
      [event.target.name]: event.target.checked,
    });
  };
  console.log("genreFilter: ", genreFilter);
  console.log("typeFilter: ", typeFilter);
  console.log("sourceFilter: ", sourceFilter);

  useEffect(() => {
    const typeArray = Object.keys(typeFilter).filter((key) => typeFilter[key]);
    const sourceArray = Object.keys(sourceFilter).filter(
      (key) => sourceFilter[key]
    );
    const genreArray = Object.keys(genreFilter)
      .filter((key) => genreFilter[key])
      .map(mapUiGenreToActualGenre);

    setFilters({
      type: typeArray,
      source: sourceArray,
      genre: genreArray,
    });
  }, [typeFilter, sourceFilter, genreFilter, setFilters]);

  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const getActiveFilters = () => {
    let activeFilters = [];

    Object.entries(typeFilter).forEach(([key, value]) => {
      if (value) activeFilters.push(key);
    });

    Object.entries(sourceFilter).forEach(([key, value]) => {
      if (value) activeFilters.push(key);
    });

    Object.entries(genreFilter).forEach(([key, value]) => {
      if (value) activeFilters.push(key);
    });

    return activeFilters;
  };

  const activeFilters = getActiveFilters();

  return (
    <>
      <Grid container>
      <Grid xs={12} display="flex" justifyContent="center" textAlign="center" alignItems="center">
      <IconButton onClick={handleOpen}>
        <FilterIcon fontSize="large" />
      </IconButton>
      </Grid>
      <Grid xs={12} display="flex" justifyContent="center" textAlign="center" alignItems="center" sx={{marginTop: '-1.5rem'}}>
      <h4>Filter Watch List</h4>
      </Grid>
      </Grid>
      
      {activeFilters.length > 0 && (
        <div>
          <h5>Watchlist Filtered For:</h5>
          <ul>
            {activeFilters.map((filter) => (
              <li key={filter}>{filter}</li>
            ))}
          </ul>
        </div>
      )}
      <Dialog open={modalOpen} onClose={handleClose}>
        <DialogTitle>Filter WatchList</DialogTitle>
        <DialogContent>
          <Button
            variant="contained"
            onClick={() => {
              setTypeFilter(defaultTypeFilter);
              setSourceFilter(defaultSourceFilter);
              setGenreFilter(defaultGenreFilter);
            }}>
            Clear Filters
          </Button>
          <FormGroup>
            <FilterSection
              title="Type"
              items={["Movie", "TV"]}
              filterState={typeFilter}
              handleChange={handleTypeChange}
            />
            <FilterSection
              title="Source"
              items={[
                "AmazonPrime",
                "AppleTV",
                "DisneyPlus",
                "Hulu",
                "Max",
                "Netflix",
                "ParamountPlus",
                "Peacock",
                "Starz",
              ]}
              filterState={sourceFilter}
              handleChange={handleSourceChange}
            />
            <FilterSection
              title="Genre"
              items={[
                "Action",
                "ActionAdventure",
                "Adventure",
                "Animation",
                "Comedy",
                "Crime",
                "Documentary",
                "Drama",
                "Family",
                "Fantasy",
                "History",
                "Horror",
                "Kids",
                "Music",
                "Musical",
                "Mystery",
                "News",
                "Reality",
                "Romance",
                "ScienceFiction",
                "SciFiFantasy",
                "Soap",
                "Sports",
                "Talk",
                "Thriller",
                "War",
                "Western",
              ]}
              filterState={genreFilter}
              handleChange={handleGenreChange}
            />
          </FormGroup>
        </DialogContent>
        <Button variant="contained" onClick={handleClose}>
          Close
        </Button>
      </Dialog>
    </>
  );
};

export default FilterTitles;
