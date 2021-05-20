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
  stateSender: string
}

export function config(hre: HardhatRuntimeEnvironment): BBNetConfig {
  const networkName = hre.network.name;
  const addressZero = hre.ethers.constants.AddressZero;

  console.log('Using config for network:', networkName);

  const cfg = {
    'hardhat': {
      path: 'deploy-testnet',
      bondAddress: '0xd7d55Fd7763A356aF99f17C9d6c21d933bC2e2F1',
      rootChainManager: '0xBbD7cBFA79faee899Eaf900F13C9065bF03B1A74',
      erc20Predicate: '0xdD6596F2029e6233DEFfaCa316e6A95217d4Dc34',
      stateSender: '0xEAa852323826C71cd7920C3b4c007184234c3945',
    },
    'goerli': {
      path: 'deploy-goerli',
      bondAddress: '0xd7d55Fd7763A356aF99f17C9d6c21d933bC2e2F1',
      rootChainManager: '0xBbD7cBFA79faee899Eaf900F13C9065bF03B1A74',
      erc20Predicate: '0xdD6596F2029e6233DEFfaCa316e6A95217d4Dc34',
      stateSender: '0xEAa852323826C71cd7920C3b4c007184234c3945',
    },
    'mumbai': {
      path: 'deploy-mumbai',
      bondAddress: '0xebB83c1b86A27eb9e2523A2c117F1d656269dbAE',
      rootChainManager: addressZero,
      erc20Predicate: addressZero,
      stateSender: addressZero,
    },
    // 'matic': {
    //   path: 'deploy-goerli',
    //   bondAddress: '0xd7d55Fd7763A356aF99f17C9d6c21d933bC2e2F1',
    //   rootChainManager: '0xBbD7cBFA79faee899Eaf900F13C9065bF03B1A74',
    //   erc20Predicate: '0xdD6596F2029e6233DEFfaCa316e6A95217d4Dc34',
    //   stateSender: '0xEAa852323826C71cd7920C3b4c007184234c3945',
    // },
  } as BBPolyConfig;

  return cfg[networkName];
}
