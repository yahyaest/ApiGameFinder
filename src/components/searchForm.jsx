import React, { useState, useEffect, useContext } from "react";
import StoreContext from "../store/store-context";
import { gameSearch } from "../utils/services";
import { Link } from "react-router-dom";
import TableForm from "./common/tableForm";
import Pagination from "./common/pagination";
import { paginate } from "./../utils/paginate";
import { GameList } from "../gameList";
import "../css/searchForm.css";

const SearchForm = (props) => {
  const storeCtx = useContext(StoreContext);

  const [games, setGames] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [tableVisible, setTableVisible] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10;
  let index = 1;

  useEffect(() => {
    async function fetchData() {
      const token = await storeCtx.accessTwitchToken;
      console.log("myToken : ", token);

      let searchedGame = props.match.url.slice(8);
      console.log(searchedGame);
      document.getElementById("search").value = searchedGame;
      if (!searchedGame) setTableVisible(false);

      const searchResult = await gameSearch(searchedGame, token);
      setGames(searchResult);
    }
    fetchData();
  }, [props.match.url]);

  const FetchGameSuggestions = async (query) => {
    //// using api :limited to 50 call by hour
    // const searchResult = await gameSearch(query);
    // setSearchSuggestions(searchResult.slice(0, 10));
    //// using local file
    const searchResult = GameList.filter((game) =>
      game.toLowerCase().includes(query.toLowerCase())
    );
    setSearchSuggestions(searchResult.slice(0, 10));
  };

  const FetchGameSearch = async (e) => {
    e.preventDefault();
    const token = await storeCtx.accessTwitchToken;
    const searchInput = document.getElementById("search").value;
    const searchResult = await gameSearch(searchInput, token);
    setGames(searchResult);
    setTableVisible(true);
    props.history.push(`/search/${searchInput}`);
  };

  let columns = [
    {
      label: "Index",
      renderIndex: () => {
        return index++;
      },
    },
    {
      label: "Cover",
      renderCover: (item) => {
        if (item?.cover) {
          let url = "https://" + item?.cover.url;
          url = url.replace("thumb", "cover_small");
          return <img src={url} alt={item.name} />;
        }
      },
    },
    {
      path: "name",
      label: "Name",
      content: (item) => {
        localStorage.setItem(`${item.id}`, JSON.stringify(item));
        //// state: { data: item } is used topass data to link
        //// but in this case its uneffective in persisting the data when openining the link in a new tab
        //// so localStorage is the solution
        return (
          <Link to={{ pathname: `/games/${item.id}`, state: { data: item } }}>
            {item.name}
          </Link>
        );
      },
    },
    { path: "involved_companies[0].company.name", label: "Company" },
    {
      path: "genres[0].name",
      label: "Genre",
    },
    { path: "release_dates[0].human", label: "Release Date" },
  ];

  function handlePageChange(page) {
    setCurrentPage(page);
  }

  function getPageData() {
    // 3.Pginate //
    const gamesList = paginate(games, currentPage, pageSize);

    return { totalCount: games?.length, data: gamesList };
  }

  //console.log(games);
  const { totalCount, data: gamesList } = getPageData();

  return (
    <div className="search">
      <h1 style={{ color: "gold" }}>Search</h1>

      <div className="search-form">
        <form>
          <div className="form-group row">
            <label htmlFor="search">Enter game name</label>
            <input
              name="search"
              type="search"
              className="form-control"
              id="search"
              placeholder="Enter game name . . ."
              onChange={(e) => {
                setSearchQuery(e.currentTarget.value);
                FetchGameSuggestions(e.currentTarget.value);
              }}
            ></input>
          </div>
          <button
            type="submit"
            className="btn btn-warning"
            onClick={(e) => {
              FetchGameSearch(e);
              setSearchSuggestions([]);
              setSearchQuery("");
            }}
          >
            Search
          </button>
        </form>

        <div className="search-suggestions">
          {searchQuery && (
            <div className="suggestion-header">Suggestions..</div>
          )}
          {searchSuggestions &&
            searchQuery &&
            searchSuggestions?.map((element) => (
              <div
                className="search-suggestion"
                onClick={() => {
                  document.getElementById("search").value = element;
                  setSearchQuery("");
                }}
              >
                {element}
              </div>
            ))}
        </div>
      </div>

      <br />
      <br />

      {tableVisible && <TableForm items={gamesList} columns={columns} />}

      <Pagination
        itemsCounts={totalCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default SearchForm;
