import { task } from "hardhat/config";
import "hardhat-deploy";
import "@nomiclabs/hardhat-ethers";

task("sy-set-fees-owner", "Sets a fee owner on a smart yield controller")
  .addParam("instance", "SY Instance")
  .addParam("owner", "Fees owner")
  .setAction(async ({instance, owner}, hre) => {
    const {ethers} = hre;

    const SYController = (await ethers.getContractAt("ISmartYieldController", instance));

    let tx = await SYController.setFeesOwner(owner, {gasLimit: 1000000});
    console.log(`tx ${tx.hash}`);
    await tx.wait();

    let newOwner = await SYController.feesOwner();
    console.log("fees owner", newOwner)
  });

module.exports = {};
