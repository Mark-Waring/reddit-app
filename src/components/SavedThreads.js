import React, { useContext } from "react";
import { AppContext } from "../shared/context/AppContext";
import SavedThread from "./SavedThread";

export default function SavedThreads() {
  const { savedThreads } = useContext(AppContext);

  return (
    <>
      {savedThreads?.map((thread) => {
        return <SavedThread key={thread.id} thread={thread} />;
      })}
    </>
  );
}
