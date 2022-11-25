export default function OriginalPost({
  title,
  author,
  time,
  body,
  score,
  replyNumber,
  subreddit,
}) {
  return (
    <div className="original-post">
      <h3>
        <span className="op-header-items">{title}</span>{" "}
        <span className="op-header-items">
          {replyNumber === 1 ? " 1 comment" : ` ${replyNumber} comments`}
        </span>
      </h3>
      <div>{body}</div>
      <div>
        in {subreddit} by {author}
      </div>
      <div>
        {score > 0 && "+"}
        {score} {time}
      </div>
      <hr />
    </div>
  );
}
