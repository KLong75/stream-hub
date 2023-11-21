import { createContext, useMemo } from "react";
import { useQuery } from "@apollo/client";
// import from utils
import { QUERY_ME } from "../utils/queries";
// import components
import LoadingClapBoard from "../components/LoadingClapBoard";

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {

  const { data, loading, error } = useQuery(QUERY_ME);

  console.log(data)

  // Memoize 'userData' to only update when 'data' changes
  const userData = useMemo(() => {
    return data?.me || { savedTitles: [] };
  }, [data]);
  

  console.log('userData', userData)
  
  const value = useMemo(() => ({ userData }), [userData]);

  if(loading) return <LoadingClapBoard />
  if(error) return <p>ERROR</p>

  return (
    
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
