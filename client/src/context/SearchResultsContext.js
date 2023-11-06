import React, { createContext, useState, useEffect } from "react";

export const SearchResultsContext = createContext();

export const SearchResultsProvider = ({ children }) => {
  const [genreSearchResults, setGenreSearchResults] = useState(
    JSON.parse(localStorage.getItem("genreSearchResults")) || []
  );
  const [actorSearchResults, setActorSearchResults] = useState(
    JSON.parse(localStorage.getItem("actorSearchResults")) || []
  );
  const [mixedGenreSearchResults, setMixedGenreSearchResults] = useState(
    JSON.parse(localStorage.getItem("mixedGenreSearchResults")) || []
  );
  const [mixedGenreMovieSearchResults, setMixedGenreMovieSearchResults] = useState(
    JSON.parse(localStorage.getItem("mixedGenreMovieSearchResults")) || []
  );
  const [titleSearchResults, setTitleSearchResults] = useState(
    JSON.parse(localStorage.getItem("titleSearchResults")) || []
  );
  const [genreSourceTypeSearchResults, setGenreSourceTypeSearchResults] = useState(
    JSON.parse(localStorage.getItem("genreSourceTypeSearchResults")) || []
  );

  useEffect(() => {
    localStorage.setItem("genreSearchResults", JSON.stringify(genreSearchResults));
    localStorage.setItem("actorSearchResults", JSON.stringify(actorSearchResults));
    localStorage.setItem("mixedGenreSearchResults", JSON.stringify(mixedGenreSearchResults));
    localStorage.setItem("mixedGenreMovieSearchResults", JSON.stringify(mixedGenreMovieSearchResults));
    localStorage.setItem("titleSearchResults", JSON.stringify(titleSearchResults));
    localStorage.setItem("genreSourceTypeSearchResults", JSON.stringify(genreSourceTypeSearchResults));
  }, [genreSearchResults, actorSearchResults, mixedGenreSearchResults, mixedGenreMovieSearchResults, titleSearchResults, genreSourceTypeSearchResults]);


  return (
    <SearchResultsContext.Provider
      value={{
        genreSearchResults,
        setGenreSearchResults,
        actorSearchResults,
        setActorSearchResults,
        mixedGenreSearchResults,
        setMixedGenreSearchResults,
        mixedGenreMovieSearchResults,
        setMixedGenreMovieSearchResults,
        titleSearchResults,
        setTitleSearchResults,
        genreSourceTypeSearchResults,
        setGenreSourceTypeSearchResults
      }}
    >
      {children}
    </SearchResultsContext.Provider>
  );
};
