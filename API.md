# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### Secret <a name="Secret" id="@matthewbonig/secret.Secret"></a>

#### Initializers <a name="Initializers" id="@matthewbonig/secret.Secret.Initializer"></a>

```typescript
import { Secret } from '@matthewbonig/secret'

new Secret(scope: Construct, id: string, props: SecretProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@matthewbonig/secret.Secret.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@matthewbonig/secret.Secret.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@matthewbonig/secret.Secret.Initializer.parameter.props">props</a></code> | <code>aws-cdk-lib.aws_secretsmanager.SecretProps</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@matthewbonig/secret.Secret.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@matthewbonig/secret.Secret.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@matthewbonig/secret.Secret.Initializer.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_secretsmanager.SecretProps

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@matthewbonig/secret.Secret.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@matthewbonig/secret.Secret.applyRemovalPolicy">applyRemovalPolicy</a></code> | Apply the given removal policy to this resource. |
| <code><a href="#@matthewbonig/secret.Secret.addReplicaRegion">addReplicaRegion</a></code> | Adds a replica region for the secret. |
| <code><a href="#@matthewbonig/secret.Secret.addRotationSchedule">addRotationSchedule</a></code> | Adds a rotation schedule to the secret. |
| <code><a href="#@matthewbonig/secret.Secret.addToResourcePolicy">addToResourcePolicy</a></code> | Adds a statement to the IAM resource policy associated with this secret. |
| <code><a href="#@matthewbonig/secret.Secret.attach">attach</a></code> | Attach a target to this secret. |
| <code><a href="#@matthewbonig/secret.Secret.denyAccountRootDelete">denyAccountRootDelete</a></code> | Denies the `DeleteSecret` action to all principals within the current account. |
| <code><a href="#@matthewbonig/secret.Secret.grantRead">grantRead</a></code> | Grants reading the secret value to some role. |
| <code><a href="#@matthewbonig/secret.Secret.grantWrite">grantWrite</a></code> | Grants writing and updating the secret value to some role. |
| <code><a href="#@matthewbonig/secret.Secret.secretValueFromJson">secretValueFromJson</a></code> | Interpret the secret as a JSON object and return a field's value from it as a `SecretValue`. |

---

##### `toString` <a name="toString" id="@matthewbonig/secret.Secret.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `applyRemovalPolicy` <a name="applyRemovalPolicy" id="@matthewbonig/secret.Secret.applyRemovalPolicy"></a>

```typescript
public applyRemovalPolicy(policy: RemovalPolicy): void
```

Apply the given removal policy to this resource.

The Removal Policy controls what happens to this resource when it stops
being managed by CloudFormation, either because you've removed it from the
CDK application or because you've made a change that requires the resource
to be replaced.

The resource can be deleted (`RemovalPolicy.DESTROY`), or left in your AWS
account for data recovery and cleanup later (`RemovalPolicy.RETAIN`).

###### `policy`<sup>Required</sup> <a name="policy" id="@matthewbonig/secret.Secret.applyRemovalPolicy.parameter.policy"></a>

- *Type:* aws-cdk-lib.RemovalPolicy

---

##### `addReplicaRegion` <a name="addReplicaRegion" id="@matthewbonig/secret.Secret.addReplicaRegion"></a>

```typescript
public addReplicaRegion(region: string, encryptionKey?: IKey): void
```

Adds a replica region for the secret.

###### `region`<sup>Required</sup> <a name="region" id="@matthewbonig/secret.Secret.addReplicaRegion.parameter.region"></a>

- *Type:* string

The name of the region.

---

###### `encryptionKey`<sup>Optional</sup> <a name="encryptionKey" id="@matthewbonig/secret.Secret.addReplicaRegion.parameter.encryptionKey"></a>

- *Type:* aws-cdk-lib.aws_kms.IKey

The customer-managed encryption key to use for encrypting the secret value.

---

##### `addRotationSchedule` <a name="addRotationSchedule" id="@matthewbonig/secret.Secret.addRotationSchedule"></a>

```typescript
public addRotationSchedule(id: string, options: RotationScheduleOptions): RotationSchedule
```

Adds a rotation schedule to the secret.

###### `id`<sup>Required</sup> <a name="id" id="@matthewbonig/secret.Secret.addRotationSchedule.parameter.id"></a>

- *Type:* string

---

###### `options`<sup>Required</sup> <a name="options" id="@matthewbonig/secret.Secret.addRotationSchedule.parameter.options"></a>

- *Type:* aws-cdk-lib.aws_secretsmanager.RotationScheduleOptions

---

##### `addToResourcePolicy` <a name="addToResourcePolicy" id="@matthewbonig/secret.Secret.addToResourcePolicy"></a>

```typescript
public addToResourcePolicy(statement: PolicyStatement): AddToResourcePolicyResult
```

Adds a statement to the IAM resource policy associated with this secret.

If this secret was created in this stack, a resource policy will be
automatically created upon the first call to `addToResourcePolicy`. If
the secret is imported, then this is a no-op.

###### `statement`<sup>Required</sup> <a name="statement" id="@matthewbonig/secret.Secret.addToResourcePolicy.parameter.statement"></a>

- *Type:* aws-cdk-lib.aws_iam.PolicyStatement

---

##### `attach` <a name="attach" id="@matthewbonig/secret.Secret.attach"></a>

```typescript
public attach(target: ISecretAttachmentTarget): ISecret
```

Attach a target to this secret.

###### `target`<sup>Required</sup> <a name="target" id="@matthewbonig/secret.Secret.attach.parameter.target"></a>

- *Type:* aws-cdk-lib.aws_secretsmanager.ISecretAttachmentTarget

The target to attach.

---

##### `denyAccountRootDelete` <a name="denyAccountRootDelete" id="@matthewbonig/secret.Secret.denyAccountRootDelete"></a>

```typescript
public denyAccountRootDelete(): void
```

Denies the `DeleteSecret` action to all principals within the current account.

##### `grantRead` <a name="grantRead" id="@matthewbonig/secret.Secret.grantRead"></a>

```typescript
public grantRead(grantee: IGrantable, versionStages?: string[]): Grant
```

Grants reading the secret value to some role.

###### `grantee`<sup>Required</sup> <a name="grantee" id="@matthewbonig/secret.Secret.grantRead.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

---

###### `versionStages`<sup>Optional</sup> <a name="versionStages" id="@matthewbonig/secret.Secret.grantRead.parameter.versionStages"></a>

- *Type:* string[]

---

##### `grantWrite` <a name="grantWrite" id="@matthewbonig/secret.Secret.grantWrite"></a>

```typescript
public grantWrite(grantee: IGrantable): Grant
```

Grants writing and updating the secret value to some role.

###### `grantee`<sup>Required</sup> <a name="grantee" id="@matthewbonig/secret.Secret.grantWrite.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IGrantable

---

##### `secretValueFromJson` <a name="secretValueFromJson" id="@matthewbonig/secret.Secret.secretValueFromJson"></a>

```typescript
public secretValueFromJson(jsonField: string): SecretValue
```

Interpret the secret as a JSON object and return a field's value from it as a `SecretValue`.

###### `jsonField`<sup>Required</sup> <a name="jsonField" id="@matthewbonig/secret.Secret.secretValueFromJson.parameter.jsonField"></a>

- *Type:* string

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@matthewbonig/secret.Secret.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@matthewbonig/secret.Secret.isOwnedResource">isOwnedResource</a></code> | Returns true if the construct was created by CDK, and false otherwise. |
| <code><a href="#@matthewbonig/secret.Secret.isResource">isResource</a></code> | Check whether the given construct is a Resource. |
| <code><a href="#@matthewbonig/secret.Secret.fromSecretAttributes">fromSecretAttributes</a></code> | Import an existing secret into the Stack. |
| <code><a href="#@matthewbonig/secret.Secret.fromSecretCompleteArn">fromSecretCompleteArn</a></code> | Imports a secret by complete ARN. |
| <code><a href="#@matthewbonig/secret.Secret.fromSecretNameV2">fromSecretNameV2</a></code> | Imports a secret by secret name. |
| <code><a href="#@matthewbonig/secret.Secret.fromSecretPartialArn">fromSecretPartialArn</a></code> | Imports a secret by partial ARN. |
| <code><a href="#@matthewbonig/secret.Secret.isSecret">isSecret</a></code> | Return whether the given object is a Secret. |

---

##### `isConstruct` <a name="isConstruct" id="@matthewbonig/secret.Secret.isConstruct"></a>

```typescript
import { Secret } from '@matthewbonig/secret'

