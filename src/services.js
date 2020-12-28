import axios from "axios";

export function gameData() {
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const url =
    "https://api-v3.igdb.com/games/?fields=name,genres.name,popularity,cover.url,screenshots.url,artworks.url,franchises.name,involved_companies.company.name,release_dates.human,websites.url,storyline,summary,url&order=popularity:desc&limit=50";
  const games = axios
    .get(proxyurl + url, {
      headers: { "user-key": "65958e5836ed5dcfc0d6d06b23a8a1d6" },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));

  return games;
}

export function gameSearch(game) {
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const url = "https://api-v3.igdb.com/games/";

  console.log(game);

  const searchResult = axios
    .get(proxyurl + url, {
      headers: {
        "user-key": "65958e5836ed5dcfc0d6d06b23a8a1d6",
        "Content-Type": "text/plain",
        Accept: "*/*",
      },

      params: {
        search: ` ${game}`,
        fields:
          "name,genres.name,popularity,cover.url,screenshots.url,artworks.url,franchises.name,involved_companies.company.name,release_dates.human,websites.url,storyline,summary,url",
        limit: 50,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));

  return searchResult;
}
