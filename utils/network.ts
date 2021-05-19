import 'dotenv/config';
import { HardhatNetworkAccountsUserConfig } from 'hardhat/types/config';

export function node_url(networkName: string): string {
  if (networkName) {
    const uri = process.env['ETH_NODE_' + networkName.toUpperCase()];
    if (uri && uri !== '') {
      return uri;
    }
  }

  let uri = process.env.ETH_NODE;
  if (uri) {
    uri = uri.replace('{{networkName}}', networkName);
  }
  if (!uri || uri === '') {
    if (networkName === 'localhost') {
      return 'http://localhost:8545';
    }
    return '';
  }
  if (uri.indexOf('{{') >= 0) {
    throw new Error(
      `invalid uri or network not supported by node provider : ${uri}`
    );
  }
  return uri;
}

export function accounts(networkName?: string): HardhatNetworkAccountsUserConfig {
  if (networkName) {
    const env = process.env['ACCOUNTS_' + networkName.toUpperCase()];
    if (env && env.length > 0) {
      return JSON.parse(env);
    }
  }

  const env = process.env.ACCOUNTS;
  if (env && env.length > 0) {
    return JSON.parse(env)
  }

  return { mnemonic: 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about' };
}

export function ownerKeyHardhat(): string {
  return process.env.OWNER_KEY_HARDHAT || '';
}