Secret.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="@matthewbonig/secret.Secret.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isOwnedResource` <a name="isOwnedResource" id="@matthewbonig/secret.Secret.isOwnedResource"></a>

```typescript
import { Secret } from '@matthewbonig/secret'

Secret.isOwnedResource(construct: IConstruct)
```

Returns true if the construct was created by CDK, and false otherwise.

###### `construct`<sup>Required</sup> <a name="construct" id="@matthewbonig/secret.Secret.isOwnedResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

##### `isResource` <a name="isResource" id="@matthewbonig/secret.Secret.isResource"></a>

```typescript
import { Secret } from '@matthewbonig/secret'

Secret.isResource(construct: IConstruct)
```

Check whether the given construct is a Resource.

###### `construct`<sup>Required</sup> <a name="construct" id="@matthewbonig/secret.Secret.isResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

##### `fromSecretAttributes` <a name="fromSecretAttributes" id="@matthewbonig/secret.Secret.fromSecretAttributes"></a>

```typescript
import { Secret } from '@matthewbonig/secret'

Secret.fromSecretAttributes(scope: Construct, id: string, attrs: SecretAttributes)
```

Import an existing secret into the Stack.

###### `scope`<sup>Required</sup> <a name="scope" id="@matthewbonig/secret.Secret.fromSecretAttributes.parameter.scope"></a>

