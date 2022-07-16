import React from "react";

function Pagination({ totalCount, limit, paginate, page }) {
  const pages = []
  const pageCount = Math.ceil(totalCount/limit)
  for (let i = 1; i <= pageCount ;i++){
    pages.push(i)
  }
  return (
    <ul className="pagination">
      {pages.map((el) => (
        <li className={page === el ? 'active' : null} key={el} onClick={()=>paginate(el)}>{el}</li>
      ))}
    </ul>
  );
}

export default Pagination;
