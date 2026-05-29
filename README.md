# HMI V2 API

Backend API for the HMI V2 application, built with NestJS and TypeScript.

## Requirements

Install these before setting up the project:

- Node.js 20 or newer
- npm
- Git

Check your installed versions:

```bash
node -v
npm -v
git --version
```

## Clone the Repository

Clone the project from GitHub:

```bash
git clone https://github.com/KeionDz/HMI-V2-API.git
```

Go inside the project folder:

```bash
cd HMI-V2-API
```

## Create Your Working Branch

Always create a new branch before making changes.

Update your local `main` branch first:

```bash
git checkout main
git pull origin main
```

Create a new branch:

```bash
git checkout -b feature/your-feature-name
```

Branch name examples:

```bash
git checkout -b feature/user-login
git checkout -b fix/cors-setup
git checkout -b chore/update-readme
```

## Install Dependencies

Install all project packages:

```bash
npm install
```

This will install the dependencies listed in `package.json`, including NestJS, `class-validator`, and `class-transformer`.

## Run the Application

For local development, run the app in watch mode:

```bash
npm run start:dev
```

By default, the API runs on:

```text
http://localhost:3000
```

Other run commands:

```bash
# run once without watch mode
npm run start

# run in debug mode
npm run start:debug

# run the compiled production build
npm run start:prod
```

## Build the Project

Compile the TypeScript project:

```bash
npm run build
```

The compiled output will be generated in the `dist` folder.

## Check Code Quality

Run linting:

```bash
npm run lint
```

Format the code:

```bash
npm run format
```

## Run Tests

Run unit tests:

```bash
npm run test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Run test coverage:

```bash
npm run test:cov
```

Run end-to-end tests:

```bash
npm run test:e2e
```

## Daily Development Workflow

Use this workflow when working on a task:

```bash
git checkout main
git pull origin main
git checkout -b feature/your-task-name
npm install
npm run start:dev
```

Before pushing your work:

```bash
npm run lint
npm run test
git status
git add .
git commit -m "Describe your change"
git push origin feature/your-task-name
```

After pushing, create a pull request from your branch into `main`.

## Common Git Commands

Check the current branch and changed files:

```bash
git status
```

View all local branches:

```bash
git branch
```

Switch to an existing branch:

```bash
git checkout branch-name
```

Get the latest changes from `main`:

```bash
git checkout main
git pull origin main
```

Delete a local branch after it has been merged:

```bash
git branch -d branch-name
```

## Troubleshooting

If dependencies seem outdated or broken, reinstall them:

```bash
rm -rf node_modules package-lock.json
npm install
```

On Windows PowerShell, use:

```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

If the port is already in use, stop the other process or update the application port in the project configuration.
