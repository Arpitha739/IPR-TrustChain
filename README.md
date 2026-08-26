# 🔐 IPR TrustChain

### Digital Identity–Enabled Intellectual Property Protection and Verification Platform

IPR TrustChain is a full-stack, blockchain-enabled platform designed to establish and verify the provenance and integrity of Intellectual Property (IP) assets.

The platform enables creators to register IP assets, upload supporting evidence, generate cryptographic SHA-256 hashes, create blockchain-backed proof records, and allow third parties to independently verify the integrity of registered evidence.

> ⚠️ **Important:** IPR TrustChain is a digital provenance and evidence-verification platform. It does not replace government Intellectual Property registration systems and does not independently establish statutory legal ownership.

---

# 🚀 Project Objective

The objective of this MVP is to demonstrate an end-to-end Intellectual Property evidence and verification lifecycle.

```text
Creator Registration
        ↓
Digital Identity Generation
        ↓
User Authentication
        ↓
IP Asset Registration
        ↓
Unique IP Identifier Generation
        ↓
Evidence Upload
        ↓
SHA-256 Hash Generation
        ↓
Blockchain Proof Registration
        ↓
Digital IP Passport
        ↓
QR-Based Verification
        ↓
Third-Party Verification
        ↓
Authentic / Tampered Result
```

---

# ✨ Key Features

- User Registration and Authentication
- JWT-Based Security
- Role-Based Access Control
- Forgot Password and Password Reset
- Email OTP Verification
- Platform-Specific Digital Identity
- Intellectual Property Registration
- Unique IP Identifier Generation
- Evidence Document Upload
- SHA-256 Cryptographic Hashing
- Blockchain-Backed Evidence Registration
- Blockchain Transaction Tracking
- Public IP Verification
- Authentic Evidence Verification
- Tampered or Different File Detection
- Digital IP Passport
- Passport Download
- QR-Based Verification
- Audit Trail
- Admin Dashboard
- Global Exception Handling

---

# 🏗️ Architecture Overview

```text
┌─────────────────────────────┐
│          FRONTEND           │
│ React + TypeScript + Vite   │
│ Tailwind CSS                │
└──────────────┬──────────────┘
               │
               │ REST APIs / Axios
               ▼
┌─────────────────────────────┐
│           BACKEND           │
│      Spring Boot + Java     │
│   Spring Security + JWT     │
└──────────────┬──────────────┘
               │
       ┌───────┼────────┐
       ▼       ▼        ▼
┌──────────┐ ┌──────────────┐ ┌──────────────┐
│PostgreSQL│ │  Blockchain  │ │ File Storage │
│ Database │ │Smart Contract│ │   Evidence   │
└──────────┘ └──────────────┘ └──────────────┘
                    │
                    ▼
          ┌─────────────────┐
          │ Blockchain Proof│
          │ Evidence Hash   │
          │ Transaction Data│
          └─────────────────┘
```

---

# 🛠️ Tech Stack

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Axios
- React Router

## Backend

- Java
- Spring Boot
- Spring Security
- JWT Authentication
- Spring Data JPA
- Hibernate
- Maven

## Database

- PostgreSQL

## Blockchain

- Solidity
- Smart Contract
- EVM-Compatible Blockchain Environment
- Cryptographic Evidence Hash Registration

## Development Tools

- Visual Studio Code
- Eclipse / Spring Tool Suite
- PostgreSQL
- npm
- Maven
- Git

---

# 📁 Project Structure

```text
IPR-TrustChain-MVP/
│
├── ipr-trustchain-frontend/
│   │
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── types/
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
│
├── ipr-trustchain-backend/
│   │
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/iprtrustchain/
│   │       │       ├── config/
│   │       │       ├── controller/
│   │       │       ├── dto/
│   │       │       ├── entity/
│   │       │       ├── enums/
│   │       │       ├── exception/
│   │       │       ├── repository/
│   │       │       ├── security/
│   │       │       └── service/
│   │       │
│   │       └── resources/
│   │           └── application.properties.example
│   │
│   └── pom.xml
│
├── ipr-trustchain-blockchain/
│   │
│   ├── contracts/
│   │   └── IPRRegistry.sol
│   │
│   ├── scripts/
│   ├── test/
│   ├── package.json
│   └── hardhat.config.ts
│
├── .gitignore
│
└── README.md
```

