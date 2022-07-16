function filter(condition, con_val) {
  let cond;
  switch (condition) {
    case "equals":
      cond = `= ${con_val}`;
      break;
    case "contains":
      cond = `LIKE '%${con_val}%'`;
      break;
    case "larger":
      cond = `> ${con_val}`;
      break;
    case "less":
      cond = `< ${con_val}`;
      break;
    default:
      cond = `= ${con_val}`;
  }
  return cond;
}
module.exports = filter;
