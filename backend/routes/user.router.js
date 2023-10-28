const express=require('express');
const connection=require('../config/database')
const router= express.Router();
router.get('/get',(req,res,next)=>{
    var query="select * from user";
    connection.query(query,(err,results)=>{
        if(!err){
            return res.status(200).json(results);
        }
        else{
            return res.status(500).json(err)

        }
    })
})

router.post('/register',(req,res,next)=>{
    let user=req.body;
    var query="insert into user(username,email,password, mobile_no,age) values(?,?,?,?,?)"
    connection.query(query,[user.username,user.email,user.password,user.mobile_no,user.age],(err,results)=>{
        if(!err){
            return res.status(200).json({message:"User registered successfully"});
        }
        else{
            return res.status(500).json(err)

        }
    })
})

router.post('/login',(req,res,next)=>{
    let user=req.body;
    var query=`select * from user where username=? and password=?`
    connection.query(query,[user.username,user.password],(err,results)=>{
        if(!err && results.length>0){
            return res.status(200).json({message:"User logined successfully"});
        }
        else if(results.length<=0){
            return res.status(404).json({message:"Enter proper username and password"})
        }
        else{
            return res.status(500).json(err)

        }
    })
})
module.exports=router;