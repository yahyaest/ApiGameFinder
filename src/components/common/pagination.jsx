import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const Pagination = (props) => {
  const { itemsCounts, pageSize, currentPage, onPageChange } = props;
  const pagesCount = Math.ceil(itemsCounts / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1); 

  return (
    <React.Fragment>
      <nav aria-label="...">
        <ul className="pagination pagination-sm">
          {pages.map((page) => (
            <li
              key={page}
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
            >
              <button className="page-link" onClick={() => onPageChange(page)} >
                {page}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </React.Fragment>
  );
};

Pagination.propTypes = {
  itemsCounts: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
