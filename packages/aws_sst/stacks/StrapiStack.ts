import { StackContext, Service, RDS, use } from "sst/constructs";
import { HanaVPC } from "./VPCStack";
import { Secret } from "aws-cdk-lib/aws-secretsmanager";

export function StrapiStack({ stack }: StackContext) {
  const vpc = use(HanaVPC);
  const database = new RDS(stack, "strapi-db", {
    engine: "postgresql13.9",
    defaultDatabaseName: "hana_db",
    cdk: { cluster: { vpc } },
  });

  const secret = Secret.fromSecretCompleteArn(
    stack,
    "strapi-db-secret",
    database.secretArn
  );

  const username = secret.secretValueFromJson("username");
  const password = secret.secretValueFromJson("password");
  const host = secret.secretValueFromJson("host");
  const port = secret.secretValueFromJson("port");
  const databaseName = secret.secretValueFromJson("dbname");
  const dbUrl = `postgres://${username}:${password}@${host}:${port}/${databaseName}`;

  const ecs = new Service(stack, "ecs-strapi", {
    port: 1337,
    path: "../../apps/api",
    cdk: { vpc, applicationLoadBalancer: false },
    bind: [database],
  });

  stack.addOutputs({
    STRAPI_URL: ecs.url,
    DATABASE_URL: dbUrl,
  });

  return ecs;
}
