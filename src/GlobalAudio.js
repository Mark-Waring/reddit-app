export default function GlobalAudio({ thread, global }) {
  return (
    <div
      className="global-player-container"
      style={{ position: `${global === "global" ? "fixed" : ""}` }}
    >
      <div className="global-player">
        <div className="global-audio-details">
          <div className="global-audio-title">{thread?.title}</div>
          <div className="progress-bar-global" style={{ display: "flex" }}>
            <div
              className="progress"
              style={{
                width: `${thread?.progress || 0}%`,
              }}
            ></div>
          </div>
          <div className="audio-control-container">
            <div className="rewind">{`◀◀`}</div>
            <div>▶</div>
            <div className="ffw">{`▶▶`}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
