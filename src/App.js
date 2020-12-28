import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useStateValue } from "./components/common/stateProvider";
import { db, auth } from "./components/firebase";
import Table from "./components/table";
import GameForm from "./components/gameForm";
import SearchForm from "./components/searchForm";
import Navbar from "./components/common/navbar";
import FavoriteForm from "./components/favoriteForm";
import LoginForm from "./components/common/loginForm";
import RegisterForm from "./components/common/registerForm";
import "./App.css";

function App() {
  const [{ favoriteGames, user, prevUser }, dispatch] = useStateValue();
  const currentUser = localStorage.getItem(`user${user?.email}`);

  // Set user at login/logout
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user is logged in ...

        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        localStorage.removeItem(`userGames${user?.email}`);

        localStorage.removeItem(`user${user?.email}`);
        // user is logged out ..
        dispatch({
          type: "SET_PREVUSER",
          user: user,
        });
        dispatch({
          type: "SET_USER",
          user: null,
        });
        dispatch({
          type: "SET_LIST",
          item: [],
        });
      }
    });

    return () => {
      // Any cleanup operation go in here...
      unsubscribe();
    };
  }, [user]);

  // Refresh favNumber at evry favoriteGames change from multiple device at the same time
  useEffect(() => {
    db.collection("users").onSnapshot((snapshot) => {
      // console.log(
      //   "current user is : ",
      //   currentUser,
      //   "and previous usuer is : ",
      //   prevUser?.email
      // );
      //console.log(snapshot.docs.map((doc) => doc.data()));
      if (user && user.email === currentUser) {
        console.log("users ------>", user?.email);
        console.log(user.email, "  has logged in");
        snapshot.docs.map((doc) => {
          if (doc.data().Email === user?.email) {
            //console.log(doc.data());
            localStorage.setItem(
              `userGames${currentUser}`,
              JSON.stringify(doc.data().Games)
            );

            dispatch({
              type: "SET_LIST",
              item: doc.data().Games,
            });
          }
        });
      }
    });
  }, [user, currentUser]);

  // let localData = [];

  // if (user) {
  //   db.collection("users")
  //     .doc(user.email)
  //     .get()
  //     .then((doc) => {
  //       if (doc.exists) {
  //         localStorage.setItem(
  //           `userGames${user.email}`,
  //           JSON.stringify(doc.data().Games)
  //         );
  //       } else {
  //         // doc.data() will be undefined in this case
  //         console.log("No such document!");
  //       }
  //     })
  //     .catch((error) => {
  //       console.log("Error getting document:", error);
  //     });
  //   localData = JSON.parse(localStorage.getItem(`userGames${user.email}`));
  // }

  useEffect(() => {
    // Edit database
    if (user !== null) {
      db.collection("users").doc(user.email).set(
        {
          Games: favoriteGames,
        },
        { merge: true }
      );
    }
  }, [favoriteGames]);

  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/games/:id" component={GameForm}></Route>
        <Route path="/search/:query?" component={SearchForm} />

        <Route path="/games" component={Table} />
        <Route path="/search" component={SearchForm} />
        <Route path="/favorites" component={FavoriteForm} />
        <Route path="/login" component={LoginForm} />
        <Route path="/register" component={RegisterForm} />

        <Redirect from="/" exact to="/login" />
      </Switch>
    </div>
  );
}

export default App;
