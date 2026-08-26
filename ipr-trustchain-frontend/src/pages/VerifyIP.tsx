import { useState } from "react";
import api from "../api/axios";

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

const VerifyIP = () => {
  const [ipIdentifier, setIpIdentifier] =
    useState("");

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [evidenceLoading, setEvidenceLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [evidenceError, setEvidenceError] =
    useState("");

  const [result, setResult] =
    useState<VerificationResponse | null>(
      null
    );

  const [evidenceResult, setEvidenceResult] =
    useState<VerificationResponse | null>(
      null
    );


  // Existing IP verification
  const handleVerify = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    if (!ipIdentifier.trim()) {

      setError(
        "Please enter an IP Identifier"
      );

      return;
    }

    setLoading(true);

    setError("");

    setResult(null);

    setEvidenceResult(null);

    setEvidenceError("");

    try {

      const response =
        await api.get<VerificationResponse>(
          `/verify/${encodeURIComponent(
            ipIdentifier.trim()
          )}`
        );

      setResult(response.data);

    } catch (error: any) {

      console.error(
        "Verification error:",
        error
      );

      setError(
        error.response?.data?.message ||
        "IP verification failed. Please check the IP Identifier."
      );

    } finally {

      setLoading(false);

    }
  };


  // NEW: Uploaded evidence verification
  const handleEvidenceVerify = async () => {

    if (!ipIdentifier.trim()) {

      setEvidenceError(
        "Please enter and verify an IP Identifier first."
      );

      return;
    }

    if (!selectedFile) {

      setEvidenceError(
        "Please select the original evidence file."
      );

      return;
    }

    setEvidenceLoading(true);

    setEvidenceError("");

    setEvidenceResult(null);

    try {

      const formData = new FormData();

      formData.append(
        "file",
        selectedFile
      );

      const response =
        await api.post<VerificationResponse>(
          `/verify/${encodeURIComponent(
            ipIdentifier.trim()
          )}/evidence`,
          formData
        );

      setEvidenceResult(
        response.data
      );

    } catch (error: any) {

      console.error(
        "Evidence verification error:",
        error
      );

      setEvidenceError(
        error.response?.data?.message ||
        "Evidence verification failed. Please try again."
      );

    } finally {

      setEvidenceLoading(false);

    }
  };


  return (

    <div className="min-h-screen bg-slate-950 px-6 py-10 text-white">

      <div className="mx-auto max-w-4xl">


        {/* HEADER */}

        <div className="text-center">

          <p className="text-sm font-semibold tracking-[0.25em] text-cyan-400">

            IPR TRUSTCHAIN

          </p>

          <h1 className="mt-4 text-4xl font-bold md:text-5xl">

            Verify Intellectual Property

          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">

            Verify intellectual property authenticity and
            cryptographically validate original evidence
            against blockchain proof.

          </p>

        </div>


        {/* IP SEARCH CARD */}

        <div className="mt-12 rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl md:p-10">

          <form
            onSubmit={handleVerify}
            className="space-y-5"
          >

            <div>

              <label className="mb-3 block text-sm font-medium text-slate-300">

                IP IDENTIFIER

              </label>

              <input
                type="text"
                value={ipIdentifier}
                onChange={(e) => {

                  setIpIdentifier(
                    e.target.value
                  );

                  setEvidenceResult(null);

                }}
                placeholder="Example: IPR-e08340f4-2f7c-403f-a89b-aa6579d468ef"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-5 py-4 font-mono text-sm text-white outline-none transition focus:border-cyan-400"
              />

            </div>


            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-cyan-500 px-6 py-4 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
            >

              {loading
                ? "Verifying Blockchain Evidence..."
                : "Verify IP →"}

            </button>

          </form>


          {/* IP ERROR */}

          {error && (

            <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-400">

              {error}

            </div>

          )}

        </div>


        {/* IP RESULT */}

        {result && (

          <div
            className={`mt-8 overflow-hidden rounded-3xl border ${
              result.verified
                ? "border-emerald-500/40"
                : "border-red-500/40"
            }`}
          >


            {/* STATUS */}

            <div
              className={`p-8 text-center ${
                result.verified
                  ? "bg-emerald-500/10"
                  : "bg-red-500/10"
              }`}
            >

              <div
                className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full text-4xl ${
                  result.verified
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >

                {result.verified
                  ? "✓"
                  : "!"}

              </div>


              <p
                className={`mt-6 text-sm font-semibold tracking-widest ${
                  result.verified
                    ? "text-emerald-400"
                    : "text-red-400"
                }`}
              >

                {result.verified
                  ? "BLOCKCHAIN VERIFIED"
                  : "VERIFICATION FAILED"}

              </p>


              <h2 className="mt-3 text-3xl font-bold">

                {result.verified
                  ? "Intellectual Property Verified"
                  : "Unable to Verify"}

              </h2>


              <p className="mx-auto mt-4 max-w-xl text-slate-400">

                {result.message}

              </p>

            </div>


            {/* CERTIFICATE DETAILS */}

            <div className="bg-slate-900 p-6 md:p-8">

              <p className="text-sm font-semibold tracking-widest text-cyan-400">

                VERIFICATION DETAILS

              </p>


              <div className="mt-6 grid gap-5 md:grid-cols-2">


                <div className="rounded-xl bg-slate-950 p-5">

                  <p className="text-xs text-slate-500">

                    IP TITLE

                  </p>

                  <p className="mt-2 font-semibold">

                    {result.title}

                  </p>

                </div>


                <div className="rounded-xl bg-slate-950 p-5">

                  <p className="text-xs text-slate-500">

                    IP IDENTIFIER

                  </p>

                  <p className="mt-2 break-all font-mono text-sm text-cyan-400">

                    {result.ipIdentifier}

                  </p>

                </div>


                <div className="rounded-xl bg-slate-950 p-5">

                  <p className="text-xs text-slate-500">

                    REGISTERED EVIDENCE

                  </p>

                  <p className="mt-2">

                    {result.fileName}

                  </p>

                </div>


                <div className="rounded-xl bg-slate-950 p-5">

                  <p className="text-xs text-slate-500">

                    BLOCKCHAIN REGISTERED

                  </p>

                  <p className="mt-2 text-sm">

                    {result.blockchainRegisteredAt
                      ? new Date(
                          result.blockchainRegisteredAt
                        ).toLocaleString()
                      : "Not registered"}

                  </p>

                </div>

              </div>


              {/* HASH */}

              <div className="mt-5 rounded-xl bg-slate-950 p-5">

                <p className="text-xs text-slate-500">

                  REGISTERED SHA-256 HASH

                </p>

                <p className="mt-3 break-all font-mono text-sm text-cyan-400">

                  {result.fileHash}

                </p>

              </div>


              {/* TRANSACTION */}

              <div className="mt-5 rounded-xl bg-slate-950 p-5">

                <p className="text-xs text-slate-500">

                  BLOCKCHAIN TRANSACTION ID

                </p>

                <p className="mt-3 break-all font-mono text-sm text-purple-400">

                  {result.blockchainTransactionId ||
                    "Not available"}

                </p>

              </div>


              {/* UPLOAD EVIDENCE */}

              <div className="mt-8 border-t border-slate-800 pt-8">

                <p className="text-sm font-semibold tracking-widest text-cyan-400">

                  VERIFY ORIGINAL EVIDENCE

                </p>

                <p className="mt-2 text-sm text-slate-400">

                  Upload a document to verify whether its
                  SHA-256 hash exactly matches the registered
                  blockchain evidence.

                </p>


                <div className="mt-5">

                  <input
                    type="file"
                    onChange={(e) => {

                      const file =
                        e.target.files?.[0] || null;

                      setSelectedFile(
                        file
                      );

                      setEvidenceResult(
                        null
                      );

                      setEvidenceError(
                        ""
                      );

                    }}
                    className="block w-full cursor-pointer rounded-xl border border-slate-700 bg-slate-950 p-4 text-sm text-slate-300 file:mr-4 file:rounded-lg file:border-0 file:bg-cyan-500 file:px-4 file:py-2 file:font-semibold file:text-slate-950 hover:file:bg-cyan-400"
                  />

                </div>


                {selectedFile && (

                  <div className="mt-4 rounded-xl bg-slate-950 p-4">

                    <p className="text-xs text-slate-500">

                      SELECTED FILE

                    </p>

                    <p className="mt-1 break-all text-sm text-cyan-400">

                      {selectedFile.name}

                    </p>

                  </div>

                )}


                <button
                  type="button"
                  onClick={handleEvidenceVerify}
                  disabled={
                    evidenceLoading ||
                    !selectedFile
                  }
                  className="mt-5 w-full rounded-xl bg-purple-500 px-6 py-4 font-semibold text-white transition hover:bg-purple-400 disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {evidenceLoading
                    ? "Comparing SHA-256 Evidence..."
                    : "Verify Uploaded Evidence →"}

                </button>


                {/* EVIDENCE ERROR */}

                {evidenceError && (

                  <div className="mt-5 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-400">

                    {evidenceError}

                  </div>

                )}


                {/* EVIDENCE RESULT */}

                {evidenceResult && (

                  <div
                    className={`mt-6 rounded-2xl border p-6 text-center ${
                      evidenceResult.verified
                        ? "border-emerald-500/40 bg-emerald-500/10"
                        : "border-red-500/40 bg-red-500/10"
                    }`}
                  >

                    <div
                      className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full text-3xl ${
                        evidenceResult.verified
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >

                      {evidenceResult.verified
                        ? "✓"
                        : "!"}

                    </div>


                    <p
                      className={`mt-4 text-sm font-bold tracking-widest ${
                        evidenceResult.verified
                          ? "text-emerald-400"
                          : "text-red-400"
                      }`}
                    >

                      {evidenceResult.verified
                        ? "AUTHENTIC EVIDENCE"
                        : "TAMPERED OR DIFFERENT FILE"}

                    </p>


                    <h3 className="mt-3 text-2xl font-bold">

                      {evidenceResult.verified
                        ? "Evidence Successfully Verified"
                        : "Evidence Verification Failed"}

                    </h3>


                    <p className="mx-auto mt-3 max-w-xl text-sm text-slate-300">

                      {evidenceResult.message}

                    </p>

                  </div>

                )}

              </div>


              {/* CERTIFICATE FOOTER */}

              {result.verified && (

                <div className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-center">

                  <p className="font-semibold text-emerald-400">

                    ✓ Cryptographically Verified

                  </p>

                  <p className="mt-2 text-sm text-slate-300">

                    The registered document hash has been
                    independently verified against the
                    blockchain evidence layer.

                  </p>

                </div>

              )}

            </div>

          </div>

        )}


        {/* FOOTER */}

        <div className="py-10 text-center text-sm text-slate-500">

          IPR TrustChain • Blockchain-backed Intellectual
          Property Protection

        </div>

      </div>

    </div>

  );
};

export default VerifyIP;