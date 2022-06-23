let mysql = require("mysql"),
  { promisify } = require("util"),
  { database } = require("./keys"),
  pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
  if (err) console.log("Ha surgido un error");

  if (connection) connection.release();
  console.log("DB conectada");
  return;
});

pool.query = promisify(pool.query);

module.exports = pool;
