import { NavLink } from "react-router-dom";

export default function SavedThread({ thread }) {
  return (
    <>
      <div className="saved-thread">
        <div className="saved-left-align">
          <NavLink to={thread.id}>{thread.title}</NavLink>
          <div>{thread.subreddit}</div>
        </div>
        <img
          src={thread.header}
          alt={`${thread.subreddit} Community Icon`}
        ></img>
      </div>
      <hr />
    </>
  );
}
