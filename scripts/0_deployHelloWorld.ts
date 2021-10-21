import { run, ethers } from "hardhat";

async function main() {
    const factory = await ethers.getContractFactory("HelloWorld");
    let contract = await factory.deploy();
    console.log(contract.deployTransaction.hash);
    await contract.deployed();
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });