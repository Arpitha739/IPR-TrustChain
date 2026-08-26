import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import type { RegisterRequest } from "../types";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState<RegisterRequest>({
      name: "",
      email: "",
      mobile: "",
      organization: "",
      country: "",
      role: "CREATOR",
      password: "",
    });

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.role
    ) {
      setError(
        "Please fill in all required fields."
      );

      return;
    }

    try {

      setLoading(true);

      const response =
        await api.post(
          "/auth/register",
          formData
        );

      const message =
        typeof response.data === "string"
          ? response.data
          : "Registration successful.";

      setSuccess(message);

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error: any) {

      const message =
        error.response?.data?.message ||
        error.response?.data ||
        "Registration failed. Please try again.";

      setError(
        typeof message === "string"
          ? message
          : "Registration failed."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07111f] text-white flex items-center justify-center px-4 py-10">

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">

        <div className="absolute w-96 h-96 bg-purple-600/20 blur-[150px] rounded-full top-0 right-0" />

        <div className="absolute w-96 h-96 bg-cyan-500/10 blur-[150px] rounded-full bottom-0 left-0" />

      </div>

      <div className="relative w-full max-w-2xl bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">

        <Link
          to="/"
          className="text-xl font-bold"
        >
          IPR<span className="text-cyan-400">
            TrustChain
          </span>
        </Link>

        <div className="mt-10">

          <p className="text-cyan-400 text-sm uppercase tracking-[0.2em]">
            Get Started
          </p>

          <h1 className="text-3xl md:text-4xl font-bold mt-3">
            Create your account
          </h1>

          <p className="text-slate-400 mt-3">
            Start protecting and verifying your
            intellectual property securely.
          </p>

        </div>

        {error && (
          <div className="mt-6 border border-red-500/30 bg-red-500/10 text-red-300 px-4 py-3 rounded-xl text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-6 border border-green-500/30 bg-green-500/10 text-green-300 px-4 py-3 rounded-xl text-sm">
            {success}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-8 grid md:grid-cols-2 gap-5"
        >

          <div>

            <label className="block text-sm text-slate-300 mb-2">
              Full name *
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan-400"
            />

          </div>

          <div>

            <label className="block text-sm text-slate-300 mb-2">
              Email *
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan-400"
            />

          </div>

          <div>

            <label className="block text-sm text-slate-300 mb-2">
              Mobile
            </label>

            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="+91 9876543210"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan-400"
            />

          </div>

          <div>

            <label className="block text-sm text-slate-300 mb-2">
              Organization
            </label>

            <input
              type="text"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              placeholder="Company or institution"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan-400"
            />

          </div>

          <div>

            <label className="block text-sm text-slate-300 mb-2">
              Country
            </label>

            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="India"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan-400"
            />

          </div>

          <div>

            <label className="block text-sm text-slate-300 mb-2">
              Role *
            </label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full bg-[#0b1728] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan-400"
            >
              <option value="CREATOR">
                IP Creator
              </option>

              <option value="VERIFIER">
                Verifier
              </option>

            </select>

          </div>

          <div className="md:col-span-2">

            <label className="block text-sm text-slate-300 mb-2">
              Password *
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a secure password"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan-400"
            />

          </div>

          <div className="md:col-span-2 mt-2">

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90 transition disabled:opacity-50"
            >
              {loading
                ? "Creating account..."
                : "Create Account"}
            </button>

          </div>

        </form>

        <p className="text-center text-slate-400 text-sm mt-8">

          Already have an account?

          <Link
            to="/login"
            className="text-cyan-400 ml-2 hover:underline"
          >
            Sign in
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Register;