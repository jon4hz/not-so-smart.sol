import { ethers } from "hardhat";
import {EasyTrader__factory} from "../typechain";

async function main() {

    const pancakeFactory = "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73";

    const signers = await ethers.getSigners(); 
    const factory = new EasyTrader__factory(signers[0]);
    const connectors = [
        "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", 
        "0x2170ed0880ac9a755fd29b2688956bd959f933f8", 
        "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d", 
        "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3", 
        "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
        "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c",
        "0x55d398326f99059fF775485246999027B3197955"
    ];
    let contract = await factory.deploy(connectors);
    console.log(contract.deployTransaction.hash);
    await contract.deployed();

    await contract.getConnectors().then(console.log);

    type pair = {
        t0 : string,
        t1 : string,
    }
    const pairs : pair[] = [
        {t0: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", t1: "0x2170ed0880ac9a755fd29b2688956bd959f933f8"},
        {t0: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", t1: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"},
        {t0: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", t1: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d"},
    ]
    await contract.getPossibleLPs(pairs, pancakeFactory).then(console.log);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });