import React, {useState, useEffect} from "react";

import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
// import FormLabel from '@mui/material/FormLabel';

import { searchByName, fetchTopPeoplePageOne, fetchTopPeoplePageTwo, fetchTopPeoplePageThree, fetchTopPeoplePageFour, fetchTopPeoplePageFive } from "../../utils/apiCalls";

const filter = createFilterOptions();


const ActorSearch = () => {
  
  const [topActors, setTopActors] = useState([]);

  const [searchTerm, setSearchTerm] = useState(null);

  const searchByEnteredName = async (event) => {
    event.preventDefault();
    console.log(searchTerm.name);
    const searchedName = searchTerm.name;

  try {
    const response = await searchByName(searchedName);
    console.log(response);

    if (!response.ok) {
      throw new Error('Something went wrong')
    }

    const results = await response.json();
    console.log(results);

    const actorSearchResults = results.results.map((actor) => ({
      id: actor.id,
      name: actor.name,
      known_for: actor.known_for,
      poster_url: 'https://image.tmdb.org/t/p/w500/' + actor.known_for[0].poster_path,
      image_url: 'https://image.tmdb.org/t/p/w200' + actor.profile_path,
    }));

    console.log(actorSearchResults);

    setSearchTerm('');
    window.location.href = '/actor_search_results?actors=' + encodeURIComponent(JSON.stringify(actorSearchResults));

  }
    catch (err) {
    console.log(err.message);
  }
};

// useEffect(() => {
//   console.log("ActorSearch rendered", Date.now());
//   const fetchData = async () => {
//     await topPeopleNamesPageOne();
//     await topPeopleNamesPageTwo();
//     await topPeopleNamesPageThree();
//   };

//   fetchData();
// }, []);

  const topPeopleNamesPageOne = async () => {
    try {
      const response = await fetchTopPeoplePageOne();
      const data = await response.json();
      console.log(data);
    
      const actors = data.results.map((person) => ({
        name: person.name,
        id: person.id
      }));

      setTopActors(actors);
      // console.log(actors);
      // return data;
    } catch (error) {
      console.log(error);
    }
  };

  const topPeopleNamesPageTwo = async () => {
    try {
      const response = await fetchTopPeoplePageTwo();
      const data = await response.json();
      console.log(data);

      const newActors = data.results.map((person) => ({
        name: person.name,
        id: person.id
      }));

      setTopActors((prevActors) => [...prevActors, ...newActors]);
      // console.log(topActors);
    } catch (error) {
      console.log(error);
    }
    // console.log(topActors);
  };

  const topPeopleNamesPageThree = async () => {
    try {
      const response = await fetchTopPeoplePageThree();
      const data = await response.json();
      console.log(data);

      const newActors = data.results.map((person) => ({
        name: person.name,
        id: person.id
      }));

      setTopActors((prevActors) => [...prevActors, ...newActors]);
      // console.log(topActors);
    } catch (error) {
      console.log(error);
    }
    // console.log(topActors);
  };



  useEffect(() => {
    console.log(topActors);
  }, [topActors]);

  const sortedActors = [...topActors].sort((a, b) => a.name.localeCompare(b.name));


return (
  <div>
    <h3>Actor Search</h3>
    <form onSubmit={searchByEnteredName}>
      <FormControl >
      <Autocomplete
        size="small"
        value={searchTerm}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
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
          const isExisting = options.some((option) => inputValue === option.name);
          if (inputValue !== '' && !isExisting) {
            filtered.push({
              inputValue,
              name: `Add "${inputValue}"`,
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
          if (typeof option === 'string') {
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
        <Button type='submit' style= {{width: '60%'}} variant='contained'>Search By Actor</Button>
      </FormControl>
      </form>
  </div>
)
};
  
export default ActorSearch;
