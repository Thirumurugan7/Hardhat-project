// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.

const { ethers, run, network } = require("hardhat")
const { Network, Alchemy } = require("alchemy-sdk")
async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("Deploying ....")
    const SimpleStorage = await SimpleStorageFactory.deploy()
    await SimpleStorage.deployed()
    console.log(SimpleStorage.address)
    if (network.config.chainId === 4 && process.env.ETHER_SCAN_API_KEY) {
        await SimpleStorage.deployTransaction.wait(6)
        await verify(SimpleStorage.address, [])
    }
    const currentValue = await SimpleStorage.retrieve()
    console.log(`current value is ${currentValue}`)

    //update the value
    const transactionResponse = await SimpleStorage.store("8")
    await transactionResponse.wait(1)

    const updatedValue = await SimpleStorage.retrieve()
    console.log(`updated value is: ${updatedValue}`)
}

async function verify(contractAddress, args) {
    console.log("verifying contract....")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
        console.log("verified")
    } catch (e) {
        if (e.message.toLowerCase().include("already verified")) {
            console.log("Already Verified")
        } else {
            console.log(e)
        }
    }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
