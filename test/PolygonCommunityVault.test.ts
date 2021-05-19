import { expect } from "./chai-setup";

import hre, { ethers, deployments, getNamedAccounts } from 'hardhat';

import { config } from '../utils/config'

const setupTest = deployments.createFixture(async ({ deployments, getNamedAccounts, ethers }, options) => {
  const cfg = config(hre);

  await deployments.fixture();
  const { owner } = await getNamedAccounts();
  const bondToken = await ethers.getContractAt('ERC20', cfg.bondAddress, owner);

  const vault = await ethers.getContract('PolygonCommunityVault', owner);

  await bondToken.transfer(vault.address, '1000000000000000000000').then((tx: { wait: () => any; }) => tx.wait());

  return {
    owner: {
      address: owner,
      bondToken,
      vault,
    }
  };
});

describe("PolygonCommunityVault contract", () => {
  it("Deployment should succeed and 1000 BOND should be in vault", async function () {
    const { owner } = await setupTest()

    const vaultBalance = await owner.bondToken.balanceOf(owner.vault.address);
    console.log('vault balance: ', vaultBalance)

    expect(vaultBalance)
      .to.equal('1000000000000000000000');
  });

  it("Should transfer all BOND balance to proxy", () => {

  })
});

describe("Events", () => {
  it("setAllowance emits SetAllowance", async function () {
    const { owner } = await setupTest()

    expect(owner.vault.setAllowance(owner.address, '1000000000000000000000'))
      .to.emit(owner.vault.address, "SetAllowance");
  });
});