import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CfnVPC } from "aws-cdk-lib/aws-ec2";

export class WordpressCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    
    new CfnVPC(this, 'Vpc', {
	cidrBlock: "172.16.0.0/17",
	enableDnsHostnames: true,
	enableDnsSupport: true,
	tags: [{ key: 'Name', value: 'wordpress-cdk-dev-vpc'}]
    });
  }
}
