import { DeployFunction } from "hardhat-deploy/types";
import { config } from "../utils/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;

  const {owner} = await getNamedAccounts();

  await deploy('MockRootChainManager', {
    contract: "RootChainManager",
    from: owner,
    args: [],
    log: true,
  });

};

export default func;

func.tags = ["MockRootChainManager"];
