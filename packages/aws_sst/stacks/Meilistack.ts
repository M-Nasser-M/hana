import { Service, StackContext, use } from "sst/constructs";
import { HanaVPC } from "./VPCStack";

export function meiliStack({ stack }: StackContext) {
  const vpc = use(HanaVPC);
  const ecs = new Service(stack, "ecs-meili", {
    path: "../../apps/meilisearch",
    port: 7700,
    cdk: { vpc, applicationLoadBalancer: false },
  });

  stack.addOutputs({
    MEILISEARCH_URL: ecs.url,
  });

  return ecs;
}
