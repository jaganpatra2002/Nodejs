import rateLimit from "express-rate-limit";
// configuration for rate limiting an api
export const apiLimiter=rateLimit({
    windowMs:1*10*1000,
    max:1,
    message:"Too many requests from this ip",
    standardHeaders:true,
    legacyHeaders:false,
    statusCode:429,
});
