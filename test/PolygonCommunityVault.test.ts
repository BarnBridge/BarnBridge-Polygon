import { expect } from "./chai-setup";

import hre, { ethers, deployments, getNamedAccounts, getUnnamedAccounts } from "hardhat";

import { setupUsers, setupUser } from "./helpers";
import { config } from "../utils/config";

const setup = deployments.createFixture(async ({
                                                 deployments,
                                                 getNamedAccounts,
                                                 getUnnamedAccounts,
                                                 ethers
                                               }, options) => {
  const cfg = config(hre);

  //await deployments.fixture(["PolygonCommunityVault"]);
  await deployments.fixture();

  const {owner} = await getNamedAccounts();

  const contracts = {
    Vault: (await ethers.getContract("PolygonCommunityVault")),
    Bond: (await ethers.getContractAt("ERC20", cfg.bondAddress, owner))
  };

  // These object allow you to write things like `users[0].Token.transfer(....)`
  const users = await setupUsers(await getUnnamedAccounts(), contracts);

  await contracts.Bond.transfer(contracts.Vault.address, "1000000000000000000000").then((tx: { wait: () => any; }) => tx.wait());

  return {
    ...contracts,
    users,
    owner: await setupUser(owner, contracts)
  };
});

describe("PolygonCommunityVault contract", () => {
  it("Deployment should succeed and 1000 BOND should be in vault", async function () {
    const {Bond, Vault, owner} = await setup();

    const vaultBalance = await Bond.balanceOf(Vault.address);
    console.log("vault balance: ", vaultBalance);

    expect(vaultBalance)
      .to.equal("1000000000000000000000");
  });

  it("Should transfer all BOND balance to proxy", () => {

  });
});

describe("Contract Tests", function () {
  it("Should fail if no owner tries to set allowance", async function () {
    const {owner, users} = await setup();

    await expect(users[0].Vault.setAllowance(owner.address, "1")).to.be.revertedWith(
      "Ownable: caller is not the owner"
    );
  });

  it("Should transfer ownership", async function () {
    const {Vault, owner, users} = await setup();

    expect(await Vault.owner()).to.be.equal(owner.address);

    await expect(owner.Vault.transferOwnership(users[0].address))
      .to.emit(Vault, "OwnershipTransferred");

    expect(await Vault.owner()).to.be.equal(users[0].address);
  });
});

describe("Events", () => {
  it("setAllowance works for owner and emits SetAllowance", async function () {
    const {Vault, owner, users} = await setup();

    await expect(owner.Vault.setAllowance(owner.address, "1000000000000000000000"))
      .to.emit(Vault, "SetAllowance");
  });
});
