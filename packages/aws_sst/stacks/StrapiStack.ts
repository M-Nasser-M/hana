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
import { StringParameter } from "aws-cdk-lib/aws-ssm";

export function StrapiStack({ stack }: StackContext) {
  const vpc = use(HanaVPC);

  const meili = use(meiliStack);

  const database = new DatabaseInstance(stack, "strapi-db", {
    engine: DatabaseInstanceEngine.postgres({
      version: PostgresEngineVersion.VER_16_1,
    }),
    vpc,
    databaseName: "strapiDb",
    maxAllocatedStorage: 20,
    allocatedStorage: 20,
    instanceType: InstanceType.of(InstanceClass.T3, InstanceSize.MICRO),
    backupRetention: Duration.days(7),
    storageType: StorageType.GP2,
    caCertificate: CaCertificate.RDS_CA_RDS4096_G1,
  });

  const dbSecurityGroup = new SecurityGroup(stack, "DBSecurityGroup", {
    vpc,
    description: "Allow access to RDS instance",
    allowAllOutbound: true, // Change to false if you want to restrict outbound traffic
  });

  // Allow inbound traffic on the default PostgreSQL port (5432)
  dbSecurityGroup.addIngressRule(
    Peer.ipv4("0.0.0.0/0"),
    Port.tcp(5432),
    "Allow inbound traffic on port 5432"
  );

  // Associate the security group with the RDS instance
  database.connections.addSecurityGroup(dbSecurityGroup);

  const instanceSecurityGroup = new SecurityGroup(
    stack,
    "InstanceSecurityGroup",
    {
      vpc,
      description: "Allow access to EC2 instance",
      allowAllOutbound: true, // Change to false if you want to restrict outbound traffic
    }
  );

  // Allow inbound traffic on the default SSH port (22)
  instanceSecurityGroup.addIngressRule(
    Peer.ipv4("0.0.0.0/0"),
    Port.tcp(22),
    "Allow inbound traffic on port 22"
  );

  // Allow inbound access from the RDS security group to the EC2 security group
  instanceSecurityGroup.addIngressRule(
    dbSecurityGroup,
    Port.tcp(5432),
    "Allow RDS to EC2"
  );

  // Allow inbound access from the EC2 security group to the RDS security group
  dbSecurityGroup.addIngressRule(
    instanceSecurityGroup,
    Port.tcp(5432),
    "Allow EC2 to RDS"
  );

  const username = StringParameter.valueForStringParameter(stack, "username");
  const password = StringParameter.valueForStringParameter(stack, "password");
  const host = StringParameter.valueForStringParameter(stack, "host");
  const port = StringParameter.valueForStringParameter(stack, "port");
  const databaseName = StringParameter.valueForStringParameter(stack, "dbname");
  const dbUrl = `postgres://${username}:${password}@${host}:${port}/${databaseName}`;

  const ecs = new Service(stack, "ecs-strapi", {
    port: 1337,
    path: "../../apps/api",
    cdk: {
      vpc,
      applicationLoadBalancer: false,
      fargateService: {
        securityGroups: [instanceSecurityGroup],
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
      PUBLIC_URL: "",
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
    DATABASE_URL: dbUrl,
  });

  return ecs;
}
