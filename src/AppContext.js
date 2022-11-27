import { useState, createContext, useRef } from "react";
import convertTime from "./convertTime";
export const AppContext = createContext();

export function AppProvider(props) {
  const [savedThreads, setSavedThreads] = useState([]);
  const [searchUrl, setSearchUrl] = useState("");
  const [sort, setSort] = useState("confidence");
  const [currentAudio, setCurrentAudio] = useState(null);
  const [audioIsPlaying, setAudioIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const prevProgress = useRef(0);

  function readReplies(replies) {
    if (!replies) return "";
    return `${replies?.map((reply) => {
      if (!reply || !reply.author) {
        return "";
      }
      return `${reply.author}, ${convertTime(reply.time)}, ${
        reply.body
      }, Score, ${reply.score}, ${reply.replyNumber ?? "No"} repl${
        reply.replyNumber !== 1 ? "ies" : "y"
      }, ${readReplies(reply.getNestedReplies)}`;
    })}`;
  }

  function readThread(thread) {
    if (!thread) return "";
    return `${thread.author}, ${convertTime(thread.time)}, ${
      thread.body
    }, Score, ${thread.score}, ${thread.replyNumber ?? "No"} comment${
      thread.replyNumber !== 1 ? "s" : ""
    }, ${readReplies(thread?.getNestedReplies)}`;
  }

  function readIt(thread) {
    return `${readThread(thread)} ${readReplies(thread?.repliesArray)}`;
  }

  const value = {
    savedThreads,
    setSavedThreads,
    searchUrl,
    setSearchUrl,
    sort,
    setSort,
    currentAudio,
    setCurrentAudio,
    audioIsPlaying,
    setAudioIsPlaying,
    isPaused,
    setIsPaused,
    readIt,
    progress,
    setProgress,
    prevProgress,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
}
