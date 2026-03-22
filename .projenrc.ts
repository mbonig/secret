import { CdkConstruct } from '@matthewbonig/cdk-construct-library';

const project = new CdkConstruct({
  description: 'An AWS CDK construct for creating a secret in AWS Secrets Manager, without losing manually changed values.',
  devDeps: [
    '@matthewbonig/cdk-construct-library@0.0.18',
    'aws-sdk-client-mock',
    'aws-sdk-client-mock-jest',
  ],
  name: 'secret',
  bundledDeps: [
    '@aws-sdk/client-secrets-manager',
  ],
  disablePublishToMaven: true,
  disablePublishToGo: true,
  cdkVersion: '2.244.0',
  constructsVersion: '10.5.1',
});

project.addDevDeps('jsii@~5.9.0', 'jsii-rosetta@~5.9.0', 'jsii-diff@^1.127.0', 'jsii-pacmak@^1.127.0');

project.tryFindObjectFile('tsconfig.dev.json')!.addDeletionOverride('compilerOptions.charset');

project.addTask('test:integration', {
  exec: 'npx cdk --app "npx ts-node -P tsconfig.dev.json --prefer-ts-exts test/Secret.integration.ts"',
  description: 'Run integration tests',
  receiveArgs: true,
});

project.synth();
