import {connectDB} from './db';
import {Post} from "./models/post1";
const run=async()=>{
    let db=await connectDB();
    let posts=db!.collection<Post>("posts");
    // create a new post 
    const newPost: Post={
    title: "Learning MongoDB with TypeScript",
    body: "MongoDB native driver gives more control than Mongoose.",
    author: "Jagan",
    tags: ["mongodb", "typescript"],
    likes: 0,
    createdAt: new Date(),
    };
    const addData=await posts.insertOne(newPost);
      console.log("Inserted Post ID:", addData.insertedId);

    //   read
    const allposts=await posts.find().toArray();
    console.log("All posts", allposts);
    // update
     const updateResult = await posts.updateOne(
    { title: "Learning MongoDB with TypeScript" },
    { $set: { likes: 5 } }
  );
  console.log("Updated Documents:", updateResult.modifiedCount);

//   delete
  const deleteResult = await posts.deleteOne({ author: "Jagan" });
  console.log("Deleted Documents:", deleteResult.deletedCount);

//   process.exit(0);
}
run();