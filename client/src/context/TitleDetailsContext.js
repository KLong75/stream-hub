import React, { createContext, useState, useEffect } from "react";

export const TitleDetailsContext = createContext();

export const TitleDetailsProvider = ({ children }) => {
  const [selectedTitleDetails, setSelectedTitleDetails] = useState(JSON.parse(localStorage.getItem("selectedTitleDetails")) || {});

  useEffect(() => {
    localStorage.setItem("selectedTitleDetails", JSON.stringify(selectedTitleDetails));
  }, [selectedTitleDetails]);


  return (
    <TitleDetailsContext.Provider
      value={{
        selectedTitleDetails,
        setSelectedTitleDetails
      }}
    >
      {children}
    </TitleDetailsContext.Provider>
  );
};
