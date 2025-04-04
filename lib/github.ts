export async function fetchUserOrganizations(accessToken: string) {
  const res = await fetch(`https://api.github.com/user/orgs`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/vnd.github+json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch organizations");
  }

  return await res.json(); // [{ login: "org-name", ... }]
}
export async function fetchOrgMembers(accessToken: string, org: string) {
    const res = await fetch(`https://api.github.com/orgs/${org}/members`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/vnd.github+json",
      },
    });
  
    if (!res.ok) {
      throw new Error(`Failed to fetch org members: ${res.status}`);
    }
  
    return await res.json();
  }
  export async function fetchOrgRepos(accessToken: string, org: string) {
    const res = await fetch(`https://api.github.com/orgs/${org}/repos`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/vnd.github+json",
      },
    });
  
    if (!res.ok) {
      throw new Error(`Failed to fetch repos: ${res.status}`);
    }
  
    return await res.json();
  }
  export async function fetchUserPermissionOnRepo(
    accessToken: string,
    org: string,
    repo: string,
    username: string
  ) {
    const res = await fetch(
      `https://api.github.com/repos/${org}/${repo}/collaborators/${username}/permission`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/vnd.github+json",
        },
      }
    );
  
    if (!res.ok) {
      return null;
    }
  
    const data = await res.json();
    return data.permission; // "admin" | "write" | "read"
  }
    