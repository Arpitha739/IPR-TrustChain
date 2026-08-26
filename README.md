IPR TrustChain
Digital Identity–Enabled Intellectual Property Protection and Verification Platform

IPR TrustChain is a blockchain-enabled digital trust platform designed to establish and verify the provenance of Intellectual Property assets.

The platform enables creators to:

Create an account and authenticate securely
Receive a platform-specific Digital Identity (DID)
Register Intellectual Property assets
Upload supporting evidence
Generate SHA-256 cryptographic hashes
Register evidence proof on blockchain
Generate a Digital IP Passport
Generate QR-based verification links
Allow third parties to independently verify evidence authenticity
Detect tampered or modified documents
Maintain a complete audit trail of important lifecycle events

Important: IPR TrustChain is a digital provenance and evidence-verification platform. It does not replace government IP registration systems or independently establish statutory legal ownership.

🚀 MVP Objective

The core objective of this MVP is to demonstrate the complete Intellectual Property verification lifecycle:

Creator Registration
        ↓
Digital Identity Generation
        ↓
Login
        ↓
Register IP Asset
        ↓
Generate Unique IP Identifier
        ↓
Upload Evidence
        ↓
Generate SHA-256 Hash
        ↓
Register Evidence Proof on Blockchain
        ↓
Generate Digital IP Passport
        ↓
Generate QR Verification Link
        ↓
Third-Party Verification
        ↓
Authentic / Tampered Result
🏗️ Project Architecture
                         ┌─────────────────────┐
                         │      FRONTEND       │
                         │ React + TypeScript  │
                         │ Tailwind CSS        │
                         └──────────┬──────────┘
                                    │
                                    │ REST API
                                    ▼
                         ┌─────────────────────┐
                         │      BACKEND        │
                         │ Spring Boot + Java  │
                         │ Spring Security     │
                         │ JWT Authentication │
                         └──────────┬──────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    ▼               ▼               ▼
             ┌────────────┐  ┌────────────┐  ┌─────────────┐
             │ PostgreSQL │  │ Blockchain │  │ File Storage│
             │  Database  │  │ Smart      │  │ Evidence    │
             │            │  │ Contract   │  │ Documents   │
             └────────────┘  └────────────┘  └─────────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │ Blockchain Proof    │
                         │ Transaction Hash    │
                         │ Evidence Hash       │
                         └─────────────────────┘
📁 Project Structure
IPR-TRUSTCHAIN/
│
├── ipr-trustchain-frontend/
│   │
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── types/
│   │   └── App.tsx
│   │
│   ├── React
│   ├── TypeScript
│   ├── Tailwind CSS
│   └── Vite
│
├── ipr-trustchain-backend/
│   │
│   └── src/main/java/com/iprtrustchain/
│       ├── config/
│       ├── controller/
│       ├── dto/
│       ├── entity/
│       ├── enums/
│       ├── exception/
│       ├── repository/
│       ├── security/
│       └── service/
│
├── blockchain/
│   │
│   ├── contracts/
│   │   └── IPRTrustChain.sol
│   │
│   ├── scripts/
│   ├── artifacts/
│   └── configuration files
│
├── PostgreSQL Database
│
└── README.md
🛠️ Technology Stack
Frontend
React
TypeScript
Vite
Tailwind CSS
Axios
React Router
Backend
Java
Spring Boot
Spring Security
JWT Authentication
Spring Data JPA
Hibernate
Maven
Database
PostgreSQL
Blockchain
Solidity Smart Contract
EVM-compatible blockchain environment
Blockchain transaction hashes
Evidence hash registration and verification
Development Tools
Visual Studio Code
PostgreSQL
Spring Boot
npm
Maven
🔐 Authentication & Authorization

The platform implements JWT-based authentication and Role-Based Access Control.

Supported Roles
CREATOR

Can:

Register and login
Receive Digital Identity
Create IP assets
Upload evidence
Register blockchain proof
View Digital IP Passport
Generate QR verification
View audit history
VERIFIER

Can:

Access verification functionality
Verify IP records
Upload original evidence
Validate SHA-256 hashes
ADMIN

Can manage and inspect:

Users
IP assets
Blockchain records
Audit logs
Platform activities
🔑 Authentication Features

Implemented:

User Registration
Secure Password Hashing using BCrypt
Login
JWT Token Generation
JWT Authentication Filter
Role-Based Access Control
Logout on frontend
Forgot Password
Email OTP Verification
Password Reset
Global Exception Handling
🪪 Digital Identity

When a Creator registers, the system automatically generates a platform-specific Decentralized Identifier.

Example:

did:iprtrustchain:bf36532a-3eb3-4103-bdbb-4438308d939b

The Digital Identity is associated with the creator and used as part of the IP provenance layer.

This MVP identity is platform-specific and does not claim government identity verification.

📦 IP Asset Registration

