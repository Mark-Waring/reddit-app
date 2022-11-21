import { useState, createContext } from "react";

export const AppContext = createContext();

export function AppProvider(props) {
  const [savedThreads, setSavedThreads] = useState([]);
  const [searchUrl, setSearchUrl] = useState("");

  const value = {
    savedThreads,
    setSavedThreads,
    searchUrl,
    setSearchUrl,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
}
