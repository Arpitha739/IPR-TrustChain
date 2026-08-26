import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import type {
  CreateIPRequest,
  IPResponse,
  DocumentResponse,
  BlockchainResponse,
  IPWorkflowResponse,
} from "../types";

const CreatorDashboard = () => {
const { logout, user } = useAuth();
const navigate = useNavigate();


  // -----------------------------
  // UI STATES
  // -----------------------------

  const [showForm, setShowForm] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [loadingIPs, setLoadingIPs] =
    useState(true);

  const [uploading, setUploading] =
    useState(false);

  const [registeringBlockchain, setRegisteringBlockchain] =
    useState(false);

  const [error, setError] =
    useState("");

    

  // -----------------------------
  // DATA STATES
  // -----------------------------

  const [ips, setIPs] =
    useState<IPResponse[]>([]);

  const [createdIP, setCreatedIP] =
    useState<IPResponse | null>(null);

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [uploadedDocument, setUploadedDocument] =
    useState<DocumentResponse | null>(null);

  const [blockchainResult, setBlockchainResult] =
    useState<BlockchainResponse | null>(null);

  const [formData, setFormData] =
    useState<CreateIPRequest>({
      title: "",
      description: "",
      type: "OTHER",
    });

    const handleLogout = () => {
  logout();
  navigate("/login");
};

  // -----------------------------
  // LOAD EXISTING IPS
  // -----------------------------

  useEffect(() => {

    const fetchIPs = async () => {

      if (!user?.userId) {
        setLoadingIPs(false);
        return;
      }

      try {

        setLoadingIPs(true);

        const response =
          await api.get<IPResponse[]>(
            `/ip/user/${user.userId}`
          );

        setIPs(response.data);

      } catch (error: any) {

        console.error(
          "Failed to load IPs:",
          error
        );

        setError(
          error.response?.data?.message ||
          "Failed to load intellectual properties"
        );

      } finally {

        setLoadingIPs(false);

      }

    };

    fetchIPs();

  }, [user?.userId]);


  // -----------------------------
  // HANDLE FORM CHANGE
  // -----------------------------

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };


  // -----------------------------
  // STEP 1 — CREATE IP
  // -----------------------------

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    if (!user?.userId) {

      setError(
        "User information not found"
      );

      return;

    }

    setLoading(true);

    setError("");

    try {

      const response =
        await api.post<IPResponse>(
          `/ip/user/${user.userId}`,
          formData
        );

      const newIP =
        response.data;

      setCreatedIP(newIP);

      setIPs((previousIPs) => [
        newIP,
        ...previousIPs,
      ]);

      setShowForm(false);

      setUploadedDocument(null);

      setBlockchainResult(null);

      setSelectedFile(null);

      setFormData({
        title: "",
        description: "",
        type: "OTHER",
      });

    } catch (error: any) {

      console.error(error);

      setError(
        error.response?.data?.message ||
        "Failed to register intellectual property"
      );

    } finally {

      setLoading(false);

    }

  };


  // -----------------------------
  // SELECT EXISTING IP
  // -----------------------------

const handleSelectIP = async (
  ip: IPResponse
) => {

  try {

    setError("");

    setCreatedIP(ip);

    setUploadedDocument(null);

    setBlockchainResult(null);

    setSelectedFile(null);

    setShowForm(false);

    const response =
      await api.get<IPWorkflowResponse>(
        `/ip/${ip.id}/workflow`
      );

    const workflow =
      response.data;

    console.log(
      "Loaded workflow:",
      workflow
    );

    setUploadedDocument(
      workflow.document
    );

    setBlockchainResult(
      workflow.blockchain
    );

  } catch (error: any) {

    console.error(
      "Failed to load IP workflow:",
      error
    );

    setError(
      error.response?.data?.message ||
      "Failed to load IP workflow details"
    );

  }

};

  // -----------------------------
  // STEP 2 — UPLOAD DOCUMENT
  // -----------------------------

