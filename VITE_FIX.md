# Vite Module Resolution Error - Fix Documentation

## Problem
The Vite dev server was failing with the error:
```
Error [ERR_MODULE_NOT_FOUND]: Cannot find module '/home/runner/work/Veterans-Home/Veterans-Home/Client/node_modules/vite/dist/node/chunks/dep-BcOQquCi.js' imported from /home/runner/work/Veterans-Home/Veterans-Home/Client/node_modules/vite/dist/node/cli.js
```

## Root Cause
The `node_modules` directory in the `Client` folder was corrupted. Vite's internal chunk files were incomplete or mismatched, causing module resolution failures.

## Solution
1. Removed the corrupted `node_modules` directory
2. Cleared the npm cache
3. Reinstalled all dependencies
4. Removed accidentally tracked `node_modules` files from git

## Steps Taken
```bash
# Remove corrupted node_modules
cd Client
rm -rf node_modules

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
npm install

# Remove node_modules from git tracking (they should not be committed)
git rm -r --cached Client/node_modules
```

## Verification
After the fix, the Vite dev server starts successfully:
```
VITE v7.1.9  ready in 196 ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
```

## Prevention
- The `.gitignore` file already includes `node_modules/`, so they shouldn't be committed in the future
- If this error occurs again, run `npm install` to reinstall dependencies
- For persistent issues, delete `node_modules` and `package-lock.json`, then run `npm install`

## Additional Notes
- The `mainPage` directory also needed its dependencies installed (`npm install`)
- Both client applications now run successfully
