import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { config } from "../utils/config";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts, ethers, network} = hre;
  const {deploy, execute} = deployments;
  const cfg = config(hre);

  const {owner} = await getNamedAccounts();

  const deployResult = await deploy("PolygonCommunityVault", {
    from: owner,
    args: [],
    log: true,
    deterministicDeployment: true
  });

  if (deployResult.newlyDeployed) {
    const txResult = await execute(
      "PolygonCommunityVault",
      {from: owner},
      "initialize", cfg.bondAddress, cfg.rootChainManager, cfg.erc20Predicate,
    );
    console.log(`executed initialize (tx: ${txResult.transactionHash}) with status ${txResult.status}`)
  }
};
export default func;
func.tags = ["PolygonCommunityVault"];
