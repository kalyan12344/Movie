const express = require("express");
const connection = require("../config/database");
const router = express.Router();
router.get("/get/:showtime_id", (req, res, next) => {
    showtime_id=req.params.showtime_id;
  var query = "select * from seat where showtime_id=?";
  connection.query(query,[showtime_id], (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

router.post('/update',(req,res,next)=>{
    let show_time=req.body.showtime_id;
    let selectedSeats=req.body.selectedSeats;
    const seatIds = selectedSeats.map(seat => seat.seat_id);
    const seatIdsTuple = `(${seatIds.join(', ')})`;
     query=`update seat set is_selected=true where seat_id in ${seatIdsTuple} and showtime_id=${show_time}`
    connection.query(query,(err,results)=>{
        if(!err){
            return res.status(200).json({results});
        }
        else{
            return res.status(500).json(err)
        }
    })
})

  
module.exports=router;