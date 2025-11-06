const dotenv=require('dotenv');
const path=require('path');
const envFile=`.env.${process.env.NODE_ENV || 'development'}`;
dotenv.config({path: path.resolve(__dirname,envFile)});
console.log(`[config] Loaed from: ${envFile}`);
module.exports = {
  port: process.env.PORT,
  dbUrl: process.env.DB_URL,
  jwtSecret: process.env.JWT_SECRET,
  nodeEnv: process.env.NODE_ENV
};