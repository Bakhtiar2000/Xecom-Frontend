This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 🚀 Development Process

Follow this process strictly to avoid conflicts and maintain a clean workflow.

---

### 1. Create a Branch From `dev`

Always start from the latest `dev` branch:

```bash
git checkout dev
git pull origin dev
git checkout -b feat/fix/chore/docs/branch-name
```

Use the correct prefix:

* `feat/` – new feature
* `fix/` – bug fix
* `chore/` – maintenance or config
* `docs/` – documentation

---

### 2. Update Your New Branch With the Latest `dev` Changes

Even after creating the branch, sync it immediately:

```bash
git pull origin dev
npm install    # or pnpm install
```

---

### 3. Make Your Changes, Commit, and Push

```bash
git add .
git commit -m "meaningful commit message"
git push origin branch-name
```

---

### 4. Create a Pull Request (PR)

All PRs must be created **from your branch → into `dev`**.

```
dev  ←  your-branch
```

> [!CAUTION]
> **Do NOT create PRs into `main`.**
> 
> **Do NOT push directly to `main`.**

---

### 5. Wait for Review and Approval

Your PR will be reviewed.
Fix requested changes, update commits, and push again.

> [!TIP]
> **✅ DO:** Always Choose a Reviewer

---

### 6. Merge Into `dev`

Once approved, your PR will be merged into `dev`.
This is the only allowed merge target.

---

### 🔥 Important Rules

> [!IMPORTANT]
> **✅ DO:**
> * Always create branches from `dev`
> * Always create PRs into `dev`
> * Keep commit messages clean and meaningful
> * Update your branch before and after development to avoid conflicts

> [!CAUTION]
> **❌ DON'T:**
> * Never push directly to `main` (it is protected)
> * Never create PRs into `main`
> * Never work without pulling latest changes first

---

## Learn More

First, run the development server:

npm run dev # or
yarn dev # or
pnpm dev # or
bun dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
