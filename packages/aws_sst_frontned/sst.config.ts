import { SSTConfig } from "sst";
import { NextStack } from "./stacks/NextStack";

export default {
  config(_input) {
    return {
      name: "my-sst-app",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(NextStack);
  },
} satisfies SSTConfig;
