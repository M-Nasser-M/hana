import { Service, StackContext, use } from "sst/constructs";
import { HanaVPC } from "./VPCStack";
import { MeiliENV } from "../Env";

export function meiliStack({ stack }: StackContext) {
  const vpc = use(HanaVPC);

  const ecs = new Service(stack, "ecs-meili", {
    path: "../../apps/meilisearch",
    port: 7700,
    cdk: { vpc, applicationLoadBalancer: false },
    environment: { MEILI_MASTER_KEY: MeiliENV.MEILI_MASTER_KEY! },
  });

  stack.addOutputs({
    MEILISEARCH_URL: ecs.url,
  });

  return ecs;
}
