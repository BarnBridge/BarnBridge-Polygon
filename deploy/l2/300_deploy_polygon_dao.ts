import { DeployFunction } from "hardhat-deploy/types";
import { config } from "../../utils/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployOptions } from "hardhat-deploy/dist/types";

const deploymentName = "PolygonDAO";
const l1deploymentName = "PolygonDAORoot";
const l2deploymentName = "PolygonDAOChild";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const {deployments: l1deployments} = hre.companionNetworks["l1"];
  // @ts-ignore
  const {deployments: l2deployments, getNamedAccounts, ethers} = hre;

  const {deploy: l1deploy, execute: l1execute, fetchIfDifferent: l1FetchIfDifferent} = l1deployments;
  const {deploy: l2deploy, execute: l2execute, fetchIfDifferent: l2FetchIfDifferent} = l2deployments;

  const cfg = config(hre);

  const {owner} = await getNamedAccounts();

  console.log("deploy-l2:", deploymentName);

  const daoRootOptions: DeployOptions = {
    from: owner,
    args: [cfg.checkpointManger, cfg.fxRoot],
    log: true
  };

  const daoChildOptions: DeployOptions = {
    from: owner,
    args: [cfg.fxChild],
    log: true
  };

  const l1deployResult = await l1deploy(l1deploymentName, daoRootOptions);
  const l2deployResult = await l2deploy(l2deploymentName, daoChildOptions);

  if (l1deployResult.newlyDeployed && l2deployResult.newlyDeployed) {
    let txResult = await l1execute(
      l1deploymentName,
      {from: owner},
      "setFxChildTunnel", l2deployResult.address
    );
    console.log(`executed setFxChildTunnel (tx: ${txResult.transactionHash}) with status ${txResult.status}`);

    txResult = await l2execute(
      l2deploymentName,
      {from: owner},
      "setFxRootTunnel", l1deployResult.address
    );
    console.log(`executed setFxRootTunnel (tx: ${txResult.transactionHash}) with status ${txResult.status}`);
  } else if (l1deployResult.newlyDeployed || l2deployResult.newlyDeployed) {
    console.log("at least one contract was previously deployed, you should try 'npx hardhat --network XXX redeploy-polygon-dao`");
  }

  //
  // const deployResult = await l1deploy(deploymentName, {
  //   from: owner,
  //   args: [owner], // set to owner so we can call it
  //   log: true
  // });
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
