import { useContext } from "react";
import { AppContext } from "./AppContext";
import backButton from "./audio-icons/back.png";
import playButton from "./audio-icons/play.png";
import pauseButton from "./audio-icons/pause.png";
import fwdButton from "./audio-icons/fwd.png";
import useHandleSpeak from "./audio-functions/useHandleSpeak.js";
import useHandlePause from "./audio-functions/useHandlePause.js";
import useHandleRewind from "./audio-functions/useHandleRewind";
import useHandleFwd from "./audio-functions/useHandleFwd";

export default function GlobalAudioPlayer() {
  const { audioIsPlaying, isPaused, readIt, currentAudio } =
    useContext(AppContext);
  const [handleSpeak] = useHandleSpeak();
  const [handlePause] = useHandlePause();
  const [handleRewind] = useHandleRewind();
  const [handleFwd] = useHandleFwd();

  const globalProgress = document.querySelector("#global-progress");

  function clickedProgress(e) {
    return (
      (e.clientX - globalProgress.getBoundingClientRect().left) /
      globalProgress.clientWidth
    );
  }

  return (
    <>
      <div
        className="global-player-container"
        style={{ position: `${global === "global" ? "fixed" : ""}` }}
      >
        <div className="global-player">
          <div className="global-audio-details">
            <div className="global-audio-title">
              {currentAudio?.title.length < 50
                ? currentAudio.title
                : `${currentAudio.title.substring(0, 50)}...`}
            </div>
            <div
              id="global-progress"
              className="progress-bar-global"
              style={{ display: "flex" }}
              onClick={(e) => {
                currentAudio.progress =
                  clickedProgress(e) * readIt(currentAudio).length;
                handleSpeak();
              }}
            >
              <div
                className="progress"
                style={{
                  width: `${
                    (currentAudio?.progress / readIt(currentAudio).length) *
                      100 || 0
                  }%`,
                }}
              ></div>
            </div>
            <div className="audio-control-container">
              <div className="audio-button">
                <img
                  src={backButton}
                  alt={"rewind button"}
                  onClick={() => handleRewind()}
                />
              </div>
              <div className="audio-button">
                {(!audioIsPlaying || isPaused) && (
                  <img
                    src={playButton}
                    alt={"play button"}
                    onClick={() => handleSpeak()}
                  />
                )}
                {audioIsPlaying && !isPaused && (
                  <img
                    src={pauseButton}
                    alt={"pause button"}
                    onClick={() => handlePause()}
                  />
                )}
              </div>
              <div className="audio-button">
                <img
                  src={fwdButton}
                  alt={"fast forward button"}
                  onClick={() => handleFwd()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
