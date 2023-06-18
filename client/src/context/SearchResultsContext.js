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
  const [titleSearchResults, setTitleSearchResults] = useState(
    JSON.parse(localStorage.getItem("titleSearchResults")) || []
  );
  const [genreSourceTypeResults, setGenreSourceTypeResults] = useState(
    JSON.parse(localStorage.getItem("genreSourceTypeResults")) || []
  );

  useEffect(() => {
    localStorage.setItem("genreSearchResults", JSON.stringify(genreSearchResults));
    localStorage.setItem("actorSearchResults", JSON.stringify(actorSearchResults));
    localStorage.setItem("mixedGenreSearchResults", JSON.stringify(mixedGenreSearchResults));
    localStorage.setItem("titleSearchResults", JSON.stringify(titleSearchResults));
    localStorage.setItem("genreSourceTypeResults", JSON.stringify(genreSourceTypeResults));
  }, [genreSearchResults, actorSearchResults, mixedGenreSearchResults, titleSearchResults, genreSourceTypeResults]);




  return (
    <SearchResultsContext.Provider
      value={{
        genreSearchResults,
        setGenreSearchResults,
        actorSearchResults,
        setActorSearchResults,
        mixedGenreSearchResults,
        setMixedGenreSearchResults,
        titleSearchResults,
        setTitleSearchResults,
        genreSourceTypeResults,
        setGenreSourceTypeResults
      }}
    >
      {children}
    </SearchResultsContext.Provider>
  );
};
