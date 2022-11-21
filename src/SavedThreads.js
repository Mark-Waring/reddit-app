import React, { useContext, useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AppContext } from "./AppContext";
import { useParams } from "react-router-dom";

const SavedThreads = () => {
  const { savedThreads } = useContext(AppContext);
  const [currentThread, setCurrentThread] = useState({});
  console.log("rendering");
  const { threadId } = useParams();

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
      <Outlet />
    </>
  );
};

export default SavedThreads;
