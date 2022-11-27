import { useContext, useRef, useState, useEffect } from "react";
import convertTime from "./convertTime";
import { AppContext } from "./AppContext";
import playButton from "./audio-icons/play.png";
import pauseButton from "./audio-icons/pause.png";

export default function OriginalPost({
  title,
  author,
  time,
  body,
  score,
  replyNumber,
  subreddit,
  currentThread,
}) {
  const {
    currentAudio,
    setCurrentAudio,
    audioIsPlaying,
    isPaused,
    setAudioIsPlaying,
    setIsPaused,
    readIt,
    progress,
    setProgress,
  } = useContext(AppContext);
  const prevProgress = useRef(currentThread?.progress ?? 0);
  const [disabled, setDisabled] = useState(false);

  // useEffect(() => {
  //   if (!currentAudio) return;
  //   currentAudio.progress = prevProgress.current + progress;
  //   // eslint-disable-next-line
  // }, [progress]);

  function handleSpeak() {
    setCurrentAudio(currentThread);
    const track = readIt(currentThread)?.slice(
      prevProgress.current,
      readIt(currentThread).length
    );
    const utterance = new SpeechSynthesisUtterance(track);
    const synth = window.speechSynthesis;
    setAudioIsPlaying(true);
    setIsPaused(false);
    utterance.addEventListener("start", () => setDisabled(true));
    utterance.addEventListener("end", () => setDisabled(false));
    utterance.addEventListener("boundary", ({ charIndex }) => {
      setProgress(charIndex);
    });
    synth.speak(utterance);
  }

  console.log(currentAudio.progress);
  console.log(prevProgress.current);

  function handlePause() {
    setIsPaused(true);
    window.speechSynthesis.cancel();
    if (!progress) return (prevProgress.current = currentThread.progress);
    currentThread.progress = prevProgress.current + progress;
    prevProgress.current = currentThread.progress;
  }

  return (
    <div className="original-post">
      <span className="op-title-span">
        <h3 className="op-title">{title}</h3>
        <div class="thread-play-container">
          <div className="thread-play">
            {(!audioIsPlaying || isPaused) && (
              <img src={playButton} onClick={handleSpeak} />
            )}
            {audioIsPlaying && !isPaused && (
              <img src={pauseButton} onClick={handlePause} />
            )}
          </div>
        </div>
      </span>
      <div>{body}</div>
      <div class="op-details-bottom">
        <div className="op-details-left">
          <div>
            in {subreddit} by {author}
          </div>
          <div>
            {score > 0 && "+"}
            {score}
          </div>
          <div>{convertTime(time)}</div>
        </div>
        <div className="op-comments-container">
          <div className="op-comments">
            {replyNumber === 1 ? " 1 comment" : ` ${replyNumber} comments`}
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}
