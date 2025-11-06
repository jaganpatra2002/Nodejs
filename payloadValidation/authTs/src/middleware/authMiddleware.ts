import {Request,Response,NextFunction} from 'express';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

interface JwtPayload{
    id:number;
    username:string;
}

export const authentication=(req:Request,res:Response,next:NextFunction)=>{
    const authHeader=req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if(!token){
        return res.status(401).json({message:"No token found"});
    }
    try {
        const decoded =jwt.verify(token,process.env.JWT_SECRET!) as JwtPayload;
        (req as any).user =decoded;
        next();
    } catch (error) {
            return res.status(403).json({ message: "Invalid or expired token" });
    }
};
