import { DeployFunction } from "hardhat-deploy/types";
import { config } from "../utils/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deploymentName = "ChildMockSmartYieldProviderMOK";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;
  const cfg = config(hre);

  const {owner} = await getNamedAccounts();

  console.log("deploy-testnet:", deploymentName);

  await deploy(deploymentName, {
    contract: "SmartYieldProvider",
    from: owner,
    args: [((await deployments.get("ChildMockERC20MOK")).address)],
    log: true,
  });

};

export default func;

func.tags = [deploymentName];
