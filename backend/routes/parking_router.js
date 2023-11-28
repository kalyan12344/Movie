const express = require("express");
const connection = require("../config/database");
const router = express.Router();
router.get("/get/:theaterId", (req, res, next) => {
  const theaterId = req.params.theaterId;

  const query = "SELECT capacity FROM parking_area WHERE theater_id = ?";

  connection.query(query, [theaterId], (err, results) => {
    if (!err) {
      if (results.length > 0) {
        const parking = results;

        res.status(200).json(parking);
      } else {
        res.status(404).json({ message: "Parking Area not found" });
      }
    } else {
      res.status(500).json(err);
    }
  });
});

module.exports = router;
