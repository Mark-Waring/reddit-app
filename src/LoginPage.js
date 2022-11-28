import { AppContext } from "./AppContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const { setIsLoggedIn } = useContext(AppContext);
  const navigate = useNavigate();

  function handleLoginClick() {
    setIsLoggedIn(true);
    navigate("/");
  }

  return (
    <form className="login-form" action="action_page.php" method="post">
      <div className="login-container">
        <label className="login-label" htmlFor="uname">
          <b>Username</b>
        </label>
        <input type="text" placeholder="Enter Username" name="uname" required />

        <label className="login-label" htmlFor="psw">
          <b>Password</b>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          name="psw"
          required
        />
        <button
          onClick={handleLoginClick}
          className="login-submit"
          type="submit"
        >
          Login
        </button>
      </div>
    </form>
  );
}
