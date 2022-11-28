import "./index.css";
import ThreadAdd from "./ThreadAdd";
import Thread from "./Thread";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import GlobalAudioPlayer from "./GlobalAudioPlayer.js";
import { useContext, useEffect } from "react";
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
        <Routes>
          <Route exact path="/" element={<ThreadAdd />} />
          <Route path=":threadId" element={<Thread />} />
        </Routes>
        {audioIsPlaying && <GlobalAudioPlayer />}
      </div>
    </Router>
  );
}

export default App;
