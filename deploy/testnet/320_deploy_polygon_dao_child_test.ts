import { DeployFunction } from "hardhat-deploy/types";
import { config } from "../../utils/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deploymentName = "PolygonDAOChildTest";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const {deployments, getNamedAccounts, ethers} = hre;
  // @ts-ignore
  const l1deployments = hre.companionNetworks['l1'].deployments
  const l1deploy = l1deployments.deploy;
  const cfg = config(hre);

  const {owner} = await getNamedAccounts();

  console.log("deploy-testnet:", deploymentName);

  await l1deploy(deploymentName, {
    from: owner,
    args: [owner], // set to owner so we can call it
    log: true
  });
};

export default func;

func.tags = [deploymentName];