const handleUploadDocument = async () => {
  if (!createdIP) {
    setError(
      "Please select or create an IP record first"
    );
    return;
  }

  if (!createdIP.id) {
    setError(
      "Selected IP does not have a valid database ID"
    );
    console.error(
      "Invalid IP object:",
      createdIP
    );
    return;
  }

  if (!selectedFile) {
    setError(
      "Please select a document"
    );
    return;
  }

  setUploading(true);
  setError("");

  try {
    const uploadData = new FormData();

    uploadData.append(
      "file",
      selectedFile
    );

    console.log(
      "Uploading document for IP ID:",
      createdIP.id
    );

    console.log(
      "Selected file:",
      selectedFile.name
    );

    const response =
      await api.post<DocumentResponse>(
        `/documents/upload?ipId=${createdIP.id}`,
        uploadData
      );

    console.log(
      "Document upload successful:",
      response.data
    );

    setUploadedDocument(
      response.data
    );

    setSelectedFile(null);

  } catch (error: any) {

    console.error(
      "Document upload error:",
      error
    );

    console.error(
      "Server response:",
      error.response?.data
    );

    setError(
      error.response?.data?.message ||
      (typeof error.response?.data === "string"
        ? error.response.data
        : null) ||
      "Failed to upload document"
    );

  } finally {

    setUploading(false);

  }
};


  // -----------------------------
  // STEP 3 — BLOCKCHAIN
  // -----------------------------

  const handleBlockchainRegistration =
    async () => {

      if (!uploadedDocument) {

        setError(
          "Please upload a document first"
        );

        return;

      }

      setRegisteringBlockchain(true);

      setError("");

      try {

        const response =
          await api.post<BlockchainResponse>(
            `/blockchain/register/${uploadedDocument.id}`
          );

        setBlockchainResult(
          response.data
        );

      } catch (error: any) {

        console.error(error);

        setError(
          error.response?.data?.message ||
          "Failed to register document on blockchain"
        );

      } finally {

        setRegisteringBlockchain(false);

      }

    };


  // -----------------------------
  // START NEW IP
  // -----------------------------

  const startNewIP = () => {

    setCreatedIP(null);

    setSelectedFile(null);

    setUploadedDocument(null);

    setBlockchainResult(null);

    setError("");

    setFormData({
      title: "",
      description: "",
      type: "OTHER",
    });

    setShowForm(true);

  };


  // -----------------------------
  // CANCEL NEW IP
  // -----------------------------

  const cancelNewIP = () => {

    setShowForm(false);

    setError("");

  };

  // -----------------------------
// BACK TO MY IPS
// -----------------------------

