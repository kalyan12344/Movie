const express=require('express');
const connection=require('../config/database')
const router= express.Router();
router.get('/get',(req,res,next)=>{
    var query="select theater_id,theater_name from theater";
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
    let theater=req.body;
    console.log(theater)
    var query="insert into theater(theater_name,description,theater_url,admin_id,location_id) values(?,?,?,?,?)"
    connection.query(query,[theater.theater_name,theater.description,theater.theater_url,theater.admin_id,theater.location_id],(err,results)=>{
        if(!err){
            console.log(results)
            return res.status(200).json({message:"Theater added successfully"});
        }
        else{
            console.log(results,"inside the error")
            return res.status(500).json(err)

        }
    })
})

module.exports=router;