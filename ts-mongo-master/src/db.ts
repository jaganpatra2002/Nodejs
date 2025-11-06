import {MongoClient} from 'mongodb';
const uri="mongodb+srv://patrajagankumar2002_db_user:7eRZa3aLpkRo7uT4@cluster2002.zzebjw0.mongodb.net/?appName=Cluster2002";
const client=new MongoClient(uri);
export const connectDB =async()=>{
    try{
        await client.connect();
        console.log("Connected to MongoDB Atlas");
        return client.db("postsDB");
    }
    catch(err){
        console.log("Mongodb error");
    }
}
connectDB();