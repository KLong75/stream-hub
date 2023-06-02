import React, { useState } from 'react';

import { Box, TextField, MenuItem, } from '@mui/material';


import { searchByGenre } from '../../utils/apiCalls';

const genreOptions = [
  {
    value: '1',
    label: 'Action'
  },
  {
    value: '39',
    label: 'Action & Adventure'
  },
  {
    value: '2',
    label: 'Adventure'
  },
  {
    value: '3',
    label: 'Animation'
  },
  {
    value: '33',
    label: 'Anime'
  },
  {
    value: '31',
    label: 'Biography'
  },
  {
    value: '4',
    label: 'Comedy'
  },
  {
    value: '5',
    label: 'Crime'
  },
  {
    value: '6',
    label: 'Documentary'
  },
  {
    value: '7',
    label: 'Drama'
  },
  {
    value: '8',
    label: 'Family'
  },
  {
    value: '9',
    label: 'Fantasy'
  },
  {
    value: '34',
    label: 'Food'
  },
  {
    value: '28',
    label: 'Game Show'
  },
  {
    value: '10',
    label: 'History'
  },
  {
    value: '11',
    label: 'Horror'
  },
  {
    value: '21',
    label: 'Kids'
  },
  {
    value: '12',
    label: 'Music'
  },
  {
    value: '32',
    label: 'Musical'
  },
  {
    value: '13',
    label: 'Mystery'
  },
  {
    value: '36',
    label: 'Nature'
  },
  {
    value: '22',
    label: 'News'
  },
  {
    value: '23',
    label: 'Reality'
  },
  {
    value: '14',
    label: 'Romance'
  },
  {
    value: '40',
    label: 'Sci-Fi & Fantasy'
  },
  {
    value: '15',
    label: 'Science Fiction'
  },
  {
    value: '25',
    label: 'Soap'
  },
  {
    value: '29',
    label: 'Sports'
  },
  {
    value: '37',
    label: 'Supernatural'
  },
  {
    value: '26',
    label: 'Talk'
  },
  {
    value: '17',
    label: 'Thriller'
  },
  {
    value: '35',
    label: 'Travel'
  },
  {
    value: '38',
    label: 'TV Movie'
  },
  {
    value: '18',
    label: 'War'
  },
  {
    value: '41',
    label: 'War & Politics'
  },
  {
    value: '19',
    label: 'Western'
  },
];

