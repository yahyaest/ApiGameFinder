import React, { useContext } from "react";
import StoreContext from "../../store/store-context";
import "../../css/favoriteGame.css";

const FavoriteGame = ({
  id,
  title,
  cover,
  company,
  date,
  popularity,
  genres,
  game,
  allGames,
}) => {
  const user = localStorage.getItem(`user`);
  const storeCtx = useContext(StoreContext);

  const removeFromFavoriteGames = () => {
    storeCtx.deleteFavGame(user, allGames, game);
  };

  return (
    <React.Fragment>
      {user && (
        <div className="favorite__game">
          <img src={cover} alt="" className="favorite__cover" />
          <div className="favorite__info">
            <h3 className="favorite__title">{title}</h3>
            <h6 className="favorite__company">
              <span>Company :</span> {company}
            </h6>
            <h6 className="favorite__genres">
              <span>Genres :</span>{" "}
              {genres.map((genre) => genre.name).join(", ")}
            </h6>
            <h6 className="favorite__releaseDate">
              <span>Release Date : </span>
              {date}
            </h6>
            {popularity && (
              <h6 className="favorite__popularity">
                <span>Popularity :</span> {popularity}
              </h6>
            )}
            <button
              className="favorite__button"
              onClick={removeFromFavoriteGames}
            >
              Remove from List
            </button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default FavoriteGame;
