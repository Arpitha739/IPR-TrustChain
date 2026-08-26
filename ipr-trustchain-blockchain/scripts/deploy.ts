import { network } from "hardhat";

async function main() {
    const { ethers } = await network.connect();

    const IPRRegistry = await ethers.getContractFactory("IPRRegistry");

    const iprRegistry = await IPRRegistry.deploy();

    await iprRegistry.waitForDeployment();

    console.log(
        "IPRRegistry deployed to:",
        await iprRegistry.getAddress()
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});