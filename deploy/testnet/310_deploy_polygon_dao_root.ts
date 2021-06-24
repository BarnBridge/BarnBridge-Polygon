import { DeployFunction } from "hardhat-deploy/types";
import { config } from "../../utils/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deploymentName = "PolygonDAORoot";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;
  const cfg = config(hre);

  const {owner} = await getNamedAccounts();

  console.log("deploy:", deploymentName);

  await deploy(deploymentName, {
    from: owner,
    args: [cfg.checkpointManger, cfg.fxRoot],
    log: true
  });
};

export default func;

func.tags = [deploymentName];
