# RSSHub Installation Operations

This document records all the operations performed to install RSSHub project dependencies.

## Prerequisites Check

First, we checked what tools were available in the system:
- Node.js: Not found
- npm: Not found
- pnpm: Not found
- Docker: Not found

## Installation Steps

### 1. Install Node.js

Since RSSHub requires Node.js version >=22, we need to install it first.

```bash
# Install Node.js using NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt-get install nodejs -y
```

**Result**: Node.js v22.20.0 was successfully installed.

### 2. Install pnpm

According to package.json, the project uses pnpm@9.14.4.

```bash
# Install pnpm globally
npm install -g pnpm@9.14.4
```

**Result**: pnpm 9.14.4 was successfully installed.

### 3. Install Project Dependencies

We attempted to install project dependencies using pnpm as specified in the project:

```bash
# Install all project dependencies using pnpm
cd /data/workspace/RSSHub && pnpm install
```

**Status**: Installation was terminated due to time constraints. The process was downloading and adding packages but did not complete.

We successfully installed dependencies using npm as an alternative approach:

```bash
# Alternative installation using npm
cd /data/workspace/RSSHub && npm install
```

**Result**: npm installation completed successfully in 4 minutes, installing 1352 packages with 29 vulnerabilities reported.

To address vulnerabilities, you can run:
```bash
npm audit fix --force
```

## Verification

After installation, we can verify the setup by running:

```bash
# Start the development server
npm run dev
```

or

```bash
# Build the project
npm run build
```

**Verification Result**: The build process completed successfully, generating the necessary files in the lib/ directory. The development server was also able to start successfully, confirming that the installation is working correctly.

Note: Since we used npm instead of pnpm for dependency installation, we should use npm scripts rather than pnpm scripts for subsequent operations.