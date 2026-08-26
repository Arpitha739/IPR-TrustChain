import express from "express";
import { ethers } from "ethers";

const app = express();

app.use(express.json());

const PORT = 3001;

const CONTRACT_ADDRESS =
    "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const RPC_URL =
    "http://127.0.0.1:8545";

const PRIVATE_KEY =
    "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";


const ABI = [

    "function registerHash(string fileHash) public",

    "function verifyHash(string fileHash) public view returns (bool, uint256, address)"

];


const provider =
    new ethers.JsonRpcProvider(RPC_URL);


const wallet =
    new ethers.Wallet(
        PRIVATE_KEY,
        provider
    );


const contract =
    new ethers.Contract(
        CONTRACT_ADDRESS,
        ABI,
        wallet
    );


// REGISTER HASH

app.post(
    "/blockchain/register",
    async (req, res) => {

        try {

            const { documentHash } = req.body;

            if (!documentHash) {

                return res.status(400).json({
                    success: false,
                    error: "documentHash is required"
                });

            }

            console.log(
                "Checking hash:",
                documentHash
            );


            const existingRecord =
                await contract.verifyHash(
                    documentHash
                );


            if (existingRecord[0]) {

                console.log(
                    "Hash already exists on blockchain"
                );

                return res.json({

                    success: true,

                    alreadyRegistered: true,

                    documentHash:
                        documentHash,

                    transactionHash: null,

                    timestamp:
                        existingRecord[1].toString(),

                    registeredBy:
                        existingRecord[2]

                });

            }


            console.log(
                "Registering new hash:",
                documentHash
            );


            const transaction =
                await contract.registerHash(
                    documentHash
                );


            console.log(
                "Transaction sent:",
                transaction.hash
            );


            const receipt =
                await transaction.wait();


            res.json({

                success: true,

                alreadyRegistered: false,

                documentHash:
                    documentHash,

                transactionHash:
                    transaction.hash,

                blockNumber:
                    receipt?.blockNumber ?? null

            });

        } catch (error) {

            console.error(error);

            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "Unknown error";

            res.status(500).json({

                success: false,

                error: errorMessage

            });

        }

    }
);


// VERIFY HASH

app.get(
    "/blockchain/verify/:hash",
    async (req, res) => {

        try {

            const documentHash =
                req.params.hash;


            const result =
                await contract.verifyHash(
                    documentHash
                );


            res.json({

                verified:
                    result[0],

                timestamp:
                    result[1].toString(),

                registeredBy:
                    result[2]

            });

        } catch (error) {

            console.error(error);

            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "Unknown error";

            res.status(500).json({

                success: false,

                error: errorMessage

            });

        }

    }
);


app.listen(PORT, () => {

    console.log(
        `Blockchain API running on port ${PORT}`
    );

});