// import from react
import { useState, useEffect, useContext } from "react";
// import from react-router
import { useNavigate } from "react-router-dom";
// import context
import { SearchResultsContext } from "../../context/SearchResultsContext"; 
// import from mui
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import SearchIcon from '@mui/icons-material/Search';
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
// import from utils
import {
  searchByName,
  fetchTopPeoplePageOne,
  fetchTopPeoplePageTwo,
  fetchTopPeoplePageThree,
  fetchTopPeoplePageFour,
  fetchTopPeoplePageFive,
} from "../../utils/apiCalls";

import { CACHE_DURATION } from "../../utils/utils";

const filter = createFilterOptions();

const ActorSearch = ({onSubmit}) => {
  const navigate = useNavigate();
  const { setActorSearchResults } = useContext(SearchResultsContext); 
  const [topActors, setTopActors] = useState([]);
  const [searchTerm, setSearchTerm] = useState(null);
  const [sortedActors, setSortedActors] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const handleActorSearchClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSearchTerm(null);
  };

  useEffect(() => {
    const cachedSortedActors = localStorage.getItem("sortedActorList");

    if (cachedSortedActors) {
      const { data, timestamp } = JSON.parse(cachedSortedActors);
      // console.log("Stored Data Retrieved:", data);

      const now = Date.now();
      if (now - timestamp < CACHE_DURATION) {
        setTopActors(data);
        // console.log("Using Cached Data:", data);
        return;
      } else {
        localStorage.removeItem("sortedActorList");
        // console.log("Cached sortedActorList Expired and Removed");
      }
    }

    const topPeopleNamesPageOne = async () => {
      try {
        const response = await fetchTopPeoplePageOne();
        const data = await response.json();
        // console.log(data);
        const actors = data.results.map((person) => ({
          name: person.name,
          id: person.id,
        }));
        setTopActors(actors);
        // console.log(actors);
      } catch (error) {
        console.log(error);
      }
    };

    const topPeopleNamesPageTwo = async () => {
      try {
        const response = await fetchTopPeoplePageTwo();
        const data = await response.json();
        // console.log(data);
        const newActors = data.results.map((person) => ({
          name: person.name,
          id: person.id,
        }));
        setTopActors((prevActors) => [...prevActors, ...newActors]);
      } catch (error) {
        // console.log(error);
      }
      // console.log('topActors', topActors);
    };

    const topPeopleNamesPageThree = async () => {
      try {
        const response = await fetchTopPeoplePageThree();
        const data = await response.json();
        // console.log(data);
        const newActors = data.results.map((person) => ({
          name: person.name,
          id: person.id,
        }));
        setTopActors((prevActors) => [...prevActors, ...newActors]);
      } catch (error) {
        // console.log(error);
      }
      // console.log(topActors);
    };
  
    const topPeopleNamesPageFour = async () => {
      try {
        const response = await fetchTopPeoplePageFour();
        const data = await response.json();
        // console.log(data);
        const newActors = data.results.map((person) => ({
          name: person.name,
          id: person.id,
        }));
        setTopActors((prevActors) => [...prevActors, ...newActors]);
      } catch (error) {
        console.log(error);
      }
      // console.log(topActors);
    };
  
    const topPeopleNamesPageFive = async () => {
      try {
        const response = await fetchTopPeoplePageFive();
        const data = await response.json();
        // console.log(data);
        const newActors = data.results.map((person) => ({
          name: person.name,
          id: person.id,
        }));
        setTopActors((prevActors) => [...prevActors, ...newActors]);
      } catch (error) {
        console.log(error);
      }
      // console.log(topActors);
    };

    const fetchData = async () => {
      await topPeopleNamesPageOne();
      await topPeopleNamesPageTwo();
      await topPeopleNamesPageThree();
      await topPeopleNamesPageFour();
      await topPeopleNamesPageFive();
    };

    fetchData();
    // watch this line below
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [] );

  useEffect(() => {
    const sorted = [...topActors].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    // console.log(sorted)
    setSortedActors(sorted);

    const cacheData = {
      data: sorted,
      timestamp: Date.now(),
    };

    localStorage.setItem("sortedActorList", JSON.stringify(cacheData));
  }, [topActors]);

  const searchByEnteredName = async (event) => {
    event.preventDefault();
    // console.log(searchTerm.name);
    const searchedName = searchTerm.name;
    const cachedActorSearchResults = localStorage.getItem(
      `actorSearchResults_${searchedName}`
    );

    if (cachedActorSearchResults) {
      const { data, timestamp } = JSON.parse(cachedActorSearchResults);
      // console.log("Stored Data Retrieved:", data);
      const now = Date.now();
      if (now - timestamp < CACHE_DURATION) {
        setActorSearchResults(data);
        handleCloseModal();
        // console.log("Using Cached Data:", data);
        navigate('/actor_search_results', { state: { data, searchTerm: searchedName },});
        setSearchTerm("");
      } else {
        localStorage.removeItem(`actorSearchResults_${searchedName}`);
        // console.log("Cached Data Expired and Removed");
      }
      onSubmit();
    }

    if (!cachedActorSearchResults) {
      try {
        const response = await searchByName(searchedName);
        // console.log(response);

        if (!response.ok) {
          throw new Error("Something went wrong");
        }

        const results = await response.json();
        // console.log('actor search results', results);

        const actorSearchData = results.results.filter((actor) => {
          if (actor.known_for_department !== "Acting") {
            return false;
          }
          // Check the 'known_for' array for any object where 'adult' is true
          for (let i = 0; i < actor.known_for.length; i++) {
            if (actor.known_for[i].adult === true) {
                return false;
            }
          }
          // If the actor passed the previous checks, include them in the results
          return true;
        })
        .slice(0, 8)
        .map((actor) => ({
          id: actor.id,
          name: actor.name,
          job: actor.known_for_department,
          known_for: actor.known_for,
          poster_url: actor.known_for.length > 0 ? "https://image.tmdb.org/t/p/w500/" + actor.known_for[0].poster_path : "",
          image_url: "https://image.tmdb.org/t/p/w200" + actor.profile_path,
        }));
        // console.log(actorSearchData);
        setSearchTerm("");
        setActorSearchResults(actorSearchData);
        const cacheData = {
          data: actorSearchData,
          timestamp: Date.now(),
        };
        localStorage.setItem(
          `actorSearchResults_${searchedName}`,
          JSON.stringify(cacheData)
        );
        // console.log(searchedName);
        handleCloseModal();
        navigate('/actor_search_results', {state: {data: actorSearchData, searchTerm: searchedName},});
      } catch (err) {
        console.log(err.message);
      }
      onSubmit();
    }
  };

  return (
    <>
      {/* <h4>Actor Search</h4> */}
      <h3 variant="contained" onClick={() => handleActorSearchClick()}>
        Actor Search
      </h3>
      <Dialog open={modalOpen} onClose={handleCloseModal}>
        <DialogTitle style={{ fontSize: "1.5rem", marginTop: 0, marginBottom: 0 }}>Search By Actor Name
          <p style={{ fontSize: "1.25rem", padding: 0, marginBottom: 0 }}>
          Find movies and shows starring your favorite actors.
          </p>
        </DialogTitle>
        <DialogContent>
      <h5 style={{fontSize: '1rem', marginTop: 0, marginBottom: '1rem' }} >Don't see the name you are looking for in the menu? Enter it anyway! We'll find them.</h5>
      <form onSubmit={searchByEnteredName}>
        <FormControl>
          <Autocomplete
            size="small"
            value={searchTerm}
            onChange={(event, newValue) => { 
              if (typeof newValue === "string") {
                setSearchTerm({
                  name: newValue,
                });
              } else if (newValue && newValue.inputValue) {
                // Create a new value from the user input
                setSearchTerm({
                  name: newValue.inputValue,
                });
              } else {
                setSearchTerm(newValue);
              }
            }}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);

              const { inputValue } = params;
              // Suggest the creation of a new value
              const isExisting = options.some(
                (option) => inputValue === option.name
              );
              if (inputValue !== "" && !isExisting) {
                filtered.push({
                  inputValue,
                  name: `Search for "${inputValue}"`,
                });
              }
              // console.log(filtered)
              return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            id=""
            options={sortedActors}
            getOptionLabel={(option) => {
              // Value selected with enter, right from the input
              if (typeof option === "string") {
                return option;
              }
              // Add "xxx" option created dynamically
              if (option.inputValue) {
                return option.inputValue;
              }
              // Regular option
              return option.name;
            }}
            renderOption={(props, option) => <li {...props}>{option.name}</li>}
            sx={{ width: 300 }}
            freeSolo
            renderInput={(params) => (
              <TextField {...params} label="Enter Actor Name" />
            )}
          />
          <DialogActions>
          <Button type="submit" style={{  }} variant="contained">
            <SearchIcon />
          </Button>
          </DialogActions>
        </FormControl>
      </form>
      </DialogContent>
      <Button onClick={handleCloseModal} variant="contained">
        Close
      </Button>
      </Dialog>
    </>
  );
};

export default ActorSearch;
