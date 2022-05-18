const Pool = require("pg").Pool;

const pool = new Pool({
  user: "labber",
  password: "labber",
  host: "localhost",
  database: "imagerepo",
  port: 5432
})

module.exports = pool;