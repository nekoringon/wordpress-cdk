import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CfnVPC, 
	 CfnSubnet, 
	 CfnInternetGateway, 
	 CfnVPCGatewayAttachment,
	 CfnRouteTable,
	 CfnRoute,
	 CfnSubnetRouteTableAssociation
    } from "aws-cdk-lib/aws-ec2";

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

    const igw = new CfnInternetGateway(this, 'InternetGateway', {
	tags: [{ key: 'Name', value: 'wordpress-cdk-dev-internet-gateway'}]
    }) 

    new CfnVPCGatewayAttachment(this, 'VpcGatewayAttachment', {
	vpcId: vpc.ref,
	internetGatewayId: igw.ref
    })

    const routeTable = new CfnRouteTable(this, 'RouteTable', {
    	vpcId: vpc.ref
    })

    const routeTablePublic = new CfnRoute(this, 'PublicRoute', {
	destinationCidrBlock: "0.0.0.0/0",
	gatewayId: igw.ref,
	routeTableId:routeTable.ref 
    })
    
//    const routeTableApp = new CfnRoute(this, 'AppRoute', {
//	destinationCidrBlock: "0.0.0.0/0",
//	gatewayId: igw.ref,
//	routeTableId:routeTable.ref 
//    })
//
//    const routeTableDb = new CfnRoute(this, 'DbRoute', {
//	destinationCidrBlock: "0.0.0.0/0",
//	gatewayId: igw.ref,
//	routeTableId:routeTable.ref 
//    })

    const associationPublic = new CfnSubnetRouteTableAssociation(this, 'AssociationPublic', {
	routeTableId:routeTable.ref,
	subnetId: subnetPublic.ref
    })

//    const associationApp = new CfnSubnetRouteTableAssociation(this, 'AssociationApp', {
//	routeTableId:routeTable.ref,
//	subnetId: subnetApp.ref
//    })
//
//    const associationDb = new CfnSubnetRouteTableAssociation(this, 'AssociationDb', {
//	routeTableId:routeTable.ref,
//	subnetId: subnetDb.ref
//    })
//  }
}
