import { Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { Secret } from '../src';

test('Snapshot', () => {
  // GIVEN
  const stack = new Stack();

  // WHEN
  new Secret(stack, 'MyConstruct', {});

  // THEN
  const assert = Template.fromStack(stack);
  expect(assert.toJSON()).toMatchSnapshot();
});
