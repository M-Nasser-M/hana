import { SSTConfig } from "sst";
import { NextStack } from "./stacks/NextStack";
import { HanaVPC } from "../aws_sst_backend/stacks/VPCStack";

export default {
  config(_input) {
    return {
      name: "aws-sst-hanaart",
      region: "eu-north-1",
    };
  },
  stacks(app) {
    app.stack(HanaVPC).stack(NextStack);
  },
} satisfies SSTConfig;
