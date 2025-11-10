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

// hello-lambda-api/auth/signup.ts
var signup_exports = {};
__export(signup_exports, {
  signup: () => signup
});
module.exports = __toCommonJS(signup_exports);
var import_client_cognito_identity_provider = require("@aws-sdk/client-cognito-identity-provider");
var client = new import_client_cognito_identity_provider.CognitoIdentityProviderClient({});
async function signup(event) {
  try {
    const body = JSON.parse(event.body);
    const { email, password } = body;
    const command = new import_client_cognito_identity_provider.SignUpCommand({
      ClientId: "3t1cipggjjbcapot79o3duomsm",
      Username: email,
      Password: password,
      UserAttributes: [{ Name: "email", Value: email }]
    });
    const response = await client.send(command);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "User registered",
        response
      })
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: "Something went wrong",
        error
      })
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  signup
});
//# sourceMappingURL=signup.js.map
