import { useContext, useEffect } from "react";
import convertTime from "./convertTime";
import { AppContext } from "./AppContext";
import playButton from "./audio-icons/play-black.png";
import pauseButton from "./audio-icons/pause-black.png";
import useHandleSpeak from "./audio-functions/useHandleSpeak.js";
import useHandlePause from "./audio-functions/useHandlePause.js";

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
    readIt,
    prevProgress,
  } = useContext(AppContext);
  const [handleSpeak] = useHandleSpeak();
  const [handlePause] = useHandlePause();

  const listening = currentAudio === currentThread;

  useEffect(() => {
    if (!currentAudio || isPaused) {
      return;
    }
    if (currentAudio) {
      handleSpeak();
    }
    // eslint-disable-next-line
  }, [currentAudio]);

  console.log(currentAudio);

  return (
    <div className="original-post">
      <span className="op-title-span">
        <h3 className="op-title">{title}</h3>
        <div class="thread-play-container">
          <div className="thread-play">
            {(!listening || !audioIsPlaying || isPaused) && (
              <img
                src={playButton}
                alt={"play button"}
                onClick={async () => {
                  if (listening) {
                    handleSpeak();
                  } else await setCurrentAudio(currentThread);
                }}
              />
            )}
            {listening && audioIsPlaying && !isPaused && (
              <img
                src={pauseButton}
                alt={"pause button"}
                onClick={() => handlePause()}
              />
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
