import 'dotenv/config';
import { HardhatUserConfig } from 'hardhat/types';
import 'hardhat-deploy';
import 'hardhat-deploy-ethers';
import { node_url, accounts, ownerKeyHardhat } from './utils/network';

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
      forking: {
        url: node_url('goerli'),
        blockNumber: 4815512,
      },
      accounts: [
        {
          privateKey: ownerKeyHardhat(),
          balance: "10000000000000000000000000",
        }
      ],
    },
    kovan: {
      url: node_url('kovan'),
      accounts: accounts('kovan'),
      gasPrice: 50000000000,
      gasMultiplier: 1.5,
    },
    goerli: {
      url: node_url('goerli'),
      accounts: accounts('goerli'),
      gasPrice: 50000000000,
      gasMultiplier: 1.5,
    },
  },

};

export default config;

