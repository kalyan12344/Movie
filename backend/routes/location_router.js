<<<<<<< HEAD
const express = require("express");
const connection = require("../config/database");
const router = express.Router();
router.get("/get", (req, res, next) => {
  var query = "select * from location";
  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});
// router.get('/get/d',(req,res,next)=>{
//     var query="select * from location";
//     connection.query(query,(err,results)=>{
//         if(!err){
//             return res.status(200).json(results);
//         }
//         else{
//             return res.status(500).json(err)

//         }
//     })
// })
router.post("/create", (req, res, next) => {
  let loc = req.body;
  var query = "insert into location(zipcode,city,state) values(?,?,?)";
  connection.query(
    query,
    [loc.zipcode, loc.city, loc.state],
    (err, results) => {
      if (!err) {
        return res.status(200).json({ message: "location added successfully" });
      } else {
        return res.status(500).json(err);
      }
    }
  );
});
=======
const express=require('express');
const connection=require('../config/database')
const router= express.Router();
router.get('/get',(req,res,next)=>{
    var query="select location_id,city from location";
    connection.query(query,(err,results)=>{
        if(!err){
            return res.status(200).json(results);
        }
        else{
            return res.status(500).json(err)

        }
    })
})
router.post('/create',(req,res,next)=>{
    let loc=req.body;
    var query="insert into location(zipcode,city,state) values(?,?,?)"
    connection.query(query,[loc.zipcode,loc.city,loc.state],(err,results)=>{
        if(!err){
            return res.status(200).json({message:"location added successfully"});
        }
        else{
            return res.status(500).json(err)

        }
    })
})
>>>>>>> 38152522946245e191c9256d3b7bcef66b79ba0b

module.exports = router;
