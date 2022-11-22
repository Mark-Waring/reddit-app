import Post from "./Post";
import Replies from "./Replies";

export default function Thread({ currentThread }) {
  return (
    <>
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
}
