import React, { useContext, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { auth } from "../../utils/firebase";
import "../../css/loginForm.css";
import StoreContext from "../../store/store-context";

function LoginForm() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const storeCtx = useContext(StoreContext);

const user = localStorage.getItem(`user`, email);
  if (user) {
    // history.push("/");
  }

  const login = async (event) => {
    event.preventDefault(); // Stop the refresh
    // Do the logic
    try {
      await auth.signInWithEmailAndPassword(email, password);
      localStorage.setItem(`user`, email);
      storeCtx.userLogin(email)
      history.push("/games");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login">
      <h1>Sign in</h1>
      <form onSubmit={login} action="" className="login__form">
        <label htmlFor="E-mail">E-mail :</label>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <label htmlFor="">Password :</label>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit" className="login__signInButton">
          Sign In
        </button>
        <p>
          If you don't have an account click the register button to create a new
          account.
        </p>
        <Link className="register__button" to="/register">
          Register
        </Link>
      </form>
    </div>
  );
}

export default LoginForm;
