import React from "react";
import Loader from "./components/Loader";
import Pagination from "./components/Pagination";
import SortBar from "./components/SortBar";
import Table from "./components/Table";

function App() {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [totalCount, setTotalCount] = React.useState(100);
  const [page, setPage] = React.useState(1);
  const [order, setOrder] = React.useState("_distance");
  const [orderBy, setOrderBy] = React.useState("ASC");
  const [filter, setFilter] = React.useState("_name");
  const [condition, setCondition] = React.useState("contains");
  const [conVal, setConVal] = React.useState("");
  const [url, setUrl] = React.useState(
    "/api/table?_limit=5&_page=1&_order=_distance&_orderby=ASC"
  );
  const limit = 5;

  console.log(filter, condition, conVal);
  const paginate = (number) => setPage(number);
  React.useEffect(() => {
    setOrderBy("ASC");
  }, [order]);

  const sortBy = (e) => {
    setOrder(e.target.id);
    if (orderBy === "ASC") {
      setOrderBy("DESC");
    } else setOrderBy("ASC");
  };
  React.useEffect(() => {
    if (conVal === "") {
      setUrl(
        `/api/table?_limit=${limit}&_page=${page}&_order=${order}&_orderby=${orderBy}`
      );
    } else {
      setUrl(
        `/api/table?_limit=${limit}&_page=${page}&_order=${order}&_orderby=${orderBy}&_filter=${filter}&_condition=${condition}&_con_val=${conVal}`
      );
    }
  }, [limit, page, order, orderBy, filter, condition, conVal]);

  React.useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((response) => {
        setTotalCount(() => response.headers.get("x-total-count"));
        return response.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [url]);

  return (
    <div className="container">
      <div className="data">
        <SortBar
          filter={filter}
          setFilter={setFilter}
          condition={condition}
          setCondition={setCondition}
          conVal={conVal}
          setConVal={setConVal}
        />
        {loading === false ? (
          <Table
            data={data}
            sortBy={sortBy}
            order={order}
            orderBy={orderBy}
            loading={loading}
          />
        ) : (
          <Loader />
        )}
        {loading === false ? (
          <Pagination
            totalCount={totalCount}
            limit={limit}
            paginate={paginate}
            page={page}
          />
        ) : null}
      </div>
    </div>
  );
}

export default App;
