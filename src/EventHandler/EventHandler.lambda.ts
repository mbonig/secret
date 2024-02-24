import { createSecretValue } from './createSecretValue';
import { updateSecretValue } from './updateSecretValue';

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
