import 'dotenv/config';
import { HardhatRuntimeEnvironment } from 'hardhat/types';

interface BBPolyConfig {
  [key: string]: BBNetConfig;
}

interface BBNetConfig {
  path: string,
  bondAddress: string,
  rootChainManager: string,
  erc20Predicate: string
}

export function config(hre: HardhatRuntimeEnvironment): BBNetConfig {
  const { ethers } = hre;
  const networkName = hre.network.name;
  console.log('Using config for network:', networkName);

  const cfg = {
    'hardhat': {
      path: 'deploy-testnet',
      bondAddress: '0xd7d55Fd7763A356aF99f17C9d6c21d933bC2e2F1',
      rootChainManager: ethers.constants.AddressZero,
      erc20Predicate: ethers.constants.AddressZero,
    },
    'goerli': {
      path: 'deploy-goerli',
      bondAddress: '0xd7d55Fd7763A356aF99f17C9d6c21d933bC2e2F1',
      rootChainManager: ethers.constants.AddressZero,
      erc20Predicate: ethers.constants.AddressZero,
    }
  } as BBPolyConfig;

  return cfg[networkName];
}
