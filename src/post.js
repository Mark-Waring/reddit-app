import React from "react";

const Post = ({ author, flair, time, body, score, replies }) => {
  return (
    <>
      <div>
        {author} - {flair} {+" "}
        {Math.floor(time / (60 * 60))} hours ago.
      </div>
      <div>{body}</div>
      <div>
        {score > 0 && "+"}
        {score}
      </div>
      <div>
        {replies > 0 && replies}
        {replies === 1 && " reply"}
        {replies > 1 && " replies"}
      </div>
    </>
  );
};

export default Post;
