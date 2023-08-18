require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    astar: {
      url:"https://evm.astar.network",
      chainId:592,
      accounts:[process.env.ASTAR_PRIVATE_KEY],
    },
    shibuya: {
      url:"https://evm.shibuya.astar.network",
      chainId:81,
      accounts: [process.env.SECOND],
    },
    sepolia: {
      url: 'https://ethereum-sepolia-rpc.allthatnode.com',
      chainIs:11155111,
      accounts: [process.env.SECOND]
    }
  }
};
//0x14FA9A316eD4Aa2EBcECd432C422a67B12EC9124