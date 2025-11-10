import {DynamoDBClient,ScanCommand} from "@aws-sdk/client-dynamodb";
import {unmarshall} from "@aws-sdk/util-dynamodb";
const client=new DynamoDBClient({});
export async function getCustomer(){
    try {
        const db=await client.send(
            new ScanCommand({
                TableName: "customer_table"
            })
        )
        const items= db.Items?.map((item)=> unmarshall(item) );
        return {
            statusCode:200,
            body:JSON.stringify({
                customers:items
            })
        }
    } catch (error) {
        console.log("Error",error);
        return{
            statusCode:500,
              body:JSON.stringify({
                message:"Failed to retrieve customers",
            })
        }
    }
}