// SPDX-License-Identifier: Apache-2.0
import { DeployFunction } from "hardhat-deploy/types";
import { config } from "../utils/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deploymentName = "ChildMockERC20MCK";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;

  const {owner} = await getNamedAccounts();

  console.log("deploy-testnet:", deploymentName);

  await deploy(deploymentName, {
    contract: "ERC20ChildTokenMock",
    from: owner,
    args: ["MOCK2", "MCK"],
    log: true
  });

};

export default func;

func.tags = [deploymentName];
