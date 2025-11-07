import { APIGatewayProxyHandler } from 'aws-lambda';

export const hello: APIGatewayProxyHandler = async (event) => {
  const name = event.queryStringParameters?.name || 'Guest';

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: `Hello, ${name}! 👋 from Serverless Framework + TypeScript`,
      method: event.httpMethod,
      time: new Date().toISOString(),
    }),
  };
};
