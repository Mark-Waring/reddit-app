export default function AudioBox(thread) {
  return (
    <div className="audio-container">
      <div className="saved-thread-play">▶{/* {!isPlaying && "⏸"} */}</div>
      <div className="progress-bar" style={{ display: "flex" }}>
        <div
          className="progress"
          style={{
            width: `${thread.progress || 0}%`,
          }}
        ></div>
      </div>
    </div>
  );
}
