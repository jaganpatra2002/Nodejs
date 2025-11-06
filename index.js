// require('dotenv').config();
// const config=require('./config');
// express.js
const express=require("express");
const app=express();
// const port=8080;
const port = process.env.PORT || 8080;
const mongoUri=process.env.MONGO_URI;
console.log(`My port is ${port}`);
// console.log(`My port is ${config.nodeEnv} and uri is ${mongoUri} `);
//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.get('/',(req,res)=>{
   res.send("hi jagan  are u");
});
app.get('/hi',(req,res)=>{
   res.send("post request")
});
// app.listen(port,()=>{
//    console.log("listening at localhost port 8080")
// });
//route params
app.get('/users/:userId/books/:bookId', (req,res)=>{
   
   res.send(`hi uid is ${req.params.userId}....`);
})
//http://localhost:8080/search/1/books
//query params
app.get('/search',(req,res)=>{
   const {q,category}=req.query;
   res.send(`Search query: ${q}, Category: ${category || 'none'}`);
})
//http://localhost:8080/search?q=express&category=framework

//middleware
app.use((req,res,next)=>{
   console.log('time::', Date.now());
   next();
});
app.use((req,res,next)=>{
   console.log('2nd middleware called');
   next();
});
app.get('/userrr',(req,res)=>{
   res.send("after passing 2 middleware ");
});
app.listen(port);
//application leevel middleware app.use/ app.METHOD()
//router level middleware express.Router()
//error  handling middleware
app.use((err,req,res,next)=>{
   console.log(err.stack);
   res.status(500).send('somethig went wrong');
});

//built in middleare
//app.use();

app.use(express.json()); //used to aprse json request bodies
app.use(express.urlencoded({extended:true}));// used to parse url-encoded request bodies
app.use(express.static('public'));//serve satic files
// app.use(express.Router());//create modular route handlers

app.post('/sendData',(req,res)=>{
   console.log('Request '+ req.body);

   res.send(`User ${req.body.name} is added`);
});


// router
// const router=express.Router();
// router.get("/",(req,res)=>{
//    res.send("all users");
// });
// router.post("/", (req, res) => {
//   res.send("Create user");
// });
// module.exports=router;

// logger midddleware
function requestLogger(req,res,next){
   const timestamp=new Date().toISOString();
   console.log(`${timestamp}-${req.headers} ${req.url}`);
   next();
}


function authenticate (req,res,next){
   const header=req.headers.authorization;
   if(!header){
      return res.status(401).send('auth token rrequried');
   }
   const token=header.split(' ')[1];
   console.log(`token ${token}`);
   if(token==='secret-token'){
      req.user={id:123, username:'john'};
      next();
   }
   else{
      res.status(403).send('invalid token');
   }
}
// app.use(requestLogger);
app.get('/api/protected', authenticate,(req,res)=>{
   res.json({messgae:'Protected data',user:req.user});
});

function validateUserCred(req,res,next){
   const {username,email,password}=req.body;
   if(!username ||username.length<3){
      return res.status(400).json({error:'Username must be atleast more than 3 characters'});
   }
   if(!email || !email.includes('@')){
      return res.staus(400).json({error:'Valid emial not found'});
   }
   if(!password || password.length<6){
      return res.status(400).json({error:'Password muts be above 6 char'});
   }
   next();
}
app.post('/api/users', validateUserCred,(req,res)=>{
   res.status(201).json({message:'User created succesfully'});
   res.status(500).json({message:'User created failed'});
})

// error handling err,req,res,next
app.use((err,req,res,next)=>{
   console.error(err.stack);
   // const err=new Error('Name is needed');
   err.statusCode=400;
   return next(err);
   // res.status(500).json({error:'something wnet wrong'});
})

app.get('/async-data', async(req,res,next)=>{
   try{
      const data=await fetchfromdb();
      res.json(data);
   } catch(error){
      next(error);
   }
});

// CORS //cross origin resource sharing
/*
1) install cors
2) custom 
*/
const cors=require ('cors');

// const corsOption={
//    origin:'http://localhost:8080',
//    methods:['GET','POST'],
//    allowedHeaders:['Content-Type','Authorization'],
//    credentials:true
// };
// app.use(cors(corsOption));

app.use(cors({
   origin:'http://localhost:3000',
   credentails:true
}));
app.get('/api/hello',(req,res)=>{
   res.json({message:'cors workign finr'})
});

// handling diff env varibales
// .env.dev, .qa. .staging .prod

