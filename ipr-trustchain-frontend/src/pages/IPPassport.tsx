import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

interface IPPassportData {
  ipIdentifier: string;
  title: string;
  description: string;
  type: string;
  status: string;
  creatorDid: string;
  documentId: number;
  fileName: string;
  fileHash: string;
  blockchainTransactionId: string;
  blockchainRegisteredAt: string;
  verificationStatus: string;
  createdAt: string;
}

interface AuditLogData {
  id: number;
  userId: number;
  ipId: number;
  action: string;
  description: string;
  timestamp: string;
}

const IPPassport = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const passportRef = useRef<HTMLDivElement>(null);

  const [passport, setPassport] =
    useState<IPPassportData | null>(null);

  const [auditLogs, setAuditLogs] =
    useState<AuditLogData[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const fetchPassportData = async () => {
      try {
        setLoading(true);

        const passportResponse =
          await api.get<IPPassportData>(
            `/ip/${id}/passport`
          );

        setPassport(passportResponse.data);

        const auditResponse =
          await api.get<AuditLogData[]>(
            `/audit-logs/ip/${id}`
          );

        setAuditLogs(auditResponse.data);

      } catch (error: any) {

        console.error(
          "Failed to load IP passport:",
          error
        );

        setError(
          error.response?.data?.message ||
          "Failed to load Digital IP Passport"
        );

      } finally {

        setLoading(false);

      }
    };

    if (id) {
      fetchPassportData();
    }

  }, [id]);


  const handleDownloadPassport = () => {
    window.print();
  };


  const getAuditIcon = (
    action: string
  ) => {
    switch (action) {

      case "IP_CREATED":
        return "✓";

      case "DOCUMENT_UPLOADED":
        return "↑";

      case "BLOCKCHAIN_REGISTERED":
        return "⛓";

      case "IDENTITY_CREATED":
        return "◉";

      case "VERIFICATION_PERFORMED":
        return "✓";

      default:
        return "•";
    }
  };


  const getAuditColor = (
    action: string
  ) => {
    switch (action) {

      case "IP_CREATED":
        return "border-cyan-500 bg-cyan-500/10 text-cyan-400";

      case "DOCUMENT_UPLOADED":
        return "border-blue-500 bg-blue-500/10 text-blue-400";

      case "BLOCKCHAIN_REGISTERED":
        return "border-purple-500 bg-purple-500/10 text-purple-400";

      case "IDENTITY_CREATED":
        return "border-pink-500 bg-pink-500/10 text-pink-400";

      case "VERIFICATION_PERFORMED":
        return "border-emerald-500 bg-emerald-500/10 text-emerald-400";

      default:
        return "border-slate-600 bg-slate-800 text-slate-300";
    }
  };


  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">

        <p className="text-slate-400">
          Loading Digital IP Passport...
        </p>

      </div>
    );
  }


  if (error || !passport) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 p-6 text-white">

        <h2 className="text-2xl font-bold text-red-400">
          Passport Not Available
        </h2>

        <p className="mt-3 text-slate-400">
          {error || "Unable to load passport"}
        </p>

        <button
          onClick={() =>
            navigate("/creator/dashboard")
          }
          className="mt-6 rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950"
        >
          Back to Dashboard
        </button>

      </div>
    );
  }


