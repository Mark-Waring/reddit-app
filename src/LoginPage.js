import { auth } from "./firebase.config";
import {
  GoogleAuthProvider,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { AppContext } from "./AppContext";
import { useContext } from "react";

const provider = new GoogleAuthProvider();

const LoginPage = () => {
  const { setUser } = useContext(AppContext);
  async function signIn() {
    setPersistence(auth, browserLocalPersistence);
    try {
      const result = await signInWithPopup(auth, provider);
      const username = result.user;
      setUser(username);
      // ...
    } catch (error) {
      console.error("Something went wrong.");
    }
  }
  return (
    <div className="login-wrapper">
      <h2 className="login-header">Log in to continue</h2>
      <button className="login-button" onClick={signIn}>
        Sign In!
      </button>
    </div>
  );
};

export default LoginPage;
