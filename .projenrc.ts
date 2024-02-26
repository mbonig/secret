import { CdkConstruct } from '@matthewbonig/cdk-construct-library';

const project = new CdkConstruct({
  description: 'An AWS CDK construct for creating a secret in AWS Secrets Manager, without losing manually changed values.',
  devDeps: [
    '@matthewbonig/cdk-construct-library',
    'aws-sdk-client-mock',
    'aws-sdk-client-mock-jest',
  ],
  name: 'secret',
  bundledDeps: [
    '@aws-sdk/client-secrets-manager',
  ],
  disablePublishToMaven: true,
  disablePublishToGo: true,
});

project.tryFindObjectFile('tsconfig.dev.json')!.addDeletionOverride('compilerOptions.charset');

project.addTask('test:integration', {
  exec: 'npx cdk --app "npx ts-node -P tsconfig.dev.json --prefer-ts-exts test/Secret.integration.ts"',
  description: 'Run integration tests',
  receiveArgs: true,
});

project.synth();
