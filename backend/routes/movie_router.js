const express=require('express');
const connection=require('../config/database')
const router= express.Router();
router.get('/get',(req,res,next)=>{
    var query="select movie_id,title from movies";
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
    let movies=req.body;
    var query="insert into movies(title,poster_url,description,director,duration,release_date,end_date,is_completed,admin_id) values(?,?,?,?,?,?,?,?,?)"
    connection.query(query,[movies.title,movies.poster_url,movies.description,movies.director,movies.duration,movies.release_date,movies.end_date,movies.is_completed,movies.admin_id],(err,results)=>{
        if(!err){
            return res.status(200).json({message:"movie registered successfully"});
        }
        else{
            return res.status(500).json(err)

        }
    })
})

module.exports=router;