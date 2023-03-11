import React, { useContext } from "react";
import FavoriteGame from "./common/favoriteGame";
import "../css/favoriteForm.css";
import StoreContext from "../store/store-context";

const FavoriteForm = () => {
  const storeCtx = useContext(StoreContext);
  const favoriteGames = storeCtx.favoriteGames;

  return (
    <div className="favorite__page">
      <h1>Favorite Games</h1>
      {favoriteGames ? (
        <div>
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
                  key={item.id}
                  id={item.id}
                  title={item.name}
                  cover={item.cover.url}
                  company={
                    item.involved_companies ? item.involved_companies[0].company
                      .name : "N/A"
                  }
                  date={item.release_dates[0].human}
                  genres={item.genres}
                  popularity={item.rating}
                  game={item}
                  allGames={favoriteGames}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div class="spinner-border text-danger center_spinner" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      )}
    </div>
  );
};

export default FavoriteForm;
