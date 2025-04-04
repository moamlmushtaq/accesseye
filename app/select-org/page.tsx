import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { fetchUserOrganizations } from "../../lib/github";
import { redirect } from "next/navigation";
import React from "react";

export default async function SelectOrgPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const accessToken = session.accessToken as string;
  const orgs = await fetchUserOrganizations(accessToken);

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-xl w-full max-w-xl shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-6">Select Organization</h1>
        <div className="grid grid-cols-2 gap-4">
          {orgs.map((org: any) => (
            <form key={org.id} action="/dashboard" method="GET">
              <input type="hidden" name="org" value={org.login} />
              <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded w-full">
                {org.login}
              </button>
            </form>
          ))}
        </div>
      </div>
    </div>
  );
}
