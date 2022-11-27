import { useEffect, useState, useContext } from "react";
import { AppContext } from "./AppContext";
import backButton from "./audio-icons/back.png";
import playButton from "./audio-icons/play.png";
import pauseButton from "./audio-icons/pause.png";
import fwdButton from "./audio-icons/fwd.png";

export default function ListenTool() {
  const [disabled, setDisabled] = useState(false);
  const {
    audioIsPlaying,
    setAudioIsPlaying,
    isPaused,
    setIsPaused,
    readIt,
    progress,
    setProgress,
    prevProgress,
    currentAudio,
  } = useContext(AppContext);

  // useEffect(() => {
  //   if (!currentAudio) return;
  //   currentAudio.progress = prevProgress.current + progress;
  //   // eslint-disable-next-line
  // }, [progress]);

  function handleSpeak() {
    const track = readIt(currentAudio)?.slice(
      prevProgress.current,
      readIt(currentAudio).length
    );
    const utterance = new SpeechSynthesisUtterance(track);
    const synth = window.speechSynthesis;
    setAudioIsPlaying(true);
    setIsPaused(false);

    if (!synth) {
      console.error("no tts");
      return;
    }
    utterance.addEventListener("start", () => setDisabled(true));
    utterance.addEventListener("end", () => setDisabled(false));
    utterance.addEventListener("boundary", ({ charIndex }) => {
      setProgress(charIndex);
    });
    synth.speak(utterance);
  }

  console.log(currentAudio?.progress);

  function handlePause() {
    console.log(progress);
    setIsPaused(true);
    window.speechSynthesis.cancel();
    prevProgress.current = currentAudio.progress;
    // if (!progress) return (prevProgress.current = currentAudio.progress);
    // currentAudio.progress = prevProgress.current + progress;
    // prevProgress.current = currentAudio.progress;
  }

  function handleRewind() {
    window.speechSynthesis.cancel();
    currentAudio.progress = prevProgress.current + progress - 60;
    prevProgress.current = currentAudio.progress;
    const track = readIt(currentAudio)?.slice(
      prevProgress.current,
      readIt(currentAudio).length
    );
    const utterance = new SpeechSynthesisUtterance(track);
    const synth = window.speechSynthesis;
    if (!synth) {
      console.error("no tts");
      return;
    }
    utterance.addEventListener("start", () => setDisabled(true));
    utterance.addEventListener("end", () => setDisabled(false));
    utterance.addEventListener("boundary", ({ charIndex }) => {
      setProgress(charIndex);
    });
    synth.speak(utterance);
  }

  function handleForward() {
    window.speechSynthesis.cancel();
    currentAudio.progress = prevProgress.current + progress + 60;
    prevProgress.current = currentAudio.progress;
    const track = readIt(currentAudio)?.slice(
      prevProgress.current,
      readIt(currentAudio).length
    );
    const utterance = new SpeechSynthesisUtterance(track);
    const synth = window.speechSynthesis;
    if (!synth) {
      console.error("no tts");
      return;
    }
    utterance.addEventListener("start", () => setDisabled(true));
    utterance.addEventListener("end", () => setDisabled(false));
    utterance.addEventListener("boundary", ({ charIndex }) => {
      setProgress(charIndex);
    });
    synth.speak(utterance);
  }

  console.log(currentAudio?.progress / readIt(currentAudio)?.length);

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
                <img src={backButton} onClick={handleRewind} />
              </div>
              <div className="audio-button">
                {(!audioIsPlaying || isPaused) && (
                  <img src={playButton} onClick={handleSpeak} />
                )}
                {audioIsPlaying && !isPaused && (
                  <img src={pauseButton} onClick={handlePause} />
                )}
              </div>
              <div className="audio-button">
                <img src={fwdButton} onClick={handleForward} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
