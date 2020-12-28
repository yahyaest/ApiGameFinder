const igdb = require("igdb-api-node").default;
const envVariables = process.env;

// Read vars from envVariables object
const { TWITCH_CLIENT_ID, TWITCH_APP_ACCESS_TOKEN } = envVariables;

const client = igdb(TWITCH_CLIENT_ID, TWITCH_APP_ACCESS_TOKEN);

async function data() {
  try {
    const response = await igdb()
      .fields(["name", "movies", "age"]) // fetches only the name, movies, and age fields
      .fields("name,movies,age") // same as above

      .limit(50) // limit to 50 results
      .offset(10) // offset results by 10

      .sort("name") // default sort direction is 'asc' (ascending)
      .sort("name", "desc") // sorts by name, descending
      .search("mario") // search for a specific name (search implementations can vary)

      .where(`first_release_date > ${new Date().getTime() / 1000}`) // filter the results

      .request("/games"); // execute the query and return a response object

    console.log("a",response.data);
  } catch (ex) {
    console.log(ex.response.data.Message);
  }
}

console.log(client);
data();
