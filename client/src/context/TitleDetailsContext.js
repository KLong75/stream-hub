import React, { createContext, useState } from "react";

export const TitleDetailsContext = createContext();

export const TitleDetailsProvider = ({ children }) => {
  const [selectedTitleDetails, setSelectedTitleDetails] = useState({});

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
