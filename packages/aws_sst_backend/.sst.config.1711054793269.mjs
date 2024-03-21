import { createRequire as topLevelCreateRequire } from 'module';const require = topLevelCreateRequire(import.meta.url);
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// stacks/VPCStack.ts
import { Vpc } from "aws-cdk-lib/aws-ec2";
function HanaVPC({ stack }) {
  const vpc = new Vpc(stack, "HanaVpc", {
    maxAzs: 2
  });
  return vpc;
}
__name(HanaVPC, "HanaVPC");

// stacks/StrapiStack.ts
import { Service as Service2, use as use2 } from "sst/constructs";

// stacks/Meilistack.ts
import { Service, use } from "sst/constructs";

// Env.ts
import { object, parse, string } from "valibot";
var StrapiENVRuntime = {
  HOST: process.env.STRAPI_HOST,
  PORT: process.env.STRAPI_PORT,
  APP_KEYS: process.env.APP_KEYS,
  API_TOKEN_SALT: process.env.API_TOKEN_SALT,
  ADMIN_JWT_SECRET: process.env.ADMIN_JWT_SECRET,
  TRANSFER_TOKEN_SALT: process.env.TRANSFER_TOKEN_SALT,
  JWT_SECRET: process.env.JWT_SECRET,
  PUBLIC_URL: process.env.PUBLIC_URL,
  DATABASE_CLIENT: process.env.DATABASE_CLIENT,
  DATABASE_SSL_CA: process.env.DATABASE_SSL_CA,
  DATABASE_SSL: process.env.DATABASE_SSL,
  MEILI_MASTER_KEY: process.env.MEILI_MASTER_KEY,
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  CLOUDINARY_KEY: process.env.CLOUDINARY_KEY,
  CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET
};
var StrapiENVSchema = object({
  HOST: string(),
  PORT: string(),
  APP_KEYS: string(),
  API_TOKEN_SALT: string(),
  ADMIN_JWT_SECRET: string(),
  TRANSFER_TOKEN_SALT: string(),
  JWT_SECRET: string(),
  PUBLIC_URL: string(),
  DATABASE_CLIENT: string(),
  DATABASE_SSL_CA: string(),
  DATABASE_SSL: string(),
  MEILI_MASTER_KEY: string(),
  CLOUDINARY_NAME: string(),
  CLOUDINARY_KEY: string(),
  CLOUDINARY_SECRET: string()
});
var StrapiENV = parse(StrapiENVSchema, StrapiENVRuntime);
var MeiliENVRuntime = {
  MEILI_MASTER_KEY: process.env.MEILI_MASTER_KEY
};
var MeiliENVSchema = object({
  MEILI_MASTER_KEY: string()
});
var MeiliENV = parse(MeiliENVSchema, MeiliENVRuntime);

// stacks/Meilistack.ts
function meiliStack({ stack }) {
  const vpc = use(HanaVPC);
  const ecs = new Service(stack, "ecs-meili", {
    path: "../../apps/meilisearch",
    port: 7700,
    cdk: { vpc },
    environment: { MEILI_MASTER_KEY: MeiliENV.MEILI_MASTER_KEY }
  });
  stack.addOutputs({
    MEILISEARCH_URL: ecs.url
  });
  return ecs;
}
__name(meiliStack, "meiliStack");

// stacks/StrapiStack.ts
import {
  InstanceClass,
  InstanceSize,
  InstanceType,
  Port,
  SecurityGroup
} from "aws-cdk-lib/aws-ec2";
import {
  CaCertificate,
  DatabaseInstance,
  DatabaseInstanceEngine,
  PostgresEngineVersion,
  StorageType
} from "aws-cdk-lib/aws-rds";
import { Duration } from "aws-cdk-lib";
import { Secret } from "aws-cdk-lib/aws-secretsmanager";
import {
  ApplicationProtocol,
  ApplicationProtocolVersion
} from "aws-cdk-lib/aws-elasticloadbalancingv2";
function StrapiStack({ stack }) {
  const vpc = use2(HanaVPC);
  const meili = use2(meiliStack);
  const dbSecurityGroup = new SecurityGroup(stack, "DBSecurityGroup", {
    vpc,
    description: "Allow access to RDS instance",
    allowAllOutbound: true
  });
  const instanceSecurityGroup = new SecurityGroup(
    stack,
    "instanceSecurityGroup",
    {
      vpc,
      description: "Allow access to RDS instance",
      allowAllOutbound: true
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
      version: PostgresEngineVersion.VER_14_10
    }),
    vpc,
    databaseName: "strapiDb",
    maxAllocatedStorage: 20,
    allocatedStorage: 20,
    instanceType: InstanceType.of(InstanceClass.T3, InstanceSize.MICRO),
    backupRetention: Duration.days(7),
    storageType: StorageType.GP2,
    caCertificate: CaCertificate.RDS_CA_RDS4096_G1,
    securityGroups: [dbSecurityGroup]
  });
  const secret = Secret.fromSecretCompleteArn(
    stack,
    "strapi-db-secret",
    database.secret.secretFullArn
  );
  const username = secret.secretValueFromJson("username");
  const password = secret.secretValueFromJson("password");
  const host = secret.secretValueFromJson("host");
  const port = secret.secretValueFromJson("port");
  const dbname = secret.secretValueFromJson("dbname");
  const dbUrl = `postgres://${username}:${password}@${host}:${port}/${dbname}`;
  const ecs = new Service2(stack, "ecs-strapi", {
    port: 1337,
    path: "../../apps/api",
    cdk: {
      vpc,
      fargateService: {
        securityGroups: [instanceSecurityGroup]
      },
      applicationLoadBalancerTargetGroup: {
        port: 1337,
        healthCheck: { path: "/_health", healthyHttpCodes: "200,204" },
        protocol: ApplicationProtocol.HTTP,
        protocolVersion: ApplicationProtocolVersion.HTTP1
      }
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
      CLOUDINARY_SECRET: StrapiENV.CLOUDINARY_SECRET
    },
    bind: [meili]
  });
  stack.addOutputs({
    STRAPI_URL: ecs.url
  });
  return ecs;
}
__name(StrapiStack, "StrapiStack");

// sst.config.ts
var sst_config_default = {
  config(_input) {
    return {
      name: "aws-sst-hanaart",
      region: "eu-north-1"
    };
  },
  stacks(app) {
    app.stack(HanaVPC).stack(meiliStack).stack(StrapiStack);
  }
};
export {
  sst_config_default as default
};
