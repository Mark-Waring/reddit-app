import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "./AppContext";
import convertTime from "./convertTime";
import playButton from "./audio-icons/play.png";
import pauseButton from "./audio-icons/pause.png";
import useHandleSpeak from "./useHandleSpeak.js";
import useHandlePause from "./useHandlePause.js";

export default function SavedThread({ thread }) {
  const { audioIsPlaying, isPaused, currentAudio, setCurrentAudio, readIt } =
    useContext(AppContext);

  const [handleSpeak] = useHandleSpeak();
  const [handlePause] = useHandlePause();

  useEffect(() => {
    if (!currentAudio || isPaused) {
      return;
    }
    if (currentAudio) {
      handleSpeak();
    }
    // eslint-disable-next-line
  }, [currentAudio]);

  return (
    <>
      <div className="saved-thread">
        <div className="saved-left-align">
          <NavLink to={thread.id}>{thread.title}</NavLink>
          <div class="saved-details">
            <div class="saved-details-left">
              <div>{thread.subreddit}</div>
              <div className="saved-bottom">
                <div className="saved-author">{`u/${thread.author}`}</div>
                <div className="saved-time">{convertTime(thread.time)}</div>
              </div>
            </div>
            <div className="thread-audio-container">
              <div className="thread-progress-bar" style={{ display: "flex" }}>
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
            {(!audioIsPlaying || isPaused) && (
              <img
                className="thread-audio-button"
                src={playButton}
                alt={"play button"}
                onClick={async () => {
                  if (currentAudio === thread) {
                    handleSpeak();
                  } else await setCurrentAudio(thread);
                }}
              />
            )}
            {audioIsPlaying && !isPaused && (
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
      <hr />
    </>
  );
}
