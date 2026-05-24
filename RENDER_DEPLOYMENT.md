# Deploying FindEra Backend to Render 🚀

## Prerequisites
- Render.com account (https://render.com)
- GitHub repository (your code must be pushed to GitHub)
- MongoDB Atlas account or MongoDB connection string

## Step-by-Step Deployment Guide

### 1. **Prepare Your Backend**
   - Ensure all code is committed and pushed to GitHub
   - The `render.yaml` file is in the `Backend/lostandfound/` directory
   - `package.json` has the correct start script: `"start": "node server.js"`

### 2. **Create Environment Variables on Render**
   - Go to https://render.com/dashboard
   - Create a new Web Service
   - Connect your GitHub repository
   - In the environment variables section, add:

   ```
   NODE_ENV=production
   PORT=5000
   DB_URL=mongodb+srv://username:password@cluster.mongodb.net/lostandfound?retryWrites=true&w=majority
   JWT_SECRET=your_super_secret_key_here
   JWT_EXPIRE=7d
   BASE_URL=https://your-service-name.onrender.com
   ```

### 3. **Render Web Service Configuration**
   - **Name**: `findera-backend`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free or Paid (Free tier has some limitations)

### 4. **Important Settings**
   - **Root Directory**: Leave as default or set to `Backend/lostandfound`
   - **Branch**: `main`
   - **Auto-deploy**: Enable to auto-deploy on push

### 5. **Access Your API**
   Once deployed successfully:
   - **Base URL**: `https://your-service-name.onrender.com`
   - **API Docs**: `https://your-service-name.onrender.com/api-docs`
   - **Health Check**: `GET https://your-service-name.onrender.com/health`

### 6. **Update Frontend CORS**
   Update your frontend's API base URL and CORS settings in `server.js`:
   ```javascript
   app.use(cors({
       origin: [
           'https://your-frontend-url.vercel.app',
           'https://your-render-app.onrender.com',
           // ... other allowed origins
       ],
       // ... other settings
   }));
   ```

### 7. **Monitor Your Deployment**
   - Check logs in Render dashboard
   - Monitor database connections
   - Set up alerts for failures

## Common Issues & Solutions

### Issue: "Cannot find module" errors
- **Solution**: Check `package.json` dependencies are correct
- Run `npm install` locally to verify

### Issue: Database connection timeout
- **Solution**: Ensure MongoDB IP whitelist includes `0.0.0.0/0` (all IPs)
- Check connection string credentials

### Issue: CORS errors from frontend
- **Solution**: Add your frontend URL to CORS origin array in `server.js`
- Ensure `BASE_URL` env var matches your Render service URL

### Issue: Swagger UI not loading
- **Solution**: Ensure `BASE_URL` environment variable is set correctly
- Check that `/api-docs` route is accessible

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)

### Items
- `GET /api/items` - Get all items
- `POST /api/items` - Create new item (requires auth)
- `GET /api/items/:id` - Get item by ID
- `PUT /api/items/:id` - Update item (requires auth)
- `DELETE /api/items/:id` - Delete item (requires auth)

### Full API Documentation
Visit: `https://your-service-name.onrender.com/api-docs`

## Troubleshooting

1. **Check logs**: Go to Render dashboard → Your service → Logs
2. **Verify environment variables**: Check in Render dashboard → Environment
3. **Test locally**: Run `npm start` to test before deploying
4. **Check MongoDB**: Ensure database is accessible and credentials are correct

## Performance Tips (Free Tier)

- Free tier services spin down after 15 minutes of inactivity
- Use paid tier for production reliability
- Monitor memory and CPU usage
- Implement caching for frequently accessed data

---

For more help, visit: https://render.com/docs
