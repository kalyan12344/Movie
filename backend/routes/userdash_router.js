const express = require("express");
const connection = require("../config/database");
const router = express.Router();
router.post("/get", (req, res, next) => {
  console.log(req.body);
  let selectedCity = req.body.location;
  var query =
    "select m.* From movies m join show_time st  on m.movie_id = st.movie_id join theater t on  st.theater_id = t.theater_id join location l on l.location_id = t.location_id where l.city = ?";
  connection.query(query, selectedCity, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

module.exports = router;
