import * as cdk from "@aws-cdk/core";
import * as cognito from "@aws-cdk/aws-cognito";

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const userPool = new cognito.UserPool(this, "UserPool", {
      selfSignUpEnabled: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const userPoolClient = userPool.addClient("WebClient", {
      authFlows: {
        userPassword: true,
        userSrp: true,
      },
    });

    new cognito.CfnUserPoolGroup(this, "UserPoolGroupAdmin", {
      userPoolId: userPool.userPoolId,
      groupName: "admin",
    });

    new cdk.CfnOutput(this, "OutputUserPool", {
      value: userPool.userPoolId,
    });

    new cdk.CfnOutput(this, "OutputUserPoolClientId", {
      value: userPoolClient.userPoolClientId,
    });
  }
}
