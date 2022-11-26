export default function AudioBox(thread) {
  return (
    <div className="audio-container">
      ▶{/* {!isPlaying && "⏸"} */}
      <div className="progress-bar" style={{ display: "flex" }}>
        <div
          className="progress"
          style={{ backgroundColor: "black", width: `${thread.progress} %` }}
        ></div>
      </div>
    </div>
  );
}
