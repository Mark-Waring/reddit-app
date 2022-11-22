import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "./AppContext";
import SavedThreads from "./SavedThreads";
import getThread from "./getThread";

export default function ThreadAdd() {
  const [url, setUrl] = useState(null);
  const [postData, setPostData] = useState(null);
  const [replyBase, setReplyBase] = useState(null);
  const now = Math.round(Date.now() / 1000);
  const { savedThreads, setSavedThreads } = useContext(AppContext);
  const [threadInput, setThreadInput] = useState("");
  const { error } = useQuery(["getThreads", url], () => getThread(url), {
    onSuccess: (data) => {
      console.log(data);
      const baseData = data[0]?.data?.children[0].data;
      setPostData({
        author: baseData?.author,
        title: baseData?.title,
        id: baseData?.id,
        flair:
          baseData?.author_flair_richtext &&
          baseData?.author_flair_richtext[1]?.t,
        time: baseData?.created_utc,
        body: baseData?.selftext,
        score: baseData?.score,
        level: 0,
        replyNumber: data[0]?.data?.children[0].data?.num_comments,
      });
      setReplyBase(data[1]?.data?.children);
    },
    enabled: !!url,
  });

  useEffect(() => {
    setSavedThreads([{ ...threadToSave }, ...savedThreads]);
    // eslint-disable-next-line
  }, [postData]);

  let level = 0;
  let manualReplyCount = 0;

  function replyData(base) {
    return base?.map((post, idx) => {
      manualReplyCount++;
      const baseData = post?.data;
      level = level + 1;
      const details = {
        comment: manualReplyCount,
        author: baseData.author,
        flair:
          baseData.author_flair_richtext &&
          baseData.author_flair_richtext[1]?.t,
        time: `${Math.floor((now - baseData.created_utc) / 60)} minutes ago`,
        body: baseData.body,
        score: baseData.score,
        replyNumber: baseData.replies?.data?.children?.length,
        id: baseData.body,
        level: level,
        toRead: `${baseData.author}, ${Math.floor(
          (now - baseData.created_utc) / 60
        )} minutes ago, ${baseData.body}, ${baseData.score > 0 ? "+" : ""}${
          baseData.score
        }, ${baseData.replies?.data?.children?.length ?? "No"} repl${
          baseData.replies?.data?.children?.length !== 1 ? "ies" : "y"
        }.`,
        getNestedReplies: baseData?.replies
          ? replyData(baseData?.replies?.data?.children)
          : null,
      };
      if (!post.getNestedReplies) {
        level = level - 1;
      }
      return details;
    });
  }

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
    toRead: `${postData.title}. ${postData.author}, ${Math.floor(
      (now - postData.time) / 60
    )} minutes ago, ${postData.body}. ${postData.score > 0 && "+"}${
      postData.score
    }.  ${postData.replyNumber} comment${postData.replyNumber !== 1 && "s"}.`,
  };

  console.log(threadToSave);
  console.log(`The total number of comments is ${manualReplyCount}`);

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
            setThreadInput("");
          }}
        >
          Add Thread
        </button>
      </form>
      {error && <h2>Something went wrong.</h2>}
      <SavedThreads />
    </>
  );
}
