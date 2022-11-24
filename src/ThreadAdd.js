import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "./AppContext";
import SavedThreads from "./SavedThreads";
import getThread, { getHeader } from "./getThread";

export default function ThreadAdd() {
  const [url, setUrl] = useState(null);
  const [postData, setPostData] = useState(null);
  const [replyBase, setReplyBase] = useState(null);
  const [queryCompleted, setQueryCompleted] = useState(false);
  const [headerImage, setHeaderImage] = useState(null);
  const now = Math.round(Date.now() / 1000);
  const { savedThreads, setSavedThreads } = useContext(AppContext);
  const [threadInput, setThreadInput] = useState("");
  const { error } = useQuery(["getThreads", url], () => getThread(url), {
    onSuccess: (data) => {
      const baseData = data[0]?.data?.children[0].data;
      setPostData({
        author: baseData?.author,
        title: baseData?.title,
        id: baseData?.id,
        flair:
          baseData?.author_flair_richtext &&
          baseData?.author_flair_richtext[1]?.t,
        time: `${Math.floor((now - baseData?.created_utc) / 60)} minutes ago`,
        subreddit: baseData?.subreddit_name_prefixed,
        body: baseData?.selftext,
        score: baseData?.score,
        level: 0,
        replyNumber: data[0]?.data?.children[0].data?.num_comments,
      });
      setReplyBase(data[1]?.data?.children);
    },
    enabled: !!url,
  });

  function getReplyData(base) {
    return base?.map((post) => {
      const baseData = post?.data;
      const details = {
        author: baseData.author,
        flair:
          baseData.author_flair_richtext &&
          baseData.author_flair_richtext[1]?.t,
        time: `${Math.floor((now - baseData.created_utc) / 60)} minutes ago`,
        body: baseData.body,
        score: baseData.score,
        replyNumber: baseData.replies?.data?.children?.length,
        id: baseData.id,
        level: baseData.depth + 1,
        toRead: `${baseData.author}, ${Math.floor(
          (now - baseData.created_utc) / 60
        )} minutes ago, ${baseData.body}, ${baseData.score > 0 ? "+" : ""}${
          baseData.score
        }, ${baseData.replies?.data?.children?.length ?? "No"} repl${
          baseData.replies?.data?.children?.length !== 1 ? "ies" : "y"
        }.`,
        getNestedReplies: baseData?.replies
          ? getReplyData(baseData?.replies?.data?.children)
          : null,
      };
      return details;
    });
  }

  const { headerError } = useQuery(
    ["getHeader", url],
    () => getHeader(postData?.subreddit),
    {
      onSuccess: (data) => {
        setHeaderImage(
          data?.data?.community_icon
            ? data?.data?.community_icon?.split("?")[0]
            : data?.data?.icon_img
        );
        setQueryCompleted(true);
      },
      enabled: !!postData,
    }
  );

  useEffect(() => {
    if (!queryCompleted) {
      return;
    }
    setSavedThreads([
      {
        title: postData.title,
        id: postData.id,
        author: postData.author,
        flair: postData.flair,
        time: postData.time,
        body: postData.body,
        score: postData.score,
        subreddit: postData.subreddit,
        header: headerImage,
        replyNumber: postData.replyNumber ?? "0",
        repliesArray: getReplyData(replyBase),
        toRead: `${postData.title}. ${postData.author}, ${Math.floor(
          (now - postData.time) / 60
        )} minutes ago, ${postData.body}. ${postData.score > 0 && "+"}${
          postData.score
        }.  ${postData.replyNumber} comment${
          postData.replyNumber !== 1 && "s"
        }.`,
      },
      ...savedThreads,
    ]);
    setPostData(null);
    // eslint-disable-next-line
  }, [headerImage]);

  console.log("howmany rerenders");

  return (
    <>
      <form className="add-thread-form">
        <input
          type="text"
          value={threadInput || ""}
          onChange={(e) => setThreadInput(e.target.value)}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            setUrl(threadInput);
            setThreadInput("");
            setQueryCompleted(false);
          }}
        >
          Add Thread
        </button>
      </form>
      {(error || headerError) && <h2>Something went wrong.</h2>}
      <div className="saved-container">
        <SavedThreads />
      </div>
    </>
  );
}
