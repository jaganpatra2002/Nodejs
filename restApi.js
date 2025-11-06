const express=require('express');
const app=express();
const port=8080;
app.use(express.json());
let users=[
    {id:1,name:'Jagan', email:'test1@gmail.com'},
    {id:2,name:'patra',email:'test2@gmail.com'}
];
// get api
app.get('/api/users',(req,res)=>{
    console.log('Users api called GET ');
    res.status(200).send(users);
})

// retrive specific users
app.get('/api/userId/:id',(req,res)=>{
    const user=users.find(u=>u.id ===parseInt(req.params.id));
    if(!user) return res.status(404).json({message:'User not found'});
    res.json(user);
})

// post create a new user'
app.post('/api/newUser',(req,res)=>{
    const newUsers={
        id:users.length+1,
        name:req.body.name,
        email:req.body.email
    };
    users.push(newUsers);
    res.status(201).json(newUsers);
})

// put update user compleetely
app.put('/updateUser/:userId',(req,res)=>{
    const user=users.find(u=>u.id===parseInt(req.params.id));
    if(!user) return res.status(404).json({message:'User not found'});
    user.name=req.body.name;
    user.email=req.body.email;
    res.json(user);
})

// delete
app.delete('/deleteUser/:userId',(req,res)=>{
    const uid=users.find(i=>i.id===parseInt(req.params.id));
    if(uid===-1) return res.status(404).json({messgae:'User not found'});
    const deletedUser = users.splice(index, 1);
   res.json({ message: "User deleted", deletedUser });
});

// filtering & pagination
app.get('/api/products?category=electrnoics&sort=price&limit=10&page=2');
app.listen(port);