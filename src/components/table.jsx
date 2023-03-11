import React, { useState, useEffect, useContext } from "react";
import { gameData } from "../utils/services";
import TableForm from "./common/tableForm";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import { Link } from "react-router-dom";
import StoreContext from "../store/store-context";
import { getApiReserveToken } from "../utils/utils";

const Table = () => {
  const storeCtx = useContext(StoreContext);
  const [games, setGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [spinnerVisible, setSpinnerVisible] = useState(true);

  const pageSize = 10;
  let index = 1;

  useEffect(() => {
    async function getData() {
      let token = await storeCtx.accessTwitchToken;
      if (!token) {
        const user = localStorage.getItem(`user`);
        token = await getApiReserveToken(user);
      }
      const data = await gameData(token);
      setGames(data);
      setSpinnerVisible(false);

      return data;
    }
    getData();
  }, []);

  let columns = [
    {
      label: "Rank",
      renderIndex: () => {
        return index++;
      },
    },
    {
      label: "Cover",
      renderCover: (item) => {
        let url = "https://" + item.cover?.url;
        url = url.replace("thumb", "cover_small");
        return <img src={url} alt={item.name} />;
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
    { path: "genres[0].name", label: "Genre" },
    {
      label: "Company",
      nested_path: (item) => {
        const companies_length = item.involved_companies?.length;
        return `involved_companies[${companies_length - 1}].company.name`;
      },
    },
    { path: "release_dates[0].human", label: "Release Date" },
  ];

  function handlePageChange(page) {
    setCurrentPage(page);
  }

  function getPageData() {
    // Pginate //
    const gamesList = paginate(games, currentPage, pageSize);
    return { totalCount: games?.length, data: gamesList };
  }

  const { totalCount, data: gamesList } = getPageData();

  return (
    <>
      {spinnerVisible ? (
        <div class="spinner-border text-danger center_spinner" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      ) : (
        <div className="topGame">
          <TableForm items={gamesList} columns={columns} />
          <Pagination
            itemsCounts={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
};

export default Table;
