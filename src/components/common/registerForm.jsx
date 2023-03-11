import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { db, auth } from "../../utils/firebase";
import "../../css/registerForm.css";

function RegisterForm() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async (event) => {
    // Stop the refresh
    event.preventDefault();
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      // Add to database
      db.collection("users").doc(email).set({
        email,
        games: [],
        reserveIgbdToken: ""
      });
      localStorage.setItem(`user`, email);
      history.push("/games");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="register">
      <h1>Create New Account</h1>
      <form action="" className="register__form">
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
        <button
          onClick={register}
          type="submit"
          className="register__signInButton"
        >
          Create Account
        </button>
        <p>
          If you have an account click the login button to access to your
          account.
        </p>
        <Link className="register__button" to="/login">
          login
        </Link>
      </form>
    </div>
  );
}

export default RegisterForm;