Creators can register Intellectual Property assets.

Supported information includes:

IP Title
Description
IP Type
Creator
Owner
Creation Information
Asset Metadata

The system automatically generates a unique IP Identifier.

Example:

IPR-493d8628-e0d4-4b02-832b-f26ab8b0f0e4
📄 Digital Evidence Upload

Creators can upload supporting evidence documents.

When a document is uploaded:

Document Uploaded
        ↓
SHA-256 Hash Generated
        ↓
Hash Stored
        ↓
Associated with IP Asset
        ↓
Blockchain Registration

Example SHA-256 hash:

10d081ca2f7709ddd1951e93fca70ce1f7f3c2c1a8cb3572b996683e679169b2

The original document itself is not stored on the blockchain.

Only cryptographic proof and related blockchain information are recorded.

⛓️ Blockchain Integration

The project contains a dedicated:

blockchain/

folder containing the blockchain and smart contract implementation.

The blockchain layer is responsible for recording cryptographic evidence related to Intellectual Property assets.

Blockchain records include information such as:

IP Asset ID
Evidence SHA-256 Hash
Creator DID
Timestamp
Transaction ID

Example transaction:

0xcd4d84bdc4775297276c35107dc32508d9d12c45f1e292290f8d71131d9b28ef

The blockchain layer does not store:

Original documents
Passwords
Email addresses
Mobile numbers
Sensitive personal information
Confidential IP content
📜 Smart Contract

The blockchain module contains a Solidity smart contract responsible for recording IP-related proof and events.

The smart contract architecture supports core operations such as:

registerAsset()
addEvidence()
recordEvent()
getAsset()
verifyEvidence()
getAssetHistory()

The smart contract acts as a trust and verification layer rather than a storage location for full documents.

🔍 Public IP Verification

Anyone can verify an Intellectual Property asset using its IP Identifier.

Example flow:

Enter IP Identifier
        ↓
Retrieve IP Record
        ↓
Retrieve Blockchain Proof
        ↓
Display Public Metadata
        ↓
Blockchain Verified

Example:

IP Title:
EcoPulse

IP Identifier:
IPR-493d8628-e0d4-4b02-832b-f26ab8b0f0e4

Evidence:
ECOPULSE.pdf

Blockchain Status:
VERIFIED
🧪 Evidence Integrity Verification

The platform supports cryptographic verification of original evidence.

Authentic Document
Original Document
        ↓
SHA-256 Generated
        ↓
Hash Compared
        ↓
Matches Registered Blockchain Evidence
        ↓
✓ AUTHENTIC EVIDENCE

Result:

AUTHENTIC

Evidence integrity verified successfully
against blockchain proof.
Tampered Document
Modified Document
        ↓
New SHA-256 Generated
        ↓
Hash Compared
        ↓
Does Not Match Registered Evidence
        ↓
✕ VERIFICATION FAILED

Result:

TAMPERED OR DIFFERENT FILE

Evidence Verification Failed

This demonstrates that modifying the document produces a different cryptographic hash.

🛂 Digital IP Passport

Each registered IP asset can generate a Digital IP Passport.

The passport contains:

IP Identifier
IP Title
IP Type
Description
Creator Digital Identity
DID
Evidence File
SHA-256 Hash
Blockchain Transaction ID
Blockchain Registration Timestamp
Verification Status
Audit Trail
QR Verification

Example:

DIGITAL IP PASSPORT

IP: EcoPulse

Status:
✓ VERIFIED

Creator DID:
did:iprtrustchain:bf36532a-3eb3-4103-bdbb-4438308d939b

Evidence:
ECOPULSE.pdf

Blockchain Transaction:
0xcd4d84bdc4775297276c35107dc32508d9d12c45f1e292290f8d71131d9b28ef

The Digital IP Passport can also be downloaded.

📱 QR Verification

Each IP asset receives a QR-based verification link.

Example:

/verify/IPR-493d8628-e0d4-4b02-832b-f26ab8b0f0e4

The QR code allows third parties to open the public verification page and independently verify the Intellectual Property record.

📊 Audit Trail

The platform maintains an audit history for important IP lifecycle events.

Example events:

USER_CREATED

IDENTITY_CREATED

IP_CREATED

DOCUMENT_UPLOADED

HASH_GENERATED

BLOCKCHAIN_REGISTERED

EVIDENCE_VERIFIED

Example audit trail:

IP CREATED
25/8/2026, 11:56:26 pm

DOCUMENT UPLOADED
25/8/2026, 11:56:36 pm

BLOCKCHAIN REGISTERED
25/8/2026, 11:56:38 pm

EVIDENCE VERIFIED
26/8/2026, 12:01:56 am

EVIDENCE VERIFICATION FAILED
26/8/2026, 12:02:39 am

This creates a chronological provenance record for each Intellectual Property asset.

🗄️ Database

