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
    const query =
      `select distinct st.* from theater t join location l on t.location_id = l.location_id 
      join show_time st on st.theater_id = t.theater_id join movies m on m.movie_id = st.movie_id 
      where l.city = ? and m.movie_id = ? and t.theater_id = ?`;
    connection.query(
      query,
      [selectedCity, movieId, theaterId],
      (err, results) => {
        if (!err) {
          if (results.length > 0) {
            const theater = results;
            res.status(200).json(theater);
          } else {
            res.status(404).json({ message: "showtimes not found" });
          }
        } else {
          res.status(500).json(err);
        }
      }
    );
  }
);
router.get("/:showtimeId", (req, res) => {
  const showtimeId = req.params.showtimeId;
  const query = "SELECT * FROM show_time WHERE show_time_id = ?";
  connection.query(query, [showtimeId], (err, result) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.json(result[0]);
  });
});

router.put("/:showtimeId", (req, res) => {
  const showtimeId = req.params.showtimeId;
  const { show_name, start_time, end_time, available_seats, theater_id, movie_id, admin_id, } = req.body;
  const query =
    `UPDATE show_time SET show_name = ?, start_time = ?, end_time = ?, available_seats = ?, theater_id = ?, 
    movie_id = ?, admin_id = ? WHERE show_time_id = ?`;
  connection.query(
    query,
    [show_name, start_time, end_time, available_seats, theater_id, movie_id, admin_id, showtimeId,],
    (err, result) => {
      if (err) {
        return res.status(500).send(err.message);
      }
      res.send("Showtime updated successfully");
    }
  );
});
router.post("/seats/update", (req, res) => {
  const {showtime_id,totalseats}=req.body
  const query =
    `UPDATE show_time SET available_seats = ? WHERE show_time_id = ?`;
  connection.query(
    query,
    [totalseats,showtime_id],
    (err, result) => {
      if (err) {
        return res.status(500).send(err.message);
      }
      res.send("Showtime updated successfully");
    }
  );
});

router.post("/create", (req, res, next) => {
  let show_time = req.body;
  var query =
    `insert into show_time(show_name,start_time,end_time,available_seats,theater_id,movie_id,admin_id) 
    values(?,?,?,?,?,?,?)`;
  connection.query(query, [show_time.show_name, show_time.start_time, show_time.end_time, show_time.available_seats,
  show_time.theater_id, show_time.movie_id, show_time.admin_id,],
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

router.delete("/delete/:showId", (req, res) => {
  const showId = req.params.showId;
  connection.beginTransaction((err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error starting transaction");
    }
    const deleteResQuery =
      "UPDATE reservations SET showtime_id = NULL WHERE showtime_id = ?";
    connection.query(deleteResQuery, [showId], (err, result) => {
      if (err) {
        return connection.rollback(() => {
          console.error(err);
          res.status(500).send("Error deleting showtimes");
        });
      }
      const deleteSTQuery = "DELETE FROM show_time WHERE show_time_id = ?";
      connection.query(deleteSTQuery, [showId], (err, result) => {
        if (err) {
          return connection.rollback(() => {
            console.error(err);
            res.status(500).send("Error deleting theater");
          });
        }
        connection.commit((err) => {
          if (err) {
            return connection.rollback(() => {
              console.error(err);
              res.status(500).send("Error committing transaction");
            });
          }
          res.send(
            "show time and associated reservations deleted successfully"
          );
        });
      });
    });
  });
});

module.exports = router;
