import { useContext, useEffect, useState } from "react";
import Post from "./Post";
import Replies from "./Replies";
import { AppContext } from "./AppContext";
import { useParams } from "react-router-dom";

const Posts = () => {
  const msg = new SpeechSynthesisUtterance();
  const { savedThreads } = useContext(AppContext);
  const [currentThread, setCurrentThread] = useState(null);
  const { threadId } = useParams();

  useEffect(() => {
    setCurrentThread(
      savedThreads.find((thread) => {
        return thread.id === threadId;
      })
    );
    // eslint-disable-next-line
  }, [threadId]);

  const speechHandler = (msg) => {
    msg.text = document.querySelector("#posts").textContent;
    window.speechSynthesis.speak(msg);
  };

  const speechStopper = () => {
    window.speechSynthesis.cancel();
  };

  return (
    <>
      <button onClick={() => speechHandler(msg)}>SPEAK</button>
      <button onClick={() => speechStopper()}>STOP</button>
      {currentThread && (
        <div id="posts">
          <Post
            className="Level 0"
            title={currentThread.title}
            author={currentThread.author}
            flair={currentThread.flair}
            time={currentThread.time}
            body={currentThread.body}
            score={currentThread.score}
            replyNumber={
              currentThread.replyNumber ? currentThread?.replyNumber : 0
            }
          />
          <Replies repliesArray={currentThread.repliesArray} />
        </div>
      )}
    </>
  );
};

export default Posts;
