// Watchmode API Calls
// fetch genre categories
export const fetchGenres = () => {
    fetch(`https://api.watchmode.com/v1/genres/?apiKey=${process.env.REACT_APP_WMODE_API_KEY}`)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data)
      
    })
    .catch((err) => {
      console.log(err.message);
    });
}



// export const fetchActors = () => {
//   fetch(`https://api.watchmode.com/v1/autocomplete-search/?apiKey=${process.env.REACT_APP_WMODE_API_KEY}&search_value=sydney&search_type=5`)
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data)
    
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });
// }




// fetch sources
export const fetchSources = () => {
    fetch(`https://api.watchmode.com/v1/sources/?apiKey=${process.env.REACT_APP_WMODE_API_KEY}`)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data)
      const subSources = data.filter((source => source.type === 'sub'))
      // console.log(subSources)
      const purchaseSources = data.filter((source => source.type === 'purchase'))
      // console.log(purchaseSources)
      const freeSources = data.filter((source => source.type === 'free'))
      // console.log(freeSources)
      const rentalSources = data.filter((source => source.type === 'rental'))
      // console.log(rentalSources)
    })
    .catch((err) => {
      console.log(err.message);
    });
}


export const fetchTitlesBySource= () => {
  fetch(`https://api.watchmode.com/v1/list-titles/?apiKey=${process.env.REACT_APP_WMODE_API_KEY}&source_ids=203&genre=15&types=movie&sort_by=popularity_desc`)
  .then((response) => response.json())
  .then((data) => { 
  })
  .catch((err) => {
    console.log(err.message);
  });
}



// fetch titles by genre
export const searchByGenre = (query) => { return fetch(`https://api.watchmode.com/v1/list-titles?genres=${query}&limit=250&apiKey=${process.env.REACT_APP_WMODE_API_KEY}`);
}

// fetch titles by genre, type, and source
export const fetchTitlesByGenreSourceType = (sources, genres, types) => { return fetch(`https://api.watchmode.com/v1/list-titles/?apiKey=${process.env.REACT_APP_WMODE_API_KEY}&source_ids=${sources}&genres=${genres}&types=${types}&sort_by=popularity_desc&limit=250`);
}


// fetch titles by title
export const searchByTitle = (query) => { return fetch(`https://api.watchmode.com/v1/autocomplete-search/?apiKey=${process.env.REACT_APP_WMODE_API_KEY}&search_value=${query}&search_type=2`);
}

// search watchmode by name (people)
export const searchWatchmodeByPersonName= (query) => { return fetch(`https://api.watchmode.com/v1/autocomplete-search/?apiKey=${process.env.REACT_APP_WMODE_API_KEY}&search_value=${query}&search_type=5`);
}

// fetch titles by TMDB id from watchmode
export const searchTitlesByTMDBId = (query) => { return fetch(`https://api.watchmode.com/v1/title/${query}/details?apiKey=${process.env.REACT_APP_WMODE_API_KEY}&append_to_response=sources`);
}

// fetch details by title id from watchmode
export const fetchTitleDetails = (query) => { return fetch(`https://api.watchmode.com/v1/title/${query}/details/?append_to_response=sources&apiKey=${process.env.REACT_APP_WMODE_API_KEY}`);
} 


// The Movie Database API Calls
// fetch movies coming soon from TMDB
export const fetchMoviesComingSoon = () => { return fetch(`https://api.themoviedb.org/3/movie/upcoming?include_adult=false&api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`)}

export const fetchMoviesComingSoonPageTwo = () => { return fetch(`https://api.themoviedb.org/3/movie/upcoming?include_adult=false&api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=2`)}

export const fetchMoviesComingSoonPageThree = () => { return fetch(`https://api.themoviedb.org/3/movie/upcoming?include_adult=false&api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=3`)}

export const fetchMoviesComingSoonPageFour = () => { return fetch(`https://api.themoviedb.org/3/movie/upcoming?include_adult=false&api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=4`)}

export const fetchMoviesComingSoonPageFive = () => { return fetch(`https://api.themoviedb.org/3/movie/upcoming?include_adult=false&api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=5`)}

// fetch mixed genre movies from TMDB
export const fetchMixedGenreMovies = (genre) => { return fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genre}&api_key=${process.env.REACT_APP_TMDB_API_KEY}`)}

export const fetchMixedGenreMoviesPageTwo = (genre) => { return fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=2&sort_by=popularity.desc&with_genres=${genre}&api_key=${process.env.REACT_APP_TMDB_API_KEY}`)}

export const fetchMixedGenreMoviesPageThree = (genre) => { return fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=3&sort_by=popularity.desc&with_genres=${genre}&api_key=${process.env.REACT_APP_TMDB_API_KEY}`)}

export const fetchMixedGenreMoviesPageFour = (genre) => { return fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=4&sort_by=popularity.desc&with_genres=${genre}&api_key=${process.env.REACT_APP_TMDB_API_KEY}`)}

