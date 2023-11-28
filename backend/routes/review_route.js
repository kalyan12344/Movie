const express = require("express");
const connection = require("../config/database");
const router = express.Router();
router.get("/get/:movie_id", (req, res, next) => {
    movie_id=req.params.movie_id;
  var query = `select * from review r join user u on u.user_id=r.user_id where movie_id=${movie_id}`;
  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});
router.post("/create", (req, res, next) => {
  let review = req.body;
  review.review_date=new Date()
  var query = "insert into review(movie_rating,comment,review_date,user_id,movie_id) values(?,?,?,?,?)";
  connection.query(
    query,
    [review.movie_rating, review.comment, review.review_date,review.user_id,review.movie_id],
    (err, results) => {
      if (!err) {
        return res.status(200).json({ message: "Review added successfully" });
      } else {
        return res.status(500).json(err);
      }
    }
  );
});

module.exports = router;
