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

router.get("/genre/:movieId", (req, res, next) => {
    const movieId = req.params.movieId;
  
    // Query to get movie details based on movieId
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

router.post('/admin_id',(req,res,next)=>{
    admin=req.body
    var query="select admin_name from admin where admin_id=?";
    connection.query(query,[admin.admin_id],(err,results)=>{
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
            return res.status(200).json({message:"User logged in successfully",user_id:results[0].user_id});
        }
        else if(results.length<=0){
            query=`select * from admin where admin_name=? and password=?`
            connection.query(query,[user.username,user.password],(err,results)=>{
                if(!err&&results.length>0){
                    return res.status(200).json({message:"Admin logged in successfully",admin_id:results[0].admin_id})
                    
                }
                else{
                    return res.status(404).json({message:"Enter proper username and password"})
                }
            })
            
        }
        else{
            return res.status(500).json(err)

        }
    })
})
module.exports=router;