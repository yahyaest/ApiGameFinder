import  React,{ createContext, useState, useEffect } from "react";
import { refreshToken } from "../utils/services";

const StoreContext = createContext({
  user: null,
  accessTwitchToken: null,
  favoriteGames: [],
  getAccessTwitchToken: function(){},

});

export function StoreContextProvider(props) {
  const [currentUser, setCurrentUser] = useState();
  const [accessTwitchToken, setAccessTwitchToken] = useState();
  const [unreadFavoriteGames, setUnreadFavoriteGames] = useState();

  useEffect(() => {
    async function fetchData() {
      await getAccessTwitchTokenHandler();
    }
    fetchData();
  }, []);

  async function getAccessTwitchTokenHandler() {
    const accessTwitchToken = await refreshToken();
    setAccessTwitchToken(accessTwitchToken);
    console.log("accessTwitchToken : ", accessTwitchToken);
    return accessTwitchToken
  }

  const context = {
    user: currentUser,
    accessTwitchToken,
    favoriteGames: unreadFavoriteGames,
    getAccessTwitchToken: getAccessTwitchTokenHandler,
  };

  return (
    <StoreContext.Provider value={context}>
      {props.children}
    </StoreContext.Provider>
  );
}

export default StoreContext
