import { DeployFunction } from "hardhat-deploy/types";
import { config } from "../../utils/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deploymentName = "ChildMockERC20MOK";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;

  const {owner} = await getNamedAccounts();

  console.log("deploy-testnet:", deploymentName);

  await deploy(deploymentName, {
    contract: "ERC20ChildTokenMock",
    from: owner,
    args: ["MOCK1", "MOK"],
    log: true,
  });

};

export default func;

func.tags = [deploymentName];
