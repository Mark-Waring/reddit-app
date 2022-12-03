import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../shared/context/AppContext";
import { auth } from "../firebase.config";
import { signOut } from "firebase/auth";

export default function NavBar() {
  const { setUser } = useContext(AppContext);

  async function logOut() {
    try {
      await signOut(auth);
      setUser(null);
      // ...
    } catch (error) {
      console.error("Unable to sign out");
    }
    window.speechSynthesis.cancel();
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
