import { StackContext, Service, RDS, use } from "sst/constructs";
import { HanaVPC } from "./VPCStack";
import { meiliStack } from "./Meilistack";
import { StrapiENV } from "../Env";
import {
  InstanceClass,
  InstanceSize,
  InstanceType,
  Peer,
  Port,
  SecurityGroup,
} from "aws-cdk-lib/aws-ec2";
import {
  CaCertificate,
  DatabaseInstance,
  DatabaseInstanceEngine,
  PostgresEngineVersion,
  StorageType,
} from "aws-cdk-lib/aws-rds";
import { Duration } from "aws-cdk-lib";
import { Secret } from "aws-cdk-lib/aws-secretsmanager";
import {
  ApplicationProtocol,
  ApplicationProtocolVersion,
} from "aws-cdk-lib/aws-elasticloadbalancingv2";
import { instance } from "valibot";

export function StrapiStack({ stack }: StackContext) {
  const vpc = use(HanaVPC);

  const meili = use(meiliStack);

  const dbSecurityGroup = new SecurityGroup(stack, "DBSecurityGroup", {
    vpc,
    description: "Allow access to RDS instance",
    allowAllOutbound: true,
  });

  const instanceSecurityGroup = new SecurityGroup(
    stack,
    "instanceSecurityGroup",
    {
      vpc,
      description: "Allow access to RDS instance",
      allowAllOutbound: true,
    }
  );

  dbSecurityGroup.addIngressRule(
    instanceSecurityGroup,
    Port.tcp(5432),
    "Allow inbound traffic on port 5432"
  );

  instanceSecurityGroup.addIngressRule(
    dbSecurityGroup,
    Port.tcp(5432),
    "Allow inbound traffic on port 5432"
  );

  const database = new DatabaseInstance(stack, "strapi-db", {
    engine: DatabaseInstanceEngine.postgres({
      version: PostgresEngineVersion.VER_14_10,
    }),
    vpc,
    databaseName: "strapiDb",
    maxAllocatedStorage: 20,
    allocatedStorage: 20,
    instanceType: InstanceType.of(InstanceClass.T3, InstanceSize.MICRO),
    backupRetention: Duration.days(7),
    storageType: StorageType.GP2,
    caCertificate: CaCertificate.RDS_CA_RDS4096_G1,
    securityGroups: [dbSecurityGroup],
  });

  const secret = Secret.fromSecretCompleteArn(
    stack,
    "strapi-db-secret",
    database.secret!.secretFullArn!
  );

  const username = secret.secretValueFromJson("username");
  const password = secret.secretValueFromJson("password");
  const host = secret.secretValueFromJson("host");
  const port = secret.secretValueFromJson("port");
  const dbname = secret.secretValueFromJson("dbname");
  const dbUrl = `postgres://${username}:${password}@${host}:${port}/${dbname}`;

  const ecs = new Service(stack, "ecs-strapi", {
    port: 1337,
    path: "../../apps/api",
    cdk: {
      vpc,
      fargateService: {
        securityGroups: [instanceSecurityGroup],
      },
      applicationLoadBalancerTargetGroup: {
        port: 1337,
        healthCheck: { path: "/_health", healthyHttpCodes: "200,204" },
        protocol: ApplicationProtocol.HTTP,
        protocolVersion: ApplicationProtocolVersion.HTTP1,
      },
    },
    environment: {
      HOST: StrapiENV.HOST,
      PORT: StrapiENV.PORT,
      APP_KEYS: StrapiENV.APP_KEYS,
      API_TOKEN_SALT: StrapiENV.API_TOKEN_SALT,
      ADMIN_JWT_SECRET: StrapiENV.ADMIN_JWT_SECRET,
      TRANSFER_TOKEN_SALT: StrapiENV.TRANSFER_TOKEN_SALT,
      JWT_SECRET: StrapiENV.JWT_SECRET,
      PUBLIC_URL: StrapiENV.PUBLIC_URL,
      DATABASE_CLIENT: StrapiENV.DATABASE_CLIENT,
      DATABASE_URL: dbUrl,
      DATABASE_SSL: StrapiENV.DATABASE_SSL,
      DATABASE_SSL_CA: StrapiENV.DATABASE_SSL_CA,
      MEILI_HOST: meili.url || "",
      MEILI_MASTER_KEY: StrapiENV.MEILI_MASTER_KEY,
      CLOUDINARY_NAME: StrapiENV.CLOUDINARY_NAME,
      CLOUDINARY_KEY: StrapiENV.CLOUDINARY_KEY,
      CLOUDINARY_SECRET: StrapiENV.CLOUDINARY_SECRET,
    },
    bind: [meili],
  });

  stack.addOutputs({
    STRAPI_URL: ecs.url,
  });

  return ecs;
}
