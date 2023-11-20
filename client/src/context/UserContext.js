import { createContext, useState, useEffect, useMemo } from "react";
import { useQuery } from "@apollo/client";
// import from utils
import { QUERY_ME } from "../utils/queries";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});

  const { data } = useQuery(QUERY_ME);


  // Memoize 'userData' to only update when 'data' changes
  const userData = useMemo(() => {
    return data?.me || {};
  }, [data]);

  useEffect(() => {
    // Now 'userData' is stable unless 'data' changes
    setUserInfo(userData);
  }, [userData]);

  console.log("UserContext.js: userInfo", userInfo);

  const value = useMemo(() => ({ userInfo, setUserInfo }), [userInfo]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
