import axios from "axios";
const config = {
  headers: {
    "Content-Type": "application/json",
    "Client-ID": "71vq0git2hubkomm7jm6cyyjs4r603",
    Authorization: "Bearer 7b4qg78nwktds60wjy3trwz2co8q4p",
    Accept: "*/*",
  },
};

export function gameData() {
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const url =
    "https://api.igdb.com/v4/games/?fields=name,rating,genres.name,cover.url,screenshots.url,artworks.url,franchises.name,involved_companies.company.name,release_dates.human,websites.url,storyline,summary,url&order=rating:desc&where=rating:!=null&limit=50";
  const games =
    // axios
    // .post(proxyurl + url, config)
    axios({
      url: proxyurl + url,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Client-ID": "71vq0git2hubkomm7jm6cyyjs4r603",
        Authorization: "Bearer qyt3kot35r129qqp739be164ew28o7",
        Accept: "*/*",
      },
    })
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        window.location.replace("/enable-cros");
      });

  return games;
}

export function gameSearch(game) {
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const url = "https://api.igdb.com/v4/games/";

  console.log(game);

  const searchResult = axios
    .get(proxyurl + url, {
      headers: {
        "Content-Type": "application/json",
        "Client-ID": "71vq0git2hubkomm7jm6cyyjs4r603",
        Authorization: "Bearer qyt3kot35r129qqp739be164ew28o7",
        Accept: "*/*",
      },

      params: {
        search: ` ${game}`,
        fields:
          "name,genres.name,rating,cover.url,screenshots.url,artworks.url,franchises.name,involved_companies.company.name,release_dates.human,websites.url,storyline,summary,url",
        limit: 50,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      window.location.replace("/enable-cros");
    });

  return searchResult;
}
