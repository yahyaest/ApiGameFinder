import axios from "axios";

export async function refreshToken() {
  const url = `https://id.twitch.tv/oauth2/token?client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}&grant_type=client_credentials`;
  try {
    const refreshToken = await axios.post(url, {});
    const accessToken = refreshToken.data.access_token;
    return accessToken;
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    }
  }
}

export async function gameData(token) {
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const url = "https://api.igdb.com/v4/games/";

  const headers = {
    headers: {
      "Content-Type": "application/json",
      "Client-ID": process.env.REACT_APP_CLIENT_ID,
      Authorization: `Bearer ${token}`,
      Accept: "*/*",
    },
  };

  const qery =
    "fields name,rating,genres.name,cover.url,screenshots.url,artworks.url,franchises.name,involved_companies.company.name,release_dates.human,websites.url,storyline,summary,url;sort rating desc;where rating:!=null;limit 50;";

  try {
    const games = await axios.post(proxyurl + url, qery, headers);
    const results = games.data;
    console.log(results);
    return results;
  } catch (error) {
    if (error.response) {
      const errorCodeStatus = error.response.status;
      console.log("Error Code Status : ", errorCodeStatus);
      console.log("Error Code Message : ", error.response.data);
    }
    window.location.replace("/enable-cors");
  }
}

export async function gameSearch(game, token) {
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const url = "https://api.igdb.com/v4/games/";

  try {
    const searchResult = await axios.get(proxyurl + url, {
      headers: {
        "Content-Type": "application/json",
        "Client-ID": process.env.REACT_APP_CLIENT_ID,
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
      },

      params: {
        search: ` ${game}`,
        fields:
          "name,genres.name,rating,cover.url,screenshots.url,artworks.url,franchises.name,involved_companies.company.name,release_dates.human,websites.url,storyline,summary,url",
        limit: 50,
      },
    });
    const results = searchResult.data;
    return results;
  } catch (error) {
    if (error.response) {
      const errorCodeStatus = error.response.status;
      console.log("Error Code Status : ", errorCodeStatus);
      console.log("Error Code Message : ", error.response.data);
    }
    window.location.replace("/enable-cors");
  }
}

export async function searchVideo(game) {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${game} trailer&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`;
  try {
    const videos = await axios.get(url);
    const videoId = videos.data.items[0].id.videoId;
    return videoId;
  } catch (error) {
    if (error.response) {
      const errorCodeStatus = error.response.status;
      console.log("Error Code Status : ", errorCodeStatus);
      console.log("Error Code Message : ", error.response.data.error.message);
      alert(error.response.data.error.message);
    }
  }
}
