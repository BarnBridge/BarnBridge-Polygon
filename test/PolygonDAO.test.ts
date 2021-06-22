import { expect } from "chai";

import hre, { deployments, ethers, getNamedAccounts, getUnnamedAccounts } from "hardhat";

import { setupUser, setupUsers } from "./helpers";
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
    RootDAO: (await ethers.getContract("PolygonDAORoot")),
    ChildDAO: (await ethers.getContract("PolygonDAOChildTest")),
    Bond: (await ethers.getContractAt("IERC20", cfg.bondAddress, owner)),
    ChildMockERC20MOK: (await ethers.getContract("ChildMockERC20MOK")),
    StateSender: (await ethers.getContractAt("IStateSender", cfg.stateSender, owner))
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

describe("Polygon DAO Root Chain Tests", () => {
  describe("Initialization tests", () => {
    it("Deployment should succeed and sane options should be set", async function () {
      const {Bond, RootDAO, owner} = await setup();

      expect(await Bond.balanceOf(RootDAO.address))
        .to.equal("0");

      expect(await RootDAO.owner()).to.be.equal(owner.address);

    });
  });

  describe("PolygonDAORoot Tests", function () {
    it("Should fail if random address tries to transferOwnership", async function () {
      const {users} = await setup();

      await expect(users[0].RootDAO.transferOwnership(users[0].address))
        .to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("Should transfer payload to bridge", async function () {
      const {RootDAO, ChildDAO, ChildMockERC20MOK, StateSender, owner, users} = await setup();

      // setFxChildTunnel
      await RootDAO.setFxChildTunnel(ChildDAO.address);

      // setFxRootTunnel
      await ChildDAO.setFxRootTunnel(RootDAO.address);

      const amount = "1000000000000000000000";
      await ChildMockERC20MOK.mint(ChildDAO.address, amount);
      expect(await ChildMockERC20MOK.balanceOf(ChildDAO.address))
        .to.equal(amount);

      // encode addr + sig + calldata
      const payload = ChildMockERC20MOK.interface.encodeFunctionData("transfer", [users[0].address, amount]);

      // transfer to/through the bridge
      await expect(RootDAO.callOnChild(ChildMockERC20MOK.address, payload))
        .to.emit(StateSender, "StateSynced")
        .to.emit(RootDAO, "CallOnChild")
        .withArgs(owner.address, ChildMockERC20MOK.address, "0xa9059cbb");

      const coder = new ethers.utils.AbiCoder();
      const encoded = coder.encode(["address", "bytes"], [ChildMockERC20MOK.address, payload]);

      // receive on child and execute
      await expect(ChildDAO.processMessageFromRootTest(0, RootDAO.address, encoded))
        .to.not.be.reverted;
    });
  });

  // describe("Root Chain Token Tests", () => {
  //   it("Should allow any user to exit and transfer tokens to owner", async function () {
  //     const {Bond, RootHarvester, owner, users} = await setup();
  //     const value = "1000000000000000000000";
  //
  //     expect(await Bond.balanceOf(RootHarvester.address))
  //       .to.equal("0");
  //
  //     await expect(users[0].RootHarvester.withdrawOnRoot("0x3805550f000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000"))
  //       .to.emit(RootHarvester, "WithdrawOnRoot").withArgs(users[0].address);
  //
  //     // transfer some funds manually to the Harvester
  //     const beforeBalance = await Bond.balanceOf(owner.address);
  //     await owner.Bond.transfer(RootHarvester.address, value).then((tx: { wait: () => any; }) => tx.wait());
  //
  //     expect(await Bond.balanceOf(RootHarvester.address))
  //       .to.equal(value);
  //
  //     await expect(users[0].RootHarvester.transferToOwner(Bond.address))
  //       .to.emit(RootHarvester, "TransferToOwner")
  //       .withArgs(users[0].address, owner.address, Bond.address, value)
  //       .to.emit(Bond, "Transfer")
  //       .withArgs(RootHarvester.address, owner.address, value);
  //
  //     expect(await Bond.balanceOf(RootHarvester.address))
  //       .to.equal("0");
  //
  //     expect(await Bond.balanceOf(owner.address))
  //       .to.equal(beforeBalance);
  //   });
  // });
});