const GenreSearch = () => {

  // eslint-disable-next-line no-unused-vars
  const [genreSearchResults, setGenreSearchResults] = useState([]);

  const [selectedGenre, setSelectedGenre] = useState('');

  // const [selectedTitle, setSelectedTitle] = useState('');

  // const [selectedTitleDetails, setSelectedTitleDetails] = useState({});

  // const handleChange = (event) => {
  //   setSelectedGenre(event.target.value);
  //   console.log(event.target.value);
  //   const selectedGenreCode = event.target.value;
    
  //   fetch('https://api.watchmode.com/v1/list-titles?genres=' + selectedGenreCode + '&limit=2&apiKey=SPq4jFg1pgbWR6mP6rZGPrBrNGisLbdUeu2P0TKp')

  //   .then((response) => response.json())
  //   .then((data) => {
  //     // console.log(data)
  //     console.log(selectedGenre)
  //     const titleData = data;
  //     console.log(titleData)
  //     console.log(titleData.titles[0].title)
  //     setGenreSearchResults(titleData)
  //     setSelectedGenre('');
  //     // first api fetch genreSearchResults is empty
  //     // send api fetch genreSearchResults is set equal to previous search results
  //     console.log(genreSearchResults);
  //   })
  //   .catch((err) => {
  //     console.log(err.message);
  //   });
  //   console.log();
  // };


  const handleChange = async (event) => {
    event.preventDefault();
    setSelectedGenre(event.target.value);
    console.log(event.target.value);
    const selectedGenreCode = event.target.value;
    
    try {

    // const response = await fetch('https://api.watchmode.com/v1/list-titles?genres=' + selectedGenreCode + '&limit=2&apiKey=SPq4jFg1pgbWR6mP6rZGPrBrNGisLbdUeu2P0TKp')

    const response = await searchByGenre(selectedGenreCode);

    console.log(searchByGenre(selectedGenreCode));

    if (!response.ok) {
      throw new Error('Something went wrong')
    }

    const { titles } = await response.json();

    console.log(titles)
    
    const titleData = titles.map((titles) => ({
      id: titles.id,
      title: titles.title,
      type: titles.type,
      year: titles.year
    }));

    console.log(titleData);

    setGenreSearchResults(titleData);
    setSelectedGenre('');
    window.location.href = '/search_results?titles=' + encodeURIComponent(JSON.stringify(titleData));
  } catch (err) {
    console.error(err);
  }
};



// const handleTitleSelected = async (event) => {
//   event.preventDefault();
//   setSelectedTitle(event.target.value);
//   console.log(event.target.value);
//   const selectedTitleId = event.target.value;
//   console.log(selectedTitle)
  
//   try {

  // const response = await fetch('https://api.watchmode.com/v1/list-titles?genres=' + selectedGenreCode + '&limit=2&apiKey=SPq4jFg1pgbWR6mP6rZGPrBrNGisLbdUeu2P0TKp')

//   const response = await fetchTitleDetails(selectedTitleId);

//   console.log(fetchTitleDetails(selectedTitleId));

//   if (!response.ok) {
//     throw new Error('Something went wrong')
//   }

//   const  titleDetails  = await response.json();

//   console.log(titleDetails)

//   const titleDetailsData = {
//     id: titleDetails.id,
//     title: titleDetails.title,
//     type: titleDetails.type,
//     year: titleDetails.year,
//     backdrop: titleDetails.backdrop,
//     critic_score: titleDetails.critic_score,
//     genre_names: titleDetails.genre_names,
//     network_names: titleDetails.network_names,
//     plot_overview: titleDetails.plot_overview,
//     poster: titleDetails.poster,
//     release_date: titleDetails.release_date,
//     runtime: titleDetails.runtime,
//     similar_titles: titleDetails.similar_titles,
//     sources: titleDetails.sources,
//     trailer: titleDetails.trailer,
//     trailer_thumbnail: titleDetails.trailer_thumbnail,
//     us_rating: titleDetails.us_rating,
//     user_rating: titleDetails.user_rating,
//     imdb_id: titleDetails.imdb_id,
//   }
  
  
//   console.log(titleDetailsData);

//   setSelectedTitleDetails(titleDetailsData);
//   setSelectedTitle('');
//   // window.location.href = '/title_details';
//   // window.location.href = '/title_details?titleDetails=' + encodeURIComponent(JSON.stringify(titleDetailsData));


//   } catch (err) {
//     console.error(err);
//   }
// };




  return (
    <div>
      <Box
        component='form'
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete='off'
      >
        <div>
          <h3>Genre Search</h3>
          <TextField
            id='genre-select'
            select
            size='small'
            label='Select Genre'
            value={selectedGenre}
            onChange={handleChange}
            helperText='Please select a genre'
          >
            {genreOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField> 
        </div>
      </Box>
        
      {/* <div>
        {genreSearchResults.map((result) => (
          <div key = {result.id}>
            <p>{(`${result.title}`)}</p>
            <p>{(`${result.type}`)}</p>
            <p>{(`${result.year}`)}</p>
            <Button value={result.id} onClick={handleTitleSelected}>Select Title</Button>
          </div>
        ))}
      </div>

      <div>
        <h3>Selected Title</h3>
        <p>{selectedTitleDetails.title}</p>
        <p>{selectedTitleDetails.type}</p>
        <p>{selectedTitleDetails.year}</p>
        <p>{selectedTitleDetails.backdrop}</p>
        <p>{selectedTitleDetails.critic_score}</p>
        <p>{selectedTitleDetails.genre_names}</p>
        <p>{selectedTitleDetails.network_names}</p>
        <p>{selectedTitleDetails.plot_overview}</p>
        <p>{selectedTitleDetails.poster}</p>
        <p>{selectedTitleDetails.release_date}</p>
        <p>{selectedTitleDetails.runtime}</p>
        <p>{selectedTitleDetails.similar_titles}</p>
        <p>{selectedTitleDetails.sources}</p>
        <p>{selectedTitleDetails.trailer}</p>
        <p>{selectedTitleDetails.trailer_thumbnail}</p>
        <p>{selectedTitleDetails.us_rating}</p>
        <p>{selectedTitleDetails.user_rating}</p>
      </div> */}
    </div>
  );
};
  
export default GenreSearch;


   