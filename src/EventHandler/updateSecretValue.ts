import {
  GetRandomPasswordCommand,
  GetSecretValueCommand,
  PutSecretValueCommand,
} from '@aws-sdk/client-secrets-manager';
import { client } from './client';
import { didRandomPropertiesChange } from './didRandomPropertiesChange';

export async function updateSecretValue({ oldGenerateSecretString, generateSecretString, secretArn }: {
  secretArn: any;
  generateSecretString: any;
  oldGenerateSecretString: any;
}) {
  // let's get the existing value
  const existingSecretValue = await client.send(new GetSecretValueCommand({
    SecretId: secretArn,
  }));
  // and parse the existing value
  let parsedValue: any = {};

  try {
    parsedValue = JSON.parse(existingSecretValue.SecretString!);
  } catch (err) {
    // the existing value couldn't be parsed, it was probably a random string.
    // let's go ahead and just start fresh then,
  }

  // now let's check what properties have changed
  const newSecretStringTemplate = JSON.parse(generateSecretString.secretStringTemplate);
  const oldSecretStringTemplate = JSON.parse(oldGenerateSecretString.secretStringTemplate);
  for (const key in newSecretStringTemplate) {
    if (oldSecretStringTemplate[key] === undefined) {
      // ok, so here's something to add...
      parsedValue[key] = newSecretStringTemplate[key];
    }
    if (oldSecretStringTemplate[key] !== newSecretStringTemplate[key]) {
      // ok, so here's something to update...
      parsedValue[key] = newSecretStringTemplate[key];
    }
  }
  for (const key in oldSecretStringTemplate) {
    if (newSecretStringTemplate[key] === undefined) {
      // ok, so here's something to remove...
      delete parsedValue[key];
    }
  }

  // did anything around the GenerateStringKey change?
  if (didRandomPropertiesChange(oldGenerateSecretString, generateSecretString)
    || generateSecretString.generateStringKey !== oldGenerateSecretString.generateStringKey) {
    const { RandomPassword: newRandomValue } = await client.send(new GetRandomPasswordCommand({
      ExcludeLowercase: generateSecretString.excludeLowercase === 'true',
      ExcludeNumbers: generateSecretString.excludeNumbers === 'true',
      ExcludePunctuation: generateSecretString.excludePunctuation === 'true',
      ExcludeUppercase: generateSecretString.excludeUppercase === 'true',
      IncludeSpace: generateSecretString.includeSpace === 'true',
      PasswordLength: +generateSecretString.passwordLength,
      RequireEachIncludedType: generateSecretString.requireEachIncludedType === 'true',
    }));
    parsedValue[generateSecretString.generateStringKey] = newRandomValue;
  }

  // update the secret in AWS
  await client.send(new PutSecretValueCommand({
    SecretId: secretArn,
    SecretString: JSON.stringify(parsedValue),
  }));

}
