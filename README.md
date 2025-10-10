# Honor Haven Veterans Home

This repository contains the Veterans Home management system with multiple applications.

## Project Structure

- **Client/** - Main client application (Vite + React, runs on port 3000)
- **mainPage/** - Standalone frontend (Vite + React, runs on port 5173)
- **server/** - Backend server

## Setup Instructions

### Client Application

```bash
cd Client
npm install
npm run dev
```

The client will start on `http://localhost:3000`

### Main Page Application

```bash
cd mainPage
npm install
npm run dev
```

The main page will start on `http://localhost:5173`

### Server

```bash
cd server
npm install
npm start
```

## Troubleshooting

### Vite Module Resolution Error

If you encounter errors like:
```
Cannot find module '/path/to/node_modules/vite/dist/node/chunks/dep-*.js'
```

This indicates corrupted `node_modules`. To fix:

```bash
# Navigate to the affected directory (Client or mainPage)
cd Client  # or cd mainPage

# Remove node_modules
rm -rf node_modules

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
npm install
```

See [VITE_FIX.md](./VITE_FIX.md) for detailed information about this issue.

## Development Notes

- Each application has its own `package.json` and dependencies
- Node modules are excluded from git (see `.gitignore`)
- Always run `npm install` after cloning or pulling changes
