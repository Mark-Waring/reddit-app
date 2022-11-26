import { NavLink } from "react-router-dom";
import AudioBox from "./AudioBox";
import convertTime from "./convertTime";

export default function SavedThread({ thread }) {
  return (
    <>
      <div className="saved-thread">
        <div className="saved-left-align">
          <NavLink to={thread.id}>{thread.title}</NavLink>
          <div class="saved-details">
            <div class="saved-details-left">
              <div>{thread.subreddit}</div>
              <div className="saved-bottom">
                <div className="saved-author">{`u/${thread.author}`}</div>
                <div className="saved-time">{convertTime(thread.time)}</div>
              </div>
            </div>
            <AudioBox />
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
