# Nexus Bot - Railway Deployment Guide

## 🚀 Deploy to Railway (Free & Easy)

### Step 1: Prepare Your Code
1. Create a `package.json` if you don't have one:
```json
{
  "name": "nexus-bot",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "@whiskeysockets/baileys": "^6.7.9",
    "qrcode-terminal": "^0.12.0"
  }
}
```

### Step 2: Deploy to Railway
1. Go to [railway.app](https://railway.app) and sign up
2. Click "New Project" → "Deploy from GitHub repo"
3. Connect your GitHub account and select this repo
4. Railway will automatically detect Node.js and deploy
5. Add environment variables if needed (none required for basic setup)

### Step 3: Keep Bot Running 24/7
- Railway's free tier keeps apps running continuously
- No need for your laptop to be on
- Bot will restart automatically if it crashes

## 🖥️ Alternative: VPS (More Control)

### DigitalOcean Droplet ($6/month)
1. Sign up at [digitalocean.com](https://digitalocean.com)
2. Create Ubuntu droplet ($6/month)
3. SSH into server and install Node.js
4. Upload your bot files
5. Run with PM2: `npm install -g pm2 && pm2 start index.js --name nexus-bot`

## 📱 Alternative: Android Phone (Termux)

### Using Termux on Android
1. Install Termux from F-Droid or Google Play
2. Install Node.js: `pkg install nodejs`
3. Upload bot files to phone
4. Run: `node index.js`
5. Use app like "Termux:Boot" to auto-start on boot

## 🔧 Environment Variables (Optional)

Create a `.env` file for sensitive data:
```
PORT=3000
SESSION_SECRET=your_secret_here
```

## 📋 Requirements Checklist

- ✅ Node.js project with package.json
- ✅ All dependencies listed
- ✅ index.js as entry point
- ✅ No local file paths that won't work on server
- ✅ Bot authentication (QR code scan once, then persistent)

## 🎯 Best Option: Railway

Railway is easiest for beginners:
- Free tier available
- Automatic deployments
- Built-in logging
- No server management needed