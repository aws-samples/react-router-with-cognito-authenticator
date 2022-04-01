import * as cdk from "@aws-cdk/core";
import { Template } from "@aws-cdk/assertions";
import { CdkStack } from "../lib/cdk-stack";

test("snapshot test", () => {
  const app = new cdk.App();
  const stack = new CdkStack(app, "MyTestStack");
  // スタックからテンプレート(JSON)を生成
  const template = Template.fromStack(stack).toJSON();

  // 生成したテンプレートとスナップショットが同じか検証
  expect(template).toMatchSnapshot();
});