export const fetchMixedGenreMoviesPageFive = (genre) => { return fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=5&sort_by=popularity.desc&with_genres=${genre}&api_key=${process.env.REACT_APP_TMDB_API_KEY}`)}

// fetch mixed genre tv shows from TMDB
export const fetchMixedGenreTV = (genre) => { return fetch(`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_false=true&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genre}&api_key=${process.env.REACT_APP_TMDB_API_KEY}`)}

export const fetchMixedGenreTVPageTwo = (genre) => { return fetch(`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_false=true&language=en-US&page=2&sort_by=popularity.desc&with_genres=${genre}&api_key=${process.env.REACT_APP_TMDB_API_KEY}`)}

export const fetchMixedGenreTVPageThree = (genre) => { return fetch(`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_false=true&language=en-US&page=3&sort_by=popularity.desc&with_genres=${genre}&api_key=${process.env.REACT_APP_TMDB_API_KEY}`)}

export const fetchMixedGenreTVPageFour = (genre) => { return fetch(`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_false=true&language=en-US&page=4&sort_by=popularity.desc&with_genres=${genre}&api_key=${process.env.REACT_APP_TMDB_API_KEY}`)}

export const fetchMixedGenreTVPageFive = (genre) => { return fetch(`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_false=true&language=en-US&page=5&sort_by=popularity.desc&with_genres=${genre}&api_key=${process.env.REACT_APP_TMDB_API_KEY}`)}


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

// fetch trending movies by genre
// fetch trending action movies
export const fetchTrendingActionMovies = () => { return fetch (`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&genre=28`);
}

// fetch trending animation movies
export const fetchTrendingAnimationMovies = () => { return fetch (`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=16&api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
}

// fetch trending comedy movies
export const fetchTrendingComedyMovies = () => { return fetch (`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=35&api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
}

// fetch trending crime movies
export const fetchTrendingCrimeMovies = () => { return fetch (`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=80&api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
}

// fetch trending documentary movies
export const fetchTrendingDocumentaryMovies = () => { return fetch (`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=99&api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
}

// fetch trending drama movies
export const fetchTrendingDramaMovies = () => { return fetch (`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=18&api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
}

// fetch trending family movies
export const fetchTrendingFamilyMovies = () => { return fetch (`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10751&api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
}

// fetch trending fantasy movies
export const fetchTrendingFantasyMovies = () => { return fetch (`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=14&api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
}

// fetch trending horror movies
export const fetchTrendingHorrorMovies = () => { return fetch (`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=27&api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
}

// fetch trending science fiction movies
export const fetchTrendingScienceFictionMovies = () => { return fetch (`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=878&api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
}

// fetch trending thriller movies
export const fetchTrendingThrillerMovies = () => { return fetch (`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=53&api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
}


// fetch tv shows by genre
// fetch trending action tv shows
export const fetchTrendingActionAdventureTv = () => { return fetch (`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10759&api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
}

// fetch trending animation tv shows
export const fetchTrendingAnimationTv = () => { return fetch (`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=16&api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
}

// fetch trending comedy tv shows
export const fetchTrendingComedyTv = () => { return fetch (`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=35&api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
}

// fetch trending crime tv shows
export const fetchTrendingCrimeTv = () => { return fetch (`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=80&api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
}

// fetch trending documentary tv shows
export const fetchTrendingDocTv = () => { return fetch (`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=99&api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
}

// fetch trending drama tv shows
export const fetchTrendingDramaTv = () => { return fetch (`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=18&api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
}

// fetch trending family tv shows
export const fetchTrendingFamilyTv = () => { return fetch (`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10751&api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
}

// fetch trending sci-fi & fantasy tv shows
export const fetchTrendingSciFiFantasyTv = () => { return fetch (`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10765&api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
}

// fetch trending kids tv shows
export const fetchTrendingKidsTv = () => { return fetch (`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10762&api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
}

// fetch trending news tv shows
export const fetchTrendingNewsTv = () => { return fetch (`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10763&api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
}

// fetch trending reality tv shows
export const fetchTrendingRealityTv = () => { return fetch (`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10764&api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
}


// test action fetch
export const discoverTrendingActionMovies = () => {
  fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=14&api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
  .then((response) => response.json())
  .then((data) => {
    // console.log(data)
  })
  .catch((err) => {
    console.log(err.message);
  });
}

export const trendingTvTest = () => {
  fetch(`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10759&api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
  .then((response) => response.json())
  .then((data) => {
    // console.log('trending tv test', data)
  })
  .catch((err) => {
    console.log(err.message);
  });
}


export const fetchActionTv = () => { return fetch (`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&genre=10759watch_region=us`);
}



export const searchTmdbMoviesByGenre = () => {
  fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=28,878&api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
  .then((response) => response.json())
  .then((data) => {
    // console.log(data)
  })
  .catch((err) => {
    console.log(err.message);
  });
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
      
 