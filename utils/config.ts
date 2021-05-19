import 'dotenv/config';
import { HardhatRuntimeEnvironment } from 'hardhat/types';

interface BBPolyConfig {
  [key: string]: BBNetConfig;
}

interface BBNetConfig {
  bondAddress: string,
  rootChainManager: string,
  erc20Predicate: string
}

export function config(hre: HardhatRuntimeEnvironment): BBNetConfig {
  const { ethers } = hre;
  const networkName = hre.network.name;
  console.log('Using config for network:', networkName)

  const cfg = {
    'hardhat': {
      bondAddress: '0xc40a66AFB908789341A58B8423F89fE2cb7Dc1f9',
      rootChainManager: ethers.constants.AddressZero,
      erc20Predicate: ethers.constants.AddressZero,
    },
    'goerli': {
      bondAddress: '0xc40a66AFB908789341A58B8423F89fE2cb7Dc1f9',
      rootChainManager: ethers.constants.AddressZero,
      erc20Predicate: ethers.constants.AddressZero,
    }
  } as BBPolyConfig;

  return cfg[networkName];
}