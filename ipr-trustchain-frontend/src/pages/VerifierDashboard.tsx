import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface VerificationResponse {
  verified: boolean;
  message: string;
  ipId: number;
  ipIdentifier: string;
  title: string;
  fileName: string;
  fileHash: string;
  blockchainTransactionId: string | null;
  blockchainRegisteredAt: string | null;
}

function VerifierDashboard() {
  const navigate = useNavigate();

  const { user, logout, token } = useAuth();

  const [ipIdentifier, setIpIdentifier] = useState("");

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [verificationResult, setVerificationResult] =
    useState<VerificationResponse | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleVerifyIP = async () => {
    if (!ipIdentifier.trim()) {
      setError("Please enter an IP Identifier.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setVerificationResult(null);

      const response =
        await axios.get<VerificationResponse>(
          `http://localhost:8080/api/verify/${ipIdentifier.trim()}`,
          {
            headers: {
              Authorization: token
                ? `Bearer ${token}`
                : "",
            },
          }
        );

      setVerificationResult(response.data);

    } catch (error: any) {

      console.error(
        "IP verification failed:",
        error
      );

      setError(
        error.response?.data?.message ||
        "Failed to verify IP. Please check the IP Identifier."
      );

    } finally {
      setLoading(false);
    }
  };

  const handleEvidenceVerification = async () => {
    if (!ipIdentifier.trim()) {
      setError("Please enter an IP Identifier.");
      return;
    }

    if (!selectedFile) {
      setError("Please select an evidence file.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setVerificationResult(null);

      const formData = new FormData();

      formData.append(
        "file",
        selectedFile
      );

      const response =
        await axios.post<VerificationResponse>(
          `http://localhost:8080/api/verify/${ipIdentifier.trim()}/evidence`,
          formData,
          {
            headers: {
              Authorization: token
                ? `Bearer ${token}`
                : "",
            },
          }
        );

      setVerificationResult(response.data);

    } catch (error: any) {

      console.error(
        "Evidence verification failed:",
        error
      );

      setError(
        error.response?.data?.message ||
        "Evidence verification failed."
      );

    } finally {
      setLoading(false);
    }
  };

  const clearResult = () => {
    setVerificationResult(null);
    setError("");
    setSelectedFile(null);
  };

  return (

    <div className="min-h-screen bg-[#0b1120] text-slate-100">

      {/* HEADER */}

      <header className="bg-[#111827] border-b border-slate-800 shadow-xl">

        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <div>

            <h1 className="text-2xl font-bold tracking-wide text-white">
              IPR TrustChain
            </h1>

            <p className="text-slate-400 text-sm mt-1">
              Evidence Verification Portal
            </p>

          </div>


          <div className="flex items-center gap-5">

            <div className="text-right">

              <p className="font-medium text-white">
                {user?.name}
              </p>

              <p className="text-xs text-blue-400">
                VERIFIER
              </p>

            </div>


            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-500 px-5 py-2 rounded-lg font-medium transition duration-200 shadow-lg shadow-red-900/20"
            >
              Logout
            </button>

          </div>

        </div>

      </header>


      {/* MAIN */}

      <main className="max-w-5xl mx-auto px-6 py-10">

        {/* PAGE TITLE */}

        <div className="mb-8">

          <p className="text-blue-400 text-sm font-semibold tracking-wider uppercase">
            Verification Center
          </p>

          <h2 className="text-3xl font-bold text-white mt-2">
            Verify Intellectual Property
          </h2>

          <p className="text-slate-400 mt-3">
            Verify registered intellectual property and validate
            evidence against secure blockchain records.
          </p>

        </div>


        {/* VERIFICATION CARD */}

        <div className="bg-[#111827] border border-slate-800 rounded-2xl shadow-2xl p-6 md:p-8">

          <div className="border-b border-slate-800 pb-5">

            <h3 className="text-xl font-semibold text-white">
              Verification Request
            </h3>

            <p className="text-sm text-slate-400 mt-2">
              Enter the IP Identifier to retrieve verification details
              or upload the original evidence file for integrity verification.
            </p>

          </div>


          {/* IP IDENTIFIER */}

          <div className="mt-7">

            <label className="block text-sm font-medium text-slate-300 mb-2">
              IP Identifier
            </label>

            <input
              type="text"
              value={ipIdentifier}
              onChange={(event) => {
                setIpIdentifier(event.target.value);
                setError("");
              }}
              placeholder="Example: IPR-39bd4ac1-6c46-431e-bf1a-5138be738752"
              className="w-full bg-[#0b1120] border border-slate-700 rounded-lg px-4 py-3 text-white placeholder:text-slate-600 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />

          </div>


          {/* FILE UPLOAD */}

          <div className="mt-6">

            <label className="block text-sm font-medium text-slate-300 mb-2">

              Upload Evidence File

              <span className="text-slate-500 font-normal">
                {" "}
                (Optional for IP lookup)
              </span>

            </label>


            <div className="border border-dashed border-slate-700 rounded-xl bg-[#0b1120] p-5 hover:border-blue-500 transition">

              <input
                type="file"
                onChange={(event) => {

                  if (
                    event.target.files &&
                    event.target.files.length > 0
                  ) {

                    setSelectedFile(
                      event.target.files[0]
                    );

                  }

                }}
                className="w-full text-sm text-slate-400
                file:mr-4
                file:py-2
                file:px-4
                file:rounded-lg
                file:border-0
                file:bg-blue-600
                file:text-white
                file:font-medium
                hover:file:bg-blue-500
                file:cursor-pointer"
              />

              {selectedFile && (

                <div className="mt-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3">

                  <p className="text-sm text-emerald-400">
                    ✓ Selected: {selectedFile.name}
                  </p>

                </div>

              )}

            </div>

          </div>


          {/* BUTTONS */}

          <div className="flex flex-wrap gap-4 mt-8">

            <button
              onClick={handleVerifyIP}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-900 disabled:text-slate-400 text-white px-6 py-3 rounded-lg font-medium transition shadow-lg shadow-blue-900/30"
            >
              {loading
                ? "Verifying..."
                : "Verify IP"}
            </button>


            <button
              onClick={handleEvidenceVerification}
              disabled={loading}
              className="bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-900 disabled:text-slate-400 text-white px-6 py-3 rounded-lg font-medium transition shadow-lg shadow-emerald-900/30"
            >
              {loading
                ? "Verifying..."
                : "Verify Evidence"}
            </button>


            <button
              onClick={clearResult}
              className="border border-slate-700 hover:bg-slate-800 text-slate-300 px-6 py-3 rounded-lg font-medium transition"
            >
              Clear
            </button>

          </div>

        </div>


        {/* ERROR */}

        {error && (

          <div className="mt-6 bg-red-950/40 border border-red-800 rounded-xl p-5">

            <h3 className="font-semibold text-red-400">
              Verification Error
            </h3>

            <p className="text-red-300 mt-2">
              {error}
            </p>

          </div>

        )}


        {/* VERIFICATION RESULT */}

        {verificationResult && (

          <div
            className={`mt-8 rounded-2xl border p-6 md:p-8 ${
              verificationResult.verified
                ? "bg-emerald-950/20 border-emerald-700"
                : "bg-red-950/20 border-red-700"
            }`}
          >

            {/* RESULT HEADER */}

            <div className="flex items-center gap-4">

              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold ${
                  verificationResult.verified
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500"
                    : "bg-red-500/20 text-red-400 border border-red-500"
                }`}
              >
                {verificationResult.verified
                  ? "✓"
                  : "✕"}
              </div>


              <div>

                <h3
                  className={`text-xl font-bold ${
                    verificationResult.verified
                      ? "text-emerald-400"
                      : "text-red-400"
                  }`}
                >
                  {verificationResult.verified
                    ? "Verification Successful"
                    : "Verification Failed"}
                </h3>

                <p className="text-slate-400 mt-1">
                  {verificationResult.message}
                </p>

              </div>

            </div>


            {/* DETAILS CARD */}

            <div className="mt-7 bg-[#111827] border border-slate-800 rounded-xl p-6">

              <h4 className="font-semibold text-white mb-6">
                Intellectual Property Details
              </h4>


              <div className="grid md:grid-cols-2 gap-6">

                <DetailItem
                  label="IP Identifier"
                  value={
                    verificationResult.ipIdentifier
                  }
                />

                <DetailItem
                  label="IP Title"
                  value={
                    verificationResult.title
                  }
                />

                <DetailItem
                  label="Registered File"
                  value={
                    verificationResult.fileName
                  }
                />

                <DetailItem
                  label="IP ID"
                  value={
                    verificationResult.ipId?.toString() || "-"
                  }
                />

              </div>


              {/* HASH */}

              <div className="mt-7">

                <p className="text-sm font-medium text-slate-400 mb-2">
                  SHA-256 Hash
                </p>

                <div className="bg-[#0b1120] border border-slate-800 p-4 rounded-lg">

                  <p className="text-xs md:text-sm text-blue-300 break-all font-mono">
                    {verificationResult.fileHash}
                  </p>

                </div>

              </div>


              {/* BLOCKCHAIN */}

              <div className="mt-6">

                <p className="text-sm font-medium text-slate-400 mb-2">
                  Blockchain Transaction
                </p>

                <div className="bg-[#0b1120] border border-slate-800 p-4 rounded-lg">

                  <p className="text-xs md:text-sm text-purple-300 break-all font-mono">

                    {verificationResult.blockchainTransactionId ||
                      "Not registered on blockchain"}

                  </p>

                </div>

              </div>


              {/* DATE */}

              {verificationResult.blockchainRegisteredAt && (

                <div className="mt-6">

                  <p className="text-sm font-medium text-slate-400">
                    Blockchain Registration Time
                  </p>

                  <p className="text-slate-200 mt-2">

                    {new Date(
                      verificationResult.blockchainRegisteredAt
                    ).toLocaleString()}

                  </p>

                </div>

              )}

            </div>

          </div>

        )}

      </main>

    </div>

  );
}


interface DetailItemProps {
  label: string;
  value: string;
}


function DetailItem({
  label,
  value,
}: DetailItemProps) {

  return (

    <div>

      <p className="text-sm text-slate-500">
        {label}
      </p>

      <p className="font-medium text-slate-100 mt-2 break-words">
        {value || "-"}
      </p>

    </div>

  );

}


export default VerifierDashboard;