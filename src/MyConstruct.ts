import { Construct } from 'constructs';

export interface MyConstructProps {}

export class MyConstruct extends Construct {
  constructor(scope: Construct, id: string, props: MyConstructProps) {
    super(scope, id);
    const {} = props;
  }
}