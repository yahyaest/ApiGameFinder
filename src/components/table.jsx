import React, { useState, useEffect } from "react";
import { gameData } from "../services";
import TableForm from "./common/tableForm";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import { Link } from "react-router-dom";

const Table = () => {
  const [games, setGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10;
  let index = 1;

  useEffect(() => {
    async function getData() {
      const data = await gameData();
      setGames(data);

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
        let url = "https://" + item.cover.url;
        url = url.replace("thumb", "cover_small");
        return <img src={url} alt={item.name} />;
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
    { path: "genres[0].name", label: "Genre" },
    {
      label: "Company",
      nested_path: (item) => {
        const companies_length = item.involved_companies.length;
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
    const gamesList = paginate(games, currentPage, pageSize)
    return { totalCount: games.length, data: gamesList };
  }

  //console.log(games);
  const { totalCount, data: gamesList } = getPageData();

  return (
    <div className="topGame">
      <TableForm
        items={gamesList}
        columns={columns}
      />
      <Pagination
        itemsCounts={totalCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Table;