The backend uses PostgreSQL.

Main entities include:

users
identities
ip_assets
documents
blockchain_records
audit_logs

The database stores application data, metadata, evidence references, hashes, and audit information.

Sensitive information is kept separate from blockchain proof data.

🔒 Security Features

The current MVP includes:

BCrypt Password Hashing
JWT Authentication
Stateless Session Management
Role-Based Access Control
Protected APIs
Global Exception Handling
SHA-256 Evidence Hashing
Public/Private Verification Separation
Audit Logging
Sensitive Data Excluded from Blockchain Records
🔌 Main API Modules
Authentication
POST /api/auth/register
POST /api/auth/login
POST /api/auth/forgot-password
POST /api/auth/reset-password
Digital Identity
GET /api/identity/me
POST /api/identity/create
IP Assets
POST /api/ip
GET /api/ip
GET /api/ip/{assetId}
Documents / Evidence
POST /api/documents/upload
GET /api/documents/{id}
Blockchain
POST /api/blockchain/register
GET /api/blockchain/{assetId}
Verification
GET /api/verify/{assetId}
POST /api/verify/{assetId}/evidence
QR
GET /api/qr/{assetId}
Audit Logs
GET /api/audit-logs/{assetId}

API endpoint names may vary slightly depending on the implemented controller mappings.

▶️ Running the Project
1. Clone the Repository
git clone <your-repository-url>
cd IPR-TRUSTCHAIN
Backend Setup

Navigate to:

cd ipr-trustchain-backend

Configure PostgreSQL in:

src/main/resources/application.properties

Example:

spring.datasource.url=jdbc:postgresql://localhost:5432/ipr_trustchain_backend

spring.datasource.username=postgres

spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update

server.port=8080

Run the Spring Boot application:

./mvnw spring-boot:run

The backend runs on:

http://localhost:8080
Frontend Setup

Navigate to:

cd ipr-trustchain-frontend

Install dependencies:

npm install

Start the application:

npm run dev

The frontend runs on:

http://localhost:5173
Blockchain Setup

Navigate to:

cd blockchain

The blockchain folder contains the Solidity smart contract and related blockchain configuration/scripts.

Deploy and run the blockchain layer according to the configuration used in the project.

Update this section with your exact blockchain environment name, for example Ganache, Hardhat, or another EVM-compatible local/test network.

🧪 Critical MVP Demonstration
Case 1 — Authentic Evidence
1. Register Creator
        ↓
2. Digital Identity Generated
        ↓
3. Login
        ↓
4. Create IP Asset
        ↓
5. Upload Original Document
        ↓
6. SHA-256 Generated
        ↓
7. Blockchain Proof Created
        ↓
8. IP Passport Generated
        ↓
9. Open Public Verification
        ↓
10. Upload Original Document
        ↓
✓ AUTHENTIC EVIDENCE
Case 2 — Tampered Evidence
1. Modify Original Document
        ↓
2. Upload Modified File
        ↓
3. SHA-256 Generated Again
        ↓
4. Hash Compared with Registered Proof
        ↓
✕ HASH DOES NOT MATCH
        ↓
✕ VERIFICATION FAILED
🎯 MVP Status

The core end-to-end MVP workflow has been implemented and demonstrated:

Feature	Status
User Registration	✅
Login	✅
JWT Authentication	✅
Role-Based Access	✅
Password Reset	✅
Digital Identity / DID	✅
IP Registration	✅
Unique IP Identifier	✅
Evidence Upload	✅
SHA-256 Hashing	✅
Blockchain Proof	✅
Transaction Tracking	✅
Public IP Verification	✅
Authentic Document Verification	✅
Tampered Document Detection	✅
Digital IP Passport	✅
Passport Download	✅
QR Verification	✅
Audit Trail	✅
Global Exception Handling	✅
PostgreSQL Integration	✅
🚧 Future Enhancements

Potential Phase 2 features include:

W3C Verifiable Credentials
Ownership Transfer
Co-ownership
IP Licensing
Smart Contract Licensing
Royalty Management
Multiple Evidence Versions
S3 / Cloud Object Storage
Email Notifications
Advanced Admin Management
API Rate Limiting
Malware Scanning
Docker
CI/CD Pipeline
Cloud Deployment
Automated Unit Testing
Integration Testing
Test Coverage Improvements
⚠️ Disclaimer

IPR TrustChain provides a digital evidence, provenance, and verification layer.

A blockchain transaction, SHA-256 hash, or Digital IP Passport should not by itself be interpreted as statutory Intellectual Property registration or definitive legal ownership.

The platform is designed to complement existing Intellectual Property offices, legal processes, government systems, universities, and enterprise workflows.

👩‍💻 Developer

Arpitha C

📌 Project Vision

Identify the Creator.
Authenticate the IP.
Prove the Provenance.
Secure the Rights.
Automate the Value.