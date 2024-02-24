import { GetRandomPasswordCommand, PutSecretValueCommand } from '@aws-sdk/client-secrets-manager';
import { client } from './client';

export async function createSecretValue({ generateSecretString, secretArn }: {
  secretArn: any;
  generateSecretString: any;
}) {
  // since this is a create, we can just write the value as-is...
  const secretValue = JSON.parse(generateSecretString.secretStringTemplate);
  if (generateSecretString.generateStringKey) {
    const randomValue = await client.send(new GetRandomPasswordCommand({
      ExcludeCharacters: generateSecretString.excludeCharacters,
      ExcludeLowercase: generateSecretString.excludeLowercase,
      ExcludeNumbers: generateSecretString.excludeNumbers,
      ExcludePunctuation: generateSecretString.excludePunctuation,
      ExcludeUppercase: generateSecretString.excludeUppercase,
      IncludeSpace: generateSecretString.includeSpace,
      PasswordLength: generateSecretString.passwordLength,
      RequireEachIncludedType: generateSecretString.requireEachIncludedType,
    }));
    secretValue[generateSecretString.generateStringKey] = randomValue.RandomPassword;
  }

  await client.send(new PutSecretValueCommand({
    SecretId: secretArn,
    SecretString: JSON.stringify(secretValue),
  }));
}
