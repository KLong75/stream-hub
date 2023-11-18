import { createContext, useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
// import from utils
import { QUERY_ME } from "../utils/queries";

export const SavedTitlesContext = createContext();

export const SavedTitlesProvider = ({ children }) => {
  const [savedTitles, setSavedTitles] = useState([]);

  const { data } = useQuery(QUERY_ME);

  const userData = data?.me || {};

  useEffect(() => {
    if (userData.savedTitles) {
      setSavedTitles(userData.savedTitles);
    }
  }, [userData.savedTitles]);

  console.log("SavedTitlesContext.js: savedTitles", savedTitles);

  return (
    <SavedTitlesContext.Provider value={{ savedTitles, setSavedTitles }}>
      {children}
    </SavedTitlesContext.Provider>
  );
};
