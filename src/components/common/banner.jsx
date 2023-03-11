import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import ModalVideo from "react-modal-video";
import StoreContext from "../../store/store-context";
import { searchVideo } from "../../utils/services.js";
import { getUserGames } from "../../utils/utils";
import { keyframes } from "styled-components";
import "../../css/banner.css";
import "react-modal-video/css/modal-video.min.css";

const Banner = ({ data }) => {
  const user = localStorage.getItem(`user`);

  const history = useHistory();
  const [videoId, setVideoId] = useState("");
  const [isTrailerOpen, setTrailerOpen] = useState(false);
  const [toggle, setToggle] = useState(false);

  const storeCtx = useContext(StoreContext);
  const favoriteGames = storeCtx.favoriteGames;

  useEffect(() => {
    async function fetchData() {
      const userGames = await getUserGames(user);
      renderFavButtonText(userGames);
    }
    fetchData();
  }, []);

  const handleFavButton = async () => {
    if (user) {
      if (!toggle) {
        // Add to fav
        const addGame = await storeCtx.addFavGame(user, favoriteGames, data);
        addGame ? setToggle(true) : alert("Add game to favourite fails!");
      } else {
        // Remove from fav
        const removeGame = await storeCtx.deleteFavGame(
          user,
          favoriteGames,
          data
        );
        removeGame
          ? setToggle(false)
          : alert("Remove game from favourite fails!");
      }
    } else {
      return history.push("/login");
    }
  };

  const renderFavButtonText = (userGames) => {
    const ids = [];
    userGames ? userGames.map((game) => ids.push(game.id)) : setToggle(false);
    const findID = ids.find((element) => element === data.id);
    findID ? setToggle(true) : setToggle(false);
  };

  const bannerImage = () => {
    let backgroundList = [];
    if (!data?.artworks && !data?.screenshots) {
      return backgroundList;
    }
    const choice = data?.artworks ? data?.artworks : data?.screenshots;

    const images = () => {
      choice.map((image) => {
        const background = `url(https://${image.url})`.replace(
          "thumb",
          "1080p"
        );
        backgroundList.push(background);
        return backgroundList;
      });
    };
    images();

    return backgroundList;
  };

  const banner_text = () => {
    let string = "";
    let index = 0;
    let pourcentage = 0;
    const amount = 100 / bannerImage().length;

    const banner_list = () => {
      bannerImage().map((image) => {
        string = string.concat(`${pourcentage}%{
    background-image: ${bannerImage()[index]} ;
  }`);
        index++;
        pourcentage = pourcentage + amount;

        return string;
      });
    };
    banner_list();
    return string;
  };

  const banner_transition = keyframes`
 ${banner_text()}
  `;

  const bannerStyle = {
    backgroundSize: "cover",
    backgroundImage: bannerImage(),
    backgroundPosition: "center center",
    animation: `${banner_transition} ${
      bannerImage().length * 3
    }s infinite ease-in-out  0s`,
    //transition: `${banner_transition} 8s infinite ease-in-out  0s`,
  };

  const handleWebsite = () => {
    let website = data.websites
      ? data.websites[0].url
      : `https://www.youtube.com/results?search_query=${data.name}`;

    return website;
  };

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <React.Fragment>
      <header className="banner" style={bannerStyle}>
        <div className="banner-contents">
          <h1 className="banner-title">{data.name}</h1>
          <a
            className="banner-button"
            href={handleWebsite()}
            target="_blank"
            rel="noopener noreferrer"
          >
            Website
          </a>

          {!toggle ? (
            <button
              className="banner-button"
              onClick={handleFavButton}
              rel="noopener noreferrer"
            >
              Add to Favorite
            </button>
          ) : (
            <button
              className="banner-button"
              onClick={handleFavButton}
              rel="noopener noreferrer"
            >
              Remove From Favorite
            </button>
          )}

          <button
            className="banner-button"
            onClick={async () => {
              const videoTrailer = await searchVideo(data.name);
              setVideoId(videoTrailer);
              setTrailerOpen(true);
            }}
            rel="noopener noreferrer"
          >
            Watch Trailer
          </button>

          <h1 className="banner-summary">{truncate(data.summary, 250)}</h1>
        </div>

        <div className="banner--fadeBottom" />
      </header>
      {videoId && (
        <div>
          <ModalVideo
            channel="youtube"
            autoplay
            isOpen={isTrailerOpen}
            videoId={videoId}
            onClose={() => setTrailerOpen(false)}
          />
        </div>
      )}
    </React.Fragment>
  );
};

export default Banner;
