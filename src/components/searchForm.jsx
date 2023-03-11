import React, { useState, useEffect, useContext } from "react";
import StoreContext from "../store/store-context";
import { gameSearch } from "../utils/services";
import { Link } from "react-router-dom";
import TableForm from "./common/tableForm";
import Pagination from "./common/pagination";
import { paginate } from "./../utils/paginate";
import { GameList } from "../gameList";
import { getApiReserveToken } from "../utils/utils";
import "../css/searchForm.css";

const SearchForm = (props) => {
  const storeCtx = useContext(StoreContext);

  const [games, setGames] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [tableVisible, setTableVisible] = useState(false);
  const [spinnerVisible, setSpinnerVisible] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10;
  let index = 1;

  useEffect(() => {
    async function fetchData() {
      let token = await storeCtx.accessTwitchToken;
      if (!token) {
        const user = localStorage.getItem(`user`);
        token = await getApiReserveToken(user);
      }

      let searchedGame = props.match.url.slice(8);
      document.getElementById("search").value = searchedGame;
      setSpinnerVisible(false);
      if (!searchedGame) setTableVisible(false);
      else {
        // setSpinnerVisible(true);
        const searchResult = await gameSearch(searchedGame, token);
        // setSpinnerVisible(false);
        setGames(searchResult);
        setTableVisible(true);
      }
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
    setSpinnerVisible(false);
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
            disabled={searchQuery ? false : true}
            onClick={(e) => {
              FetchGameSearch(e);
              setSearchSuggestions([]);
              setSearchQuery("");
              setTableVisible(false);
              setSpinnerVisible(true);
            }}
          >
            Search
          </button>
        </form>

        <div className="search-suggestions">
          {searchSuggestions &&
            searchQuery &&
            searchSuggestions?.map((element) => (
              <div
                className="search-suggestion"
                onClick={() => {
                  document.getElementById("search").value = element;
                  setSearchQuery(element);
                  setSearchSuggestions([]);
                }}
              >
                {element}
              </div>
            ))}
        </div>
      </div>

      <br />
      <br />

      {spinnerVisible && (
        <div class="spinner-border text-danger center_spinner" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      )}

      {tableVisible && <TableForm items={gamesList} columns={columns} />}

      {tableVisible && (
        <Pagination
          itemsCounts={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default SearchForm;
