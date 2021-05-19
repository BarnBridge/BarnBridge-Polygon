import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {config} from '../utils/config'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) { 
  const {deployments, getNamedAccounts, ethers, network} = hre;
  const {deploy} = deployments; 
  const cfg = config(hre);

  const {owner} = await getNamedAccounts(); 


  await deploy('PolygonCommunityVault', {
    from: owner, 
    args: [cfg.bondAddress, cfg.rootChainManager, cfg.erc20Predicate],
    log: true,
    deterministicDeployment: true,
  });
};
export default func;
func.tags = ['PolygonCommunityVault']; 