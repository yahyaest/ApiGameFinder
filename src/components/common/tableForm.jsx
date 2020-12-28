import React from "react";
import TableHead from "./tableHead";
import TableBody from "./tableBody";

const TableForm = ({ items, columns, sortColumn, onSort }) => {
  return (
    <div id="table">
      <table className="table table-striped table-dark">
        <TableHead columns={columns} sortColumn={sortColumn} onSort={onSort} />
        <TableBody items={items} columns={columns} />
      </table>
    </div>
  );
};

export default TableForm;
