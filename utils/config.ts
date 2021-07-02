import "dotenv/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";

interface BBPolyConfig {
  [key: string]: BBNetConfig;
}

interface BBNetConfig {
  path: string,
  seed: string,
  bondAddress: string,
  rootChainManager: string,
  erc20Predicate: string,
  stateSender: string,
  checkpointManger: string,
  fxRoot: string,
  fxChild: string,
  withdrawCooldown: number,
  extra: any,
}

export function config(hre: HardhatRuntimeEnvironment): BBNetConfig {
  const networkName = hre.network.name;
  const addressZero = hre.ethers.constants.AddressZero;
  const cfg = {
    "hardhat": {
      path: "deploy-testnet",
      seed: "dev06",
      bondAddress: "0xd7d55Fd7763A356aF99f17C9d6c21d933bC2e2F1",
      rootChainManager: "0xBbD7cBFA79faee899Eaf900F13C9065bF03B1A74",
      erc20Predicate: "0xdD6596F2029e6233DEFfaCa316e6A95217d4Dc34",
      checkpointManger: "0x2890bA17EfE978480615e330ecB65333b880928e",
      fxRoot: "0x3d1d3E34f7fB6D26245E6640E1c50710eFFf15bA",
      fxChild: "0xCf73231F28B7331BBe3124B907840A94851f9f11",
      stateSender: "0xEAa852323826C71cd7920C3b4c007184234c3945",
      withdrawCooldown: 2000,
      extra: {
        layer2BondAddress: "0xebB83c1b86A27eb9e2523A2c117F1d656269dbAE"
      }
    },
    "goerli": {
      path: "deploy-goerli",
      seed: "dev06",
      bondAddress: "0xd7d55Fd7763A356aF99f17C9d6c21d933bC2e2F1",
      rootChainManager: "0xBbD7cBFA79faee899Eaf900F13C9065bF03B1A74",
      erc20Predicate: "0xdD6596F2029e6233DEFfaCa316e6A95217d4Dc34",
      stateSender: "0xEAa852323826C71cd7920C3b4c007184234c3945",
      checkpointManger: "0x2890bA17EfE978480615e330ecB65333b880928e",
      fxRoot: "0x3d1d3E34f7fB6D26245E6640E1c50710eFFf15bA",
      fxChild: "",
      withdrawCooldown: 0,
      extra: null
    },
    "mumbai": {
      path: "deploy-mumbai",
      seed: "dev06",
      bondAddress: "0xebB83c1b86A27eb9e2523A2c117F1d656269dbAE",
      rootChainManager: addressZero,
      erc20Predicate: addressZero,
      stateSender: addressZero,
      checkpointManger: "0x2890bA17EfE978480615e330ecB65333b880928e",
      fxRoot: "0x3d1d3E34f7fB6D26245E6640E1c50710eFFf15bA",
      fxChild: "0xCf73231F28B7331BBe3124B907840A94851f9f11",
      withdrawCooldown: 10, // 201600
      extra: null
    }
    // 'matic': { // Polygon Mainnet
    //   path: 'deploy-goerli',
    //   bondAddress: '0xd7d55Fd7763A356aF99f17C9d6c21d933bC2e2F1',
    //   rootChainManager: '0xBbD7cBFA79faee899Eaf900F13C9065bF03B1A74',
    //   erc20Predicate: '0xdD6596F2029e6233DEFfaCa316e6A95217d4Dc34',
    //   stateSender: '0xEAa852323826C71cd7920C3b4c007184234c3945',
    // },
  } as BBPolyConfig;

  return cfg[networkName];
}
