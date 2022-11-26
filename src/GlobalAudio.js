export default function GlobalAudio(thread) {
  return (
    <div className="global-player-container">
      <div className="global-player">
        <div className="global-audio-details">
          <div className="global-audio-title">
            The thread title will go here
          </div>
          <div className="progress-bar-global" style={{ display: "flex" }}>
            <div
              className="progress"
              style={{
                width: `${thread.progress || 0}%`,
              }}
            ></div>
          </div>
          <div className="audio-control-container">
            <div>{`<<`}</div>
            <div>▶</div>
            <div>{`>>`}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
