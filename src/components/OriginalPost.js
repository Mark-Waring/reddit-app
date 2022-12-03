import { useContext, useEffect } from "react";
import convertTime from "../shared/functions/convertTime";
import { AppContext } from "../shared/context/AppContext";
import playButton from "../shared/audio-icons/play-black.png";
import pauseButton from "../shared/audio-icons/pause-black.png";
import useHandleSpeak from "../shared/functions/audio-functions/useHandleSpeak";
import useHandlePause from "../shared/functions/audio-functions/useHandlePause";

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
    setIsPaused,
  } = useContext(AppContext);
  const [handleSpeak] = useHandleSpeak();
  const [handlePause] = useHandlePause();

  const isListening = currentAudio === currentThread;

  useEffect(() => {
    if (isListening && !isPaused) {
      handleSpeak();
    }
    // eslint-disable-next-line
  }, [isPaused, currentAudio]);

  return (
    <div className="original-post">
      <span className="op-title-span">
        <h3 className="op-title">{title}</h3>

        <div className="thread-play-container">
          <div className="thread-play">
            {(!isListening || !audioIsPlaying || isPaused) && (
              <img
                src={playButton}
                alt={"play button"}
                onClick={() => {
                  setIsPaused(false);
                  setCurrentAudio(currentThread);
                }}
              />
            )}
            {isListening && audioIsPlaying && !isPaused && (
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
      <div className="op-details-bottom">
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
