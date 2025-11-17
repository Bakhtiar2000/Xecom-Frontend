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

Do **NOT** create PRs into `main`.
Do **NOT** push directly to `main`.

---

### 5. Wait for Review and Approval

Your PR will be reviewed.
Fix requested changes, update commits, and push again.

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

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
