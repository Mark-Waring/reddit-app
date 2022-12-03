import React, { useContext } from "react";
import { AppContext } from "../shared/context/AppContext";
import convertTime from "../shared/functions/convertTime";

export default function Replies({ repliesArray }) {
  const { sort } = useContext(AppContext);
  return (
    <>
      {repliesArray
        ?.sort((a, b) => {
          if (sort === "new") {
            return a.time - b.time;
          }
          if (sort === "old") {
            return b.time - a.time;
          }
          return 0;
        })
        ?.map((post) => {
          if (!post.author) {
            return null;
          }
          return (
            <div key={post.id}>
              <div
                className={"replies-container"}
                style={{ paddingLeft: `${post.level * 10}px` }}
              >
                <div
                  className={post.level > 1 ? "replies-border" : ""}
                  style={
                    post.level > 1
                      ? { paddingLeft: "10px" }
                      : { paddingLeft: "0px" }
                  }
                >
                  <div className="replies-author" id="speak">
                    {post.author}
                    <div className="replies-details details-right-align">
                      {convertTime(post.time)}
                    </div>
                  </div>
                  <div className="replies-details">{post.flair}</div>
                  <div className="replies-details">
                    {`↑ ${post.score}`}
                    <div
                      style={{ display: "none" }}
                    >{`Score ${post.score}`}</div>
                  </div>
                  <span className="replies-span"></span>
                  <div className="replies-body" id="speak">
                    {post.body}
                  </div>
                </div>
                <hr />
              </div>

              <div>
                <Replies repliesArray={post?.getNestedReplies} />
              </div>
            </div>
          );
        })}
    </>
  );
}
