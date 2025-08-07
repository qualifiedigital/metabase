/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "metabase",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
      providers: {
        aws: {
          profile: input?.stage === "production" ? "prod" : "dev",
        }
      }
    };
  },
  async run() {
    const vpc = new sst.aws.Vpc("metabase-vpc");
    const cluster = new sst.aws.Cluster("metabase-cluster", {
      vpc,
     
    });

    new sst.aws.Service("metabase-service", {
      cluster,
      image: {
        context: "./app",
        dockerfile: "Dockerfile",
      }
    });
  },
});

