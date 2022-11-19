import { useState } from "react";
import Post from "./post";
import test from "./testjson";
import useSWR from "swr";
const now = Math.round(Date.now() / 1000);

const Posts = () => {
  const [thread, setThread] = useState("");
  const [threadInput, setThreadInput] = useState(
    "https://www.reddit.com/r/AskReddit/comments/yzea30/which_fastfood_chain_has_the_best_french_fries/"
  );
  const url = `${thread}.json`;
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const msg = new SpeechSynthesisUtterance();

  const speechHandler = (msg) => {
    msg.text = toRead;
    window.speechSynthesis.speak(msg);
  };

  const speechStopper = () => {
    window.speechSynthesis.cancel();
  };

  console.log("render");

  const { data: result, error } = useSWR(url, fetcher);
  if (!thread)
    return (
      <form>
        <input
          type="text"
          value={threadInput}
          onChange={(e) => setThreadInput(e.target.value)}
        />
        <button onClick={() => setThread(threadInput)}>Select Thread</button>
      </form>
    );

  if (error) return <h1>Something went wrong!</h1>;
  if (!result) return <h1>Loading...</h1>;

  const toRead = result[1].data.children.map((post) => {
    return `${post.data.author},
    }, ${Math.floor(
      (now - test[1].data.children[0].data.created_utc) / (60 * 60)
    )} hours ago.  ${post.data.body}. ${post.data.score > 0 && "+"}${
      post.data.score
    }, ${post.data.replies?.data?.children?.length || 0} replies. `;
  });

  return (
    <>
      <button onClick={() => speechHandler(msg)}>SPEAK</button>
      <button onClick={() => speechStopper()}>STOP</button>
      <form>
        <input
          type="text"
          value={threadInput}
          onChange={(e) => setThreadInput(e.target.value)}
        />
        <button
          disabled={!thread || threadInput === thread}
          onClick={() => setThread(threadInput)}
        >
          Select Thread
        </button>
      </form>
      <div>
        {result[1].data.children.map((post, idx) => {
          return (
            <Post
              author={post.data.author}
              flair={
                post.data.author_flair_richtext
                  ? post.data.author_flair_richtext[1]?.t
                  : " "
              }
              time={parseInt(
                now - test[1].data.children[0].data.created_utc,
                10
              )}
              body={post.data.body}
              score={post.data.score}
              replies={post.data.replies?.data?.children?.length || 0}
              key={idx}
            />
          );
        })}
      </div>
    </>
  );
};

export default Posts;
