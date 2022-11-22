import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "./AppContext";

export default function SavedThreads() {
  const { savedThreads } = useContext(AppContext);

  return (
    <>
      {savedThreads?.map((thread) => {
        return (
          <>
            <NavLink key={thread.id} to={thread.id}>
              {thread.title}
            </NavLink>
          </>
        );
      })}
    </>
  );
}
