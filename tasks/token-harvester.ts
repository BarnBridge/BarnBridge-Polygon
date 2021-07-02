import { task } from "hardhat/config";
import "hardhat-deploy";
import "@nomiclabs/hardhat-ethers";
import { config } from "../utils/config";

task("token-harvester", "Sends bond to mumbai from goerli")
  .setAction(async (args, hre) => {
    const {ethers, deployments: l2deployments, getNamedAccounts} = hre;
    if (hre.network.name != "mumbai") {
      console.log("wrong network, run on l2");
      return;
    }

    const {owner} = await getNamedAccounts();

    const TokenHarvester = await ethers.getContract("PolygonTokenHarvester"); //l2deployments.get("PolygonTokenHarvester");
    // const Bond = (await ethers.getContractAt("ERC20Mock", cfg.bondAddress, owner));

    console.log(await TokenHarvester.withdrawCooldown())
  });

module.exports = {};
