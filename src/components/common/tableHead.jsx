import React from "react";

const TableHead = ({ columns, onSort }) => {

  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            scope="col"
            className="bg-danger"
            key={column.label}
          >
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
