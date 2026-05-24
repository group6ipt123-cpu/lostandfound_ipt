# 🚀 Render Deployment Checklist for FindEra Backend

## Pre-Deployment Checklist
- [ ] All code is committed and pushed to GitHub
- [ ] `.env.example` file is in place (reference for required variables)
- [ ] `render.yaml` is in `Backend/lostandfound/` directory
- [ ] `package.json` has correct scripts (start: "node server.js")
- [ ] MongoDB connection string is ready
- [ ] JWT_SECRET is set to a strong, random value

## Deployment Steps on Render.com

### Step 1: Create a New Service
1. Go to https://render.com/dashboard
2. Click "New +" → "Web Service"
3. Select your GitHub repository: `group6ipt123-cpu/lostandfound_ipt`
4. Click "Connect"

### Step 2: Configure the Web Service
```
Name:                  findera-backend
Environment:           Node
Build Command:         npm install
Start Command:         npm start
Root Directory:        Backend/lostandfound  (important!)
Plan:                  Free (or Paid for production)
Auto-Deploy:           ON
```

### Step 3: Set Environment Variables
Click "Advanced" → "Add Environment Variable" and add:

| Variable | Value | Notes |
|----------|-------|-------|
| `NODE_ENV` | `production` | Required for production mode |
| `PORT` | `5000` | Can be left blank - Render assigns automatically |
| `DB_URL` | `mongodb+srv://...` | Get from MongoDB Atlas |
| `JWT_SECRET` | `[strong-random-key]` | Change from default! |
| `JWT_EXPIRE` | `7d` | Token expiration period |
| `BASE_URL` | `https://findera-backend.onrender.com` | Update with your actual URL |

### Step 4: Deploy
Click "Create Web Service" and wait for deployment to complete.

### Step 5: Verify Deployment
Once deployed, test these endpoints:

```bash
# Health Check
curl https://findera-backend.onrender.com/health

# API Info
curl https://findera-backend.onrender.com/

# Swagger UI (Open in browser)
https://findera-backend.onrender.com/api-docs
```

## Post-Deployment

### Update Frontend Configuration
1. Update your frontend API base URL:
   ```javascript
   const API_BASE_URL = 'https://findera-backend.onrender.com';
   ```

2. Update CORS origin if needed in `server.js` if your frontend is on Render:
   ```javascript
   'https://your-frontend.onrender.com',
   ```

### MongoDB Atlas Configuration
In MongoDB Atlas:
1. Go to Network Access
2. Add IP Whitelist: `0.0.0.0/0` (allows all IPs)
3. Confirm username and password in connection string

### Monitor Your Service
- Check Render Dashboard for:
  - Deployment status
  - Live logs
  - Uptime
  - Resource usage (CPU, Memory)

## Troubleshooting

### Error: "Cannot find module"
```bash
# Solution: Check node_modules
npm install --production
```

### Error: "MongoDB connection refused"
- [ ] Verify DB_URL environment variable is correct
- [ ] Check MongoDB IP whitelist is `0.0.0.0/0`
- [ ] Confirm username and password

### Error: "CORS error from frontend"
- [ ] Add your frontend URL to CORS origin array in `server.js`
- [ ] Ensure `BASE_URL` matches your Render service URL
- [ ] Clear browser cache and try again

### Service keeps spinning down (Free tier)
- Upgrade to Paid tier (Starter plan - $7/month)
- Free tier services spin down after 15 minutes of inactivity

### Swagger UI shows "undefined" servers
- [ ] Ensure `BASE_URL` environment variable is set correctly
- [ ] Restart the service after changing env vars
- [ ] Check swagger.js for server configuration

## Quick Links

- **Render Dashboard**: https://render.com/dashboard
- **Render Docs**: https://render.com/docs
- **Service Logs**: https://render.com/dashboard → findera-backend → Logs
- **API Docs**: `https://findera-backend.onrender.com/api-docs` (after deployment)
- **MongoDB Atlas**: https://www.mongodb.com/cloud/atlas

## Rollback Procedure

If deployment fails:
1. Go to Render Dashboard
2. Click on service "findera-backend"
3. Go to "Deploys" tab
4. Find previous successful deployment
5. Click "Redeploy"

---

**Status**: ✅ Ready for Deployment
**Last Updated**: $(date)
**API Version**: 1.0.0
