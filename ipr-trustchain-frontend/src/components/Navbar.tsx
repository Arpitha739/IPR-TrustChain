import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#06111f]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 border border-green-400/30">
            <ShieldCheck className="text-green-400" />
          </div>

          <div>
            <h1 className="font-bold tracking-wide">
              IPR TRUSTCHAIN
            </h1>

            <p className="text-xs text-slate-400">
              Protect • Prove • Verify
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-8 md:flex">

          <a
            href="#how-it-works"
            className="text-sm text-slate-300 transition hover:text-white"
          >
            How it Works
          </a>

          <a
            href="#security"
            className="text-sm text-slate-300 transition hover:text-white"
          >
            Security
          </a>

          <Link
            to="/verify"
            className="text-sm text-slate-300 transition hover:text-white"
          >
            Verify IP
          </Link>

          <Link
            to="/login"
            className="text-sm font-medium text-white"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="rounded-xl bg-green-500 px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-green-400"
          >
            Get Started
          </Link>

        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
        >
          {open ? <X /> : <Menu />}
        </button>

      </div>

      {open && (
        <div className="border-t border-white/10 bg-[#06111f] px-6 py-6 md:hidden">

          <div className="flex flex-col gap-5">

            <a href="#how-it-works">
              How it Works
            </a>

            <a href="#security">
              Security
            </a>

            <Link to="/verify">
              Verify IP
            </Link>

            <Link to="/login">
              Login
            </Link>

            <Link
              to="/register"
              className="rounded-xl bg-green-500 px-4 py-3 text-center font-semibold text-black"
            >
              Get Started
            </Link>

          </div>

        </div>
      )}

    </nav>
  );
}