import { App, Stack } from 'aws-cdk-lib';
import { Secret } from '../src/';

const app = new App();
const stack = new Stack(app, 'IntegrationTest-Secrets', {
  env: {
    account: '071128183726',
    region: 'us-east-1',
  },
});
new Secret(stack, 'MySecret', {
  generateSecretString: {
    secretStringTemplate: JSON.stringify({
      username: 'my-username',
      password: 'my-password',
    }),
    generateStringKey: 'new-field',
    excludePunctuation: true,
    excludeNumbers: true,
    excludeCharacters: 'abc',
    excludeUppercase: true,
    passwordLength: 40,
  },
});


app.synth();
