import { run, ethers } from "hardhat";
import {LPGetter__factory} from "../typechain";

async function main() {
   const signers = await ethers.getSigners(); 
    const factory = new LPGetter__factory(signers[0]);
    let contract = await factory.deploy();
    console.log(contract.deployTransaction.hash);
    await contract.deployed();

    const r = await contract.getAllLPs("0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73");
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });