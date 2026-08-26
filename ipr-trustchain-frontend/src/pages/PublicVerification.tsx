import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";

interface VerificationData {
  ipIdentifier: string;
  title: string;
  creatorDid: string;
  fileHash: string | null;
  blockchainTransactionId: string | null;
  verificationStatus: string;
  registeredAt: string;
  message: string;
}

const PublicVerification = () => {
  const { ipIdentifier } = useParams();

  const [searchValue, setSearchValue] = useState(
    ipIdentifier || ""
  );

  const [data, setData] =
    useState<VerificationData | null>(null);

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const verifyIP = async () => {
    if (!searchValue.trim()) {
      setError("Please enter an IP Identifier.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setData(null);

      const response =
        await api.get<VerificationData>(
          `/public/verify/${searchValue}`
        );

      setData(response.data);

    } catch (error: any) {

      setError(
        error.response?.data?.message ||
        "Verification failed. IP record not found."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07111f] text-white px-4 py-10">

      <div className="max-w-4xl mx-auto">

        <Link
          to="/"
          className="text-xl font-bold"
        >
          IPR<span className="text-cyan-400">
            TrustChain
          </span>
        </Link>

        <div className="text-center mt-16">

          <p className="text-cyan-400 text-sm uppercase tracking-[0.2em]">
            Public Verification
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mt-4">
            Verify Intellectual Property
          </h1>

          <p className="text-slate-400 mt-4">
            Enter an IP Identifier to verify ownership
            and blockchain document integrity.
          </p>

        </div>

        {/* Search */}

        <div className="mt-10 flex flex-col md:flex-row gap-3">

          <input
            type="text"
            value={searchValue}
            onChange={(e) =>
              setSearchValue(e.target.value)
            }
            placeholder="IPR-xxxxxxxx-xxxx-xxxx-xxxx"
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-cyan-400"
          />

          <button
            onClick={verifyIP}
            disabled={loading}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl font-semibold disabled:opacity-50"
          >
            {loading
              ? "Verifying..."
              : "Verify"}
          </button>

        </div>

        {/* Error */}

        {error && (

          <div className="mt-6 bg-red-500/10 border border-red-500/30 text-red-300 rounded-xl p-4">

            {error}

          </div>

        )}

        {/* Result */}

        {data && (

          <div className="mt-10 bg-white/5 border border-white/10 rounded-3xl overflow-hidden">

            {/* Status */}

            <div
              className={`p-6 border-b border-white/10 ${
                data.verificationStatus === "VERIFIED"
                  ? "bg-green-500/10"
                  : "bg-yellow-500/10"
              }`}
            >

              <p className="text-sm text-slate-400">
                Verification Status
              </p>

              <h2
                className={`text-3xl font-bold mt-2 ${
                  data.verificationStatus === "VERIFIED"
                    ? "text-green-400"
                    : "text-yellow-400"
                }`}
              >
                {data.verificationStatus}
              </h2>

              <p className="text-slate-300 mt-3">
                {data.message}
              </p>

            </div>

            {/* Details */}

            <div className="p-6 space-y-6">

              <div>

                <p className="text-sm text-slate-500">
                  Intellectual Property
                </p>

                <p className="text-xl font-semibold mt-1">
                  {data.title}
                </p>

              </div>

              <div>

                <p className="text-sm text-slate-500">
                  IP Identifier
                </p>

                <p className="font-mono text-cyan-400 mt-1 break-all">
                  {data.ipIdentifier}
                </p>

              </div>

              <div>

                <p className="text-sm text-slate-500">
                  Creator DID
                </p>

                <p className="font-mono text-sm mt-1 break-all">
                  {data.creatorDid}
                </p>

              </div>

              <div>

                <p className="text-sm text-slate-500">
                  Document SHA-256 Hash
                </p>

                <p className="font-mono text-xs text-slate-300 mt-1 break-all">
                  {data.fileHash || "Not available"}
                </p>

              </div>

              <div>

                <p className="text-sm text-slate-500">
                  Blockchain Transaction
                </p>

                <p className="font-mono text-xs text-cyan-400 mt-1 break-all">
                  {data.blockchainTransactionId ||
                    "Not registered"}
                </p>

              </div>

              <div>

                <p className="text-sm text-slate-500">
                  Registered At
                </p>

                <p className="mt-1">
                  {data.registeredAt
                    ? new Date(
                        data.registeredAt
                      ).toLocaleString()
                    : "Not available"}
                </p>

              </div>

            </div>

          </div>

        )}

      </div>

    </div>
  );
};

export default PublicVerification;