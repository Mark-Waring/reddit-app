import React from "react";

export default function Replies({ repliesArray }) {
  return (
    <>
      {repliesArray?.map((post) => {
        if (!post.author) {
          return null;
        }
        return (
          <>
            <div>
              {post.author} {post.flair && "- "} {post.flair} - {post.time}
            </div>
            <div>{post.body}</div>
            <div>
              {post.score > 0 && "+"}
              {post.score}
            </div>
            <div>
              {post.replyNumber === 1
                ? " 1 reply"
                : ` ${post.replyNumber ?? 0} replies`}
            </div>
            {<Replies repliesArray={post?.getReplies} />}
          </>
        );
      })}
    </>
  );
}
