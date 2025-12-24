Here is the `github.md` file. It covers the entire lifecycle from initializing the repository locally to pushing changes using the Visual Studio Code interface.

---

### File: `github.md`

````markdown
# GitHub & VS Code Workflow Guide

**Project:** Anzio Restaurant
**Goal:** Initialize a local repository, link it to GitHub, and manage updates using VS Code.

---

## 1. Prerequisites

Before starting, ensure you have:

1.  **Git Installed:** Run `git --version` in your terminal to check. If not, download it from [git-scm.com](https://git-scm.com/).
2.  **GitHub Account:** A free account at [github.com](https://github.com/).
3.  **VS Code:** Visual Studio Code installed.

---

## 2. Phase 1: Local Setup (Terminal)

First, we need to turn your standard folder into a Git repository.

1.  Open VS Code.
2.  Go to **File** -> **Open Folder** and select your `anzio-project` folder.
3.  Open the Terminal in VS Code (**Terminal** -> **New Terminal** or `Ctrl + ~`).
4.  Run the following commands:

```bash
# 1. Initialize Git (Creates a hidden .git folder)
git init

# 2. Rename the default branch to 'main' (Industry standard)
git branch -M main

# 3. Stage all current files (Prepare them for saving)
git add .

# 4. Commit (Save the snapshot)
git commit -m "Initial commit: Project setup"
```
````

_Your files are now tracked locally, but they are not on the internet yet._

---

## 3. Phase 2: Remote Setup (GitHub Website)

1. Log in to GitHub.
2. Click the **+** icon in the top right -> **New repository**.
3. **Repository name:** `anzio-restaurant` (or similar).
4. **Visibility:** Public or Private (your choice).
5. **Initialize this repository with:**

- [ ] Add a README file (**DO NOT CHECK THIS**)
- [ ] Add .gitignore (**DO NOT CHECK THIS**)
- [ ] Choose a license (**DO NOT CHECK THIS**)
- _Important:_ We must create an **empty** repository because we already have code locally.

6. Click **Create repository**.

---

## 4. Phase 3: Linking Local to Remote

GitHub will show you a list of commands after creating the repo. Look for the section **"…or push an existing repository from the command line"**.

Copy and run these commands in your VS Code Terminal:

```bash
# Link your local folder to the GitHub server
git remote add origin [https://github.com/YOUR_USERNAME/anzio-restaurant.git](https://github.com/YOUR_USERNAME/anzio-restaurant.git)

# Push your code up for the first time
git push -u origin main

```

_Note: You may be asked to sign in. A browser window will open asking you to authorize "Git Ecosystem". Accept it._

---

## 5. Phase 4: The VS Code Workflow (Day-to-Day)

Now that the link is established, you don't need to use the terminal for daily updates. You can use the VS Code Graphical Interface.

### Step A: Make Changes

1. Open `index.html`.
2. Change some text (e.g., update a price).
3. Save the file (`Ctrl + S`).
4. You will notice the **Source Control Icon** (looks like a branching graph/Y-shape) on the left sidebar now has a blue notification bubble (e.g., "1").

### Step B: Stage and Commit

1. Click the **Source Control Icon** on the left sidebar.
2. You will see your changed files listed under "Changes".
3. Hover over the word "Changes" and click the **+ (Plus)** icon. This matches `git add .`.

- _The files move to "Staged Changes"._

4. In the **Message Box** above, type a description (e.g., "Updated carbonara price").
5. Click the blue **Commit** button (or the checkmark icon). This matches `git commit`.

### Step C: Push to GitHub

1. After committing, the blue button will change to **Sync Changes** (or you will see a number next to the arrows in the bottom-left status bar).
2. Click **Sync Changes**.
3. VS Code pushes your code to GitHub.

_Because you set up Hostinger Auto-Deployment, this action also updates your live website._

---

## 6. Troubleshooting

### "Authentication Failed"

If VS Code keeps asking for a password and failing (since GitHub removed password support in favor of Tokens):

1. Click the **Accounts** icon (person icon) in the bottom left of VS Code.
2. Sign out of GitHub.
3. Try to Push again. VS Code will prompt you to sign in via Browser.
4. Authorize the login in Chrome/Edge.

### "Merge Conflict"

This happens if you changed a file on GitHub (via their website editor) AND on your computer at the same time.

1. VS Code will highlight the conflict in the file with colors (Current Change vs Incoming Change).
2. Choose which one to keep (Accept Current or Accept Incoming).
3. Save, Commit, and Push again.

```

```
