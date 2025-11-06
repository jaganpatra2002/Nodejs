import Express, {Request,Response } from "express";
import { apiLimiter } from "./middleware/rateLimit";
const app=Express();
const port =8080;
// api rate limited not applied
app.get('/',(req:Request,res:Response)=>{
    res.send('Hello World this api is not limited');
})
// api rate limited  applied
app.get('/api/data', apiLimiter,(req:Request,res:Response)=>{
        res.send({ message: 'This data is rate limited to 100 requests per 15 minutes per IP.' });
})
app.listen(port,()=>{
    console.log(`servr running in port ${port}`);
})