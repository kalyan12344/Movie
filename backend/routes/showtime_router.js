const express = require("express");
const connection = require("../config/database");
const router = express.Router();
router.get("/get", (req, res, next) => {
  var query = "select * from show_time";
  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

router.get(
  "/getTheatersInLoc/:selectedLocation/:movieID/:theaterID",
  (req, res, next) => {
    const selectedCity = req.params.selectedLocation;
    const movieId = req.params.movieID;
    const theaterId = req.params.theaterID;

    console.log(selectedCity, movieId, theaterId);
    const query =
      "select distinct st.* from theater t join location l on t.location_id = l.location_id join show_time st on st.theater_id = t.theater_id join movies m on m.movie_id = st.movie_id where l.city = ? and m.movie_id = ? and t.theater_id = ?";
    connection.query(
      query,
      [selectedCity, movieId, theaterId],
      (err, results) => {
        if (!err) {
          if (results.length > 0) {
            const theater = results;
            res.status(200).json(theater);
          } else {
            res.status(404).json({ message: "theaters not found" });
          }
        } else {
          res.status(500).json(err);
        }
      }
    );
  }
);

router.post("/create", (req, res, next) => {
  let show_time = req.body;
  var query =
    "insert into show_time(show_name,start_time,end_time,available_seats,theater_id,movie_id,admin_id) values(?,?,?,?,?,?,?)";
  connection.query(
    query,
    [
      show_time.show_name,
      show_time.start_time,
      show_time.end_time,
      show_time.available_seats,
      show_time.theater_id,
      show_time.movie_id,
      show_time.admin_id,
    ],
    (err, results) => {
      if (!err) {
        return res
          .status(200)
          .json({ message: "Show time added successfully" });
      } else {
        return res.status(500).json(err);
      }
    }
  );
});

router.get("/movie", (req, res, next) => {
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
