import { SSTConfig } from "sst";
import { HanaVPC } from "./stacks/VPCStack";
import { StrapiStack } from "./stacks/StrapiStack";
import { meiliStack } from "./stacks/Meilistack";
import { NextStack } from "../aws_sst_frontned/stacks/NextStack";

export default {
  config(_input) {
    return {
      name: "aws-sst-hanaart",
      region: "eu-north-1",
    };
  },
  stacks(app) {
    app.stack(HanaVPC).stack(meiliStack).stack(StrapiStack);
  },
} satisfies SSTConfig;
