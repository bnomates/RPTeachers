# Hostinger Deployment Guide (Continuous Delivery)

**Project:** Anzio Restaurant
**Domain:** `devrestaurantqr.co.uk`
**Method:** Git Integration (Auto-Deployment)

This guide outlines how to connect your GitHub repository to Hostinger. Once set up, any change you push to the `main` branch on GitHub will automatically update your live website within seconds.

---

## Prerequisites

1.  **Local Code:** You have the project files (`index.html`, `css/`, `js/`) on your computer.
2.  **GitHub Repo:** You have pushed this code to a GitHub repository (Public or Private).
3.  **Hostinger Account:** You have access to the hPanel for `devrestaurantqr.co.uk`.

---

## Step 1: Prepare the Server (Clean Slate)

Before linking Git, ensure the target folder on Hostinger is empty to avoid conflicts.

1.  Log in to **Hostinger hPanel**.
2.  Navigate to **Websites** → **Manage** (for your domain).
3.  On the sidebar, find **Files** → **File Manager**.
4.  Open the `public_html` folder.
5.  **Delete everything inside.**
    - _Note:_ Remove `default.php` or `hosting_provider.png` if they exist.
    - _Warning:_ Do not delete the `public_html` folder itself, only the files _inside_ it.

---

## Step 2: Configure Hostinger Git Integration

1.  Go back to the **hPanel Dashboard** for your website.
2.  In the sidebar search bar (or under the "Advanced" section), click on **Git**.
3.  You will see a form to **Create a New Repository**. Fill it in as follows:

| Field                  | Value / Action                                   | Note                                                                                                                               |
| :--------------------- | :----------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| **Repository Address** | `https://github.com/YOUR_USERNAME/REPO_NAME.git` | Your GitHub HTTPS URL.                                                                                                             |
| **Branch**             | `main`                                           | Ensure this matches your GitHub branch (sometimes it is `master`).                                                                 |
| **Directory**          | **LEAVE EMPTY**                                  | **Critical:** Leaving this empty installs the site to the root domain. If you type `test`, your site will be at `domain.com/test`. |

4.  Click **Create**.
    - _If your repository is Private:_ Hostinger may ask you to generate an SSH key or input a GitHub Personal Access Token. Follow the on-screen prompt to authorize access.

---

## Step 3: Enable Continuous Deployment

Once the repository is added, it will appear in the "Manage Repositories" list on the same page.

1.  Look for the **Auto Deployment** column or button.
2.  **Toggle it ON** (or click "Enable").

    - _What this does:_ Hostinger creates a "Webhook". When you push code to GitHub, GitHub sends a signal to Hostinger, and Hostinger immediately runs a `git pull` command to update your live site.

3.  (Optional) Click **Deploy** manually once to ensure the first batch of files is pulled down immediately.

---

## Step 4: Verification

1.  Open `https://devrestaurantqr.co.uk` in your browser.
2.  You should see the Anzio Restaurant home page.
3.  Open Developer Tools (F12) → Console.
4.  Verify the message: \*"Anzio System Loaded

done
