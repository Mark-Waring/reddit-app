import "./index.css";
import ThreadAdd from "./ThreadAdd";
import Thread from "./Thread";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { auth } from "./firebase.config";
import GlobalAudioPlayer from "./GlobalAudioPlayer.js";
import { useContext, useEffect } from "react";
import { AppContext } from "./AppContext";
import LoginPage from "./LoginPage";
import { getDatabase, ref, child, get } from "firebase/database";
import NavBar from "./Navbar";

function App() {
  const dbRef = ref(getDatabase());
  const { audioIsPlaying, user, setUser, setSavedThreads } =
    useContext(AppContext);

  auth.onAuthStateChanged((activeUser) => setUser(activeUser));

  useEffect(() => {
    if (!user) return;
    get(child(dbRef, `saved-threads/${user.uid}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setSavedThreads(snapshot.val());
        } else {
          setSavedThreads([]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
    // eslint-disable-next-line
  }, [user?.uid]);

  return (
    <Router>
      <div className="route-wrapper">
        <NavBar />
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
