const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "keerkal@K9@mysql",
  database: "movie_mix",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }

  console.log("Connected to database");
});
module.exports = connection;
