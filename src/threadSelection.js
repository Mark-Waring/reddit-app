import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState, useEffect, useRef } from "react";
import { AppContext } from "./AppContext";
import SavedThreads from "./SavedThreads";
import getThread from "./getThread";

const ThreadSelection = () => {
  const [url, setUrl] = useState(null);
  const [postData, setPostData] = useState(null);
  const [replyBase, setReplyBase] = useState(null);
  const now = Math.round(Date.now() / 1000);
  const { savedThreads, setSavedThreads } = useContext(AppContext);
  const [threadInput, setThreadInput] = useState("");
  const { error } = useQuery(["getGifs", url], () => getThread(url), {
    onSuccess: (data) => {
      setPostData({
        author: data[0]?.data?.children[0].data?.author,
        title: data[0]?.data?.children[0].data?.title,
        id: data[0]?.data?.children[0].data?.id,
        flair:
          data[0]?.data?.children[0].data?.author_flair_richtext &&
          data[0]?.data?.children[0].data?.author_flair_richtext[1]?.t,
        time: data[0]?.data?.children[0].data?.created_utc,
        body: data[0]?.data?.children[0].data?.selftext,
        score: data[0]?.data?.children[0].data?.score,
        replyNumber: data[0]?.data?.children[0].data?.num_comments,
      });
      setReplyBase(data[1]?.data?.children);
    },
    enabled: !!url,
  });

  useEffect(() => {
    if (!postData) {
      return;
    }
    setSavedThreads([...savedThreads, { ...threadToSave }]);
    setPostData(null);
  }, [postData]);

  console.log(savedThreads);

  function replyData(base) {
    return base?.map((post) => {
      const details = {
        author: post?.data.author,
        flair:
          post?.data.author_flair_richtext &&
          post?.data.author_flair_richtext[1]?.t,
        time: post?.data.created_utc,
        body: post?.data.body,
        score: post?.data.score,
        replyNumber: post?.data.replies?.data?.children?.length,
        getReplies: replyData(post?.data?.replies?.data?.children),
      };
      return details;
    });
  }

  //   const replies = replyBase.map((post) => {
  //     return {
  //       author: post?.data.author,
  //       flair:
  //         post?.data.author_flair_richtext &&
  //         post?.data.author_flair_richtext[1]?.t,
  //       time: post?.data.created_utc,
  //       body: post?.data.body,
  //       score: post?.data.score,
  //       replyNumber: post?.data.replies?.data?.children?.length,
  //       replies: post?.data?.replies?.data?.children,
  //       getReplies: replyData(post?.data?.replies?.data?.children),
  //     };
  //   });

  const threadToSave = postData && {
    title: postData.title,
    id: postData.id,
    author: postData.author,
    flair: postData.flair,
    time: `${Math.floor((now - postData.time) / 60)} minutes ago`,
    body: postData.body,
    score: postData.score,
    replyNumber: postData.replyNumber ? postData?.replyNumber : "0",
    repliesArray: replyData(replyBase),
  };

  console.log(threadToSave);

  return (
    <>
      <form>
        <input
          type="text"
          value={threadInput}
          onChange={(e) => setThreadInput(e.target.value)}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            setUrl(threadInput);
          }}
        >
          Select Thread
        </button>
      </form>
      {error && <h2>Something went wrong.</h2>}
      {!error && <SavedThreads />}
    </>
  );
};

export default ThreadSelection;
