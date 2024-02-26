import { CustomResource } from 'aws-cdk-lib';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Secret as AWSSecret, SecretProps, SecretStringGenerator } from 'aws-cdk-lib/aws-secretsmanager';
import { Provider } from 'aws-cdk-lib/custom-resources';
import { Construct } from 'constructs';
import { EventHandlerFunction } from './EventHandler/EventHandler-function';

export class Secret extends AWSSecret {
  constructor(scope: Construct, id: string, props: SecretProps) {
    super(scope, id, {
      ...props,
      generateSecretString: undefined, // explicitly set this to undefined so that we never use the built-in functionality
    });

    if (props.generateSecretString) {
      // now we're going to use a custom resource for this instead
      this.createCustomResource(props.generateSecretString);
    }
  }

  private createCustomResource(generateSecretString: SecretStringGenerator) {
    const eventHandler = new EventHandlerFunction(this, 'EventHandlerFunction', { });
    this.grantWrite(eventHandler);
    this.grantRead(eventHandler);
    eventHandler.addToRolePolicy(new PolicyStatement({
      effect: Effect.ALLOW,
      resources: ['*'],
      actions: ['secretsmanager:GetRandomPassword'],
    }));
    const provider = new Provider(this, 'CustomResourceProvider', {
      onEventHandler: eventHandler,
    });
    const customResource = new CustomResource(this, 'GenerateSecretStringCR', {
      resourceType: 'Custom::GenerateSecretString',
      serviceToken: provider.serviceToken,
      properties: {
        Secret: this.secretArn,
        GenerateSecretString: generateSecretString,
      },
    });
    customResource.node.addDependency(this);
  }
}