- *Type:* constructs.Construct

the scope of the import.

---

###### `id`<sup>Required</sup> <a name="id" id="@matthewbonig/secret.Secret.fromSecretAttributes.parameter.id"></a>

- *Type:* string

the ID of the imported Secret in the construct tree.

---

###### `attrs`<sup>Required</sup> <a name="attrs" id="@matthewbonig/secret.Secret.fromSecretAttributes.parameter.attrs"></a>

- *Type:* aws-cdk-lib.aws_secretsmanager.SecretAttributes

the attributes of the imported secret.

---

##### `fromSecretCompleteArn` <a name="fromSecretCompleteArn" id="@matthewbonig/secret.Secret.fromSecretCompleteArn"></a>

```typescript
import { Secret } from '@matthewbonig/secret'

Secret.fromSecretCompleteArn(scope: Construct, id: string, secretCompleteArn: string)
```

Imports a secret by complete ARN.

The complete ARN is the ARN with the Secrets Manager-supplied suffix.

###### `scope`<sup>Required</sup> <a name="scope" id="@matthewbonig/secret.Secret.fromSecretCompleteArn.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `id`<sup>Required</sup> <a name="id" id="@matthewbonig/secret.Secret.fromSecretCompleteArn.parameter.id"></a>

- *Type:* string

---

###### `secretCompleteArn`<sup>Required</sup> <a name="secretCompleteArn" id="@matthewbonig/secret.Secret.fromSecretCompleteArn.parameter.secretCompleteArn"></a>

- *Type:* string

---

##### `fromSecretNameV2` <a name="fromSecretNameV2" id="@matthewbonig/secret.Secret.fromSecretNameV2"></a>

```typescript
import { Secret } from '@matthewbonig/secret'

Secret.fromSecretNameV2(scope: Construct, id: string, secretName: string)
```

Imports a secret by secret name.

A secret with this name must exist in the same account & region.
Replaces the deprecated `fromSecretName`.
Please note this method returns ISecret that only contains partial ARN and could lead to AccessDeniedException
when you pass the partial ARN to CLI or SDK to get the secret value. If your secret name ends with a hyphen and
6 characters, you should always use fromSecretCompleteArn() to avoid potential AccessDeniedException.

