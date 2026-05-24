# API Testing Guide for FindEra Backend

## After Render Deployment - Test Your API

### Base URL
```
https://findera-backend.onrender.com
```

### Quick Health Check
```bash
curl https://findera-backend.onrender.com/health
```

Expected Response:
```json
{
  "status": "healthy",
  "uptime": 120.5,
  "timestamp": "2026-05-24T10:00:00.000Z",
  "mongodb": "connected"
}
```

### Get API Information
```bash
curl https://findera-backend.onrender.com/
```

---

## Authentication Endpoints

### 1. Register New User
```bash
curl -X POST https://findera-backend.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@neu.edu.ph",
    "password": "SecurePassword123!",
    "contactNumber": "09123456789",
    "studentId": "22-12345-678"
  }'
```

### 2. Login User
```bash
curl -X POST https://findera-backend.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@neu.edu.ph",
    "password": "SecurePassword123!"
  }'
```

Response includes:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { ... }
}
```

Save the `token` for authenticated requests!

---

## Item Endpoints (Examples)

### 1. Get All Items
```bash
curl https://findera-backend.onrender.com/api/items
```

### 2. Get Items with Filters
```bash
curl "https://findera-backend.onrender.com/api/items?category=lost&status=pending&location=Library"
```

### 3. Create New Item (Requires Authentication)
```bash
curl -X POST https://findera-backend.onrender.com/api/items \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "Lost Wallet",
    "description": "Black leather wallet with student ID",
    "category": "lost",
    "itemCategory": "Wallet/Purse",
    "location": "Main Library",
    "date": "2026-05-24",
    "image": "https://example.com/wallet.jpg"
  }'
```

### 4. Get Single Item
```bash
curl https://findera-backend.onrender.com/api/items/ITEM_ID
```

### 5. Update Item Status
```bash
curl -X PUT https://findera-backend.onrender.com/api/items/ITEM_ID/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "status": "claimed"
  }'
```

Valid statuses: `pending`, `claimed`, `verified`, `ready_for_pickup`, `closed`, `expired`

---

## Testing with Swagger UI

1. Open: `https://findera-backend.onrender.com/api-docs`
2. Look for the green "Authorize" button in the top-right
3. Click it and enter: `Bearer YOUR_TOKEN_HERE`
4. Use the interactive interface to test all endpoints

---

## User Endpoints

### Get Current User Profile
```bash
curl https://findera-backend.onrender.com/api/users/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Update User Profile
```bash
curl -X PUT https://findera-backend.onrender.com/api/users/profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "Jane Doe",
    "contactNumber": "09987654321"
  }'
```

---

## Chat Endpoints

### Get Chat Rooms
```bash
curl https://findera-backend.onrender.com/api/chat/rooms \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Send Message
```bash
curl -X POST https://findera-backend.onrender.com/api/chat/messages \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "roomId": "ROOM_ID",
    "message": "Hi there, is this item still available?"
  }'
```

---

## Claim Endpoints

### Create Claim
```bash
curl -X POST https://findera-backend.onrender.com/api/claims \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "itemId": "ITEM_ID",
    "description": "This is my lost wallet. It has...",
    "proofOfOwnership": "I have my ID card inside"
  }'
```

### Get My Claims
```bash
curl https://findera-backend.onrender.com/api/claims/my-claims \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Admin Endpoints

### Get Dashboard Stats (Admin Only)
```bash
curl https://findera-backend.onrender.com/api/admin/stats \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE"
```

### Get All Users (Admin Only)
```bash
curl https://findera-backend.onrender.com/api/admin/users \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE"
```

### Verify Claim (Admin Only)
```bash
curl -X PUT https://findera-backend.onrender.com/api/admin/claims/CLAIM_ID/verify \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE" \
  -d '{ "status": "verified" }'
```

---

## Common Response Formats

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "error": "error_type"
}
```

### Paginated Response
```json
{
  "success": true,
  "data": [ ... ],
  "page": 1,
  "limit": 20,
  "total": 100,
  "pages": 5
}
```

---

## Testing Tools

1. **Swagger UI** (Recommended for beginners)
   - URL: `https://findera-backend.onrender.com/api-docs`
   - No setup needed, test directly in browser

2. **Postman** (Recommended for production testing)
   - Download: https://www.postman.com/downloads/
   - Import our OpenAPI spec from `/swagger.json`

3. **cURL** (Command-line testing)
   - Built-in on macOS/Linux
   - Windows 10+ has built-in cURL

4. **Thunder Client** (VS Code Extension)
   - Lightweight alternative to Postman
   - VS Code Marketplace

---

## Debugging Tips

### Get Response Headers
```bash
curl -v https://findera-backend.onrender.com/api/items
```

### Check CORS Issues
- Open browser DevTools (F12)
- Look for "CORS policy" errors in Console
- Verify frontend URL is in CORS allowlist in `server.js`

### Monitor Render Logs
- Go to: https://render.com/dashboard
- Click on "findera-backend" service
- Click "Logs" tab
- Watch real-time logs as requests come in

### Test with Invalid Token
```bash
curl https://findera-backend.onrender.com/api/users/me \
  -H "Authorization: Bearer invalid_token"
```

Should return 401 Unauthorized

---

## Performance Testing

### Load Test (Simple)
```bash
# Using Apache Bench (install: `brew install httpd`)
ab -n 100 -c 10 https://findera-backend.onrender.com/api/items
```

### Monitor Response Times
- Use Swagger UI "Try it out" feature
- Check response time in network tab
- Watch for timeouts (should be < 5 seconds)

---

**Next Step**: Once confirmed all tests pass, update frontend configuration to use this production URL.
