import Post from "./Post";
import Replies from "./Replies";

export default function Thread({ currentThread }) {
  return (
    <>
      {currentThread && (
        <div id="thread">
          <Post
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
          />
          <Replies
            className="replies-container"
            repliesArray={currentThread.repliesArray}
          />
        </div>
      )}
    </>
  );
}
