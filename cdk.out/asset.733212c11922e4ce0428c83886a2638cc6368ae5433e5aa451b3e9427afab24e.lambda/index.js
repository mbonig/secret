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

// src/EventHandler/EventHandler.lambda.ts
var EventHandler_lambda_exports = {};
__export(EventHandler_lambda_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(EventHandler_lambda_exports);
var import_client_secrets_manager = require("@aws-sdk/client-secrets-manager");
var client = new import_client_secrets_manager.SecretsManager({});
async function createSecretValue({ generateSecretString, secretArn }) {
  const secretValue = JSON.parse(generateSecretString.secretStringTemplate);
  if (generateSecretString.generateStringKey) {
    const randomValue = await client.send(new import_client_secrets_manager.GetRandomPasswordCommand({
      ExcludeLowercase: generateSecretString.excludeLowercase,
      ExcludeNumbers: generateSecretString.excludeNumbers,
      ExcludePunctuation: generateSecretString.excludePunctuation,
      ExcludeUppercase: generateSecretString.excludeUppercase,
      IncludeSpace: generateSecretString.includeSpace,
      PasswordLength: generateSecretString.passwordLength,
      RequireEachIncludedType: generateSecretString.requireEachIncludedType
    }));
    secretValue[generateSecretString.generateStringKey] = randomValue.RandomPassword;
  }
  await client.send(new import_client_secrets_manager.PutSecretValueCommand({
    SecretId: secretArn,
    SecretString: JSON.stringify(secretValue)
  }));
}
function didRandomPropertiesChange(oldGenerateSecretString, generateSecretString) {
  return oldGenerateSecretString.ExcludeCharacters !== generateSecretString.ExcludeCharacters || oldGenerateSecretString.ExcludeLowercase !== generateSecretString.ExcludeLowercase || oldGenerateSecretString.ExcludeNumbers !== generateSecretString.ExcludeNumbers || oldGenerateSecretString.ExcludePunctuation !== generateSecretString.ExcludePunctuation || oldGenerateSecretString.ExcludeUppercase !== generateSecretString.ExcludeUppercase || oldGenerateSecretString.IncludeSpace !== generateSecretString.IncludeSpace || oldGenerateSecretString.PasswordLength !== generateSecretString.PasswordLength || oldGenerateSecretString.RequireEachIncludedType !== generateSecretString.RequireEachIncludedType;
}
async function updateSecretValue({ oldGenerateSecretString, generateSecretString, secretArn }) {
  const existingSecretValue = await client.send(new import_client_secrets_manager.GetSecretValueCommand({
    SecretId: secretArn
  }));
  let parsedValue = {};
  try {
    parsedValue = JSON.parse(existingSecretValue.SecretString);
  } catch (err) {
  }
  const newSecretStringTemplate = JSON.parse(generateSecretString.secretStringTemplate);
  const oldSecretStringTemplate = JSON.parse(oldGenerateSecretString.secretStringTemplate);
  for (const key in newSecretStringTemplate) {
    if (oldSecretStringTemplate[key] === void 0) {
      parsedValue[key] = newSecretStringTemplate[key];
    }
    if (oldSecretStringTemplate[key] !== newSecretStringTemplate[key]) {
      parsedValue[key] = newSecretStringTemplate[key];
    }
  }
  for (const key in oldSecretStringTemplate) {
    if (newSecretStringTemplate[key] === void 0) {
      delete parsedValue[key];
    }
  }
  if (didRandomPropertiesChange(oldGenerateSecretString, generateSecretString) || generateSecretString.generateStringKey !== oldGenerateSecretString.generateStringKey) {
    const { RandomPassword: newRandomValue } = await client.send(new import_client_secrets_manager.GetRandomPasswordCommand({
      ExcludeLowercase: generateSecretString.excludeLowercase,
      ExcludeNumbers: generateSecretString.excludeNumbers,
      ExcludePunctuation: generateSecretString.excludePunctuation,
      ExcludeUppercase: generateSecretString.excludeUppercase,
      IncludeSpace: generateSecretString.includeSpace,
      PasswordLength: generateSecretString.passwordLength,
      RequireEachIncludedType: generateSecretString.requireEachIncludedType
    }));
    parsedValue[generateSecretString.generateStringKey] = newRandomValue;
  }
  await client.send(new import_client_secrets_manager.PutSecretValueCommand({
    SecretId: secretArn,
    SecretString: JSON.stringify(parsedValue)
  }));
}
var handler = async (event) => {
  console.log("Received event:", JSON.stringify(event, null, 2));
  switch (event.RequestType) {
    case "Create":
      console.log(`Create secret value for secret ${event.LogicalResourceId};`);
      await createSecretValue({
        secretArn: event.ResourceProperties.Secret,
        generateSecretString: event.ResourceProperties.GenerateSecretString
      });
      break;
    case "Update":
      console.log("Updating secret with physical id:", event.PhysicalResourceId);
      await updateSecretValue({
        secretArn: event.ResourceProperties.Secret,
        generateSecretString: event.ResourceProperties.GenerateSecretString,
        oldGenerateSecretString: event.OldResourceProperties.GenerateSecretString
      });
      break;
    case "Delete":
      console.log("Deleting secret with physical id:", event.PhysicalResourceId);
      console.log("Doing nothing. deleting secrets requires no work at all.");
      break;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
