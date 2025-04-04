import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import {
  fetchOrgMembers,
  fetchOrgRepos,
  fetchUserPermissionOnRepo,
} from "../../lib/github";

import { connectToDatabase } from "../../lib/mongodb";
import User from "../../models/User";
import Repo from "../../models/Repo";
import Permission from "../../models/Permission";
import React from "react";

interface DashboardProps {
  searchParams: {
    org?: string;
  };
}

export default async function DashboardPage({ searchParams }: DashboardProps) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const accessToken = session.accessToken as string;
  const org = searchParams.org;

  if (!org) redirect("/select-org");

  let members: any[] = [];
  let repos: any[] = [];
  let permissionsTable: Record<string, Record<string, string>> = {};

  try {
    await connectToDatabase();

    // Get members and repos
    members = await fetchOrgMembers(accessToken, org);
    repos = await fetchOrgRepos(accessToken, org);

    for (const member of members) {
      const username = member.login;
      permissionsTable[username] = {};

      await User.updateOne(
        { login: username },
        {
          login: username,
          avatar_url: member.avatar_url,
          github_url: member.html_url,
          organization: org,
        },
        { upsert: true }
      );

      for (const repo of repos) {
        const repoName = repo.name;

        const perm = await fetchUserPermissionOnRepo(
          accessToken,
          org,
          repoName,
          username
        );

        if (perm) {
          permissionsTable[username][repoName] = perm;

          await Repo.updateOne(
            { name: repoName },
            {
              name: repoName,
              full_name: repo.full_name,
              private: repo.private,
              organization: org,
            },
            { upsert: true }
          );

          await Permission.updateOne(
            { user: username, repo: repoName },
            {
              user: username,
              repo: repoName,
              permission: perm,
              organization: org,
              fetchedAt: new Date(),
            },
            { upsert: true }
          );
        }
      }
    }
  } catch (err) {
    console.error("❌ Error:", err);
  }

  return (
    <div className="min-h-screen flex bg-gray-950 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 p-6 hidden md:block">
        <h2 className="text-2xl font-bold mb-8">AccessEye</h2>
        <nav className="space-y-4">
          <a href="#" className="block hover:text-blue-400">Dashboard</a>
          <a href="/api/auth/signout" className="block hover:text-red-400 mt-10">Logout</a>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 overflow-x-auto">
        <h1 className="text-3xl font-bold mb-6">
          GitHub Access Dashboard: <span className="text-blue-400">{org}</span>
        </h1>

        <h2 className="text-xl font-semibold my-4">Permissions Table</h2>
        <table className="w-full text-left border-collapse border border-gray-700 text-sm">
          <thead>
            <tr>
              <th className="border border-gray-700 px-4 py-2 bg-gray-800">User</th>
              {repos.map((repo: any) => (
                <th
                  key={repo.id}
                  className="border border-gray-700 px-4 py-2 bg-gray-800"
                >
                  {repo.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {members.map((member: any) => (
              <tr key={member.id}>
                <td className="border border-gray-700 px-4 py-2">{member.login}</td>
                {repos.map((repo: any) => (
                  <td
                    key={repo.id}
                    className="border border-gray-700 px-4 py-2 text-center capitalize"
                  >
                    {permissionsTable[member.login]?.[repo.name] || "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
