import React from "react";
import _ from "lodash";

const TableBody = ({ items, columns }) => {
  function renerCell(item, column) {
    if (column.content) {
      return column.content(item);
    }
    if (column.nested_path) {
      const path = column.nested_path(item);
      return _.get(item, path);
    }
    if (column.renderCover) {
      return column.renderCover(item);
    }
    if (column.renderIndex) {
      return column.renderIndex();
    }

    return _.get(item, column.path);
  }

  //console.log(items);
  return (
    <tbody>
      {items.map((item) => (
        <tr key={item.id}>
          {columns.map((column) => (
            <td key={item.id + column.label}>{renerCell(item, column)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
