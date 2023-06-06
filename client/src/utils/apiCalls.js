// Watchmode API Calls
// fetch genre categories
export const fetchGenres = () => {
    fetch('https://api.watchmode.com/v1/genres/?apiKey=WIu3mU2xnsXe9BTf7WlTqfAmFnw3uwR5kTG1RtbB')
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      
    })
    .catch((err) => {
      console.log(err.message);
    });
}

// fetch sources
export const fetchSources = () => {
    fetch('https://api.watchmode.com/v1/sources/?apiKey=WIu3mU2xnsXe9BTf7WlTqfAmFnw3uwR5kTG1RtbB')
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      const subSources = data.filter((source => source.type === 'sub'))
      console.log(subSources)
    })
    .catch((err) => {
      console.log(err.message);
    });
    
}


export const fetchBad = () => {
  fetch(`https://api.themoviedb.org/3/tv/1396/credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
  })
  .catch((err) => {
    console.log(err.message);
  });
  
}

// export const fetchFind = () => {
//   fetch(`https://api.themoviedb.org/3/search/tv?query=Silo&inclue_adult=false&language=en-US&page=1&api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`)
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data)
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });
// }

// export const fetchTvTitle = (query) => {
//   fetch(`https://api.themoviedb.org/3/search/tv?query=${query}&inclue_adult=false&language=en-US&page=1&api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`)
//   .then((response) => response.json())
//   .then((data) => {
//     // console.log(data)
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });
// }



// fetch titles by genre
// export const searchByGenre = (query) => { return fetch(`https://api.watchmode.com/v1/list-titles?genres=${query}&limit=2&apiKey=tXhIgERECp3PJeQTYJPZ9qIr92ZDFabiX08XJrIK`);
// }

export const searchByGenre = (query) => { return fetch(`https://api.watchmode.com/v1/list-titles?genres=${query}&limit=2&apiKey=${process.env.REACT_APP_WMODE_API_KEY}`);
}


// fetch titles by title
export const searchByTitle = (query) => { return fetch(`https://api.watchmode.com/v1/autocomplete-search/?apiKey=${process.env.REACT_APP_WMODE_API_KEY}&search_value=${query}`);
}

// fetch titles by IMDB id
export const searchTitlesByTMDBId = (query) => { return fetch(`https://api.watchmode.com/v1/title/${query}/details?apiKey=${process.env.REACT_APP_WMODE_API_KEY}&append_to_response=sources`);
}

// fetch details by title id
export const fetchTitleDetails = (query) => { return fetch(`https://api.watchmode.com/v1/title/${query}/details/?append_to_response=sources&apiKey=${process.env.REACT_APP_WMODE_API_KEY}`);
} 


// The Movie Database API Calls
// search actors by name
export const searchByName = (query) => { return fetch(`https://api.themoviedb.org/3/search/person?query=${query}&api_key=${process.env.REACT_APP_TMDB_API_KEY}&include_adult=false&language=en-US&page=1`);
}

// fetch more movie title details by IMBD id from TMDB API
export const fetchMoreTitleDetailsMovie = (query) => { return fetch(`https://api.themoviedb.org/3/movie/${query}/credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`);
} 

// fetch tv titles by name from TMDB API to get TMDB id
export const fetchTvTitle = (query) => { return fetch(`https://api.themoviedb.org/3/search/tv?query=${query}&inclue_adult=false&language=en-US&page=1&api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`);
}

// fetch more title details for tv shows by TMDB id from TMDB API
export const fetchMoreTitleDetailsTV = (query) => { return fetch(`https://api.themoviedb.org/3/tv/${query}/credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`);
} 

// export const fetchMoreTitleDetailsTV = (query) => { return fetch(`https://api.themoviedb.org/3/find/${query}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`);
// } 


// fetch top movies
export const fetchTopMoviesPageOne = () => { return fetch (`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`);
}

export const fetchTopMoviesPageTwo = () => { return fetch (`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=2`);
}

export const fetchTopMoviesPageThree = () => { return fetch (`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=3`);
}

export const fetchTopMoviesPageFour = () => { return fetch (`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=4`);
}

export const fetchTopMoviesPageFive = () => { return fetch (`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=5`);
}

// fetch top tv shows
export const fetchTopTvPageOne = () => { return fetch (`https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`);
}

export const fetchTopTvPageTwo = () => { return fetch (`https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=2`);
}

export const fetchTopTvPageThree = () => { return fetch (`https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=3`);
}

export const fetchTopTvPageFour = () => { return fetch (`https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=4`);
}

