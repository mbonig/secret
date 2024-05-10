# @matthewbonig/secrets

The AWS Secrets Manager [Secret](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_secretsmanager.Secret.html) construct has a big footgun, **if you update the `generateSecretString` property, the secret gets recreated!**
This isn't exactly a flaw of the CDK, but of how CloudFormation handles this property.

So, this library has a single construct with a single intention, to allow you to update the `generateSecretString` property without recreating the secret.

> [!WARNING]  
> If you have an existing aws-cdk-lib/aws_secretsmanager.Secret, you can replace it with this new construct. However,
> when you update your stack the existing value will be completely wiped out and re-created using the new construct. 
> Make a backup of your secret before using this new construct on an existing secret.

## Design Philosophy

Secrets are the AWS-preferred method for passing configuration values to runtime components. However, with the existing
secret it's painful to manage the contents of a secret over the life of a project. You can't provide all your configuration
values directly in your `generateSecretString` property because you'll then likely expose sensitive
IaC. However, you also can't just leave this field completely blank because it will either make post-deployment changes
to the secret more error-prone (as someone may manually enter in field names incorrectly) or it will make it impossible
for some services to work at all until a post-deployment change is made, like ECS.

So, this construct is designed to make it so you can update the `generateSecretString` property without recreating the secret.
This allows you to define the basic shape of a secret through your IaC ensuring that post-deployment updates are done
with fewer errors. 

It is a fundamental principle of this construct that:
* The values stored in secrets are required to be updated manually outside of the IaC process.
* The shape of the secret is defined in the IaC process.
* Changes to the shape of the secret are made through the IaC process. 
* Changes to the shape and values of the secret in IaC do not affect fields and values that were not changed in IaC.
* Changes made to the value of the secret through an outside process are retained unless explicitly changed through IaC.

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

There are a few different scenarios when you make changes to the `generateSecretString` property:

1. **No change**: If you don't change the `generateSecretString` property, the secret will not be updated.
2. **Change**: If you change the `generateSecretString` property, by adding a new property, the secret will be updated, and only the new property will be changed. For example, if you add 'api-key' to the object then the secret will get the additional 'api-key' field added to it and all other properties will not be affected.
3. **Change**: If you update the value of an existing property on the `generateSecretString` property, the secret will be updated, and only the updated property will be changed. For example, if you change the value of 'password' to a new value, then only the 'password' property will be updated on the secret.
4. **Change**: If you change the `generateStringKey` field, then a new field will be added to the secret. The previously generated field will not be removed from the secret. 
5. **Change**: If you change any of the properties that define how the `generateStringKey` should be generated, like the `excludePunctuation` property, then the field specified by the `generateStringKey` will be regenerated with the new parameters and the other fields will remain unchanged.
4. **Remove**: If you remove a property from the `generateSecretString` property, the secret will be updated, and the property will be removed from the secret and all other properties will remain unchanged.

## Example

Let's begin with a simple secret with two fields, `username` and `password`.

```typescript
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

You can update the fields manually. Let's say you update the password field:

```json
{
  "username": "my-username",
  "password": "new-password"
}
```

Later, you update the Secret and add a new field to the `generateSecretString` property:

```typescript
new Secret(this, 'MySecret', {
  generateSecretString: {
    generateStringKey: 'password',
    secretStringTemplate: JSON.stringify({
      username: 'my-username',
      password: 'some-password',
      someNewField: 'some-new-value',
    }),
  },
});
```

When deployed, the `someNewField` will be added to the secret but the other fields will remain unchanged.

Later on, you can also update the `generateSecretString` property and update an existing field:

```typescript
new Secret(this, 'MySecret', {
  generateSecretString: {
    generateStringKey: 'password',
    secretStringTemplate: JSON.stringify({
      username: 'my-username',
      password: 'some-new-password',
      someNewField: 'some-new-value',
    }),
  },
});
```

Now the value for `password` will be updated to the new value without changing the values of `username` or `someNewField`.

Finally, you can remove a field from the `generateSecretString` property, like `someNewField`:

```typescript
new Secret(this, 'MySecret', {
  generateSecretString: {
    generateStringKey: 'password',
    secretStringTemplate: JSON.stringify({
      username: 'my-username',
      password: 'some-new-password',
    }),
  },
```

The value will be removed from the secret without affecting the other fields.





