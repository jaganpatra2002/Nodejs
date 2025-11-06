const express=require('express');
const Joi=require('joi');
const app=express();
const port=8080;
app.use(express.json());

const userSchema=Joi.object({
    username:Joi.string().min(3).required(),
    email:Joi.string().email().required(),
    password:Joi.string().min(6).required()
});
app.post('/register',(req,res)=>{
    const{error}=userSchema.validate(req.body);
    if(error){
        return res.status(400).json({error:error.details[0].message});
    }
    res.json({message:"User validated successfully"});
});
app.listen(port);

//joi used for json validation payload