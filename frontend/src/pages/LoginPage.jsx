"use client";

import { useState } from "react";
import { loginUser } from "../api/api.js";

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await loginUser(email, password);
      console.log("Logged in successfully", res);

      // Save the token to localStorage or cookies (for now, using localStorage)
      localStorage.setItem("accessToken", res.accessToken);

      onLogin();
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMsg("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full">
      {/* Left side - Purple background with title */}
      <div className="hidden md:flex md:w-1/2 bg-[#5D5A80] flex-col justify-center items-center text-white p-8">
        <div className="max-w-md">
          <h1 className="text-3xl font-bold mb-2">Cash Management Dashboard</h1>
          <p className="text-lg">
            Real-time Cash Reconciliation – Ensuring Accuracy & Transparency
          </p>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-[#3b3486] mb-8">
            Sign In to Your Dashboard
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@123.com"
                className="w-full p-3 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#5D5A80]"
                required
              />
            </div>

            <div className="mb-6">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#5D5A80]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#E85C33] text-white py-3 rounded hover:bg-[#d04e2a] transition-colors"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login to dashboard"}
            </button>

            {errorMsg && (
              <p className="text-red-600 text-sm mt-2">{errorMsg}</p>
            )}

            <div className="flex justify-between items-center mt-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>

              <a
                href="#"
                className="text-sm text-gray-600 hover:text-[#5D5A80]"
              >
                Forgot password
              </a>
            </div>
          </form>

          <div className="absolute bottom-4 right-4 text-sm text-gray-500">
            Powered by Aestriks
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