> [https://docs.aws.amazon.com/secretsmanager/latest/userguide/troubleshoot.html#ARN_secretnamehyphen](https://docs.aws.amazon.com/secretsmanager/latest/userguide/troubleshoot.html#ARN_secretnamehyphen)

###### `scope`<sup>Required</sup> <a name="scope" id="@matthewbonig/secret.Secret.fromSecretNameV2.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `id`<sup>Required</sup> <a name="id" id="@matthewbonig/secret.Secret.fromSecretNameV2.parameter.id"></a>

- *Type:* string

---

###### `secretName`<sup>Required</sup> <a name="secretName" id="@matthewbonig/secret.Secret.fromSecretNameV2.parameter.secretName"></a>

- *Type:* string

---

##### `fromSecretPartialArn` <a name="fromSecretPartialArn" id="@matthewbonig/secret.Secret.fromSecretPartialArn"></a>

```typescript
import { Secret } from '@matthewbonig/secret'

Secret.fromSecretPartialArn(scope: Construct, id: string, secretPartialArn: string)
```

Imports a secret by partial ARN.

The partial ARN is the ARN without the Secrets Manager-supplied suffix.

###### `scope`<sup>Required</sup> <a name="scope" id="@matthewbonig/secret.Secret.fromSecretPartialArn.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `id`<sup>Required</sup> <a name="id" id="@matthewbonig/secret.Secret.fromSecretPartialArn.parameter.id"></a>

- *Type:* string

---

###### `secretPartialArn`<sup>Required</sup> <a name="secretPartialArn" id="@matthewbonig/secret.Secret.fromSecretPartialArn.parameter.secretPartialArn"></a>

- *Type:* string

---

##### `isSecret` <a name="isSecret" id="@matthewbonig/secret.Secret.isSecret"></a>

```typescript
import { Secret } from '@matthewbonig/secret'

Secret.isSecret(x: any)
```

Return whether the given object is a Secret.

###### `x`<sup>Required</sup> <a name="x" id="@matthewbonig/secret.Secret.isSecret.parameter.x"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@matthewbonig/secret.Secret.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@matthewbonig/secret.Secret.property.env">env</a></code> | <code>aws-cdk-lib.ResourceEnvironment</code> | The environment this resource belongs to. |
| <code><a href="#@matthewbonig/secret.Secret.property.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | The stack in which this resource is defined. |
| <code><a href="#@matthewbonig/secret.Secret.property.secretArn">secretArn</a></code> | <code>string</code> | The ARN of the secret in AWS Secrets Manager. |
| <code><a href="#@matthewbonig/secret.Secret.property.secretName">secretName</a></code> | <code>string</code> | The name of the secret. |
| <code><a href="#@matthewbonig/secret.Secret.property.secretValue">secretValue</a></code> | <code>aws-cdk-lib.SecretValue</code> | Retrieve the value of the stored secret as a `SecretValue`. |
| <code><a href="#@matthewbonig/secret.Secret.property.encryptionKey">encryptionKey</a></code> | <code>aws-cdk-lib.aws_kms.IKey</code> | The customer-managed encryption key that is used to encrypt this secret, if any. |
| <code><a href="#@matthewbonig/secret.Secret.property.excludeCharacters">excludeCharacters</a></code> | <code>string</code> | The string of the characters that are excluded in this secret when it is generated. |
| <code><a href="#@matthewbonig/secret.Secret.property.secretFullArn">secretFullArn</a></code> | <code>string</code> | The full ARN of the secret in AWS Secrets Manager, which is the ARN including the Secrets Manager-supplied 6-character suffix. |

---

##### `node`<sup>Required</sup> <a name="node" id="@matthewbonig/secret.Secret.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `env`<sup>Required</sup> <a name="env" id="@matthewbonig/secret.Secret.property.env"></a>

```typescript
public readonly env: ResourceEnvironment;
```

- *Type:* aws-cdk-lib.ResourceEnvironment

The environment this resource belongs to.

For resources that are created and managed by the CDK
(generally, those created by creating new class instances like Role, Bucket, etc.),
this is always the same as the environment of the stack they belong to;
however, for imported resources
(those obtained from static methods like fromRoleArn, fromBucketName, etc.),
that might be different than the stack they were imported into.

---

##### `stack`<sup>Required</sup> <a name="stack" id="@matthewbonig/secret.Secret.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* aws-cdk-lib.Stack

The stack in which this resource is defined.

---

##### `secretArn`<sup>Required</sup> <a name="secretArn" id="@matthewbonig/secret.Secret.property.secretArn"></a>

```typescript
public readonly secretArn: string;
```

- *Type:* string

The ARN of the secret in AWS Secrets Manager.

Will return the full ARN if available, otherwise a partial arn.
For secrets imported by the deprecated `fromSecretName`, it will return the `secretName`.

---

##### `secretName`<sup>Required</sup> <a name="secretName" id="@matthewbonig/secret.Secret.property.secretName"></a>

```typescript
public readonly secretName: string;
```

- *Type:* string

The name of the secret.

For "owned" secrets, this will be the full resource name (secret name + suffix), unless the
'@aws-cdk/aws-secretsmanager:parseOwnedSecretName' feature flag is set.

---

##### `secretValue`<sup>Required</sup> <a name="secretValue" id="@matthewbonig/secret.Secret.property.secretValue"></a>

```typescript
public readonly secretValue: SecretValue;
```

- *Type:* aws-cdk-lib.SecretValue

Retrieve the value of the stored secret as a `SecretValue`.

---

##### `encryptionKey`<sup>Optional</sup> <a name="encryptionKey" id="@matthewbonig/secret.Secret.property.encryptionKey"></a>

```typescript
public readonly encryptionKey: IKey;
```

- *Type:* aws-cdk-lib.aws_kms.IKey

The customer-managed encryption key that is used to encrypt this secret, if any.

When not specified, the default
KMS key for the account and region is being used.

---

##### `excludeCharacters`<sup>Optional</sup> <a name="excludeCharacters" id="@matthewbonig/secret.Secret.property.excludeCharacters"></a>

```typescript
public readonly excludeCharacters: string;
```

- *Type:* string

The string of the characters that are excluded in this secret when it is generated.

---

##### `secretFullArn`<sup>Optional</sup> <a name="secretFullArn" id="@matthewbonig/secret.Secret.property.secretFullArn"></a>

```typescript
public readonly secretFullArn: string;
```

- *Type:* string

The full ARN of the secret in AWS Secrets Manager, which is the ARN including the Secrets Manager-supplied 6-character suffix.

This is equal to `secretArn` in most cases, but is undefined when a full ARN is not available (e.g., secrets imported by name).

---





