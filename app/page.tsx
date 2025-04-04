import React from "react";

import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/select-org");
  }

  return (
    <div className="h-screen bg-gray-950 text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to AccessEye</h1>
      <p className="mb-6 text-gray-400">A smart tool to view GitHub team permissions</p>
      <Link
        href="/login"
        className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded text-white font-semibold transition"
      >
        Sign in with GitHub
      </Link>
    </div>
  );
}
