import { DeployFunction } from "hardhat-deploy/types";
import { config } from "../utils/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const {deployments, getNamedAccounts, ethers} = hre;
  const {deploy, execute, deterministic} = deployments;
  const cfg = config(hre);

  const {owner} = await getNamedAccounts();

  // change salt to force new deployment without code changes
  const seed = cfg.seed + "harvester";
  const salt = ethers.utils.sha256(ethers.utils.toUtf8Bytes(seed));

  // overwrites main deployment
  const deployer = await deterministic("TokenHarvester", {
    from: owner,
    args: [],
    log: true,
    salt: salt,
  });

  const deployResult = await deployer.deploy()

  if (deployResult.newlyDeployed) {
    const txResult = await execute(
      "TokenHarvester",
      {from: owner},
      "initialize", ((await deployments.get('MockRootChainManager')).address),
    );
    console.log(`executed initialize (tx: ${txResult.transactionHash}) with status ${txResult.status}`);
  }
};

export default func;

func.tags = ["TokenHarvester"];
