const express = require("express");
const connection = require("../config/database");
const router = express.Router();
router.get("/get", (req, res, next) => {
  const query = "select * from show_time ";

  connection.query(query, (err, results) => {
    if (!err) {
      if (results.length > 0) {
        const parking = results;
        res.status(200).json(parking);
      } else {
<<<<<<< HEAD
        res.status(404).json({ message: "not found" });
=======
        res.status(404).json({ message: "Parking Area not found" });
>>>>>>> b759eaf000623c5629561d7aa5ad3da3c8f57d05
      }
    } else {
      res.status(500).json(err);
    }
  });
});

module.exports = router;
