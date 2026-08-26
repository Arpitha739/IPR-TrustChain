import { network } from "hardhat";

async function main() {

    const { ethers } = await network.connect();

    const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

    const IPRRegistry =
        await ethers.getContractFactory("IPRRegistry");

    const iprRegistry =
        IPRRegistry.attach(CONTRACT_ADDRESS);
const documentHash =
  "70ac696334f359fc80fc4dc450ecb377f356060333676c3e5bafea4ad278c6ac";
    console.log("Checking document hash...");

    const result =
        await iprRegistry.verifyHash(documentHash);

    console.log("Verification result:", result);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});