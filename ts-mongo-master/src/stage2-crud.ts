import { connectDB } from "./db";
import { User } from "./models/user";
import {Post,Comment} from "./models/post2";
import { ObjectId } from "mongodb";
const run=async () => {
    const db=await connectDB();
    const users= db!.collection<User>("users");
    const posts=db!.collection<Post>("posts");

    // create a user
    const user:User={
        name:"Jagan",
        email:"jagan@gmail.com",
        bio:"Node.js & server",
        createdAt:new Date(),
    };

    const insertUser=await users.insertOne(user);
    console.log("User Created:", insertUser.insertedId);

    // create a post referenicgn that user
    const post:Post={
         title: "Schema Design in MongoDB",
    body: "Understanding embedding vs referencing is crucial.",
    authorId: insertUser.insertedId.toString(),
    tags: ["mongodb", "schema", "design"],
    comments: [],
    createdAt: new Date(),
    };
    const postByUser=await posts.insertOne(post);
console.log("✅ Post Created:", postByUser.insertedId);

// add an comment to the post
const newcomment:Comment={
    user:"jagan",
    text:"this was good",
    createdAt:new Date()
}
await posts.updateOne(
    {_id:postByUser.insertedId},
    {$push:{comments:newcomment}}
);
console.log("Comment added");


}