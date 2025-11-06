import express,{Request,Response} from 'express';
const app=express();
const port =8080;
app.use(express.json());

interface User {
    id:number;
    name:string;
    email:string;
}

let users:User[]=[
    {id:1,name:'Jagan', email:'test1@gmail.com'},
    {id:2,name:'patra',email:'test2@gmail.com'}
];
// get all users
app.get('/api/users',(req:Request,res:Response)=>{
    console.log('fetched all users');
    res.status(200).json(users);
})

// get specific by id

interface UserParams{
    id:number;
}

app.get('/api/userId/:id',(req:Request<UserParams>,res:Response)=>{
const userbyId =req.params.id;
const data=users.find((u)=>u.id === userbyId);
});


// CONTROLLER
const User=require('../payloadValidation/models/User');
const getUsers=async (req:Request,res:Response)=>{
    try{
        const users=await User.findAll();
        res.status(200).json(users);
    }
    catch(error){
        res.status(500).json({message:'Error retrieving users'})
    }
}
module.exports={getUsers};