---

# 🔐 Authentication and Authorization

The application implements JWT-based authentication and role-based access control.

## Authentication Features

- User Registration
- User Login
- BCrypt Password Hashing
- JWT Token Generation
- JWT Authentication Filter
- Protected APIs
- Role-Based Access Control
- Forgot Password
- Email OTP Verification
- Password Reset
- Global Exception Handling

---

# 👥 Supported Roles

## 👩‍💻 CREATOR

Creators can:

- Register and authenticate
- Receive a platform-specific Digital Identity
- Create IP assets
- Upload evidence documents
- Generate evidence hashes
- Register blockchain proof
- View Digital IP Passport
- Generate QR verification
- View audit history

## 🔍 VERIFIER

Verifiers can:

- Access verification functionality
- Verify registered IP records
- Upload evidence for integrity verification
- Validate SHA-256 hashes
- Detect modified or different files

## 🛡️ ADMIN

Administrators can inspect platform data including:

- Users
- IP Assets
- Audit Logs
- Platform Activities

---

# 🪪 Digital Identity

When a creator registers, the platform generates a unique platform-specific Digital Identity.

Example:

```text
did:iprtrustchain:bf36532a-3eb3-4103-bdbb-4438308d939b
```

The Digital Identity is associated with the creator and acts as part of the IP provenance layer.

> This MVP implements a platform-specific DID and does not claim government identity verification.

---

# 📦 IP Asset Registration

Creators can register Intellectual Property assets.

Supported information includes:

- IP Title
- Description
- IP Type
- Creator Information
- Owner Information
- Creation Details
- Asset Metadata

The backend automatically generates a unique IP Identifier.

Example:

```text
IPR-493d8628-e0d4-4b02-832b-f26ab8b0f0e4
```

---

# 📄 Digital Evidence and SHA-256 Hashing

Creators can upload supporting evidence documents.

The evidence processing flow is:

```text
Document Uploaded
        ↓
SHA-256 Hash Generated
        ↓
Hash Stored
        ↓
Evidence Associated With IP Asset
        ↓
Blockchain Proof Registration
```

Example SHA-256 hash:

```text
10d081ca2f7709ddd1951e93fca70ce1f7f3c2c1a8cb3572b996683e679169b2
```

The original document is kept off-chain.

The blockchain layer stores cryptographic proof information rather than the complete document.

---

# ⛓️ Blockchain Layer

The project contains a dedicated blockchain module:

```text
ipr-trustchain-blockchain/
```

The blockchain layer is responsible for maintaining tamper-evident proof associated with IP evidence.

Blockchain records can include:

- IP Asset Identifier
- Evidence SHA-256 Hash
- Creator Digital Identity
- Timestamp
- Transaction Identifier

Example transaction reference:

```text
0xcd4d84bdc4775297276c35107dc32508d9d12c45f1e292290f8d71131d9b28ef
```

## The Blockchain Layer Does Not Store

- Original Documents
- Passwords
- Email Addresses
- Mobile Numbers
- Sensitive Personal Information
- Confidential IP Content

---

# 📜 Smart Contract

The blockchain module contains a Solidity smart contract responsible for recording IP-related cryptographic proof.

The smart contract acts as a trust and verification layer rather than a storage location for complete documents.

Its purpose is to support blockchain-backed registration and verification of cryptographic evidence associated with Intellectual Property assets.

---

# 🔍 Public IP Verification

Third parties can verify an Intellectual Property asset using its unique IP Identifier.

```text
Enter IP Identifier
        ↓
Retrieve IP Record
        ↓
Retrieve Evidence and Proof Information
        ↓
Display Verification Result
```

Example:

```text
IP Title:
EcoPulse

IP Identifier:
IPR-493d8628-e0d4-4b02-832b-f26ab8b0f0e4

Blockchain Status:
VERIFIED
```

---

