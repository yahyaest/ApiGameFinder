import React, { useState, useEffect } from "react";
import "../../css/banner.css";
import { keyframes } from "styled-components";
import { useStateValue } from "./stateProvider";
import { useHistory } from "react-router-dom";
import {db} from "../firebase"

const Banner = ({ data }) => {
  const history = useHistory();
  const [{ favoriteGames, user }, dispatch] = useStateValue();

  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    renderFavButtonText();
  });

  const addToFavorite = () => {
    if (user) {
      if (!toggle) {
        dispatch({
          // Add item to list...
          type: "ADD_TO_LIST",
          item: {
            id: data.id,
            title: data.name,
            cover: `https://${data?.cover.url}`.replace("thumb", "720p"),
            company: data.involved_companies[0].company.name,
            date: data.release_dates[0].human,
            popularity: data.popularity,
          },
          user: user.email,
        });

      } else {
        dispatch({
          // Remove item from favoriteGames...

          type: "REMOVE_FROM_LIST",
          id: data.id,
          user: user.email,
        });

      }
    } else {
      return history.push("/login");
    }
    //localStorage.setItem(`userGames`, JSON.stringify(favoriteGames));
  };

  const renderFavButtonText = () => {
    const ids = [];
    favoriteGames
      ? favoriteGames.map((game) => ids.push(game.id))
      : setToggle(false);
    //console.log("ids", ids);
    const findID = ids.find((element) => element === data.id);
    findID ? setToggle(true) : setToggle(false);
    //console.log(toggle)
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
    //console.log(backgroundList.length);

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
    //console.log(string);
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
              onClick={addToFavorite}
              rel="noopener noreferrer"
            >
              Add to Favorite
            </button>
          ) : (
            <button
              className="banner-button"
              onClick={addToFavorite}
              rel="noopener noreferrer"
            >
              Remove From Favorite
            </button>
          )}

          <h1 className="banner-summary">{truncate(data.summary, 250)}</h1>
        </div>

        <div className="banner--fadeBottom" />
      </header>
    </React.Fragment>
  );
};

export default Banner;
