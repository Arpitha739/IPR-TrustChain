import { network } from "hardhat";

async function main() {
    const { ethers } = await network.connect();

    const CONTRACT_ADDRESS =
        "0x5FbDB2315678afecb367f032d93F642f64180aa3";

    const IPRRegistry =
        await ethers.getContractFactory("IPRRegistry");

    const iprRegistry =
        IPRRegistry.attach(CONTRACT_ADDRESS);

    const documentHash =
        "9217de1133b587f69231b53b67e6e3055274509ed17ea8d8142d981e7a89c82c";

    console.log("Registering document hash...");

    const transaction =
        await iprRegistry.registerHash(documentHash);

    console.log("Transaction sent:", transaction.hash);

    await transaction.wait();

    console.log("Document registered successfully!");
    console.log("Transaction Hash:", transaction.hash);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});