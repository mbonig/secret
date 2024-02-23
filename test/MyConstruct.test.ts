import { Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { MyConstruct } from '../src';
test('Snapshot', () => {
  // GIVEN
  const stack = new Stack();

  // WHEN
  new MyConstruct(stack, 'MyConstruct', {});

  // THEN
  const assert = Template.fromStack(stack);
  expect(assert.toJSON()).toMatchSnapshot();
});