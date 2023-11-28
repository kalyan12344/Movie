const express = require("express");
const connection = require("../config/database");
const router = express.Router();
router.get("/get", (req, res, next) => {
  var query = "select * from theater";
  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

router.get("/getTheatersInLoc/:selectedLocation/:movieID", (req, res, next) => {
  const selectedCity = req.params.selectedLocation;
  const movieId = req.params.movieID;
  const query =
    "select distinct t.* from theater t join location l on t.location_id = l.location_id join show_time st on st.theater_id = t.theater_id join movies m on m.movie_id = st.movie_id where l.city = ? and m.movie_id = ?";
  connection.query(query, [selectedCity, movieId], (err, results) => {
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
  });
});

router.delete("/delete/:theaterId", (req, res) => {
  const theaterId = req.params.theaterId;

  connection.beginTransaction((err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error starting transaction");
    }

    const deleteShowtimesQuery = "DELETE FROM show_time WHERE theater_id = ?";
    connection.query(deleteShowtimesQuery, [theaterId], (err, result) => {
      if (err) {
        return connection.rollback(() => {
          console.error(err);
          res.status(500).send("Error deleting showtimes");
        });
      }

      const deleteTheaterQuery = "DELETE FROM theater WHERE theater_id = ?";
      connection.query(deleteTheaterQuery, [theaterId], (err, result) => {
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
          res.send("Theater and associated showtimes deleted successfully");
        });
      });
    });
  });
});
router.post("/update/:theaterId", (req, res) => {
  const theaterId = req.params.theaterId;
  const { theater_name, description, theater_url, admin_id, location_id } =
    req.body;

  const query =
    "UPDATE theater SET theater_name = ?, description = ?, theater_url = ?, admin_id = ?, location_id = ? WHERE theater_id = ?";
  connection.query(
    query,
    [theater_name, description, theater_url, admin_id, location_id, theaterId],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error occurred: " + err.message);
      }
      res.send("Theater updated successfully");
    }
  );
});

router.get("/:theaterId", (req, res, next) => {
  const theaterId = req.params.theaterId;

  const query = "SELECT * FROM theater WHERE theater_id = ?";

  connection.query(query, [theaterId], (err, results) => {
    if (!err) {
      if (results.length > 0) {
        const movieDetails = results[0];
        res.status(200).json(movieDetails);
      } else {
        res.status(404).json({ message: "Movie not found" });
      }
    } else {
      res.status(500).json(err);
    }
  });
});
router.post("/create", (req, res, next) => {
  let theater = req.body;
  console.log(theater);
  var query =
    "insert into theater(theater_name,description,theater_url,admin_id,location_id) values(?,?,?,?,?)";
  connection.query(
    query,
    [
      theater.theater_name,
      theater.description,
      theater.theater_url,
      theater.admin_id,
      theater.location_id,
    ],
    (err, results) => {
      if (!err) {
        console.log(results);
        return res.status(200).json({ message: "Theater added successfully" });
      } else {
        console.log(results, "inside the error");
        return res.status(500).json(err);
      }
    }
  );
});

module.exports = router;
