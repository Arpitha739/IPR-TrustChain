// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract IPRRegistry  {

    struct IPRecord {
        string fileHash;
        uint256 timestamp;
        address registeredBy;
    }

    mapping(string => IPRecord) private records;

    event HashRegistered(
        string fileHash,
        uint256 timestamp,
        address registeredBy
    );

    function registerHash(string memory fileHash) public {

        require(
            records[fileHash].timestamp == 0,
            "Hash already registered"
        );

        records[fileHash] = IPRecord(
            fileHash,
            block.timestamp,
            msg.sender
        );

        emit HashRegistered(
            fileHash,
            block.timestamp,
            msg.sender
        );
    }

    function verifyHash(
        string memory fileHash
    )
        public
        view
        returns (
            bool exists,
            uint256 timestamp,
            address registeredBy
        )
    {

        IPRecord memory record = records[fileHash];

        if (record.timestamp == 0) {
            return (false, 0, address(0));
        }

        return (
            true,
            record.timestamp,
            record.registeredBy
        );
    }
}