export const fetchTopTvPageFive = () => { return fetch (`https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=5`);
}



// fetch trending movies
export const fetchTrendingMoviesPageOne = () => { return fetch (`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`);
}

export const fetchTrendingMoviesPageTwo = () => { return fetch (`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=2`);
}

export const fetchTrendingMoviesPageThree = () => { return fetch (`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=3`);
}

export const fetchTrendingMoviesPageFour = () => { return fetch (`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=4`);
}

export const fetchTrendingMoviesPageFive = () => { return fetch (`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=5`);
}

// fetch trending tv shows
export const fetchTrendingTvPageOne = () => { return fetch (`https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`);
}

export const fetchTrendingTvPageTwo = () => { return fetch (`https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=2`);
}

export const fetchTrendingTvPageThree = () => { return fetch (`https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=3`);
}

export const fetchTrendingTvPageFour = () => { return fetch (`https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=4`);
}

export const fetchTrendingTvPageFive = () => { return fetch (`https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=5`);
}

// fetch popular movies
export const fetchPopularMoviesPageOne = () => { return fetch (`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`);
}

export const fetchPopularMoviesPageTwo = () => { return fetch (`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=2`);
}

export const fetchPopularMoviesPageThree = () => { return fetch (`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=3`);
}

export const fetchPopularMoviesPageFour = () => { return fetch (`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=4`);
}

export const fetchPopularMoviesPageFive = () => { return fetch (`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=5`);
}

// add fetch popular tv shows
export const fetchPopularTvPageOne = () => { return fetch (`https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`);
}

export const fetchPopularTvPageTwo = () => { return fetch (`https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=2`);
}

export const fetchPopularTvPageThree = () => { return fetch (`https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=3`);
}

export const fetchPopularTvPageFour = () => { return fetch (`https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=4`);
}

export const fetchPopularTvPageFive = () => { return fetch (`https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=5`);
}


// fetch top people
export const fetchTopPeoplePageOne = () => { return fetch (`https://api.themoviedb.org/3/person/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`);
}

export const fetchTopPeoplePageTwo = () => { return fetch (`https://api.themoviedb.org/3/person/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=2`);
}

export const fetchTopPeoplePageThree = () => { return fetch (`https://api.themoviedb.org/3/person/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=3`);
}

export const fetchTopPeoplePageFour = () => { return fetch (`https://api.themoviedb.org/3/person/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=4`);
}

export const fetchTopPeoplePageFive = () => { return fetch (`https://api.themoviedb.org/3/person/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=5`);
}


// fetch trending titles by genre
export const fetchTrendingActionMovies = () => { return fetch (`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&genre=28`);
}

