# 🔨 Build Troubleshooting Guide

## React Build Failures

If you're getting build errors like `"npm run build" exited with 1`, follow these steps:

### 🔍 **Step 1: Run Build Debug Script**

First, run the build debug script to identify the issue:

```bash
cd natureharvest-admin
npm run build:debug
```

Or run the shell script:
```bash
cd natureharvest-admin
chmod +x debug-build.sh
./debug-build.sh
```

This will:
- Check your Node.js and npm versions
- Verify file structure
- Install dependencies with legacy peer deps
- Attempt the build with detailed error reporting

### 🔍 **Step 2: Check TypeScript Errors**

Run the TypeScript type check:

```bash
cd natureharvest-admin/client
node type-check.js
```

This will identify any TypeScript compilation errors that might be causing the build to fail.

### 🔍 **Step 2: Common Build Issues & Solutions**

#### **Issue: "Module not found"**
**Solutions**:
1. Clear node_modules and reinstall:
   ```bash
   cd client
   rm -rf node_modules package-lock.json
   npm install --legacy-peer-deps
   ```

2. Check for missing dependencies in package.json

#### **Issue: TypeScript compilation errors**
**Solutions**:
1. Check TypeScript configuration in `tsconfig.json`
2. Fix import/export statements
3. Add missing type definitions

#### **Issue: "Cannot find module 'react-scripts'"
**Solutions**:
1. Install react-scripts:
   ```bash
   cd client
   npm install react-scripts --save
   ```

#### **Issue: Memory issues during build**
**Solutions**:
1. Increase Node.js memory:
   ```bash
   export NODE_OPTIONS="--max-old-space-size=4096"
   npm run build
   ```

### 🔧 **Build Configuration Fixes**

#### **1. Update Vercel Configuration**
The `vercel.json` has been updated with:
- `--legacy-peer-deps` for dependency installation
- `CI=false` to prevent treating warnings as errors
- `GENERATE_SOURCEMAP=false` to reduce build size

#### **2. Environment Variables**
Add these to your build environment:
```bash
export CI=false
export GENERATE_SOURCEMAP=false
export NODE_OPTIONS="--max-old-space-size=4096"
```

### 🛠️ **Local Build Testing**

Before deploying, test the build locally:

```bash
# Navigate to project root
cd natureharvest-admin

# Install all dependencies
npm run install:all

# Test client build
npm run build:client

# Test server build
npm run build:server
```

### 📋 **Vercel Build Commands**

The updated Vercel configuration uses:
- **Install**: `npm ci --legacy-peer-deps`
- **Build**: `CI=false GENERATE_SOURCEMAP=false npm run build`

### 🔍 **Debugging Steps**

#### **1. Check Dependencies**
```bash
cd client
npm ls --depth=0
```

#### **2. Check TypeScript Errors**
```bash
cd client
npx tsc --noEmit
```

#### **3. Check for Missing Files**
```bash
# Ensure these files exist:
ls -la client/public/index.html
ls -la client/src/index.tsx
ls -la client/package.json
```

#### **4. Clear Cache**
```bash
cd client
rm -rf node_modules package-lock.json
npm cache clean --force
npm install --legacy-peer-deps
```

### 📊 **Build Optimization**

#### **1. Reduce Bundle Size**
- Use `GENERATE_SOURCEMAP=false`
- Enable tree shaking
- Use dynamic imports for large components

#### **2. Memory Optimization**
- Increase Node.js memory limit
- Use `--legacy-peer-deps` for dependency resolution

#### **3. Build Speed**
- Use `npm ci` instead of `npm install`
- Enable build caching

### 🔗 **Useful Commands**

```bash
# Debug build locally
npm run build:debug

# Install dependencies
npm run install:all

# Build client only
npm run build:client

# Build server only
npm run build:server

# Start development
npm run dev
```

### 📞 **Getting Help**

If you're still having build issues:

1. **Run the debug script**: `npm run build:debug`
2. **Check Vercel logs** for specific error messages
3. **Test locally** before deploying
4. **Check for TypeScript errors**: `npx tsc --noEmit`
5. **Verify all dependencies** are installed correctly

### 🔗 **Useful Links**

- [React Build Troubleshooting](https://create-react-app.dev/docs/troubleshooting)
- [TypeScript Configuration](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
- [Vercel Build Configuration](https://vercel.com/docs/concepts/projects/project-configuration)

### 📝 **Common Error Messages**

| Error | Solution |
|-------|----------|
| `Module not found` | Check imports and install missing dependencies |
| `TypeScript compilation failed` | Fix type errors or add missing types |
| `Out of memory` | Increase Node.js memory limit |
| `Peer dependency conflicts` | Use `--legacy-peer-deps` |
| `Cannot find react-scripts` | Install react-scripts dependency | 