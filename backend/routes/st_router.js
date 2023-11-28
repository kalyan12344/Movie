const express = require("express");
const connection = require("../config/database");
const router = express.Router();
router.get("/get", (req, res, next) => {
  const query =
    "select * from movies m join show_time s on s.movie_id = m.movie_id";

  connection.query(query, (err, results) => {
    if (!err) {
      if (results.length > 0) {
        const genre = results;
        console.log(results);
        res.status(200).json(genre);
      } else {
        res.status(404).json({ message: "genre not found" });
      }
    } else {
      res.status(500).json(err);
    }
  });
});

module.exports = router;
