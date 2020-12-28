import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  // Return an array starting from startIndex and has size of pageSize and value from parent array items
  return _(items).slice(startIndex).take(pageSize).value();
}
