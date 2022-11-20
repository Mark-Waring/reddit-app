import React from "react";

const Post = ({ author, flair, time, body, score, replyNumber }) => {
  return (
    <>
      <div>
        {author} {flair && "- "} {flair} - {time}
      </div>
      <div>{body}</div>
      <div>
        {score > 0 && "+"}
        {score}
      </div>
      <div>{replyNumber === 1 ? " 1 reply" : ` ${replyNumber} replies`}</div>
    </>
  );
};

export default Post;
