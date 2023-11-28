const express = require("express");
const connection = require("../config/database");
const router = express.Router();
router.get("/get/user", (req, res, next) => {
  var query = `SELECT 
  c.coupon_name,c.coupon_id,c.coupon_discount,
  JSON_ARRAYAGG(u.username) AS usernames
FROM
  coupons c
LEFT JOIN
  user_coupon uc ON c.coupon_id = uc.coupon_id
LEFT JOIN
  user u ON u.user_id = uc.user_id
where uc.is_used=0 and c.is_expired=0
GROUP BY
  c.coupon_id, c.coupon_name,c.coupon_discount
ORDER BY
  c.coupon_id;
`;
  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});
router.get("/get/user/:user_id", (req, res, next) => {
  user_id=req.params.user_id
  var query = `select * from user_coupon uc  join coupons c on c.coupon_id=uc.coupon_id where uc.is_used=0 and c.is_expired=0 and uc.user_id=${user_id}`;
  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

router.get("/set/:user_id/:coupon_id", (req, res, next) => {
  coupon_id=req.params.coupon_id
  user_id=req.params.user_id
  var query = `update user_coupon uc set is_used=1 where uc.coupon_id=${coupon_id} and uc.user_id=${user_id}`;
  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

router.post("/create", (req, res, next) => {
  const admin_id = req.body.admin_id;
  const coupon_discount = req.body.coupon_discount;
  const is_expired = req.body.is_expired;
  const coupon_name=req.body.coupon_name
  var query = "insert into coupons(coupon_name,coupon_discount,is_expired,admin_id) values(?,?,?,?)";
  connection.query(
    query,
    [coupon_name,coupon_discount, is_expired, admin_id],
    (err, results) => {
      if (!err) {
        return res.status(200).json({ message: "coupon added successfully" });
      } else {
        return res.status(500).json(err);
      }
    }
  );
});

router.post("/assign", (req, res, next) => {
  const admin_id = req.body.admin_id;
  const coupon_discount = req.body.coupon_discount;
  const is_expired = req.body.is_expired;
  var query = "insert into user_coupon(coupon_name,coupon_id,user_id) values(?,?,?)";
  connection.query(
    query,
    [coupon_name,coupon_discount, is_expired, admin_id],
    (err, results) => {
      if (!err) {
        return res.status(200).json({ message: "coupon added successfully" });
      } else {
        return res.status(500).json(err);
      }
    }
  );
});

module.exports = router;
