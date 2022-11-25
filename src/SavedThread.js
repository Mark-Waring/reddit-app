import { NavLink } from "react-router-dom";
import convertTime from "./convertTime";

export default function SavedThread({ thread }) {
  return (
    <>
      <div className="saved-thread">
        <div className="saved-left-align">
          <NavLink to={thread.id}>{thread.title}</NavLink>
          <div>{thread.subreddit}</div>
          <div className="saved-details">
            {`u/${thread.author}`} {convertTime(thread.time)}
          </div>
        </div>
        <NavLink to={thread.id}>
          <img src={thread.header} alt={`${thread.subreddit} Community Icon`} />
        </NavLink>
      </div>
      <hr />
    </>
  );
}
