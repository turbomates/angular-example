var deploy = require("shipit-deploy");

module.exports = function(shipit) {
  deploy(shipit);

  shipit.initConfig({
    default: {
      workspace: "./",
      keepReleases: 5,
      deleteOnRollback: false,
      shallowClone: false
    },
    deployAdmin: {
      dirToCopy: "./dist/admin",
      deployTo: "/home/deploy/apps/admin-antd",
      branch: "master",
      servers: [
        {
          user: "deploy",
          host: "backend.bettings.ch"
        }
      ]
    },
    deploySupermaster: {
      dirToCopy: "./dist/supermaster",
      deployTo: "/home/deploy/apps/supermaster-antd",
      branch: "master",
      servers: [
        {
          user: "deploy",
          host: "backend.bettings.ch"
        }
      ]
    },
    deployMaster: {
      dirToCopy: "./dist/master",
      deployTo: "/home/deploy/apps/master-antd",
      branch: "master",
      servers: [
        {
          user: "deploy",
          host: "backend.bettings.ch"
        }
      ]
    }
  });

  shipit.blTask("deploy", [
    "deploy:init",
    "deploy:update",
    "deploy:publish",
    "deploy:clean"
  ]);
};
