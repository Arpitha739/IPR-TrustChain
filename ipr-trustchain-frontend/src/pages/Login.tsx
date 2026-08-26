import { useState } from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import api from "../api/axios";

import { useAuth } from "../context/AuthContext";

import type {
  AuthResponse,
  LoginRequest,
} from "../types";

const Login = () => {

  const navigate =
    useNavigate();

  const { login } =
    useAuth();

  const [formData, setFormData] =
    useState<LoginRequest>({
      email: "",
      password: "",
    });

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setError("");

    setLoading(true);

    try {

      const response =
        await api.post<AuthResponse>(
          "/auth/login",
          formData
        );

      const {
        token,
        userId,
        name,
        email,
        role,
      } = response.data;

      console.log(
        "Login response:",
        response.data
      );

      login(
        token,
        {
          userId,
          name,
          email,
          role,
        }
      );

if (response.data.role === "CREATOR") {

  navigate("/creator/dashboard");

} else if (response.data.role === "VERIFIER") {

  navigate("/verifier/dashboard");

} else if (response.data.role === "ADMIN") {

  navigate("/admin/dashboard");

} else {

  setError("Unknown user role");

}

    } catch (error: any) {

      console.error(error);

      setError(
        error.response?.data?.message ||
        "Invalid email or password"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">

      <div className="w-full max-w-md">

        <Link
          to="/"
          className="text-sm text-slate-400 hover:text-white"
        >
          ← Back to home
        </Link>

        <div className="mt-6 rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl">

          <div className="mb-8">

            <p className="text-sm font-medium text-cyan-400">
              IPR TRUSTCHAIN
            </p>

            <h1 className="mt-2 text-3xl font-bold text-white">
              Welcome back
            </h1>

            <p className="mt-2 text-slate-400">
              Access your intellectual property workspace.
            </p>

          </div>

          {error && (

            <div className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">

              {error}

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
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
              />

            </div>

            <div>

              <label className="mb-2 block text-sm text-slate-300">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
              />

            </div>

            <div className="flex justify-end">

  <Link
    to="/forgot-password"
    className="text-sm text-cyan-400 hover:text-cyan-300"
  >
    Forgot password?
  </Link>

</div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-cyan-500 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-60"
            >

              {loading
                ? "Signing in..."
                : "Sign In"}

            </button>

          </form>

          <p className="mt-6 text-center text-sm text-slate-400">

            Don't have an account?

            <Link
              to="/register"
              className="ml-2 text-cyan-400 hover:text-cyan-300"
            >
              Create account
            </Link>

          </p>

        </div>

      </div>

    </div>

  );
};

export default Login;