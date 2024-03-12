//create a vpc

import { Vpc } from "aws-cdk-lib/aws-ec2";
import { StackContext } from "sst/constructs";

export function HanaVPC({ stack }: StackContext) {
  const vpc = new Vpc(stack, "HanaVpc", {
    maxAzs: 2,
  });

  return vpc;
}
