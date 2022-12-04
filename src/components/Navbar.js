import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../shared/context/AppContext";
import { auth } from "../firebase.config";
import { signOut } from "firebase/auth";
import useHandlePause from "../shared/functions/audio-functions/useHandlePause";

export default function NavBar() {
  const { setUser, setAudioIsPlaying } = useContext(AppContext);
  const [handlePause] = useHandlePause();

  async function logOut() {
    try {
      await signOut(auth);
      setUser(null);
      // ...
    } catch (error) {
      console.error("Unable to sign out");
    }
    handlePause();
    setAudioIsPlaying(false);
  }

  return (
    <nav className="nav-bar">
      <div className="nav-left">
        <Link to="/" className="nav-items">
          Home
        </Link>
      </div>
      <div className="nav-right">
        <Link to="/" onClick={logOut} className="nav-items">
          Sign Out
        </Link>
      </div>
    </nav>
  );
}
