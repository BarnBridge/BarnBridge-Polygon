import { task } from "hardhat/config";
import "hardhat-deploy";
import "@nomiclabs/hardhat-ethers";
import { config } from "../utils/config";

task("tunnel-transfer-from-goerli", "Sends bond to mumbai from goerli")
  .setAction(async (args, hre) => {
    const {ethers, deployments, getNamedAccounts, getUnnamedAccounts} = hre;
    if (hre.network.name != "mumbai") {
      console.log("wrong network, run on l2");
      return;
    }
    const l1deployments = hre.companionNetworks["l1"].deployments;
    const cfg = config(hre);
    const {owner} = await getNamedAccounts();

    const Bond = (await ethers.getContractAt("ERC20Mock", cfg.bondAddress, owner));

    const amount = "1000000000000000000";
    const payload = Bond.interface.encodeFunctionData("transfer", [owner, amount]);

    const tx = await l1deployments.execute("PolygonDAORoot",
      {from: owner},
      "callOnChild", Bond.address, 0, payload
    );

    console.log(`https://goerli.etherscan.io/tx/${tx.transactionHash}`);
  });

module.exports = {};
