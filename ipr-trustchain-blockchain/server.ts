import express from "express";
import { ethers } from "ethers";
import "dotenv/config";

const app = express();

app.use(express.json());

const PORT = Number(process.env.PORT) || 3001;

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const RPC_URL = process.env.RPC_URL;

const PRIVATE_KEY = process.env.PRIVATE_KEY;

if (!CONTRACT_ADDRESS) {
    throw new Error("CONTRACT_ADDRESS environment variable is missing");
}

if (!RPC_URL) {
    throw new Error("RPC_URL environment variable is missing");
}

if (!PRIVATE_KEY) {
    throw new Error("PRIVATE_KEY environment variable is missing");
}

const ABI = [
    "function registerHash(string fileHash) public",
    "function verifyHash(string fileHash) public view returns (bool, uint256, address)"
];

const provider = new ethers.JsonRpcProvider(RPC_URL);

const wallet = new ethers.Wallet(
    PRIVATE_KEY,
    provider
);

const contract = new ethers.Contract(
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