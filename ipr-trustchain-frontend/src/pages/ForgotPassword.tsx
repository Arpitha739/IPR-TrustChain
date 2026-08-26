import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import api from "../api/axios";

const ForgotPassword = () => {

  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setError("");
    setMessage("");

    setLoading(true);

    try {

      const response =
        await api.post(
          "/auth/forgot-password",
          {
            email,
          }
        );

      setMessage(
        response.data ||
        "OTP sent successfully to your email."
      );

      // Store email temporarily
      localStorage.setItem(
        "resetEmail",
        email
      );

      setTimeout(() => {

        navigate(
          "/reset-password"
        );

      }, 1500);

    } catch (error: any) {

      console.error(error);

      setError(
        error.response?.data?.message ||
        error.response?.data ||
        "Failed to send OTP"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">

      <div className="w-full max-w-md">

        <Link
          to="/login"
          className="text-sm text-slate-400 hover:text-white"
        >
          ← Back to login
        </Link>

        <div className="mt-6 rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl">

          <div className="mb-8">

            <p className="text-sm font-medium text-cyan-400">
              IPR TRUSTCHAIN
            </p>

            <h1 className="mt-2 text-3xl font-bold text-white">
              Forgot password?
            </h1>

            <p className="mt-2 text-slate-400">
              Enter your registered email address.
              We'll send you a 6-digit OTP.
            </p>

          </div>

          {error && (

            <div className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">

              {error}

            </div>

          )}

          {message && (

            <div className="mb-5 rounded-xl border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-400">

              {message}

            </div>

          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <div>

              <label className="mb-2 block text-sm text-slate-300">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
                placeholder="you@example.com"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
              />

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-cyan-500 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-60"
            >

              {loading
                ? "Sending OTP..."
                : "Send OTP"}

            </button>

          </form>

        </div>

      </div>

    </div>

  );

};

export default ForgotPassword;