const backToIPList = () => {

  setCreatedIP(null);

  setUploadedDocument(null);

  setBlockchainResult(null);

  setSelectedFile(null);

  setShowForm(false);

  setError("");

};


  return (

    <div className="min-h-screen bg-slate-950 p-6 text-white md:p-10">

      <div className="mx-auto max-w-7xl">


        {/* ============================= */}
        {/* HEADER */}
        {/* ============================= */}

        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

          <div>

            <p className="text-sm font-semibold tracking-widest text-cyan-400">

              CREATOR WORKSPACE

            </p>

            <h1 className="mt-2 text-3xl font-bold md:text-4xl">

              Welcome back, {user?.name}

            </h1>

  <button
    onClick={handleLogout}
    className="shrink-0 rounded-lg bg-red-600 px-5 py-2.5 text-white transition hover:bg-red-700"
  >
    Logout
  </button>

            <p className="mt-3 text-slate-400">

              Protect your ideas with immutable blockchain evidence.

            </p>

          </div>


          <button
            onClick={startNewIP}
            className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
          >

            + Register New IP

          </button>

        </div>


        {/* ============================= */}
        {/* STATS */}
        {/* ============================= */}

        <div className="mt-10 grid gap-6 md:grid-cols-3">

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <p className="text-slate-400">

              Intellectual Properties

            </p>

            <h2 className="mt-3 text-3xl font-bold">

              {loadingIPs
                ? "..."
                : ips.length}

            </h2>

            <p className="mt-2 text-sm text-slate-500">

              Registered assets

            </p>

          </div>


          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <p className="text-slate-400">

  Current IP Evidence

</p>

<h2 className="mt-3 text-3xl font-bold">

  {createdIP
    ? uploadedDocument
      ? "1"
      : "0"
    : "--"}

</h2>

<p className="mt-2 text-sm text-slate-500">

  Documents for selected IP

</p>

          </div>


          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <p className="text-slate-400">

              Blockchain Network

            </p>

            <h2 className="mt-3 text-xl font-bold text-emerald-400">

              Connected

            </h2>

            <p className="mt-2 text-sm text-slate-500">

              Immutable proof layer

            </p>

          </div>

        </div>


        {/* ============================= */}
        {/* ERROR */}
        {/* ============================= */}

        {error && (

          <div className="mt-8 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-400">

            {error}

          </div>

        )}


        {/* ============================= */}
        {/* EXISTING IP RECORDS */}
        {/* ============================= */}

        {!showForm && !createdIP && (

          <div className="mt-10">

            <div className="mb-5">

              <p className="text-sm font-semibold text-cyan-400">

                EXISTING INTELLECTUAL PROPERTIES

              </p>

              <h2 className="mt-2 text-2xl font-bold">

                Select an IP to continue

              </h2>

              <p className="mt-2 text-slate-400">

                Choose an existing IP record and continue
                with evidence upload.

              </p>

            </div>


            {loadingIPs && (

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-slate-400">

                Loading your intellectual properties...

              </div>

            )}


            {!loadingIPs &&
              ips.length === 0 && (

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

                <p className="text-slate-400">

                  You haven't registered any intellectual
                  property yet.

                </p>

                <button
                  onClick={startNewIP}
                  className="mt-5 rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950"
                >

                  Register Your First IP

                </button>

              </div>

            )}


            <div className="grid gap-5 md:grid-cols-2">

              {ips.map((ip) => (

                <button
                  key={ip.id}
                  onClick={() =>
                    handleSelectIP(ip)
                  }
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-left transition hover:border-cyan-500 hover:bg-slate-800"
                >

                  <p className="text-xs font-semibold text-cyan-400">

                    {ip.type}

                  </p>

                  <h3 className="mt-2 text-xl font-bold">

                    {ip.title}

                  </h3>

                  <p className="mt-3 line-clamp-3 text-sm text-slate-400">

                    {ip.description}

                  </p>

                  <div className="mt-5 border-t border-slate-800 pt-4">

                    <p className="text-xs text-slate-500">

                      IP IDENTIFIER

                    </p>

                    <p className="mt-1 break-all font-mono text-sm text-cyan-400">

                      {ip.ipIdentifier}

                    </p>

                  </div>

                  <div className="mt-5">

                    <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">

                      {ip.status}

                    </span>

                  </div>

                  <p className="mt-5 text-sm font-semibold text-cyan-400">

                    Continue with this IP →

                  </p>

                </button>

              ))}

            </div>

          </div>

        )}


        {/* ============================= */}
        {/* WORKFLOW PROGRESS */}
        {/* ============================= */}

        {(showForm || createdIP) && (

          <div className="mt-10">

            <div className="grid gap-3 md:grid-cols-4">


              {/* STEP 1 */}

              <div
                className={`rounded-xl border p-4 ${
                  createdIP
                    ? "border-emerald-500/40 bg-emerald-500/10"
                    : "border-cyan-500/40 bg-cyan-500/10"
                }`}
              >

                <p className="text-xs text-slate-400">

                  STEP 1

                </p>

                <p className="mt-1 font-semibold">

                  Register IP

                </p>

                <p className="mt-1 text-xs text-emerald-400">

                  {createdIP
                    ? "✓ Complete"
                    : "In Progress"}

                </p>

              </div>


              {/* STEP 2 */}

              <div
                className={`rounded-xl border p-4 ${
                  uploadedDocument
                    ? "border-emerald-500/40 bg-emerald-500/10"
                    : "border-slate-800 bg-slate-900"
                }`}
              >

                <p className="text-xs text-slate-400">

                  STEP 2

                </p>

                <p className="mt-1 font-semibold">

                  Upload Evidence

                </p>

                <p className="mt-1 text-xs text-slate-500">

                  {uploadedDocument
                    ? "✓ Complete"
                    : "Pending"}

                </p>

              </div>


              {/* STEP 3 */}

              <div
                className={`rounded-xl border p-4 ${
                  blockchainResult
                    ? "border-emerald-500/40 bg-emerald-500/10"
                    : "border-slate-800 bg-slate-900"
                }`}
              >

                <p className="text-xs text-slate-400">

                  STEP 3

                </p>

                <p className="mt-1 font-semibold">

                  Blockchain Proof

                </p>

                <p className="mt-1 text-xs text-slate-500">

                  {blockchainResult
                    ? "✓ Complete"
                    : "Pending"}

                </p>

              </div>


              {/* STEP 4 */}

              <div
                className={`rounded-xl border p-4 ${
                  blockchainResult
                    ? "border-emerald-500/40 bg-emerald-500/10"
                    : "border-slate-800 bg-slate-900"
                }`}
              >

                <p className="text-xs text-slate-400">

                  STEP 4

                </p>

                <p className="mt-1 font-semibold">

                  Verification

                </p>

                <p className="mt-1 text-xs text-slate-500">

                  {blockchainResult
                    ? "✓ Ready"
                    : "Pending"}

                </p>

              </div>

            </div>

          </div>

        )}


        {/* ============================= */}
        {/* STEP 1 — REGISTER IP */}
        {/* ============================= */}

        {showForm && !createdIP && (

          <div className="mt-8 rounded-3xl border border-cyan-500/30 bg-slate-900 p-8">

            <div className="mb-8 flex items-start justify-between gap-4">

              <div>

                <p className="text-sm font-semibold text-cyan-400">

                  STEP 1 OF 4

                </p>

                <h2 className="mt-2 text-2xl font-bold">

                  Register Intellectual Property

                </h2>

                <p className="mt-2 text-slate-400">

                  Create a unique record for your intellectual
                  property.

                </p>

              </div>


              <button
                onClick={cancelNewIP}
                className="text-sm text-slate-400 hover:text-white"
              >

                Cancel

              </button>

            </div>


            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              <div>

                <label className="mb-2 block text-sm text-slate-300">

                  IP Title

                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Example: AI Based Women Safety System"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-cyan-400"
                />

              </div>


              <div>

                <label className="mb-2 block text-sm text-slate-300">

                  Description

                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Describe your intellectual property..."
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-cyan-400"
                />

              </div>


              <div>

                <label className="mb-2 block text-sm text-slate-300">

                  Intellectual Property Type

                </label>

                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-400"
                >

                  <option value="PATENT">

                    Patent

                  </option>

                  <option value="COPYRIGHT">

                    Copyright

                  </option>

                  <option value="TRADEMARK">

                    Trademark

                  </option>

                  <option value="DESIGN">

                    Design

                  </option>

                  <option value="OTHER">

                    Other

                  </option>

                </select>

              </div>


              <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-cyan-500 px-8 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-60"
              >

                {loading
                  ? "Registering..."
                  : "Create IP Record →"}

              </button>

            </form>

          </div>

        )}


        {/* ============================= */}
        {/* SELECTED IP */}
        {/* ============================= */}

        {createdIP && (

          <div className="mt-8 rounded-3xl border border-emerald-500/30 bg-emerald-500/5 p-8">

            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

  <div className="flex items-center gap-3">

    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 text-xl text-emerald-400">

      ✓

    </div>

    <div>

      <p className="font-semibold text-emerald-400">

        IP Record Selected

      </p>

      <p className="text-sm text-slate-400">

        Continue with the evidence upload step.

      </p>

    </div>

  </div>


  <button
    onClick={backToIPList}
    className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-cyan-400 hover:text-cyan-400"
  >

    ← Back to My IPs

  </button>

</div>


            <div className="mt-6 grid gap-4 md:grid-cols-2">

              <div className="rounded-xl bg-slate-950 p-4">

                <p className="text-xs text-slate-500">

                  IP IDENTIFIER

                </p>

                <p className="mt-2 break-all font-mono text-cyan-400">

                  {createdIP.ipIdentifier}

                </p>

              </div>


              <div className="rounded-xl bg-slate-950 p-4">

                <p className="text-xs text-slate-500">

                  STATUS

                </p>

                <p className="mt-2 font-semibold text-emerald-400">

                  {createdIP.status}

                </p>

              </div>

            </div>

          </div>

        )}


        {/* ============================= */}
        {/* STEP 2 — UPLOAD DOCUMENT */}
        {/* ============================= */}

        {createdIP && !uploadedDocument && (

          <div className="mt-8 rounded-3xl border border-cyan-500/30 bg-slate-900 p-8">

            <p className="text-sm font-semibold text-cyan-400">

              STEP 2 OF 4

            </p>

            <h2 className="mt-2 text-2xl font-bold">

              Upload Evidence Document

            </h2>

            <p className="mt-2 text-slate-400">

              Upload the document that proves your intellectual
              property. A SHA-256 hash will be generated automatically.

            </p>


            <div className="mt-8 rounded-2xl border border-dashed border-slate-700 bg-slate-950 p-6">

              <input
                type="file"
                onChange={(e) => {

                  if (e.target.files?.[0]) {

                    setSelectedFile(
                      e.target.files[0]
                    );

                  }

                }}
                className="block w-full text-sm text-slate-400"
              />


              {selectedFile && (

                <div className="mt-5 rounded-xl bg-slate-900 p-4">

                  <p className="text-sm text-slate-400">

                    SELECTED FILE

                  </p>

                  <p className="mt-2 font-medium text-white">

                    {selectedFile.name}

                  </p>

                  <p className="mt-1 text-sm text-slate-500">

                    {(selectedFile.size / 1024).toFixed(2)} KB

                  </p>

                </div>

              )}

            </div>


            <button
              onClick={handleUploadDocument}
              disabled={!selectedFile || uploading}
              className="mt-6 rounded-xl bg-cyan-500 px-8 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
            >

              {uploading
                ? "Generating Hash & Uploading..."
                : "Upload Evidence →"}

            </button>

          </div>

        )}


        {/* ============================= */}
        {/* STEP 2 SUCCESS */}
        {/* ============================= */}

        {uploadedDocument && (

          <div className="mt-8 rounded-3xl border border-emerald-500/30 bg-emerald-500/5 p-8">

            <p className="text-sm font-semibold text-emerald-400">

              ✓ EVIDENCE DOCUMENT SECURED

            </p>

            <h2 className="mt-2 text-2xl font-bold">

              SHA-256 Hash Generated

            </h2>


            <div className="mt-6 space-y-4">

              <div className="rounded-xl bg-slate-950 p-4">

                <p className="text-xs text-slate-500">

                  DOCUMENT NAME

                </p>

                <p className="mt-2">

                  {uploadedDocument.fileName}

                </p>

              </div>


              <div className="rounded-xl bg-slate-950 p-4">

                <p className="text-xs text-slate-500">

                  SHA-256 DOCUMENT HASH

                </p>

                <p className="mt-2 break-all font-mono text-sm text-cyan-400">

                  {uploadedDocument.fileHash}

                </p>

              </div>

            </div>


            {!blockchainResult && (

              <button
                onClick={
                  handleBlockchainRegistration
                }
                disabled={registeringBlockchain}
                className="mt-6 rounded-xl bg-purple-500 px-8 py-3 font-semibold text-white transition hover:bg-purple-400 disabled:opacity-60"
              >

                {registeringBlockchain
                  ? "Registering on Blockchain..."
                  : "Register on Blockchain →"}

              </button>

            )}

          </div>

          

        )}


        {/* ============================= */}
        {/* STEP 3 + STEP 4 SUCCESS */}
        {/* ============================= */}

        {blockchainResult && (

          <div className="mt-8 rounded-3xl border border-emerald-500/40 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 p-8">

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-3xl text-emerald-400">

                ✓

              </div>

              <div>

                <p className="text-sm font-semibold text-emerald-400">

                  STEP 4 COMPLETE

                </p>

                <h2 className="text-2xl font-bold">

                  Intellectual Property Protected

                </h2>

                <p className="mt-1 text-slate-400">

                  Your document hash is now registered as immutable
                  blockchain evidence.

                </p>

              </div>

            </div>


            <div className="mt-8 grid gap-4">

              <div className="rounded-xl bg-slate-950 p-4">

                <p className="text-xs text-slate-500">

                  BLOCKCHAIN TRANSACTION

                </p>

                <p className="mt-2 break-all font-mono text-sm text-purple-400">

                  {blockchainResult.blockchainTransactionId}

                </p>

              </div>


              <div className="rounded-xl bg-slate-950 p-4">

                <p className="text-xs text-slate-500">

                  VERIFIED DOCUMENT HASH

                </p>

                <p className="mt-2 break-all font-mono text-sm text-cyan-400">

                 {blockchainResult.fileHash}

                </p>

              </div>

            </div>


            <div className="mt-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5">

              <p className="font-semibold text-emerald-400">

                ✓ Verification Ready

              </p>

              <p className="mt-2 text-sm text-slate-300">

                Anyone with the IP Identifier can now independently
                verify this intellectual property.

              </p>

              <p className="mt-3 break-all font-mono text-sm text-cyan-400">

                {createdIP?.ipIdentifier}

              </p>

            </div>

            <div className="mt-6 flex flex-col gap-4 md:flex-row">

  <button
    onClick={() =>
      navigate(`/passport/${createdIP?.id}`)
    }
    className="rounded-xl bg-cyan-500 px-8 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
  >
    View Digital IP Passport →
  </button>

  <button
    onClick={() =>
      navigate(`/verify/${createdIP?.ipIdentifier}`)
    }
    className="rounded-xl border border-slate-600 px-8 py-3 font-semibold text-white transition hover:border-cyan-400 hover:text-cyan-400"
  >
    Public Verification
  </button>

</div>

          </div>

        )}

      </div>

    </div>

  );

};

export default CreatorDashboard;