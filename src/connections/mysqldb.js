// const mysql = require("mysql");
const mysql = require("mysql2");

// const connection = mysql.createConnection({
//   port: 3306,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: "bejc18",
// });

const connection = mysql.createConnection({
  host: "db4free.net",
  port: 3306,
  user: "dinopwdk",
  password: "password",
  database: "bejc18",
});

connection.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

module.exports = connection;
