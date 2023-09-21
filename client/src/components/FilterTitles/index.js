import { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FilterSection from "../FilterSection";

const FilterTitles = ({ setFilters }) => {
  const [typeFilter, setTypeFilter] = useState({
    Movie: false,
    TVShow: false,
  });

  const [sourceFilter, setSourceFilter] = useState({
    AppleTV: false,
    DisneyPlus: false,
    Hulu: false,
    Max: false,
    Netflix: false,
    ParamountPlus: false,
    Peacock: false,
    Starz: false,
  });

  const [genreFilter, setGenreFilter] = useState({
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
  });

  const handleTypeChange = (event) => {
    setTypeFilter({ ...typeFilter, [event.target.name]: event.target.checked });
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

  useEffect(() => {
    setFilters({
      type: typeFilter,
      source: sourceFilter,
      genre: genreFilter,
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
      <Button variant="contained" onClick={handleOpen}>
        Filter WatchList
      </Button>
      {activeFilters.length > 0 && (
        <div>
          <h5>Active Filters:</h5>
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
              setTypeFilter({ Movie: false, TVShow: false });
              setSourceFilter({
                AppleTV: false,
                DisneyPlus: false,
                Hulu: false,
                Max: false,
                Netflix: false,
                ParamountPlus: false,
                Peacock: false,
                Starz: false,
              });
              setGenreFilter({
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
              });
            }}
          >Clear Filters

          </Button>
          <FormGroup>
            <FilterSection
              title="Type"
              items={["Movie", "TVShow"]}
              filterState={typeFilter}
              handleChange={handleTypeChange}
            />
            <FilterSection
              title="Source"
              items={[
                "AppleTV",
                "DisneyPlus",
                "Hulu",
                "Max",
                "Netflix",
                "Paramount+",
                "Peacock",
                "PrimeVideo",
                "Starz",
              ]}
              filterState={sourceFilter}
              handleChange={handleSourceChange}
            />
            <FilterSection
              title="Genre"
              items={[
                "Action",
                "Action & Adventure",
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
                "Sci-Fi & Fantasy",
                "Science Fiction",
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
