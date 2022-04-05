import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CfnVPC, CfnSubnet } from "aws-cdk-lib/aws-ec2";

export class WordpressCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    
    const vpc = new CfnVPC(this, 'Vpc', {
	cidrBlock: "172.16.0.0/16",
	enableDnsHostnames: true,
	enableDnsSupport: true,
	tags: [{ key: 'Name', value: 'wordpress-cdk-dev-vpc'}]
    });

    const subnetPublic = new CfnSubnet(this, 'SubnetPublic', {
	cidrBlock: "172.16.11.0/24",
	vpcId: vpc.ref,
	availabilityZone: 'ap-northeast-1a',
	tags: [{ key: 'Name', value: 'wordpress-cdk-dev-subnet-public'}]
    })
    
    const subnetApp = new CfnSubnet(this, 'SubnetApp', {
	cidrBlock: "172.16.21.0/24",
	vpcId: vpc.ref,
	availabilityZone: 'ap-northeast-1a',
	tags: [{ key: 'Name', value: 'wordpress-cdk-dev-subnet-app'}]
    })

    const subnetDb = new CfnSubnet(this, 'SubnetDb', {
	cidrBlock: "172.16.22.0/24",
	vpcId: vpc.ref,
	availabilityZone: 'ap-northeast-1a',
	tags: [{ key: 'Name', value: 'wordpress-cdk-dev-subnet-db'}]
    })
  }
}
