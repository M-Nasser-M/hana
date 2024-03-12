import { SSTConfig } from "sst";
import { HanaVPC } from "./stacks/VPCStack";
import { StrapiStack } from "./stacks/StrapiStack";
import { meiliStack } from "./stacks/Meilistack";
import { NextSTACK } from "./stacks/NextStack";

export default {
  config(_input) {
    return {
      name: "aws-sst-hanaart",
      region: "eu-north-1",
    };
  },
  stacks(app) {
    app.stack(HanaVPC).stack(StrapiStack).stack(meiliStack).stack(NextSTACK);
  },
} satisfies SSTConfig;
