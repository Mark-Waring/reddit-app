import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "./AppContext";
import ListenTool from "./ListenTool";

import Thread from "./Thread";

export default function ListenPage() {
  const { savedThreads } = useContext(AppContext);
  const [currentThread, setCurrentThread] = useState(null);
  const { threadId } = useParams();

  useEffect(() => {
    setCurrentThread(
      savedThreads.find((thread) => {
        return thread.id === threadId;
      })
    );
    // eslint-disable-next-line
  }, [threadId]);

  return (
    <>
      <ListenTool currentThread={currentThread} />
      <Thread currentThread={currentThread} />
    </>
  );
}
