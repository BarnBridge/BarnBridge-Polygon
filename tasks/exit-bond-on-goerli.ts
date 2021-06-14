import { HardhatUserConfig, task } from 'hardhat/config';
import "hardhat-deploy";
import "@nomiclabs/hardhat-ethers";
import { MaticPOSClient } from '@maticnetwork/maticjs';
import { config } from "../utils/config";

task("exit-bond-on-goerli", "Sends bond to mumbai from goerli")
    .addParam("txHash", "Burn tx hash")
    .setAction(async ({ txHash }, hre) => {
        const { ethers, deployments, getNamedAccounts, getUnnamedAccounts } = hre;
        if (hre.network.name != "goerli") {
            console.log("wrong network");
            return;
        }
        const cfg = config(hre);
        const { owner } = await getNamedAccounts();
        const Harvester = (await ethers.getContract("PolygonTokenHarvester"));

        // const Bond = (await ethers.getContractAt("ERC20Mock", cfg.bondAddress, owner));
        // const RootVault = (await ethers.getContract("PolygonCommunityVault"))

        const maticPOSClient = new MaticPOSClient({
            network: "testnet",
            version: "mumbai",
            parentProvider: process.env["ETH_NODE_GOERLI"],
            maticProvider: process.env["ETH_NODE_MUMBAI"]
          });
        const exitCalldata = await maticPOSClient.exitERC20(txHash, { from: owner, encodeAbi: true });
        console.log(exitCalldata)

        const accounts = await ethers.getSigners();

        // let tx = await accounts[0].sendTransaction({
        //     from: owner,
        //     to: "0xbbd7cbfa79faee899eaf900f13c9065bf03b1a74",
        //     data: exitCalldata.data
        // })

        // const justPayload = exitCalldata.data.replace("0x3805550f", "0x");
        // console.log(justPayload);
        let tx = await Harvester.withdrawOnRoot(exitCalldata, { gasLimit: 1000000 });

        console.log(`https://goerli.etherscan.io/tx/${tx.hash}`)

        // let tx = await Harvester.transferToOwner(cfg.bondAddress, { gasLimit: 500000 });
        // console.log(`https://goerli.etherscan.io/tx/${tx.hash}`)

    });

module.exports = {};
