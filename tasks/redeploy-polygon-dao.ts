import { task } from "hardhat/config";
import "hardhat-deploy";
import "@nomiclabs/hardhat-ethers";

task("redeploy-polygon-dao", "Clears old PolygonDAO artefacts and deploys")
  .setAction(async (args, hre) => {
    const {ethers, deployments} = hre;

    await deployments.run("PolygonDAO", {
      writeDeploymentsToFiles: true,
    });
  });

module.exports = {};
