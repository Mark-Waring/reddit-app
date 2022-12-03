import "./index.css";
import ThreadAdd from "./components/ThreadAdd";
import Thread from "./components/Thread";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { auth } from "./firebase.config";
import GlobalAudioPlayer from "./components/GlobalAudioPlayer";
import { useContext, useEffect } from "react";
import { AppContext } from "./shared/context/AppContext";
import LoginPage from "./components/LoginPage";
import { getDatabase, ref, child, get } from "firebase/database";
import NavBar from "./components/Navbar";

function App() {
  const dbRef = ref(getDatabase());
  const { audioIsPlaying, user, setUser, setSavedThreads } =
    useContext(AppContext);

  auth.onAuthStateChanged((activeUser) => setUser(activeUser));

  useEffect(() => {
    if (!user) return;
    get(child(dbRef, `api/${user.uid}/saved-threads/`))
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
            path="/login"
            element={!user ? <LoginPage /> : <Navigate to="/threads" />}
          />
          <Route
            exact
            path="/threads"
            element={user ? <ThreadAdd /> : <LoginPage />}
          />
          <Route
            path="/threads/:threadId"
            element={user ? <Thread /> : <LoginPage />}
          />
          <Route path="*" element={<Navigate to="/threads" />} />
        </Routes>
        {audioIsPlaying && <GlobalAudioPlayer />}
      </div>
    </Router>
  );
}

export default App;
