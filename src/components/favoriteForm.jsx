import React from "react";
import FavoriteGame from "./common/favoriteGame";
import { useStateValue } from "./common/stateProvider";
import "../css/favoriteForm.css"

const FavoriteForm = () => {
  const [{ favoriteGames }] = useStateValue();

  return (
    <div className="favorite__page">
      <h1>Favorite Games</h1>
      {favoriteGames.length === 0 ? (
        <div className="favorite__message">
          <h3>Your Favorite Game List is empty</h3>
          <p>
            You have no game in your list. Click "Add to basket" next to the
            item.
          </p>
        </div>
      ) : (
        <div className="favorite__message">
          <h3>Your Favorite Game List</h3>
          {favoriteGames.map((item) => (
            <FavoriteGame
              id={item.id}
              title={item.title}
              cover={item.cover}
              company={item.company}
              date={item.date}
              popularity={item.popularity}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteForm;
