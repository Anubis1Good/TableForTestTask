const pool = require("../db");
const filters = require("../utils/filter");

class TableController {
  async createData(req, res) {
    const { _name, _quantity, _distance } = req.body;

    const newData = await pool.query(
      `INSERT INTO testtask (_date,_name,_quantity,_distance) values (NOW()::DATE,$1,$2,$3) RETURNING *`,
      [_name, _quantity, _distance]
    );
    res.send(newData.rows);
  }
  async getData(req, res) {
    let newData;
    let totalCount;
    const limit = req.query._limit;
    const offset = (req.query._page - 1) * limit;
    const order = req.query._order;
    const orderBy = req.query._orderby;
    const filter = req.query._filter;
    const finallyCondition = filters(req.query._condition, req.query._con_val);

    async function getSelect() {
      if (limit === undefined) {
        newData = await pool.query(`SELECT * FROM testtask`);
        totalCount = await pool.query(`SELECT * FROM testtask`);
        return { newData, totalCount };
      } else if (filter === undefined || req.query._con_val === "") {
        newData = await pool.query(
          `SELECT * FROM testtask ORDER BY ${order} ${orderBy} OFFSET ${offset} LIMIT ${limit}`
        );
        totalCount = await pool.query(
          `SELECT * FROM testtask ORDER BY ${order} ${orderBy}`
        );
        return { newData, totalCount };
      } else {
        newData = await pool.query(
          `SELECT * FROM testtask WHERE ${filter} ${finallyCondition} ORDER BY ${order} ${orderBy} OFFSET ${offset} LIMIT ${limit}`
        );
        totalCount = await pool.query(
          `SELECT * FROM testtask WHERE ${filter} ${finallyCondition} ORDER BY ${order} ${orderBy}`
        );
        return { newData, totalCount };
      }
    }
    try {
      const dbResponce = await getSelect();

      res.setHeader("x-total-count", dbResponce.totalCount.rowCount);
      res.send(dbResponce.newData.rows);
    } catch (error) {
      console.error(error);
      res.send("Error");
    }
  }
}

module.exports = new TableController();
