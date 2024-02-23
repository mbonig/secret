import { CdkConstruct } from '@matthewbonig/cdk-construct-library';
const project = new CdkConstruct({
  devDeps: ['@matthewbonig/cdk-construct-library'],
  name: 'my-construct',
});
project.addDevDeps(
  '@aws-sdk/client-secrets-manager',
  '@types/aws-lambda',
  'aws-sdk-client-mock',
  'aws-sdk-client-mock-jest',
);

project.addTask('test:integration', {
  exec: 'npx cdk --app "npx ts-node -P tsconfig.json --prefer-ts-exts test/Secret.integ.ts"',
  description: 'Run integration tests',
  receiveArgs: true,
});

project.synth();
