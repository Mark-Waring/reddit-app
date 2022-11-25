import { useState, createContext } from "react";

export const AppContext = createContext();

export function AppProvider(props) {
  const [savedThreads, setSavedThreads] = useState([]);
  const [searchUrl, setSearchUrl] = useState("");
  const [sort, setSort] = useState("confidence");

  const value = {
    savedThreads,
    setSavedThreads,
    searchUrl,
    setSearchUrl,
    sort,
    setSort,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
}