# 🧪 Evidence Integrity Verification

## ✅ Authentic Evidence

```text
Original Document
        ↓
Generate SHA-256 Hash
        ↓
Compare With Registered Evidence Hash
        ↓
Hash Matches
        ↓
✓ AUTHENTIC EVIDENCE
```

Result:

```text
AUTHENTIC

Evidence integrity verified successfully against blockchain proof.
```

---

## ❌ Modified or Different Evidence

```text
Modified Document
        ↓
Generate SHA-256 Hash
        ↓
Compare With Registered Evidence Hash
        ↓
Hash Does Not Match
        ↓
✕ VERIFICATION FAILED
```

Result:

```text
TAMPERED OR DIFFERENT FILE
```

This demonstrates how even a small modification to a document produces a completely different cryptographic hash.

---

# 🛂 Digital IP Passport

Each registered IP asset can generate a Digital IP Passport.

The passport can contain:

- IP Identifier
- IP Title
- IP Type
- Description
- Creator Digital Identity
- Evidence Information
- SHA-256 Hash
- Blockchain Transaction Reference
- Registration Timestamp
- Verification Status
- Audit History
- QR Verification

Example:

```text
DIGITAL IP PASSPORT

IP:
EcoPulse

Status:
VERIFIED

Creator DID:
did:iprtrustchain:bf36532a-3eb3-4103-bdbb-4438308d939b

Evidence:
ECOPULSE.pdf
```

---

# 📱 QR-Based Verification

Each IP asset can generate a QR-based verification link.

Example:

```text
/verify/IPR-493d8628-e0d4-4b02-832b-f26ab8b0f0e4
```

The QR code enables third parties to open the verification page and independently verify the IP record.

---

# 📊 Audit Trail

The platform maintains an audit history for important lifecycle events.

Example events include:

- IP_CREATED
- DOCUMENT_UPLOADED
- BLOCKCHAIN_REGISTERED
- EVIDENCE_VERIFIED

Example lifecycle:

```text
IP CREATED
        ↓
DOCUMENT UPLOADED
        ↓
SHA-256 HASH GENERATED
        ↓
BLOCKCHAIN REGISTERED
        ↓
EVIDENCE VERIFIED
```

This provides a chronological provenance record for each Intellectual Property asset.

---

# 🗄️ Database

The backend uses PostgreSQL.

The application stores data related to:

- Users
- Digital Identities
- Intellectual Property Assets
- Documents
- Audit Logs

PostgreSQL stores application data and metadata, while the blockchain layer stores cryptographic proof information.

---

# 🔒 Security Features

The current MVP includes:

- BCrypt Password Hashing
- JWT Authentication
- Stateless Session Management
- Role-Based Access Control
- Protected APIs
- SHA-256 Evidence Hashing
- Public and Private Verification Separation
- Audit Logging
- Global Exception Handling
- Sensitive Data Separation From Blockchain Proof

---

# 🔌 API Modules

## Authentication

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/forgot-password
POST /api/auth/reset-password
```

## Digital Identity

```text
GET  /api/identity/me
POST /api/identity/create
```

## Intellectual Property

```text
POST /api/ip
GET  /api/ip
GET  /api/ip/{assetId}
```

## Evidence Documents

```text
POST /api/documents/upload
GET  /api/documents/{id}
```

## Blockchain

```text
POST /api/blockchain/register
GET  /api/blockchain/{assetId}
```

## Verification

```text
GET  /api/verify/{assetId}
POST /api/verify/{assetId}/evidence
```

## QR Code

```text
GET /api/qr/{assetId}
```

## Audit Logs

```text
GET /api/audit-logs/{assetId}
```

> API endpoint mappings may vary slightly depending on the controller configuration.

---

# ▶️ Running the Project

## Prerequisites

Install:

- Java 17 or the Java version configured for this project
- Node.js and npm
- PostgreSQL
- Maven
- Git

Optional IDEs:

- Eclipse / Spring Tool Suite
- Visual Studio Code

---

# ⚙️ Backend Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
```

### 2. Navigate to the Backend

```bash
cd ipr-trustchain-backend
```

