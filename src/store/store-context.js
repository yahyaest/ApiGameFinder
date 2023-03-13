import React, { createContext, useState, useEffect } from "react";
import { db } from "../utils/firebase";
import { refreshToken } from "../utils/services";
import { getUserGames } from "../utils/utils";

const StoreContext = createContext({
  user: null,
  accessTwitchToken: null,
  favoriteGames: [],
  getAccessTwitchToken: function () {},
  userLogin: function () {},
  userLogout: function () {},
  addFavGame: function () {},
  deleteFavGame: function () {},
});

export function StoreContextProvider(props) {
  const [currentUser, setCurrentUser] = useState();
  const [accessTwitchToken, setAccessTwitchToken] = useState();
  const [userFavoriteGames, setUserFavoriteGames] = useState();

  useEffect(() => {
    async function fetchData() {
      await getAccessTwitchTokenHandler();
      const user = localStorage.getItem(`user`);
      if (user) {
        const userGames = await getUserGames(user);
        setUserFavoriteGames(userGames);
      }
    }
    fetchData();
  }, []);

  async function getAccessTwitchTokenHandler() {
    const accessTwitchToken = await refreshToken();
    setAccessTwitchToken(accessTwitchToken);
    // Set reserve token
    const user = localStorage.getItem(`user`);
    if (user) {
      await db.collection("users").doc(user).set(
        {
          reserveIgbdToken: accessTwitchToken,
        },
        { merge: true }
      );
      return accessTwitchToken;
    } else return null;
  }

  async function loginHandler(user) {
    setCurrentUser(user);
    const userGames = await getUserGames(user);
    setUserFavoriteGames(userGames);
  }

  async function logoutHandler() {
    setCurrentUser(null);
    setUserFavoriteGames([]);
  }

  async function addFavGameHandler(user, userGames, game) {
    let games = userGames;

    const ids = [];
    userGames.map((game) => ids.push(game.id));
    const findID = ids.find((element) => element === game.id);

    if (findID) {
      return false;
    }

    try {
      games.push(game);
      await db.collection("users").doc(user).set(
        {
          games,
        },
        { merge: true }
      );
      setUserFavoriteGames(games);
    } catch (error) {
      console.log(error);
      return false;
    }
    return true;
  }

  async function deleteFavGameHandler(user, userGames, game) {
    try {
      const gameId = game.id;
      let games = userGames;
      games = games.filter((e) => e.id !== gameId);
      await db.collection("users").doc(user).set(
        {
          games,
        },
        { merge: true }
      );
      setUserFavoriteGames(games);
    } catch (error) {
      console.log(error);
      return false;
    }
    return true;
  }

  const context = {
    user: currentUser,
    accessTwitchToken,
    favoriteGames: userFavoriteGames,
    getAccessTwitchToken: getAccessTwitchTokenHandler,
    userLogin: loginHandler,
    userLogout: logoutHandler,
    addFavGame: addFavGameHandler,
    deleteFavGame: deleteFavGameHandler,
  };

  return (
    <StoreContext.Provider value={context}>
      {props.children}
    </StoreContext.Provider>
  );
}

export default StoreContext;