const qrCodeUrl =
  `https://ipr-trustchain-backend.onrender.com/api/qr/${encodeURIComponent(
    passport.ipIdentifier
  )}`;


  return (
    <div className="min-h-screen bg-slate-950 p-6 text-white md:p-10">

      <style>
        {`
          @media print {

            @page {
              size: A4;
              margin: 15mm;
            }

            html,
            body {
              width: 100%;
              height: auto;
              background: white !important;
            }

            body {
              margin: 0;
              padding: 0;
            }

            .no-print {
              display: none !important;
            }

            .print-passport {
              max-width: none !important;
              width: 100% !important;
              margin: 0 !important;
              padding: 0 !important;
              background: white !important;
              color: #111827 !important;
            }

            .print-passport * {
              box-sizing: border-box;
            }

            /*
              Convert dark backgrounds into
              clean printable cards.
            */

            .print-passport .bg-slate-900,
            .print-passport .bg-slate-950,
            .print-passport .bg-purple-500\\/5,
            .print-passport .bg-cyan-500\\/5,
            .print-passport .bg-gradient-to-r {
              background: #ffffff !important;
            }

            /*
              Keep cards together.
            */

            .print-card {
              break-inside: avoid;
              page-break-inside: avoid;
            }

            /*
              Keep individual audit events together.
            */

            .audit-event {
              break-inside: avoid;
              page-break-inside: avoid;
            }

            /*
              Prevent QR section splitting.
            */

            .qr-section {
              break-inside: avoid;
              page-break-inside: avoid;
            }

            /*
              Prevent public verification
              section splitting.
            */

            .verification-section {
              break-inside: avoid;
              page-break-inside: avoid;
            }

            /*
              Make text readable on white paper.
            */

            .print-passport .text-white {
              color: #111827 !important;
            }

            .print-passport .text-slate-300 {
              color: #374151 !important;
            }

            .print-passport .text-slate-400 {
              color: #4b5563 !important;
            }

            .print-passport .text-slate-500 {
              color: #6b7280 !important;
            }

            .print-passport .text-cyan-400 {
              color: #0891b2 !important;
            }

            .print-passport .text-purple-400 {
              color: #7e22ce !important;
            }

            .print-passport .text-emerald-400 {
              color: #059669 !important;
            }

            .print-passport .border-slate-800,
            .print-passport .border-slate-700,
            .print-passport .border-emerald-500\\/30,
            .print-passport .border-purple-500\\/20,
            .print-passport .border-purple-500\\/30,
            .print-passport .border-cyan-500\\/30 {
              border-color: #d1d5db !important;
            }

            /*
              Audit timeline line.
            */

            .print-passport .bg-slate-700 {
              background: #d1d5db !important;
            }

            /*
              Prevent headings from
              being separated from content.
            */

            h1,
            h2,
            h3,
            p {
              orphans: 3;
              widows: 3;
            }

            /*
              Optional print header.
            */

            .print-document-header {
              display: block !important;
              border-bottom: 1px solid #d1d5db;
              padding-bottom: 10px;
              margin-bottom: 20px;
            }

            /*
              Improve QR printing.
            */

            .qr-image-container {
              background: white !important;
              border: 1px solid #d1d5db;
            }
          }

          @media screen {

            .print-document-header {
              display: none;
            }
          }
        `}
      </style>


      <div
        ref={passportRef}
        className="print-passport mx-auto max-w-5xl"
      >

        {/* PRINT HEADER */}

        <div className="print-document-header">

          <p className="text-sm font-semibold">
            IPR TRUSTCHAIN
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Digital Intellectual Property Passport
          </p>

        </div>


        {/* HEADER */}

        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

          <div>

            <p className="text-sm font-semibold tracking-widest text-cyan-400">
              DIGITAL IP PASSPORT
            </p>

            <h1 className="mt-2 text-3xl font-bold md:text-4xl">
              {passport.title}
            </h1>

            <p className="mt-3 text-slate-400">
              Blockchain-backed ownership and authenticity record.
            </p>

          </div>


          <div className="no-print flex gap-3">

            <button
              onClick={handleDownloadPassport}
              className="rounded-xl bg-purple-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-400"
            >
              ↓ Download Passport
            </button>


            <button
              onClick={() =>
                navigate("/creator/dashboard")
              }
              className="rounded-xl border border-slate-700 px-5 py-3 text-sm text-slate-300 transition hover:border-cyan-400 hover:text-cyan-400"
            >
              ← Dashboard
            </button>

          </div>

        </div>


        {/* PASSPORT STATUS */}

        <div className="print-card mt-10 rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 p-8">

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

            <div>

              <p className="text-sm font-semibold text-emerald-400">
                ✓ VERIFIED INTELLECTUAL PROPERTY
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                {passport.verificationStatus}
              </h2>

              <p className="mt-2 text-slate-400">
                This intellectual property has immutable
                blockchain-backed evidence.
              </p>

            </div>


            <div className="rounded-2xl bg-slate-950 p-5">

              <p className="text-xs text-slate-500">
                IP IDENTIFIER
              </p>

              <p className="mt-2 break-all font-mono text-sm text-cyan-400">
                {passport.ipIdentifier}
              </p>

            </div>

          </div>

        </div>


        {/* IP INFORMATION */}

        <div className="mt-8 grid gap-6 md:grid-cols-2">

          <div className="print-card rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <p className="text-xs text-slate-500">
              INTELLECTUAL PROPERTY
            </p>

            <h2 className="mt-4 text-xl font-bold">
              {passport.title}
            </h2>

            <p className="mt-4 text-slate-400">
              {passport.description}
            </p>


            <div className="mt-6 grid gap-4">

              <div>

                <p className="text-xs text-slate-500">
                  TYPE
                </p>

                <p className="mt-1 font-semibold text-cyan-400">
                  {passport.type}
                </p>

              </div>


              <div>

                <p className="text-xs text-slate-500">
                  STATUS
                </p>

                <p className="mt-1 font-semibold text-emerald-400">
                  {passport.status}
                </p>

              </div>

            </div>

          </div>


          {/* CREATOR */}

          <div className="print-card rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <p className="text-xs text-slate-500">
              CREATOR IDENTITY
            </p>

            <h2 className="mt-4 text-lg font-bold">
              Decentralized Identity
            </h2>

            <p className="mt-4 break-all font-mono text-sm text-purple-400">
              {passport.creatorDid}
            </p>


            <div className="mt-8">

              <p className="text-xs text-slate-500">
                IP REGISTERED
              </p>

              <p className="mt-2 text-slate-300">
                {new Date(
                  passport.createdAt
                ).toLocaleString()}
              </p>

            </div>

          </div>

        </div>


        {/* DOCUMENT EVIDENCE */}

        <div className="print-card mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">

          <p className="text-xs text-slate-500">
            DOCUMENT EVIDENCE
          </p>

          <h2 className="mt-3 text-xl font-bold">
            {passport.fileName}
          </h2>


          <div className="mt-6 rounded-xl bg-slate-950 p-5">

            <p className="text-xs text-slate-500">
              SHA-256 FILE HASH
            </p>

            <p className="mt-3 break-all font-mono text-sm text-cyan-400">
              {passport.fileHash}
            </p>

          </div>

        </div>


        {/* BLOCKCHAIN */}

        <div className="print-card mt-8 rounded-2xl border border-purple-500/20 bg-purple-500/5 p-6">

          <p className="text-xs font-semibold text-purple-400">
            BLOCKCHAIN PROOF
          </p>

          <h2 className="mt-3 text-xl font-bold">
            Immutable Registration Record
          </h2>


          <div className="mt-6 rounded-xl bg-slate-950 p-5">

            <p className="text-xs text-slate-500">
              TRANSACTION ID
            </p>

            <p className="mt-3 break-all font-mono text-sm text-purple-400">
              {passport.blockchainTransactionId}
            </p>

          </div>


          <div className="mt-5">

            <p className="text-xs text-slate-500">
              BLOCKCHAIN REGISTERED
            </p>

            <p className="mt-2 text-slate-300">
              {passport.blockchainRegisteredAt
                ? new Date(
                    passport.blockchainRegisteredAt
                  ).toLocaleString()
                : "Not registered yet"}
            </p>

          </div>

        </div>


        {/* AUDIT TRAIL */}

        <div className="print-card mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-8">

          <p className="text-sm font-semibold text-cyan-400">
            AUDIT TRAIL
          </p>

          <h2 className="mt-3 text-2xl font-bold">
            Intellectual Property Lifecycle
          </h2>

          <p className="mt-3 text-slate-400">
            A chronological record of important actions
            performed for this intellectual property.
          </p>


          {auditLogs.length === 0 ? (

            <div className="mt-8 rounded-xl border border-dashed border-slate-700 p-6 text-center">

              <p className="text-slate-400">
                No audit activity found for this IP asset.
              </p>

            </div>

          ) : (

            <div className="mt-8 space-y-6">

              {auditLogs.map((log, index) => (

                <div
                  key={log.id}
                  className="audit-event relative flex gap-5"
                >

                  {/* TIMELINE */}

                  <div className="flex flex-col items-center">

                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-lg font-bold ${getAuditColor(
                        log.action
                      )}`}
                    >
                      {getAuditIcon(log.action)}
                    </div>


                    {index !== auditLogs.length - 1 && (

                      <div className="h-full min-h-10 w-px bg-slate-700" />

                    )}

                  </div>


                  {/* EVENT */}

                  <div className="pb-4">

                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">

                      <h3 className="font-semibold text-white">

                        {log.action
                          .replaceAll("_", " ")
                          .replace(
                            /\b\w/g,
                            (letter) =>
                              letter.toUpperCase()
                          )}

                      </h3>


                      <span className="text-xs text-slate-500">

                        {new Date(
                          log.timestamp
                        ).toLocaleString()}

                      </span>

                    </div>


                    <p className="mt-2 text-sm text-slate-400">

                      {log.description}

                    </p>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>


        {/* QR CODE */}

        <div className="qr-section mt-8 rounded-3xl border border-purple-500/30 bg-purple-500/5 p-8">

          <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">

            <div>

              <p className="text-sm font-semibold text-purple-400">
                QR VERIFICATION
              </p>

              <h2 className="mt-3 text-2xl font-bold">
                Scan to Verify
              </h2>

              <p className="mt-3 max-w-xl text-slate-400">
                Scan this QR code to open the public
                verification page and independently validate
                this intellectual property.
              </p>


              <div className="mt-6 rounded-xl bg-slate-950 p-4">

                <p className="text-xs text-slate-500">
                  VERIFICATION LINK
                </p>

                <p className="mt-2 break-all font-mono text-sm text-cyan-400">
                  {`${window.location.origin}/verify/${passport.ipIdentifier}`}
                </p>

              </div>

            </div>


            <div className="qr-image-container rounded-2xl bg-white p-4 shadow-lg">

              <img
                src={qrCodeUrl}
                alt="IP Verification QR Code"
                className="h-56 w-56"
              />

            </div>

          </div>

        </div>


        {/* PUBLIC VERIFICATION */}

        <div className="verification-section mt-8 rounded-3xl border border-cyan-500/30 bg-cyan-500/5 p-8 text-center">

          <p className="text-sm font-semibold text-cyan-400">
            PUBLIC VERIFICATION
          </p>

          <h2 className="mt-3 text-2xl font-bold">
            Verify This Intellectual Property
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-slate-400">
            Share the IP Identifier or verification link
            so anyone can independently validate the
            authenticity of this intellectual property.
          </p>


          <button
            onClick={() =>
              navigate(
                `/verify/${passport.ipIdentifier}`
              )
            }
            className="no-print mt-6 rounded-xl bg-cyan-500 px-8 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            Verify IP →
          </button>

        </div>

      </div>

    </div>
  );
};

export default IPPassport;