import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "./AppContext";
import convertTime from "./convertTime";
import playButton from "./audio-icons/play-black.png";
import pauseButton from "./audio-icons/pause-black.png";
import useHandleSpeak from "./audio-functions/useHandleSpeak.js";
import useHandlePause from "./audio-functions/useHandlePause.js";

export default function SavedThread({ thread }) {
  const {
    audioIsPlaying,
    isPaused,
    setIsPaused,
    currentAudio,
    setCurrentAudio,
    readIt,
  } = useContext(AppContext);

  const [handleSpeak] = useHandleSpeak();
  const [handlePause] = useHandlePause();
  const isListening = currentAudio === thread;

  useEffect(() => {
    if (isListening && !isPaused) {
      handleSpeak();
    }
    // eslint-disable-next-line
  }, [isPaused, currentAudio]);

  const threadProgress = document.querySelector("#thread-progress");

  function clickedProgress(e) {
    return (
      (e.clientX - threadProgress?.getBoundingClientRect().left) /
      threadProgress?.clientWidth
    );
  }

  return (
    <>
      <div className="saved-thread">
        <div className="saved-left-align">
          <NavLink to={thread.id}>{thread.title}</NavLink>
          <div className="saved-details">
            <div className="saved-details-left">
              <div>{thread.subreddit}</div>
              <div className="saved-bottom">
                <div className="saved-author">{`u/${thread.author}`}</div>
                <div className="saved-time">{convertTime(thread.time)}</div>
              </div>
            </div>
            <div className="thread-audio-container">
              <div
                style={{ cursor: isListening ? "pointer" : "" }}
                id="thread-progress"
                className="thread-progress-bar"
                onClick={(e) => {
                  if (!isListening) return;
                  handlePause();
                  thread.progress = clickedProgress(e) * readIt(thread).length;
                  handleSpeak();
                }}
              >
                <div
                  className="thread-progress"
                  style={{
                    width: `${
                      (thread?.progress / readIt(thread).length) * 100 || 0
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div className="saved-right-align">
          <NavLink to={thread.id}>
            <img
              className="subreddit-header"
              src={thread.header}
              alt={`${thread.subreddit} Community Icon`}
            />
          </NavLink>
          <div className="thread-audio">
            {(!isListening || !audioIsPlaying || isPaused) && (
              <img
                className="thread-audio-button"
                src={playButton}
                alt={"play button"}
                onClick={() => {
                  setIsPaused(false);
                  setCurrentAudio(thread);
                }}
              />
            )}
            {isListening && audioIsPlaying && !isPaused && (
              <img
                className="thread-audio-button"
                src={pauseButton}
                alt={"pause button"}
                onClick={() => handlePause()}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
