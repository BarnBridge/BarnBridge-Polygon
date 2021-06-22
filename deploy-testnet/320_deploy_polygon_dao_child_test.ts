import { DeployFunction } from "hardhat-deploy/types";
import { config } from "../utils/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deploymentName = "PolygonDAOChildTest";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const {deployments, getNamedAccounts, ethers} = hre;
  const {deploy} = deployments;
  const cfg = config(hre);

  const {owner} = await getNamedAccounts();

  console.log("deploy:", deploymentName);

  const deployResult = await deploy(deploymentName, {
    from: owner,
    args: [owner], // set to owner so we can call it
    log: true
  });
//
//   if (deployResult.newlyDeployed) {
//     let txResult = await execute(
//       "PolygonDAORoot",
//       {from: owner},
//       "setFxChildTunnel", cfg.withdrawCooldown, ethers.constants.AddressZero,
//     );
//     console.log(`executed setFxChildTunnel (tx: ${txResult.transactionHash}) with status ${txResult.status}`);
//
//     txResult = await execute(
//       deploymentName,
//       {from: owner},
//       "setFeesOwner", deployer.address,
//     );
//     console.log(`executed setFxRootTunnel on SY MOK (tx: ${txResult.transactionHash} address: ${deployer.address}) with status ${txResult.status}`);
//
};

export default func;

func.tags = [deploymentName];