### 3. Create a PostgreSQL Database

```sql
CREATE DATABASE ipr_trustchain_backend;
```

### 4. Create Local Configuration

Copy:

```text
src/main/resources/application.properties.example
```

Create:

```text
src/main/resources/application.properties
```

Configure your local database credentials and other required environment-specific values.

Example:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/ipr_trustchain_backend
spring.datasource.username=YOUR_DATABASE_USERNAME
spring.datasource.password=YOUR_DATABASE_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

jwt.secret=YOUR_JWT_SECRET
jwt.expiration=86400000
```

### 5. Run the Backend

Using Maven:

```bash
mvn spring-boot:run
```

The backend runs on:

```text
http://localhost:8080
```

---

# 💻 Frontend Setup

Navigate to the frontend:

```bash
cd ipr-trustchain-frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend typically runs on:

```text
http://localhost:5173
```

---

# ⛓️ Blockchain Setup

Navigate to:

```bash
cd ipr-trustchain-blockchain
```

Install dependencies:

```bash
npm install
```

The blockchain module contains:

- Solidity Smart Contracts
- Hardhat Configuration
- Deployment Scripts
- Registration Scripts
- Verification Scripts
- Test Files

The exact blockchain configuration should be set according to the environment used for the project.

---

# 🧪 MVP Demonstration

## Case 1 — Authentic Evidence Verification

```text
1. Register Creator
        ↓
2. Digital Identity Generated
        ↓
3. Login
        ↓
4. Create IP Asset
        ↓
5. Upload Original Evidence
        ↓
6. SHA-256 Hash Generated
        ↓
7. Register Blockchain Proof
        ↓
8. Generate Digital IP Passport
        ↓
9. Open Public Verification
        ↓
10. Upload Original Evidence
        ↓
✓ AUTHENTIC EVIDENCE
```

---

## Case 2 — Tampered or Different Evidence

```text
1. Use a Modified or Different Evidence File
        ↓
2. Upload the File for Verification
        ↓
3. SHA-256 Hash Generated
        ↓
4. Compare With Registered Hash
        ↓
✕ HASH DOES NOT MATCH
        ↓
✕ VERIFICATION FAILED
```

---

# 📸 Screenshots

Application screenshots can be added to a `screenshots/` directory.

Suggested structure:

```text
screenshots/
├── IPR-Admin.png
├── IPR-Audit.png
├── IPR-Authentic.png
├── IPR-IPPasport.png
├── IPR-Tampered.png
├── IPR-Verify.png
├── IPR-creator.png
├── IPR-home.png
├── IPR-login.png
└── IPR-register.png
```


## HomePage

![Home](screenshots/IPR-home.png)

## Login

![Login](screenshots/IPR-login.png)

## IP Asset Registration

![IP Registration](screenshots/IPR-register.png)

## Creator DashBoard

![DashBoard](screenshots/IPR-creator.png)

## IPPasport

![IPPasport](screenshots/IPR-IPPasport.png)

## IP Audit

![Audit](screenshots/IPR-Audit.png)

## Verify

![Verify](screenshots/IPR-Verify.png)

## Evidence Verification

![Verification](screenshots/IPR-Authentic.png)

## Evidence Tampered

![Tampered](screenshots/IPR-Tampered.png)

## Admin Page

![Admin](screenshots/IPR-Admin.png)

