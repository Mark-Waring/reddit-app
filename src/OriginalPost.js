import { useContext, useEffect } from "react";
import convertTime from "./convertTime";
import { AppContext } from "./AppContext";
import playButton from "./audio-icons/play.png";
import pauseButton from "./audio-icons/pause.png";
import useHandleSpeak from "./useHandleSpeak.js";
import useHandlePause from "./useHandlePause.js";

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

  console.log(prevProgress.current);
  console.log(readIt(currentThread));

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
    <div className="original-post">
      <span className="op-title-span">
        <h3 className="op-title">{title}</h3>
        <div class="thread-play-container">
          <div className="thread-play">
            {(!audioIsPlaying || isPaused) && (
              <img
                src={playButton}
                alt={"play button"}
                onClick={async () => {
                  if (currentAudio === currentThread) {
                    handleSpeak();
                  } else await setCurrentAudio(currentThread);
                }}
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
