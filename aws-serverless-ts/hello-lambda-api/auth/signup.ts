import {CognitoIdentityProviderClient, SignUpCommand} from "@aws-sdk/client-cognito-identity-provider";

const client=new CognitoIdentityProviderClient({});
export  async function signup(event:any){
    try {
        const body=JSON.parse(event.body);
        const {email,password}=body;
        const command=new SignUpCommand({
            ClientId: "3t1cipggjjbcapot79o3duomsm",
            Username:email,
            Password:password,
            UserAttributes:[{Name:"email", Value:email}]
        });
        const response=await client.send(command);
        return {
            statusCode:200,
            body:JSON.stringify({
                message:"User registered", response
            })
        }

    } catch (error) {
        console.log(error);
        return {
            statusCode:404,
            body:JSON.stringify({
                message:"Something went wrong", error
            })
        }
    }
}