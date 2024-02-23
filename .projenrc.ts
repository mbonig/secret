import { CdkConstruct } from '@matthewbonig/cdk-construct-library';
const project = new CdkConstruct({
  devDeps: ['@matthewbonig/cdk-construct-library'],
  name: 'my-construct',
});
project.synth();