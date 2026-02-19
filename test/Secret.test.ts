import { Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { Secret } from '../src';


test('Snapshot', () => {
  // GIVEN
  const stack = new Stack();

  // WHEN
  new Secret(stack, 'MyConstruct', {
    generateSecretString: {},
  });

  // THEN
  const assert = Template.fromStack(stack);
  expect(assert.toJSON()).toMatchSnapshot();
});
test('Snapshot without any generate', () => {
  // GIVEN
  const stack = new Stack();

  // WHEN
  new Secret(stack, 'MyConstruct', {});

  // THEN
  const assert = Template.fromStack(stack);
  expect(assert.toJSON()).toMatchSnapshot();
});
test('Snapshot with full generate', () => {
  // GIVEN
  const stack = new Stack();

  // WHEN
  new Secret(stack, 'MyConstruct', {
    generateSecretString: {
      secretStringTemplate: JSON.stringify({}),
      generateStringKey: 'password',
    },
  });

  // THEN
  const assert = Template.fromStack(stack);
  expect(assert.toJSON()).toMatchSnapshot();
});
