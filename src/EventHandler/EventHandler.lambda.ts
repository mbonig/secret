import {
  GetRandomPasswordCommand,
  GetSecretValueCommand,
  PutSecretValueCommand,
  SecretsManager,
} from '@aws-sdk/client-secrets-manager';

const client = new SecretsManager({});

async function createSecretValue({ generateSecretString, secretArn }: { secretArn: any; generateSecretString: any }) {
  // since this is a create, we can just write the value as-is...
  const secretValue = JSON.parse(generateSecretString.SecretStringTemplate);
  if (generateSecretString.GenerateStringKey) {
    const randomValue = await client.send(new GetRandomPasswordCommand({
      ...generateSecretString,
    }));
    secretValue[generateSecretString.GenerateStringKey] = randomValue.RandomPassword;
  }

  await client.send(new PutSecretValueCommand({
    SecretId: secretArn,
    SecretString: JSON.stringify(secretValue),
  }));
}

function didRandomPropertiesChange(oldGenerateSecretString: any, generateSecretString: any) {
  return oldGenerateSecretString.ExcludeCharacters !== generateSecretString.ExcludeCharacters ||
    oldGenerateSecretString.ExcludeLowercase !== generateSecretString.ExcludeLowercase ||
    oldGenerateSecretString.ExcludeNumbers !== generateSecretString.ExcludeNumbers ||
    oldGenerateSecretString.ExcludePunctuation !== generateSecretString.ExcludePunctuation ||
    oldGenerateSecretString.ExcludeUppercase !== generateSecretString.ExcludeUppercase ||
    oldGenerateSecretString.IncludeSpace !== generateSecretString.IncludeSpace ||
    oldGenerateSecretString.PasswordLength !== generateSecretString.PasswordLength ||
    oldGenerateSecretString.RequireEachIncludedType !== generateSecretString.RequireEachIncludedType;

}

async function updateSecretValue({ oldGenerateSecretString, generateSecretString, secretArn }: {
  secretArn: any;
  generateSecretString: any;
  oldGenerateSecretString: any;
}) {
  // let's get the existing value
  const existingSecretValue = await client.send(new GetSecretValueCommand({
    SecretId: secretArn,
  }));
  // and parse the existing value
  const parsedValue = JSON.parse(existingSecretValue.SecretString!);

  // now let's check what properties have changed
  const newSecretStringTemplate = JSON.parse(generateSecretString.SecretStringTemplate);
  const oldSecretStringTemplate = JSON.parse(oldGenerateSecretString.SecretStringTemplate);
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
    || generateSecretString.GenerateStringKey !== oldGenerateSecretString.GenerateStringKey) {
    const { RandomPassword: newRandomValue } = await client.send(new GetRandomPasswordCommand({
      ...generateSecretString,
    }));
    parsedValue[generateSecretString.GenerateStringKey] = newRandomValue;
  }

  // update the secret in AWS
  await client.send(new PutSecretValueCommand({
    SecretId: secretArn,
    SecretString: JSON.stringify(parsedValue),
  }));

}

interface CustomResource {
  RequestType: 'Create' | 'Update' | 'Delete';
  LogicalResourceId: string;
  ResourceProperties: any;
  OldResourceProperties?: any;
  PhysicalResourceId?: string;
}

export const handler = async (event: CustomResource) => {
  console.log('Received event:', JSON.stringify(event, null, 2));

  switch (event.RequestType) {
    case 'Create':
      console.log(`Create secret value for secret ${event.LogicalResourceId};`);
      await createSecretValue({
        secretArn: event.ResourceProperties.Secret,
        generateSecretString: event.ResourceProperties.GenerateSecretString,
      });
      break;
    case 'Update':
      console.log('Updating secret with physical id:', event.PhysicalResourceId);
      await updateSecretValue({
        secretArn: event.ResourceProperties.Secret,
        generateSecretString: event.ResourceProperties.GenerateSecretString,
        oldGenerateSecretString: event.OldResourceProperties.GenerateSecretString,
      });
      break;
    case 'Delete':
      console.log('Deleting secret with physical id:', event.PhysicalResourceId);
      console.log('Doing nothing. deleting secrets requires no work at all.');
      break;
  }
};
