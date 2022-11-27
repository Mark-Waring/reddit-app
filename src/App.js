import "./index.css";
import ThreadAdd from "./ThreadAdd";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListenPage from "./ListenPage";
import ListenTool from "./ListenTool.js";
import { useContext, useRef, useEffect } from "react";
import { AppContext } from "./AppContext";

function App() {
  const { audioIsPlaying, currentAudio, progress, prevProgress } =
    useContext(AppContext);

  useEffect(() => {
    if (!currentAudio) return;
    currentAudio.progress = prevProgress.current + progress;
    // eslint-disable-next-line
  }, [progress]);

  return (
    <Router>
      <div className="route-wrapper">
        <h1>Read It</h1>
        <Routes>
          <Route exact path="/" element={<ThreadAdd />} />
          <Route path=":threadId" element={<ListenPage />} />
        </Routes>
        {audioIsPlaying && <ListenTool />}
      </div>
    </Router>
  );
}

export default App;