export const fetchTrendingActionTv = () => { return fetch (`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10759&api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
}

export const fetchTrendingAnimationMovies = () => { return fetch (`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=16&api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
}

export const fetchTrendingAnimationTv = () => { return fetch (`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=16&api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
}

export const fetchTrendingComedyMovies = () => { return fetch (`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=35&api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
}

export const fetchTrendingComedyTv = () => { return fetch (`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=35&api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
}

export const fetchTrendingCrimeMovies = () => { return fetch (`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=80&api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
}
 
export const fetchTrendingCrimeTv = () => { return fetch (`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=80&api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
}


export const fetchTrendingDocumentaryMovies = () => { return fetch (`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=99&api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
}

export const fetchTrendingDocTv = () => { return fetch (`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=99&api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
}

export const fetchTrendingDramaMovies = () => { return fetch (`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=18&api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
}

export const fetchTrendingDramaTv = () => { return fetch (`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=18&api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
}

export const fetchTrendingFantasyMovies = () => { return fetch (`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=14&api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
}

export const fetchTrendingFantasyTv = () => { return fetch (`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10765&api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
}

export const fetchTrendingHorrorMovies = () => { return fetch (`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=27&api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
}

export const fetchTrendingScienceFictionMovies = () => { return fetch (`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=878&api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
}

export const fetchTrendingSciFiTv = () => { return fetch (`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10765&api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
}

export const fetchTrendingThrillerMovies = () => { return fetch (`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=53&api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
}

// test action fetch
export const discoverTrendingActionMovies = () => {
  fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=14&api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
  })
  .catch((err) => {
    console.log(err.message);
  });
}

export const trendingTvTest = () => {
  fetch(`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10759&api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
  .then((response) => response.json())
  .then((data) => {
    console.log('trending tv test', data)
  })
  .catch((err) => {
    console.log(err.message);
  });
}


export const fetchActionTv = () => { return fetch (`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&genre=10759watch_region=us`);
}





// Action
// export const fetchActionTitles = () => {
//     fetch('https://api.watchmode.com/v1/list-titles?genres=1&limit=10&apiKey=SPq4jFg1pgbWR6mP6rZGPrBrNGisLbdUeu2P0TKp')
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data)
     
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
//   }

// Comedy
// export const fetchComedyTitles = () => {
//   fetch('https://api.watchmode.com/v1/list-titles?genres=4&limit=10&apiKey=SPq4jFg1pgbWR6mP6rZGPrBrNGisLbdUeu2P0TKp')
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data)
     
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// }

// export const fetchDocumentaryTitles = () => {
//   fetch('https://api.watchmode.com/v1/list-titles?genres=6&limit=10&apiKey=SPq4jFg1pgbWR6mP6rZGPrBrNGisLbdUeu2P0TKp')
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data)
     
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// }

// export const fetchDramaTitles = () => {
//   fetch('https://api.watchmode.com/v1/list-titles?genres=7&limit=10&apiKey=SPq4jFg1pgbWR6mP6rZGPrBrNGisLbdUeu2P0TKp')
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data)
     
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// }

// export const fetchFantasyTitles= () => {
//   fetch('https://api.watchmode.com/v1/list-titles?genres=40&limit=10&apiKey=SPq4jFg1pgbWR6mP6rZGPrBrNGisLbdUeu2P0TKp')
//     .then((response) => response.json())
//     .then((data) => {
//     console.log(data)    
//     })
//     .catch((err) => {
//      console.log(err.message);
//     });
// }
    
// export const fetchHistoryTitles= () => {
//   fetch('https://api.watchmode.com/v1/list-titles?genres=10&limit=10&apiKey=SPq4jFg1pgbWR6mP6rZGPrBrNGisLbdUeu2P0TKp')
//     .then((response) => response.json())
//     .then((data) => {
//         console.log(data)
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// }

// export const fetchHorrorTitles = () => {
//     fetch('https://api.watchmode.com/v1/list-titles?genres=11&limit=10&apiKey=SPq4jFg1pgbWR6mP6rZGPrBrNGisLbdUeu2P0TKp')
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data)
       
//       })
//       .catch((err) => {
//         console.log(err.message);
//       });
//   }
  
// export const fetchMusicalTitles = () => {
//   fetch('https://api.watchmode.com/v1/list-titles?genres=32&limit=10&apiKey=SPq4jFg1pgbWR6mP6rZGPrBrNGisLbdUeu2P0TKp')
//     .then((response) => response.json())
//     .then((data) => {
//     console.log(data) 
//     })
//     .catch((err) => {
//     console.log(err.message);
//     });
// }
  
// export const fetchMysteryTitles = () => {
//   fetch('https://api.watchmode.com/v1/list-titles?genres=13&limit=10&apiKey=SPq4jFg1pgbWR6mP6rZGPrBrNGisLbdUeu2P0TKp')
//     .then((response) => response.json())
//     .then((data) => {
//     console.log(data)    
//     })
//     .catch((err) => {
//     console.log(err.message);
//     });
// }
      
// export const fetchRomanceTitles = () => {
//   fetch('https://api.watchmode.com/v1/list-titles?genres=14&limit=10&apiKey=SPq4jFg1pgbWR6mP6rZGPrBrNGisLbdUeu2P0TKp')
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data)
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// }

// export const fetchScifiTitles = () => {
//   fetch('https://api.watchmode.com/v1/list-titles?genres=15&limit=10&apiKey=SPq4jFg1pgbWR6mP6rZGPrBrNGisLbdUeu2P0TKp')
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data) 
//     })
//     .catch((err) => {
//     console.log(err.message);
//     });
// }
  
// export const fetchThrillerTitles = () => {
//   fetch('https://api.watchmode.com/v1/list-titles?genres=17&limit=10&apiKey=SPq4jFg1pgbWR6mP6rZGPrBrNGisLbdUeu2P0TKp')
//     .then((response) => response.json())
//     .then((data) => {
//     console.log(data)   
//     })
//     .catch((err) => {
//     console.log(err.message);
//     });
// }
  
// export const fetchWarTitles = () => {
//   fetch('https://api.watchmode.com/v1/list-titles?genres=18&limit=10&apiKey=SPq4jFg1pgbWR6mP6rZGPrBrNGisLbdUeu2P0TKp')
//     .then((response) => response.json())
//     .then((data) => {
//     console.log(data)    
//     })
//     .catch((err) => {
//     console.log(err.message);
//     });
// }
      
 