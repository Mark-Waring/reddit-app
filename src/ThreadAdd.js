import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "./AppContext";
import SavedThreads from "./SavedThreads";
import getThread, { getHeader } from "./getThread";
import convertTime from "./convertTime";

export default function ThreadAdd() {
  const [url, setUrl] = useState(null);
  const [postData, setPostData] = useState(null);
  const [replyBase, setReplyBase] = useState(null);
  const [queryCompleted, setQueryCompleted] = useState(false);
  const [headerImage, setHeaderImage] = useState(null);
  const { sort, setSort } = useContext(AppContext);
  const now = Math.round(Date.now() / 1000);
  const { savedThreads, setSavedThreads } = useContext(AppContext);
  const [threadInput, setThreadInput] = useState("");
  const { error } = useQuery([("getThread", url)], () => getThread(url, sort), {
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
        time: Math.floor((now - baseData?.created_utc) / 60),
        subreddit: baseData?.subreddit_name_prefixed,
        body: baseData?.selftext,
        bodyHtml: baseData?.selftext_html,
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
        time: Math.floor((now - baseData?.created_utc) / 60),
        body: baseData.body,
        bodyHtml: baseData.body_html,
        score: baseData.score,
        replyNumber: baseData.replies?.data?.children?.length,
        id: baseData.id,
        level: baseData.depth + 1,
        toRead: `${baseData.author}, ${convertTime(baseData.time)}, ${
          baseData.body
        }, ${baseData.score > 0 ? "+" : ""}${baseData.score}, ${
          baseData.replies?.data?.children?.length ?? "No"
        } repl${
          baseData.replies?.data?.children?.length !== 1 ? "ies" : "y"
        }, `,
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
        console.log("query running");
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
        bodyHtml: postData.bodyHtml,
        score: postData.score,
        subreddit: postData.subreddit,
        header: headerImage,
        replyNumber: postData.replyNumber ?? "0",
        repliesArray: getReplyData(replyBase),
        progress: 0,
      },
      ...savedThreads,
    ]);
    setPostData(null);
    // eslint-disable-next-line
  }, [queryCompleted]);

  const sortOptions = [
    { val: "confidence", display: "Best" },
    { val: "top", display: "Top" },
    { val: "new", display: "New" },
    { val: "controversial", display: "Controversial" },
    { val: "old", display: "Old" },
    { val: "qa", display: "Q&A" },
  ];

  return (
    <>
      <h1>Read It</h1>
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
      <div className="sort-container">
        <label htmlFor="sort">Sort by: </label>
        <select
          id="sort"
          name="sort"
          style={{ width: "40%", textAlign: "center" }}
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
          }}
        >
          {sortOptions.map((val) => (
            <option key={val.val} value={val.val}>
              {val.display}
            </option>
          ))}
        </select>
      </div>
      {(error || headerError) && <h2>Something went wrong.</h2>}
      <div className="saved-container">
        <SavedThreads />
      </div>
    </>
  );
}
