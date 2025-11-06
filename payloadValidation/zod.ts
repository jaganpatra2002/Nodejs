import express from 'express';
import {z} from 'zod';
const app=express();
app.use(express.json());
const userSchema=z.object({
    username:z.string().min(3),
    email:z.string().email(),
    password:z.string().min(6)
});
app.post('/api/register',(req,res)=>{
    const result=userSchema.safeParse(req.body);
    if(!result.success){
      return res.status(400).json({ error: result.error.issues });   
    }
    res.json({message:'user createed'});
})
app.listen(8080, () => console.log('Server running on port 8080'));