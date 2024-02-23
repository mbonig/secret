# @matthewbonig/secrets

The AWS Secrets Manager [Secret](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_secretsmanager.Secret.html) construct has a big footgun, **if you update the `generateSecretString` property, the secret gets recreated!**
This isn't exactly a flaw of the CDK, but of how CloudFormation handles this property.

So, this library has a single construct with a single intention, to allow you to update the `generateSecretString` property without recreating the secret.

## Usage

```typescript
import { Secret } from '@matthewbonig/secrets';
// ....
new Secret(this, 'MySecret', {
  generateSecretString: {
    generateStringKey: 'password',
    secretStringTemplate: JSON.stringify({
      username: 'my-username',
      password: 'some-password',
    }),
  },
});
```

This is a drop-in replacement, and has the same API surface area as the original `aws_secretsmanager.Secret` construct. The difference is that the `generateSecretString` property can be updated without recreating the secret.

There are a few different scenarios when you make changes to the generateSecretString property:

1. **No change**: If you don't change the `generateSecretString` property, the secret will not be updated.
2. **Change**: If you change the `generateSecretString` property, by adding a new property, the secret will be updated, and only the new property will be updated. For example, if you add 'api-key' to the object then the secret will get the additional 'api-key' field added to it and all other properties will not be affected.
3. **Change**: If you update the value of an existing property on the `generateSecretString` property, the secret will be updated, and only the updated property will be changed. For example, if you change the value of 'password' to a new value, then only the 'password' property will be updated on the secret.
4. **Remove**: If you remove a property from the `generateSecretString` property, the secret will be updated, and the property will be removed from the secret.





