import { HanaVPC } from "./VPCStack";
import { NextjsSite, StackContext, use } from "sst/constructs";
import { RetentionDays } from "aws-cdk-lib/aws-logs";
import { StrapiStack } from "./StrapiStack";
import { meiliStack } from "./Meilistack";

export function NextSTACK({ stack }: StackContext) {
  const vpc = use(HanaVPC);
  const strapiStack = use(StrapiStack);
  const meilisearchStack = use(meiliStack);
  const site = new NextjsSite(stack, "site", {
    path: "../../apps/web",
    cdk: {
      server: {
        vpc,
        logRetention: RetentionDays.ONE_MONTH,
      },
      revalidation: {
        vpc,
      },
    },
    bind: [strapiStack, meilisearchStack],
  });

  stack.addOutputs({ SITE_URL: site.url });
}
