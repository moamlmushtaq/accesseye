"use client";

import { signIn } from "next-auth/react";
import React from "react";

export default function LoginPage() {
  const handleLogin = async () => {
    await signIn("github", {
      callbackUrl: "/select-org",
    });
      };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">
      <div className="bg-gray-900 p-8 rounded-xl w-full max-w-md shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">AccessEye Login</h1>
        <button
          onClick={handleLogin}
          className="w-full py-2 bg-gray-800 hover:bg-gray-700 rounded text-white font-semibold transition"
        >
          Sign in with GitHub
        </button>
      </div>
    </div>
  );
}
