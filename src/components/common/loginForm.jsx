import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { db, auth } from "../firebase";
import { useStateValue } from "./stateProvider";
import "../../css/loginForm.css";

function LoginForm() {
  const history = useHistory();
  const [{ favoriteGames, user }, dispatch] = useStateValue();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userGames, setUserGames] = useState("");

  useEffect(() => {
    dispatch({
      // Add item to list...
      type: "SET_LIST",
      item: userGames,
    });
  }, [userGames]);

  const login = (event) => {
    event.preventDefault(); // Stop the refresh
    // Do the logic
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        // logged in, redirect to homepage...
        history.push("/games");
      })
      .catch((e) => alert(e.message));

    // Get user data from database
    db.collection("users")
      .doc(email)
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log(email, "data : ", doc.data());
          setUserGames(doc.data().Games);
          localStorage.setItem(
            `userGames${email}`,
            JSON.stringify(doc.data().Games)
          );

          localStorage.setItem(`user${email}`, email);

          let one = JSON.parse(localStorage.getItem(`userGames${user.email}`));
          console.log("lool", one);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  };
  return (
    <div className="login">
      <h1>Sign in</h1>
      <form action="" className="login__form">
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
        <button onClick={login} type="submit" className="login__signInButton">
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
