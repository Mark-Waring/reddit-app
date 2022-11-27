import { useContext } from "react";
import { AppContext } from "./AppContext";
import backButton from "./audio-icons/back.png";
import playButton from "./audio-icons/play.png";
import pauseButton from "./audio-icons/pause.png";
import fwdButton from "./audio-icons/fwd.png";
import useHandleSpeak from "./useHandleSpeak.js";
import useHandlePause from "./useHandlePause.js";
import useHandleRewind from "./useHandleRewind";
import useHandleFwd from "./useHandleFwd";

export default function GlobalAudioPlayer() {
  const { audioIsPlaying, isPaused, readIt, currentAudio } =
    useContext(AppContext);
  const [handleSpeak] = useHandleSpeak();
  const [handlePause] = useHandlePause();
  const [handleRewind] = useHandleRewind();
  const [handleFwd] = useHandleFwd();

  console.log(currentAudio?.progress);

  return (
    <>
      <div
        className="global-player-container"
        style={{ position: `${global === "global" ? "fixed" : ""}` }}
      >
        <div className="global-player">
          <div className="global-audio-details">
            <div className="global-audio-title">{currentAudio?.title}</div>
            <div className="progress-bar-global" style={{ display: "flex" }}>
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
