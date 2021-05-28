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
    Harvester: (await ethers.getContract("TokenHarvester")),
    Layer2Harvester: (await ethers.getContract("Layer2TokenHarvester")),
    Bond: (await ethers.getContractAt("IERC20", cfg.bondAddress, owner)),
    MockRootChainManager: (await ethers.getContract("MockRootChainManager"))
    // ERC20Predicate: (await ethers.getContractAt("IERC20Predicate", cfg.erc20Predicate, owner)),
    // StateSender: (await ethers.getContractAt("IStateSender", cfg.stateSender, owner))
  };

  // These object allow you to write things like `users[0].Token.transfer(....)`
  const users = await setupUsers(await getUnnamedAccounts(), contracts);

  // TODO get the proper interface and use mint instead of transfer
  // await contracts.Bond.transfer(contracts.Vault.address, "1000000000000000000000").then((tx: { wait: () => any; }) => tx.wait());

  // await contracts.Bond.transfer(contracts.Layer2Vault.address, "1000000000000000000000").then((tx: { wait: () => any; }) => tx.wait());

  return {
    ...contracts,
    users,
    owner: await setupUser(owner, contracts)
  };
});

describe("Harvester Layer1 tests", () => {
  describe("Initialization tests", () => {
    it("Deployment should succeed and owner be set", async function () {
      const {Bond, Harvester, owner} = await setup();

      expect(await Bond.balanceOf(Harvester.address))
        .to.equal("0");

      expect(await Harvester.owner()).to.be.equal(owner.address);
    });
  });

  describe("Harvester Tests", function () {
    it("Should fail if random address tries to transferOwnership", async function () {
      const {users} = await setup();

      await expect(users[0].Harvester.transferOwnership(users[0].address)).to.be.revertedWith(
        "Ownable: caller is not the owner"
      );
    });

    it("Should transferOwnership", async function () {
      const {Harvester, owner, users} = await setup();

      expect(await Harvester.owner()).to.be.equal(owner.address);

      await expect(owner.Harvester.transferOwnership(users[0].address))
        .to.emit(Harvester, "OwnershipTransferred");

      expect(await Harvester.owner()).to.be.equal(users[0].address);
    });
  });

  // TODO add multiple tokens tests
  describe("Root Chain Token Tests", () => {
    it("Should allow any user to exit and transfer tokens to owner", async function () {
      const {Bond, Harvester, owner, users} = await setup();
      const value = "1000000000000000000000";

      expect(await Bond.balanceOf(Harvester.address))
        .to.equal("0");

      await expect(users[0].Harvester.withdrawOnRoot("0x00"))
        .to.emit(Harvester, "WithdrawOnRoot").withArgs(users[0].address);

      // transfer some funds manually to the Harvester
      const beforeBalance = await Bond.balanceOf(owner.address);
      await owner.Bond.transfer(Harvester.address, value).then((tx: { wait: () => any; }) => tx.wait());

      expect(await Bond.balanceOf(Harvester.address))
        .to.equal(value);

      await expect(users[0].Harvester.transferToOwner(Bond.address))
        .to.emit(Harvester, "TransferToOwner")
        .withArgs(users[0].address, owner.address, Bond.address, value)
        .to.emit(Bond, "Transfer")
        .withArgs(Harvester.address, owner.address, value);

      expect(await Bond.balanceOf(Harvester.address))
        .to.equal("0");

      expect(await Bond.balanceOf(owner.address))
        .to.equal(beforeBalance);
    });

    describe("Failing Child Function on Root Chain Tests", () => {
      it("Should fail withdrawOnChild", async function () {
        const {Bond, users} = await setup();

        await expect(users[0].Harvester.withdrawOnChild(Bond.address)).to.be.revertedWith(
          "Harvester: should only be called on child chain"
        );
      });
    });
  });
});

describe("Child Chain Tests", () => {
  describe("Initialization Tests", () => {
    it("Deployment should succeed and owner be set", async function () {
      const {Bond, Layer2Harvester, owner} = await setup();

      expect(await Bond.balanceOf(Layer2Harvester.address))
        .to.equal("0");

      expect(await Layer2Harvester.owner()).to.be.equal(owner.address);
    });
  });

  describe("Failing Root Functions on Child Chain Tests", () => {
    it("Should fail withdrawOnLayer1", async function () {
      const {users} = await setup();

      await expect(users[0].Layer2Harvester.withdrawOnRoot("0x00")).to.be.revertedWith(
        "Harvester: should only be called on root chain"
      );
    });
  });
});
