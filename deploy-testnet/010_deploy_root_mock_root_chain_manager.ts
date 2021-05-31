import { DeployFunction } from "hardhat-deploy/types";
import { config } from "../utils/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deploymentName = "MockRootChainManager";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;

  const {owner} = await getNamedAccounts();

  console.log("deploy-testnet:", deploymentName);

  await deploy(deploymentName, {
    contract: "RootChainManager",
    from: owner,
    args: [],
    log: true,
  });
};

export default func;

func.tags = [deploymentName];
