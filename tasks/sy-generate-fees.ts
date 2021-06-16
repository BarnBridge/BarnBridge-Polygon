import { task } from "hardhat/config";
import "hardhat-deploy";
import "@nomiclabs/hardhat-ethers";

task("sy-generate-fees", "Generate fees on SY")
  .setAction(async (args, hre) => {
    const {ethers} = hre;

    const SmartYieldAMUSDC = (await ethers.getContract("SmartYieldAMUSDC"));
    const USDC = (await ethers.getContract("USDC"));
    await USDC.approve("0x63fD30ed07c91B7b27Da5c828c7eB752F7e4676b", ethers.constants.MaxUint256);
    // const amUSDC = (await ethers.getContract("amUSDC"));
    // await amUSDC.approve("0x63fD30ed07c91B7b27Da5c828c7eB752F7e4676b", ethers.constants.MaxUint256);
    // await amUSDC.approve(SmartYieldAMUSDC.address, ethers.constants.MaxUint256);
    let tx = await SmartYieldAMUSDC.buyTokens(10000, 0, Math.floor(Date.now() / 1000) + 3600, {gasLimit: 500000});
    console.log(`https://explorer-mumbai.maticvigil.com/tx/${tx.hash}`);

    // // const SmartYield = (await ethers.getContract("SmartYield", instance));
    // //
    // // let tx = await SYController.setFeesOwner(owner, {gasLimit: 1000000});
    // // console.log(`tx ${tx.hash}`);
    // // await tx.wait();
    //
    // let newOwner = await SYController.feesOwner();
    // console.log("fees owner", newOwner)
  });

module.exports = {};
