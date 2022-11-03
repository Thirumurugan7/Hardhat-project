require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()
require("@nomiclabs/hardhat-ethers")
require("@nomiclabs/hardhat-etherscan")
require("./tasks/block-number")
require("hardhat-gas-reporter")
require("solidity-coverage")
/** @type import('hardhat/config').HardhatUserConfig */
const GOEROLI_RPC_URL = process.env.GOEROLI_RPC_URL
const PRIVATE_KEY = process.env.GOEROLI_PRIVATE_KEY
const ETHER_SCAN_API_KEY = process.env.ETHER_SCAN_API_KEY
const COINMARKETCAP_API_KEY = process.env.COINMARKET_API_KEY
module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        goerli: {
            url: GOEROLI_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 5,
        },
        localhost: {
            url: "http://127.0.0.1:8545/",
            chainId: 31337,
        },
    },
    etherscan: {
        apiKey: ETHER_SCAN_API_KEY,
    },
    gasReporter: {
        enabled: true,
        outputFile: "gas-report.txt",
        noColors: true,
        currency: "USD",
        coinmarketcap: COINMARKETCAP_API_KEY,
        token: "MATIC",
    },

    solidity: "0.8.8",
}
