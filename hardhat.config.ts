import 'dotenv/config';
import { HardhatUserConfig } from 'hardhat/types';
import 'hardhat-deploy';
import 'hardhat-deploy-ethers';
import { node_url, accounts, ownerKeyHardhat } from './utils/network';
import { config as cfg } from './utils/config';

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.4',
  },
  namedAccounts: {
    owner: 0,
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  networks: {
    hardhat: {
      deploy: ['deploy-testnet'],
      forking: {
        url: node_url('goerli'),
        blockNumber: 4820457,
      },
      accounts: [
        {
          privateKey: ownerKeyHardhat(),
          balance: "10000000000000000000000000",
        },
        {
          privateKey: "0x1ab42cc412b618bdea3a599e3c9bae199ebf030895b039e9db1e30dafb12b727",
          balance: "10000000000000000000000000",
        },
        {
          privateKey: "0x9a983cb3d832fbde5ab49d692b7a8bf5b5d232479c99333d0fc8e1d21f1b55b6",
          balance: "10000000000000000000000000",
        },
      ],
    },
    kovan: {
      deploy: ['deploy-kovan'],
      url: node_url('kovan'),
      accounts: accounts('kovan'),
      gasPrice: 500000000000,
      gasMultiplier: 1.5,
    },
    goerli: {
      deploy: ['deploy-goerli'],
      url: node_url('goerli'),
      accounts: accounts('goerli'),
      gasPrice: 500000000000,
      gasMultiplier: 1.5,
    },
  },
  paths: {
    artifacts: 'artifacts',
    deployments: 'deployments',
  }
};

export default config;

