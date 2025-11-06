const express=require('express');
const app=express();
const port =8080;
const {body,validationResult}=require('express-validator');
app.use(express.json());
app.post('/signup',[
    body('email').isEmail(),
    body('password').isLength({min:6}),
    body('username').notEmpty()
],(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()});
    }
    res.send('Data validated!');
});
app.listen(port);

// best for express-specificvalidation