import { DeployFunction } from "hardhat-deploy/types";
import { config } from "../utils/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployOptions } from "hardhat-deploy/dist/types";

const deploymentName = "PolygonDAO";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const {deployments: l1deployments} = hre.companionNetworks["l1"];
  // @ts-ignore
  const {deployments: l2deployments, getNamedAccounts, ethers} = hre;

  const {deploy: l1deploy, fetchIfDifferent: l1FetchIfDifferent} = l1deployments;
  const {deploy: l2deploy, fetchIfDifferent: l2FetchIfDifferent} = l2deployments;

  const cfg = config(hre);

  const {owner} = await getNamedAccounts();

  console.log("deploy:", deploymentName);

  const daoRootOptions: DeployOptions = {
    from: owner,
    args: [cfg.checkpointManger, cfg.fxRoot],
    log: true,
  };

  const daoChildOptions: DeployOptions = {
    from: owner,
    args: [cfg.fxChild],
    log: true,
  };

  console.log(await l1FetchIfDifferent("PolygonDAORoot", daoRootOptions));
  console.log(await l2FetchIfDifferent("PolygonDAOChild", daoChildOptions));

  const {differences: l1diff} = await l1FetchIfDifferent("PolygonDAORoot", daoRootOptions);
  const {differences: l2diff} = await l2FetchIfDifferent("PolygonDAOChild", daoChildOptions);

  const redeploy = l1diff || l2diff;

  if (!redeploy) {
    console.log("force redeploying dao tunnels because one contract changed");

    await l1deploy("PolygonDAORoot", daoRootOptions);
    await l2deploy("PolygonDAOChild", daoChildOptions);
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
