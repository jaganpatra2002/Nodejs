const express=require('express');
const userRoutes=require("./index");
const app=express();
const port =8081;

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parse form data
// app.use(express.static('public'));
// app.post('/sendData',(req,res)=>{
//     console.log('Reuest', req.body );
//     res.send(`hi ${req.body.name}`)
// });
function validateUserCred(req,res,next){
   const {username,email,password}=req.body;
   if(!username ||username.length<3){
      return res.status(400).json({error:'Username must be atleast more than 3 characters'});
   }
   if(!email || !email.includes('@')){
      return res.status(400).json({error:'Valid emial not found'});
   }
   if(!password || password.length<6){
      return res.status(400).json({error:'Password muts be above 6 char'});
   }
   next();
}
app.post('/api/users', validateUserCred,(req,res)=>{
   res.status(201).json({message:'User created succesfully', data: req.body });
    // res.status(500).json({message:'server error'});
})

app.listen(port);