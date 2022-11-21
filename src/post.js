import React from "react";

export default function Post({
  title,
  author,
  flair,
  time,
  body,
  score,
  replyNumber,
}) {
  return (
    <>
      <h3>{title}</h3>
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
}
