// import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
// import { v4 as uuidv4 } from "uuid";
// const client = new DynamoDBClient({});
// export async function createCustomer(event: any) {
//     try {
//         const body = JSON.parse(event.body);
//         const id = uuidv4();
//         await client.send(new PutItemCommand({
//             TableName: "customer_table",
//             Item: {
//                 primary_key: { S: id },
//                 name: { S: body.name },
//                 email: { S: body.email },
//             },
//         }));
//         return {
//             statusCode: 201,
//             body: JSON.stringify({ message: "book added", id })
//         }
//     } catch (error) {
//         console.error("Error", error);
//         return {
//             statusCode: 500,
//             body: JSON.stringify({
//                 error: "Failed to create customer",
//             })
//         }
//     }
// }

import {MongoClient} from 'mongodb';
const client=new MongoClient("mongodb+srv://jaganpatra_db_user:Patra123@cluster0.twvcjqe.mongodb.net/?appName=Cluster0");
export const createCustomer=async(event:any)=>{
    try {
        await client.connect();
        const mydb=client.db("Database");
        const customers=mydb.collection('serverlessDb');
        const body=JSON.parse(event.body);
        await customers.insertOne({name:body.name, email:body.email});
        return {
            statusCode:200,
            body:JSON.stringify("Customer added")
        }
    } catch (error) {
        console.log("Error",error);
        return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to add customer" }),
    };
    }
}