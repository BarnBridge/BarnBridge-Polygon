import { task } from "hardhat/config";
import "hardhat-deploy";
import "@nomiclabs/hardhat-ethers";
import { config } from "../utils/config";

task("tunnel-transfer-from-goerli", "Sends bond to mumbai from goerli")
  .setAction(async (args, hre) => {
    const { ethers, deployments: l2deployments, getNamedAccounts } = hre;
    if (hre.network.name != "matic") {
      console.log("wrong network, run on l2");
      return;
    }
    const l1deployments = hre.companionNetworks["l1"].deployments;
    const cfg = config(hre);
    const { owner } = await getNamedAccounts();

    const TokenHarvester = await ethers.getContract("PolygonTokenHarvester"); //l2deployments.get("PolygonTokenHarvester");
    // const Bond = (await ethers.getContractAt("ERC20Mock", cfg.bondAddress, owner));

    // const amount = "1000000000000000000";
    const payload = TokenHarvester.interface.encodeFunctionData("setWithdrawCooldown", [201602]);

    // const tx = await l1deployments.execute("PolygonDAORoot",
    //   {from: owner},
    //   "callOnChild", TokenHarvester.address, 0, payload
    // );

    // console.log(`https://goerli.etherscan.io/tx/${tx.transactionHash}`);
    console.log(await TokenHarvester.withdrawCooldown(), payload)

    // const Bond = (await ethers.getContractAt("ERC20Mock", cfg.bondAddress, owner));
    // const Vault = await ethers.getContract("PolygonCommunityVault");
    // const ChildDAO = await ethers.getContract("PolygonDAOChild");

    // const to = owner;
    // const amount = "10000000000000000";
    // const payload = Vault.interface.encodeFunctionData("setAllowance", [ChildDAO.address, amount]);
    // console.log(payload);
    // console.log("allowance", (await Bond.allowance(Vault.address, ChildDAO.address)).toString());
    // console.log("vault balance", (await Bond.balanceOf(Vault.address)).toString());
    // console.log("to balance", (await Bond.balanceOf(owner)).toString());

    // const tx = await l1deployments.execute("PolygonDAORoot",
    //   {from: owner},
    //   "callOnChild", Vault.address, 0, payload
    // );
    // console.log(`https://etherscan.io/tx/${tx.transactionHash}`);

    // const payload = Bond.interface.encodeFunctionData("transferFrom", [Vault.address, to, amount]);
    // console.log(payload);
   
    // const tx = await l1deployments.execute("PolygonDAORoot",
    //   {from: owner},
    //   "callOnChild", Bond.address, 0, payload
    // );
    // console.log(`https://etherscan.io/tx/${tx.transactionHash}`);
  });

module.exports = {};
