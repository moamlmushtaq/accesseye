
# 🔐 AccessEye

AccessEye is an open-source tool that helps teams **monitor GitHub user permissions** across their organization.  
It connects directly to the GitHub API using OAuth, fetches organization members, their repository access levels, and presents the data in a clean dashboard interface.

> 🚀 Built with modern technologies and designed for simplicity, clarity, and future extensibility.

---

## 🌟 Features

- 🔐 **GitHub OAuth Login**
- 🧑‍🤝‍🧑 Fetch all **organization members**
- 📁 List all **repositories**
- 📊 Display each member’s **access level per repo** (`admin`, `write`, `read`)
- ☁️ **Real-time fetching** from GitHub API (no local storage)
- ☁️ Optional MongoDB integration to store and analyze data
- 🧠 Built with scalability in mind (Slack, Google Workspace, etc coming soon)

---

## 🧰 Tech Stack

- [Next.js 14](https://nextjs.org/)
- [Tailwind CSS 4.0](https://tailwindcss.com/)
- [MongoDB + Mongoose](https://mongoosejs.com/)
- [NextAuth.js](https://next-auth.js.org/) with GitHub OAuth
- [GitHub REST API v3](https://docs.github.com/en/rest)

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/moamlmushtaq/accesseye.git
cd acceseye
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create your `.env.local` file

```env
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret
NEXTAUTH_SECRET=any_random_secret
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_URL=http://localhost:3000
```

### 4. Run the project

```bash
npm run dev
```

Visit: `http://localhost:3000`

---

## 📦 Folder Structure

```bash
app/
  login/           → GitHub sign-in page
  select-org/      → Choose organization from GitHub
  dashboard/       → Shows members and their permissions
lib/
  github.ts        → GitHub API integrations
  mongodb.ts       → MongoDB connection
models/
  User.ts
  Repo.ts
  Permission.ts
```

---

## 🛣️ Roadmap

- [x] GitHub login
- [x] Fetch members + repositories
- [x] View permissions in dashboard
- [x] MongoDB storage (optional)
- [ ] Add Slack integration
- [ ] Add Google Workspace integration
- [ ] Risk Analysis and Security Reports
- [ ] Admin dashboard + role management

---

## 🧠 Why AccessEye?

Security starts with visibility.  
Many teams forget who has access to what. **AccessEye** gives you one clear view of GitHub access levels across your team, so you can make smarter decisions and keep your codebase safe.

---

## 🤝 Contributing

Contributions, ideas, and feature requests are welcome!  
Feel free to fork the repo, open an issue, or submit a pull request.

---

## 🧑‍💻 Author

Made with ❤️ by [Moaml Mushtak](https://github.com/moamlmushtaq)  
Part of the [Mushtak Group](https://github.com/moamlmushtaq)

---

## 🪪 License

MIT — free to use, modify, and contribute.
