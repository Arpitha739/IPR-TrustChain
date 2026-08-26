import { Link } from "react-router-dom";

import {
  ArrowRight,
  ShieldCheck,
  Fingerprint,
  FileCheck,
  Blocks,
  //SearchCheck,
  LockKeyhole,
  Globe2,
  Database,
} from "lucide-react";

import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#06111f]">

      <Navbar />

      {/* HERO */}

      <section className="relative flex min-h-screen items-center px-6 pt-28">

        {/* Background glow */}

        <div className="absolute left-1/2 top-40 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-green-500/10 blur-[150px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">

          {/* LEFT */}

          <div>

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-400/20 bg-green-400/5 px-4 py-2 text-sm text-green-300">

              <ShieldCheck size={16} />

              Blockchain-backed IP Protection

            </div>

            <h1 className="max-w-4xl text-5xl font-bold leading-tight tracking-tight md:text-7xl">

              Protect your ideas.

              <span className="block text-green-400">

                Prove your ownership.

              </span>

            </h1>

            <p className="mt-7 max-w-xl text-lg leading-relaxed text-slate-400">

              IPR TrustChain creates a tamper-evident proof of your
              intellectual property using cryptographic hashing,
              digital identity and blockchain technology.

            </p>

            <div className="mt-10 flex flex-wrap gap-4">

              <Link
                to="/register"
                className="group flex items-center gap-2 rounded-xl bg-green-500 px-6 py-4 font-semibold text-black transition hover:bg-green-400"
              >

                Protect My IP

                <ArrowRight
                  size={18}
                  className="transition group-hover:translate-x-1"
                />

              </Link>

<Link
  to="/verify"
  className="rounded-xl border border-cyan-500 px-6 py-3 font-semibold text-cyan-400 transition hover:bg-cyan-500 hover:text-slate-950"
>
  Verify IP
