import React from "react";
import Loader from "./Loader";
import cl from "./Table.module.css";

function Table({ data, order, orderBy, sortBy, loading }) {
  function toggleStyle(id) {
    if (id === order && orderBy === "DESC") {
      return cl.desc;
    }
    if (id === order && orderBy === "ASC") {
      return cl.asc;
    }
    return null;
  }

  return (
    <table>
      <thead>
        <tr className={cl.trh}>
          <th>Дата</th>
          <th className={toggleStyle("_name")} onClick={sortBy} id="_name">
            Название
          </th>
          <th
            className={toggleStyle("_quantity")}
            onClick={sortBy}
            id="_quantity"
          >
            Количество
          </th>
          <th
            className={toggleStyle("_distance")}
            onClick={sortBy}
            id="_distance"
          >
            Расстояние
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((el) => (
          <tr key={el.id}>
            <td key={el.id + el._date.substring(0, 10)}>
              {el._date.substring(0, 10)}
            </td>
            <td key={el.id + el._name}>{el._name}</td>
            <td key={el.id + el._quantity}>{el._quantity}</td>
            <td key={el.id + el._distance}>{el._distance}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
