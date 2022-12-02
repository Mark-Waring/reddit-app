import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "./AppContext";
import SavedThreads from "./SavedThreads";
import getThread, { getHeader } from "./getThread";
import Form from "react-bootstrap/Form";
import { getDatabase, ref, set } from "firebase/database";

export default function ThreadAdd() {
  const db = getDatabase();
  const [url, setUrl] = useState(null);
  const [postData, setPostData] = useState(null);
  const [replyBase, setReplyBase] = useState(null);
  const [queryCompleted, setQueryCompleted] = useState(false);
  const [headerImage, setHeaderImage] = useState(null);
  const { sort, setSort } = useContext(AppContext);
  const now = Math.round(Date.now() / 1000);
  const { savedThreads, setSavedThreads, user } = useContext(AppContext);
  const [threadInput, setThreadInput] = useState("");
  const [isDuplicate, setIsDuplicate] = useState(false);

  const { error } = useQuery([("getThread", url)], () => getThread(url, sort), {
    onSuccess: (data) => {
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
    if (
      savedThreads &&
      savedThreads.find((thread) => thread?.id === postData.id)
    ) {
      setThreadInput("Thread already in library");
      return setIsDuplicate(true);
    }
    setSavedThreads([
      {
        title: postData.title,
        id: postData.id,
        author: postData.author,
        flair: postData.flair || "",
        time: postData.time,
        body: postData.body,
        score: postData.score,
        subreddit: postData.subreddit,
        header: headerImage,
        replyNumber: postData.replyNumber ?? "0",
        repliesArray: JSON.parse(JSON.stringify(getReplyData(replyBase))),
        progress: 0,
      },
      ...savedThreads,
    ]);
    setPostData(null);
    // eslint-disable-next-line
  }, [queryCompleted]);

  useEffect(() => {
    if (!savedThreads) return;
    set(ref(db, `saved-threads/${user.uid}`), savedThreads);
    // eslint-disable-next-line
  }, [savedThreads]);

  const urlConditions = ["reddit.com/r/", "comments"];
  const isUrlValid = new RegExp(urlConditions.join("|")).test(threadInput);

  return (
    <>
      <h1>Read It</h1>
      <form className="add-thread-form">
        <input
          className="add-thread-item add-thread-input"
          type="text"
          value={threadInput || ""}
          onChange={(e) => {
            setThreadInput(e.target.value);
            setIsDuplicate(false);
          }}
          style={{
            color: isDuplicate ? "red" : "black",
          }}
        />
        <button
          disabled={!isUrlValid}
          className="add-thread-item add-thread-button"
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
        <label className="sort-items" htmlFor="sort">
          Sort by:
        </label>
        <Form.Select
          className="sort-items"
          id="sort"
          name="sort"
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
          }}
          aria-label="Default select example"
        >
          <option name="sort" value="confidence">
            Best
          </option>
          <option name="sort" value="top">
            Top
          </option>
          <option name="sort" value="new">
            New
          </option>
          <option name="sort" value="controversial">
            Controversial
          </option>
          <option name="sort" value="old">
            Old
          </option>
          <option name="sort" value="qa">{`Q&A`}</option>
        </Form.Select>
      </div>
      {(error || headerError) && <h2>Something went wrong.</h2>}
      <div className="saved-container">
        <SavedThreads />
      </div>
    </>
  );
}
