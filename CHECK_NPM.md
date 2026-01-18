# 🔍 Check if npm is Installed

## Quick Test Commands

### Check npm version
```bash
npm --version
```
**Expected output**: `10.x.x` or `9.x.x` or similar version number

---

### Check Node.js version (npm comes with Node.js)
```bash
node --version
```
**Expected output**: `v20.x.x` or `v18.x.x` or similar

---

### Check both at once
```bash
node --version && npm --version
```
**Expected output**:
```
v20.11.0
10.2.4
```

---

## 📊 What the Results Mean

### ✅ If you see version numbers:
**npm is installed!** You can proceed with:
```bash
npm install
```

---

### ❌ If you see "command not found" or similar error:
**npm is NOT installed.** You need to install Node.js first.

---

## 🔧 If npm is NOT Installed

### On Windows:
1. Download Node.js from: https://nodejs.org
2. Download the **LTS version** (Long Term Support)
3. Run the installer
4. Follow the installation wizard
5. Restart your terminal/command prompt
6. Test again: `npm --version`

### Recommended version:
- **Node.js**: v20.x or v18.x (LTS)
- **npm**: v10.x or v9.x (comes with Node.js)

---

## 🎯 Quick Setup Check (Run All These)

```bash
# 1. Check Node.js
node --version

# 2. Check npm
npm --version

# 3. Check if you're in the right directory
cd C:\Users\admin\kingdomwayacademy

# 4. List files (should see package.json)
dir

# 5. Check if node_modules exists
dir node_modules
```

---

## 📋 Expected Results

If everything is set up correctly, you should see:

```bash
C:\Users\admin\kingdomwayacademy> node --version
v20.11.0

C:\Users\admin\kingdomwayacademy> npm --version
10.2.4

C:\Users\admin\kingdomwayacademy> dir
... package.json ...

C:\Users\admin\kingdomwayacademy> dir node_modules
# If installed: lots of folders
# If NOT installed: "File Not Found" (normal, run npm install)
```

---

## 🚀 Next Steps Based on Results

### ✅ If npm IS installed:
```bash
# You're ready! Run:
npm install
```

### ❌ If npm is NOT installed:
1. Install Node.js from https://nodejs.org (LTS version)
2. Restart your terminal
3. Run `npm --version` to verify
4. Then run `npm install`

---

## 🆘 Troubleshooting

### "npm: command not found" (Windows)
- **Fix**: Install Node.js from https://nodejs.org
- **Fix**: Restart your command prompt after installation
- **Fix**: Check if Node.js is in your PATH (should happen automatically)

### npm version is very old (like 6.x or 7.x)
- **Fix**: Update npm with: `npm install -g npm@latest`

### npm works but `npm install` fails
- **Fix**: Clear cache: `npm cache clean --force`
- **Fix**: Delete `node_modules` and try again

---

## 💡 Pro Tip

If you want to see WHERE npm is installed:
```bash
# Windows
where npm

# Expected output:
# C:\Program Files\nodejs\npm
# C:\Program Files\nodejs\npm.cmd
```

---

Let me know what you see when you run `npm --version` and I'll help you from there! 🎯
