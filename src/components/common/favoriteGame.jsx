import React from "react";
import { useStateValue } from "./stateProvider";

import "../../css/favoriteGame.css";

const FavoriteGame = ({ id, title, cover, company, date, popularity }) => {
  const [{ favoriteGames, user }, dispatch] = useStateValue();

  const removeFromFavoriteGames = () => {
    dispatch({
      // Remove item from favoriteGames...

      type: "REMOVE_FROM_LIST",
      id: id,
      user: user.email,
    });
  };

  return (
    <React.Fragment>
    {user && <div className="favorite__game">
      <img src={cover} alt="" className="favorite__cover" />
      <div className="favorite__info">
        <h3 className="favorite__title">{title}</h3>
        <h6 className="favorite__company">
          <span>Company :</span> {company}
        </h6>
        <h6 className="favorite__releaseDate">
          <span>Release Date : </span>
          {date}
        </h6>
        <h6 className="favorite__popularity">
          <span>Popularity :</span> {popularity}
        </h6>
        <button className="favorite__button" onClick={removeFromFavoriteGames}>
          Remove from List
        </button>
      </div>
      </div>}
    </React.Fragment>
  );
};

export default FavoriteGame;
