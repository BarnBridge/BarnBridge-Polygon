import { expect } from "chai";

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
    Bond: (await ethers.getContractAt("IERC20", cfg.bondAddress, owner)),
    ERC20Predicate: (await ethers.getContractAt("IERC20Predicate", cfg.erc20Predicate, owner)),
    StateSender: (await ethers.getContractAt("IStateSender", cfg.stateSender, owner)),
  };

  // These object allow you to write things like `users[0].Token.transfer(....)`
  const users = await setupUsers(await getUnnamedAccounts(), contracts);

  // TODO get the proper interface and use mint instead of transfer
  await contracts.Bond.transfer(contracts.Vault.address, "1000000000000000000000").then((tx: { wait: () => any; }) => tx.wait());

  return {
    ...contracts,
    users,
    owner: await setupUser(owner, contracts),
  };
});

describe("Initialization tests", () => {
  it("Deployment should succeed and 1000 BOND should be in vault", async function () {
    const {Bond, Vault, owner} = await setup();

    const vaultBalance = await Bond.balanceOf(Vault.address);

    expect(vaultBalance)
      .to.equal("1000000000000000000000");
  });
});

describe("Vault Tests", function () {
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

describe("Transfer to Polygon tests", () => {
  it("Should transfer all BOND to Polygon", async function () {
    const {Bond, Vault, ERC20Predicate, StateSender} = await setup();
    const value = "1000000000000000000000";

    expect(await Bond.balanceOf(Vault.address))
      .to.equal(value);

    await expect(Vault.sendToPolygon())
      .to.emit(Bond, "Approval")
      .to.emit(ERC20Predicate, "LockedERC20").withArgs(Vault.address, Vault.address, Bond.address, value)
      .to.emit(Bond, "Transfer").withArgs(Vault.address, ERC20Predicate.address, value)
      .to.emit(StateSender, "StateSynced")

    expect(await Bond.balanceOf(Vault.address))
      .to.equal("0");

  });

});
