import "./index.css";
import ThreadAdd from "./ThreadAdd";
import Thread from "./Thread";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { auth } from "./firebase.config";
import GlobalAudioPlayer from "./GlobalAudioPlayer.js";
import { useContext, useEffect } from "react";
import { AppContext } from "./AppContext";
import LoginPage from "./LoginPage";

function App() {
  const {
    audioIsPlaying,
    currentAudio,
    progress,
    prevProgress,
    user,
    setUser,
  } = useContext(AppContext);

  auth.onAuthStateChanged((activeUser) => setUser(activeUser));

  useEffect(() => {
    if (!currentAudio) return;
    currentAudio.progress = prevProgress.current + progress;
    // eslint-disable-next-line
  }, [progress]);

  return (
    <Router>
      <div className="route-wrapper">
        <Routes>
          <Route
            exact
            path="/"
            element={user ? <ThreadAdd /> : <LoginPage />}
          />
          <Route path=":threadId" element={user ? <Thread /> : <LoginPage />} />
        </Routes>
        {audioIsPlaying && <GlobalAudioPlayer />}
      </div>
    </Router>
  );
}

export default App;
