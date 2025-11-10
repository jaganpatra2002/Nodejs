import { CognitoIdentityProviderClient, InitiateAuthCommand } from "@aws-sdk/client-cognito-identity-provider";

const client = new CognitoIdentityProviderClient({ region: "us-east-1" });

export const login = async (event: any) => {
  try {
    const body = typeof event.body === "string" ? JSON.parse(event.body) : event.body;
    console.log("Received body:", body);

    const { email, password } = body;

    if (!email || !password) {
      throw new Error("Email or password missing from request body");
    }

    const command = new InitiateAuthCommand({
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: "3t1cipggjjbcapot79o3duomsm",
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
      },
    });

    const response = await client.send(command);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Login successful",
        tokens: response.AuthenticationResult,
      }),
    };
  } catch (error: any) {
    console.log("Error", error);
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "Login failed",
        details: error.message,
      }),
    };
  }
};