</Link>

            </div>


            {/* Trust metrics */}

            <div className="mt-14 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">

              <div>

                <p className="text-2xl font-bold text-white">

                  SHA-256

                </p>

                <p className="mt-1 text-sm text-slate-500">

                  Evidence Integrity

                </p>

              </div>

              <div>

                <p className="text-1.5xl font-bold text-green-400">

                  SMART CONTRACT

                </p>

                <p className="mt-1 text-sm text-slate-500">

                  Blockchain Proof

                </p>

              </div>

              <div>

                <p className="text-2xl font-bold text-electric">

                  DID

                </p>

                <p className="mt-1 text-sm text-slate-500">

                  Digital Identity

                </p>

              </div>

            </div>

          </div>


          {/* RIGHT - VISUAL */}

          <div className="relative">

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl backdrop-blur-xl">

              <div className="mb-6 flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div className="h-3 w-3 rounded-full bg-red-400" />

                  <div className="h-3 w-3 rounded-full bg-yellow-400" />

                  <div className="h-3 w-3 rounded-full bg-green-400" />

                </div>

                <span className="text-xs text-slate-500">

                  TRUSTCHAIN ENGINE

                </span>

              </div>


              <div className="space-y-5">

                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">

                  <div className="flex items-center gap-4">

                    <Fingerprint className="text-green-400" />

                    <div>

                      <p className="text-sm text-slate-400">

                        Digital Identity

                      </p>

                      <p className="font-medium">

                        did:iprtrustchain:5b8f...

                      </p>

                    </div>

                  </div>

                </div>


                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">

                  <div className="flex items-center gap-4">

                    <FileCheck className="text-blue-400" />

                    <div>

                      <p className="text-sm text-slate-400">

                        Evidence Hash

                      </p>

                      <p className="font-mono text-sm">

                        70ac696334f359fc...

                      </p>

                    </div>

                  </div>

                </div>


                <div className="rounded-2xl border border-green-400/30 bg-green-400/5 p-5">

                  <div className="flex items-center gap-4">

                    <Blocks className="text-green-400" />

                    <div>

                      <p className="text-sm text-green-300">

                        Blockchain Verified

                      </p>

                      <p className="font-mono text-sm text-slate-300">

                        0xa20ceb97f950...

                      </p>

                    </div>

                  </div>

                </div>

              </div>


              <div className="mt-6 flex items-center gap-3 rounded-xl border border-green-400/20 bg-green-400/5 p-4">

                <div className="h-2 w-2 animate-pulse rounded-full bg-green-400" />

                <span className="text-sm text-green-300">

                  Cryptographic proof successfully anchored

                </span>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* HOW IT WORKS */}

      <section
        id="how-it-works"
        className="border-t border-white/10 px-6 py-28"
      >

        <div className="mx-auto max-w-7xl">

          <div className="max-w-2xl">

            <p className="font-medium text-green-400">

              HOW IT WORKS

            </p>

            <h2 className="mt-4 text-4xl font-bold md:text-5xl">

              From creation to trusted verification.

            </h2>

            <p className="mt-5 text-lg text-slate-400">

              A complete chain of trust for your intellectual property.

            </p>

          </div>


          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

            <Step
              number="01"
              icon={<Fingerprint />}
              title="Create Identity"
              description="A decentralized-style digital identity establishes the creator."
            />

            <Step
              number="02"
              icon={<FileCheck />}
              title="Register IP"
              description="Your intellectual property is registered with a unique identifier."
            />

            <Step
              number="03"
              icon={<Database />}
              title="Hash Evidence"
              description="Documents receive a unique SHA-256 cryptographic fingerprint."
            />

            <Step
              number="04"
              icon={<Blocks />}
              title="Anchor Proof"
              description="The evidence hash is permanently registered on blockchain."
            />

          </div>

        </div>

      </section>


      {/* SECURITY */}

      <section
        id="security"
        className="border-t border-white/10 bg-[#081827] px-6 py-28"
      >

        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2">

          <div>

            <p className="font-medium text-green-400">

              BUILT FOR TRUST

            </p>

            <h2 className="mt-4 text-4xl font-bold md:text-5xl">

              Your evidence gets a digital fingerprint.

            </h2>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400">

              Change even one character in a document and its SHA-256
              hash changes completely. That makes unauthorized
              modification immediately detectable.

            </p>

          </div>


          <div className="grid gap-4">

            <SecurityCard
              icon={<LockKeyhole />}
              title="Tamper Detection"
              description="Modified documents produce a different cryptographic fingerprint."
            />

            <SecurityCard
              icon={<Blocks />}
              title="Blockchain Proof"
              description="Evidence hashes are anchored with a real blockchain transaction."
            />

            <SecurityCard
              icon={<Globe2 />}
              title="Public Verification"
              description="Anyone can independently verify registered intellectual property."
            />

          </div>

        </div>

      </section>


      {/* CTA */}

      <section className="px-6 py-28">

        <div className="mx-auto max-w-5xl rounded-3xl border border-green-400/20 bg-gradient-to-br from-green-400/10 to-transparent px-8 py-20 text-center">

          <ShieldCheck
            size={48}
            className="mx-auto text-green-400"
          />

          <h2 className="mt-6 text-4xl font-bold md:text-6xl">

            Your idea deserves proof.

          </h2>

          <p className="mx-auto mt-6 max-w-xl text-lg text-slate-400">

            Create your digital identity, register your intellectual
            property and establish tamper-evident blockchain proof.

          </p>

          <Link
            to="/register"
            className="mt-10 inline-flex items-center gap-2 rounded-xl bg-green-500 px-7 py-4 font-semibold text-black transition hover:bg-green-400"
          >

            Start Protecting Your IP

            <ArrowRight size={18} />

          </Link>

        </div>

      </section>


      {/* FOOTER */}

      <footer className="border-t border-white/10 px-6 py-8">

        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-slate-500 md:flex-row">

          <p>

            © 2026 IPR TrustChain. Built for trusted intellectual property.

          </p>

          <p>

            Digital Identity • SHA-256 • Blockchain Verification

          </p>

        </div>

      </footer>

    </div>
  );
}


function Step({
  number,
  icon,
  title,
  description,
}: {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:-translate-y-1 hover:border-green-400/30 hover:bg-green-400/[0.03]">

      <div className="flex items-center justify-between">

        <div className="text-green-400">

          {icon}

        </div>

        <span className="font-mono text-sm text-slate-600">

          {number}

        </span>

      </div>

      <h3 className="mt-8 text-xl font-semibold">

        {title}

      </h3>

      <p className="mt-3 leading-relaxed text-slate-400">

        {description}

      </p>

    </div>
  );
}


function SecurityCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6">

      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-400/10 text-green-400">

        {icon}

      </div>

      <div>

        <h3 className="font-semibold">

          {title}

        </h3>

        <p className="mt-2 text-sm leading-relaxed text-slate-400">

          {description}

        </p>

      </div>

    </div>
  );
}