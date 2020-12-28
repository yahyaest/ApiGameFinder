import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { db, auth } from "../firebase";
import "../../css/registerForm.css";

function RegisterForm() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = (event) => {
    event.preventDefault(); // Stop the refresh
    // Do the logic
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        // create a user and logged in, redirect to homepage...
        history.push("/games");
      })
      .catch((e) => alert(e.message));

    // Add to database
    db.collection("users").doc(email).set({
      Email: email,
      Password: password,
    });
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
