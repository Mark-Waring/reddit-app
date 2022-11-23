import React from "react";

export default function Replies({ repliesArray }) {
  return (
    <>
      {repliesArray
        ?.sort((a, b) => {
          return b.score - a.score;
        })
        ?.map((post) => {
          if (!post.author) {
            return null;
          }
          return (
            <>
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
                  <div className="replies-author">
                    {post.author}
                    <div className="replies-details">{post.flair}</div>
                  </div>
                  <div className="replies-details">{`↑ ${post.score}`}</div>
                  <div className="replies-body">{post.body}</div>
                </div>
                <hr />
              </div>

              <div>
                <Replies repliesArray={post?.getNestedReplies} />
              </div>
            </>
          );
        })}
    </>
  );
}
