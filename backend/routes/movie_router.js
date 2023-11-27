const express = require("express");
const connection = require("../config/database");
const router = express.Router();
router.get("/getMovies", (req, res, next) => {
  var query = "select movie_id,title,poster_url from movies";
  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});
router.get("/:movieId", (req, res, next) => {
  const movieId = req.params.movieId;

  const query = "SELECT * FROM movies WHERE movie_id = ?";

  connection.query(query, [movieId], (err, results) => {
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

router.get("/genre/:movieId", (req, res, next) => {
  const movieId = req.params.movieId;

  const query =
    "select g.* from movies m join movie_genre mg on m.movie_id = mg.movie_ID join genre g on g.genre_id = mg.genre_ID where m.movie_id = ?";

  connection.query(query, [movieId], (err, results) => {
    if (!err) {
      if (results.length > 0) {
        const genre = results;
        res.status(200).json(genre);
      } else {
        res.status(404).json({ message: "genre not found" });
      }
    } else {
      res.status(500).json(err);
    }
  });
});

router.get("/actors/:movieId", (req, res, next) => {
  const movieId = req.params.movieId;

  const query =
    "select mp.* from movies m join actors a on a.movie_id = m.movie_id join movie_persons mp on mp.movie_person_id = a.movie_person_id where m.movie_id = ?";

  connection.query(query, [movieId], (err, results) => {
    if (!err) {
      if (results.length > 0) {
        const actors = results;
        res.status(200).json(actors);
      } else {
        res.status(404).json({ message: "actors not found" });
      }
    } else {
      res.status(500).json(err);
    }
  });
});

router.get("/producer/:movieId", (req, res, next) => {
  const movieId = req.params.movieId;

  const query =
    "select mp.* from movies m join producers p on p.movie_id = m.movie_id join movie_persons mp on mp.movie_person_id = p.movie_person_id where m.movie_id = ? ";

  connection.query(query, [movieId], (err, results) => {
    if (!err) {
      if (results.length > 0) {
        const producers = results;
        res.status(200).json(producers);
      } else {
        res.status(404).json({ message: "producers not found" });
      }
    } else {
      res.status(500).json(err);
    }
  });
});

router.post("/create", (req, res, next) => {
  let movies = req.body;
  var query =
    "insert into movies (title,poster_url,description,director,duration,release_date,end_date,is_completed,admin_id) values(?,?,?,?,?,?,?,?,?)";
  connection.query(
    query,
    [
      movies.title,
      movies.poster_url,
      movies.description,
      movies.director,
      movies.duration,
      movies.release_date,
      movies.end_date,
      movies.is_completed,
      movies.admin_id,
    ],
    (err, results) => {
      if (!err) {
        return res
          .status(200)
          .json({ message: "movie registered successfully" });
      } else {
        return res.status(500).json(err);
      }
    }
  );
});

module.exports = router;
