import { HardhatUserConfig, task } from "hardhat/config";
import '@typechain/hardhat'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'
import "@nomiclabs/hardhat-waffle";
const { moralis_bsc } = require("./secrets.json")

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});


const config: HardhatUserConfig = {
  solidity: {
    compilers: [{ version: '0.8.4', settings: {} }],
  },
  defaultNetwork: "hardhat",
    networks: {
      hardhat: {
        forking: {
          url: moralis_bsc,
        }
      },
      localhost: {
        url: "http://127.0.0.1:8545",
      }
  }
}

export default config