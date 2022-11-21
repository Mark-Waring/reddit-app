import React from "react";
import { useContext } from "react";
import { AppContext } from "./AppContext";

const SavedThreads = () => {
  const { savedThreads, setSavedThreads } = useContext(AppContext);
  return (
    <>
      <div>Hello World</div>
    </>
  );
};

export default SavedThreads;
