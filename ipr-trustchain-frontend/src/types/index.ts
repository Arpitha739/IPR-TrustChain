export interface User {
  userId: number;
  name: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  message: string;
  userId: number;
  name: string;
  email: string;
  role: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  mobile: string;
  organization: string;
  country: string;
  role: string;
  password: string;
}

export interface CreateIPRequest {
  title: string;
  description: string;
  type: string;
}

export interface IPResponse {
  id: number;
  userId: number;
  ipIdentifier: string;
  title: string;
  description: string;
  type: string;
  status: string;
  createdAt: string;
}

export interface DocumentResponse {
  id: number;
  ipId: number;
  fileName: string;
  fileType: string;
  fileSize: number;
  fileHash: string;
  uploadedAt: string;
}

export interface BlockchainResponse {
  documentId: number;
  fileHash: string;
  blockchainTransactionId: string;
  blockchainRegisteredAt: string;
}

export interface IPWorkflowResponse {
  id: number;

  ipIdentifier: string;

  title: string;

  description: string;

  type: string;

  status: string;

  document: DocumentResponse | null;

  blockchain: BlockchainResponse | null;
}