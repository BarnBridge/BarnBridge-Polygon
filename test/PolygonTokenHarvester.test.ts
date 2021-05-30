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
    RootHarvester: (await ethers.getContract("RootPolygonTokenHarvester")),
    ChildHarvester: (await ethers.getContract("ChildPolygonTokenHarvester")),
    Bond: (await ethers.getContractAt("IERC20", cfg.bondAddress, owner)),
    MockRootChainManager: (await ethers.getContract("MockRootChainManager"))
    // ERC20Predicate: (await ethers.getContractAt("IERC20Predicate", cfg.erc20Predicate, owner)),
    // StateSender: (await ethers.getContractAt("IStateSender", cfg.stateSender, owner))
  };

  // These object allow you to write things like `users[0].Token.transfer(....)`
  const users = await setupUsers(await getUnnamedAccounts(), contracts);

  return {
    ...contracts,
    cfg,
    users,
    owner: await setupUser(owner, contracts)
  };
});

describe("Harvester Root Chain Tests", () => {
  describe("Initialization tests", () => {
    it("Deployment should succeed and sane options should be set", async function () {
      const {Bond, RootHarvester, MockRootChainManager, owner} = await setup();

      expect(await Bond.balanceOf(RootHarvester.address))
        .to.equal("0");

      expect(await RootHarvester.owner()).to.be.equal(owner.address);

      expect(await RootHarvester.rootChainManager()).to.be.equal(MockRootChainManager.address);
    });
  });

  describe("Harvester Tests", function () {
    it("Should fail if random address tries to transferOwnership", async function () {
      const {users} = await setup();

      await expect(users[0].RootHarvester.transferOwnership(users[0].address))
        .to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("Should transferOwnership", async function () {
      const {RootHarvester, owner, users} = await setup();

      expect(await RootHarvester.owner()).to.be.equal(owner.address);

      await expect(owner.RootHarvester.transferOwnership(users[0].address))
        .to.emit(RootHarvester, "OwnershipTransferred");

      expect(await RootHarvester.owner()).to.be.equal(users[0].address);
    });
  });

  // TODO add multiple tokens tests
  describe("Root Chain Token Tests", () => {
    it("Should allow any user to exit and transfer tokens to owner", async function () {
      const {Bond, RootHarvester, owner, users} = await setup();
      const value = "1000000000000000000000";

      expect(await Bond.balanceOf(RootHarvester.address))
        .to.equal("0");

      await expect(users[0].RootHarvester.withdrawOnRoot("0x00"))
        .to.emit(RootHarvester, "WithdrawOnRoot").withArgs(users[0].address);

      // transfer some funds manually to the Harvester
      const beforeBalance = await Bond.balanceOf(owner.address);
      await owner.Bond.transfer(RootHarvester.address, value).then((tx: { wait: () => any; }) => tx.wait());

      expect(await Bond.balanceOf(RootHarvester.address))
        .to.equal(value);

      await expect(users[0].RootHarvester.transferToOwner(Bond.address))
        .to.emit(RootHarvester, "TransferToOwner")
        .withArgs(users[0].address, owner.address, Bond.address, value)
        .to.emit(Bond, "Transfer")
        .withArgs(RootHarvester.address, owner.address, value);

      expect(await Bond.balanceOf(RootHarvester.address))
        .to.equal("0");

      expect(await Bond.balanceOf(owner.address))
        .to.equal(beforeBalance);
    });

    describe("Failing Child Function on Root Chain Tests", () => {
      it("Should fail withdrawOnChild", async function () {
        const {Bond, users} = await setup();

        await expect(users[0].RootHarvester.withdrawOnChild(Bond.address)).to.be.revertedWith(
          "Harvester: should only be called on child chain"
        );
      });
    });
  });
});

describe("Child Chain Tests", () => {
  describe("Initialization Tests", () => {
    it("Deployment should succeed and sane options should be set", async function () {
      const {Bond, ChildHarvester, owner} = await setup();

      expect(await Bond.balanceOf(ChildHarvester.address))
        .to.equal("0");

      expect(await ChildHarvester.owner()).to.be.equal(owner.address);

      expect(await ChildHarvester.rootChainManager()).to.be.equal(ethers.constants.AddressZero);
    });
  });

  describe("Getters and Setters Tests", () => {
    it("withdrawCooldown", async function () {
      const {ChildHarvester, cfg, owner, users} = await setup();

      expect(await ChildHarvester.withdrawCooldown())
        .to.be.equal(cfg.withdrawCooldown);

      const newCooldown = 4;

      await owner.ChildHarvester.setWithdrawCooldown(newCooldown);
      expect(await ChildHarvester.withdrawCooldown())
        .to.be.equal(newCooldown);

      await expect(users[0].ChildHarvester.setWithdrawCooldown(newCooldown))
        .to.be.revertedWith("Ownable: caller is not the owner");

      await expect(owner.ChildHarvester.setWithdrawCooldown(-1))
        .to.be.reverted;
    });
  });

  describe("Withdrawal Tests", () => {
    it("withdrawOnChild", async function () {
      const {Bond, ChildHarvester, users} = await setup();

      // await expect(ChildHarvester.withdrawOnChild(Bond.address))
      //   .to.emit(ChildHarvester, "WithdrawOnChild");
    });
  });

  describe("Failing Root Functions on Child Chain Tests", () => {
    it("Should fail withdrawOnRoot", async function () {
      const {users} = await setup();

      await expect(users[0].ChildHarvester.withdrawOnRoot("0x00"))
        .to.be.revertedWith("Harvester: should only be called on root chain");
    });
  });
});
