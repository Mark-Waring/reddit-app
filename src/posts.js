import { useContext } from "react";
import Post from "./Post";
import Replies from "./Replies";
import { AppContext } from "./AppContext";
import useSWRImmutable from "swr/immutable";

const Posts = () => {
  const { searchUrl } = useContext(AppContext);
  const { savedThreads, setSavedThreads } = useContext(AppContext);

  const url = `${searchUrl}.json`;
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const msg = new SpeechSynthesisUtterance();
  const now = Math.round(Date.now() / 1000);

  const speechHandler = (msg) => {
    msg.text = "totalToRead";
    window.speechSynthesis.speak(msg);
  };

  const speechStopper = () => {
    window.speechSynthesis.cancel();
  };

  // if (error) return <h1>Something went wrong!</h1>;
  // if (!result) return <h1>Loading...</h1>;

  // const postBase = result[0].data.children[0].data;
  // const replyBase = result[1]?.data?.children;

  // const postData = {
  //   author: postBase.author,
  //   flair:
  //     postBase.author_flair_richtext && postBase.author_flair_richtext[1]?.t,
  //   time: postBase.created_utc,
  //   body: postBase.selftext,
  //   score: postBase.score,
  //   replyNumber: postBase.replies?.data?.children?.length,
  // };

  // function postReplies(base) {
  //   return base?.map((post) => {
  //     const details = {
  //       author: post.data.author,
  //       flair:
  //         post.data.author_flair_richtext &&
  //         post.data.author_flair_richtext[1]?.t,
  //       time: post.data.created_utc,
  //       body: post.data.body,
  //       score: post.data.score,
  //       replyNumber: post.data.replies?.data?.children?.length,
  //       replies: post.data?.replies?.data?.children,
  //       getReplies: postReplies(post.data?.replies?.data?.children),
  //     };
  //     return details;
  //   });
  // }

  // const threadToSave = {
  //   title: postData.title,
  //   author: postData.author,
  //   flair: postData.flair,
  //   time: `${Math.floor((now - postData.time) / 60)} minutes ago`,
  //   body: postData.body,
  //   score: postData.score,
  //   replyNumber: postData.replyNumber ? postData.replyNumber : "0",
  //   replies: postData.getReplies,
  // };

  // setSavedThreads([...{ threadToSave }, savedThreads]);

  // const postToRead = `${postData?.author}, ${
  //   postData.flair ?? ""
  // }, ${Math.floor((now - postData?.time) / 60)} minutes ago. ${
  //   postData?.body
  // }, Score: ${postData.score}, ${postData.replyNumber ?? 0} replies. `;

  // const repliesToRead = postReplies(replyBase)
  //   .flatMap((element) => element)
  //   .flat(postReplies(replyBase).length)
  //   .map((post) => {
  //     if (!post) {
  //       return "";
  //     }
  //     return `${post.author}, ${post.flair ?? ""}, ${Math.floor(
  //       (now - post.time) / 60
  //     )} minutes ago. ${post.body}, Score: ${post.score}, ${
  //       post.replyNumber ?? 0
  //     } replies. `;
  //   });

  // // console.log(repliesToRead);
  // console.log(postReplies(replyBase));

  // const totalToRead = `${postToRead}. ${repliesToRead}`;

  return (
    <>
      <button onClick={() => speechHandler(msg)}>SPEAK</button>
      <button onClick={() => speechStopper()}>STOP</button>
      {/* <div>
        <Post
          posts={postData}
          author={postData.author}
          flair={postData.flair}
          time={`${Math.floor((now - postData.time) / 60)} minutes ago`}
          body={postData.body}
          score={postData.score}
          replyNumber={postData.replyNumber ? postData.replyNumber : "0"}
          replies={postData.getReplies}
        />
        <Replies repliesArray={postReplies(replyBase)} />
      </div> */}
    </>
  );
};

export default Posts;