```

---

# 🎯 MVP Feature Status

| Feature | Status |
|---|---|
| User Registration | ✅ |
| Login | ✅ |
| JWT Authentication | ✅ |
| Role-Based Access Control | ✅ |
| Forgot Password | ✅ |
| Password Reset | ✅ |
| Digital Identity | ✅ |
| IP Registration | ✅ |
| Unique IP Identifier | ✅ |
| Evidence Upload | ✅ |
| SHA-256 Hashing | ✅ |
| Blockchain Proof Registration | ✅ |
| Transaction Tracking | ✅ |
| Public Verification | ✅ |
| Authentic Evidence Verification | ✅ |
| Tampered Evidence Detection | ✅ |
| Digital IP Passport | ✅ |
| Passport Download | ✅ |
| QR Verification | ✅ |
| Audit Trail | ✅ |
| Admin Dashboard | ✅ |
| Global Exception Handling | ✅ |
| PostgreSQL Integration | ✅ |

---

# 🚧 Future Enhancements

Potential future improvements include:

- W3C Verifiable Credentials
- Ownership Transfer
- Co-Ownership Support
- IP Licensing
- Smart Contract Licensing
- Royalty Management
- Multiple Evidence Versions
- Cloud Object Storage
- Email Notifications
- Advanced Admin Dashboard
- API Rate Limiting
- Docker Containerization
- CI/CD Pipeline
- Cloud Deployment
- Automated Unit Testing
- Integration Testing
- Improved Test Coverage

---

# ⚠️ Disclaimer

IPR TrustChain provides a digital evidence, provenance, and verification layer.

A blockchain transaction, SHA-256 hash, Digital Identity, or Digital IP Passport should not by itself be interpreted as statutory Intellectual Property registration or definitive legal ownership.

The platform is intended to complement existing Intellectual Property offices, legal processes, government systems, universities, and enterprise workflows.

---

# 👩‍💻 Author

**Arpitha C**

---

# ⭐ Project Status

**MVP Completed**

The current version demonstrates a complete Intellectual Property evidence lifecycle, from creator registration and Digital Identity generation to evidence hashing, blockchain-backed proof registration, public verification, tamper detection, QR verification, Digital IP Passport generation, and audit tracking.

## 🚀 Deployment Status

> ⚠️ **Currently, IPR TrustChain is running in a local development environment and has not yet been deployed to a public cloud platform.**

### Current Development Environment

| Component | Technology | Local URL / Environment |
|---|---|---|
| Frontend | React + TypeScript + Vite | `http://localhost:5173` |
| Backend | Spring Boot + Java | `http://localhost:8080` |
| Blockchain API | Node.js Service | `http://localhost:3001` |
| Database | PostgreSQL | Local PostgreSQL Instance |

---

### Local System Architecture

```text
React Frontend
     │
     │ REST API / Axios
     ▼
Spring Boot Backend
     │
     ├──────────────► PostgreSQL Database
     │
     │ HTTP Request
     ▼
Node.js Blockchain API
     │
     ▼
Solidity Smart Contract
     │
     ▼
Blockchain Network
```

The Spring Boot backend communicates with the Node.js Blockchain API through REST API requests.

During evidence registration:

```text
Evidence Document
        ↓
SHA-256 Hash Generation
        ↓
Spring Boot Backend
        ↓
Node.js Blockchain API
        ↓
Solidity Smart Contract
        ↓
Blockchain Transaction
        ↓
Transaction Information Returned to Backend
```

> **Note:** `http://localhost:3001` represents the local Node.js Blockchain API/service, not the blockchain network itself.

---

### URL Configuration After Deployment

After deployment, all local development URLs must be replaced with the deployed production URLs.

For example:

```text
Current Local Frontend:
http://localhost:5173

Future Deployed Frontend:
https://your-frontend-url.com
```

Similarly:

```text
Current Local Backend:
http://localhost:8080

Future Deployed Backend:
https://your-backend-url.com
```

And:

```text
Current Local Blockchain API:
http://localhost:3001

Future Deployed Blockchain API:
https://your-blockchain-api-url.com
```

---

### QR Verification URL

The QR code currently generates a public verification URL using the local frontend address:

```text
http://localhost:5173/verify/{IP_IDENTIFIER}
```

For example:

```text
http://localhost:5173/verify/IPR-493d8628-e0d4-4b02-832b-f26ab8b0f0e4
```

After deployment, the QR verification URL must be updated to use the deployed frontend URL:

```text
https://your-frontend-url.com/verify/{IP_IDENTIFIER}
```

For example:

```text
https://your-frontend-url.com/verify/IPR-493d8628-e0d4-4b02-832b-f26ab8b0f0e4
```

This ensures that users can scan the QR code from any device and access the public IP verification page.

> **Important:** Production URLs should be configured using environment variables or application configuration instead of hardcoding `localhost` URLs.

---
