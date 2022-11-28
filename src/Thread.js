import OriginalPost from "./OriginalPost";
import Replies from "./Replies";
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "./AppContext";

export default function Thread() {
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

  console.log(currentThread);

  return (
    <div className="thread-container">
      {currentThread && (
        <div className="thread">
          <OriginalPost
            currentThread={currentThread}
            title={currentThread.title}
            author={currentThread.author}
            flair={currentThread.flair}
            time={currentThread.time}
            body={currentThread.body}
            score={currentThread.score}
            replyNumber={
              currentThread.replyNumber ? currentThread?.replyNumber : 0
            }
            subreddit={currentThread.subreddit}
            id={currentThread.id}
          />
          <Replies
            className="replies-container"
            repliesArray={currentThread.repliesArray}
          />
        </div>
      )}
    </div>
  );
}
