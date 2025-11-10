"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// hello-lambda-api/auth/login.ts
var login_exports = {};
__export(login_exports, {
  login: () => login
});
module.exports = __toCommonJS(login_exports);
var import_client_cognito_identity_provider = require("@aws-sdk/client-cognito-identity-provider");
var client = new import_client_cognito_identity_provider.CognitoIdentityProviderClient({ region: "us-east-1" });
var login = async (event) => {
  try {
    const body = typeof event.body === "string" ? JSON.parse(event.body) : event.body;
    console.log("Received body:", body);
    const { email, password } = body;
    if (!email || !password) {
      throw new Error("Email or password missing from request body");
    }
    const command = new import_client_cognito_identity_provider.InitiateAuthCommand({
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: "3t1cipggjjbcapot79o3duomsm",
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password
      }
    });
    const response = await client.send(command);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Login successful",
        tokens: response.AuthenticationResult
      })
    };
  } catch (error) {
    console.log("Error", error);
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "Login failed",
        details: error.message
      })
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  login
});
//# sourceMappingURL=login.js.map
