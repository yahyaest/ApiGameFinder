import axios from "axios";

export async function refreshToken() {
  const url = `https://id.twitch.tv/oauth2/token?client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}&grant_type=client_credentials`;
  try {
    const refreshToken = await axios.post(url, {});
    const accessToken = refreshToken.data.access_token;
    // console.log("accessToken : ", accessToken);
    // config.headers.Authorization = `Bearer ${accessToken}`;
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
  const url =
    "https://api.igdb.com/v4/games/?fields=name,rating,genres.name,cover.url,screenshots.url,artworks.url,franchises.name,involved_companies.company.name,release_dates.human,websites.url,storyline,summary,url&order=rating:desc&where=rating:!=null&limit=50";

  try {
    const games = await axios({
      url: proxyurl + url,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Client-ID": process.env.REACT_APP_CLIENT_ID,
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
      },
    });
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

  console.log(game);
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
