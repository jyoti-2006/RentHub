# 🚀 RentHub Deployment Guide

This guide provides step-by-step instructions for deploying your RentHub application to production.

## 📋 Pre-Deployment Checklist

Before deploying, ensure you have:

- ✅ **Supabase Account** - Database configured with all required tables
- ✅ **Gmail App Password** - For email notifications
- ✅ **Git Repository** - Code pushed to GitHub/GitLab
- ✅ **Environment Variables** - All values ready (see below)
- ✅ **Testing Complete** - Application tested locally

## 🔑 Required Environment Variables

You'll need these environment variables for deployment:

```env
# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# JWT Secret (generate a strong random string)
JWT_SECRET=your_secure_random_jwt_secret_minimum_32_characters

# Email Configuration (Gmail App Password)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your_16_character_app_password

# Server Configuration
PORT=3005
NODE_ENV=production
```

> [!IMPORTANT]
> **Never commit your `.env` file to Git!** It's already in `.gitignore`.

---

## 🎯 Deployment Options

Choose your preferred platform:

1. [**Render**](#option-1-deploy-to-render) - Recommended (Free tier available, easy setup)
2. [**Railway**](#option-2-deploy-to-railway) - Great alternative (Free tier available)
3. [**Vercel**](#option-3-deploy-to-vercel) - Good for serverless
4. [**Heroku**](#option-4-deploy-to-heroku) - Classic option (No free tier)

---

## Option 1: Deploy to Render

**Render** is recommended for its simplicity and free tier.

### Step 1: Prepare Your Repository

```bash
# Ensure your code is pushed to GitHub
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Create Render Account

1. Go to [render.com](https://render.com)
2. Sign up with GitHub (recommended)
3. Authorize Render to access your repositories

### Step 3: Create New Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Select the `RentHub` repository

### Step 4: Configure Service

Fill in the following settings:

| Setting | Value |
|---------|-------|
| **Name** | `renthub` (or your choice) |
| **Environment** | `Node` |
| **Region** | Choose closest to your users |
| **Branch** | `main` |
| **Build Command** | `npm install` |
| **Start Command** | `node server-supabase.js` |
| **Instance Type** | Free (or paid for better performance) |

### Step 5: Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"** and add all variables from your `.env` file:

```
SUPABASE_URL = https://your-project.supabase.co
SUPABASE_ANON_KEY = your_anon_key
SUPABASE_SERVICE_ROLE_KEY = your_service_role_key
JWT_SECRET = your_jwt_secret
EMAIL_USER = your-email@gmail.com
EMAIL_PASS = your_app_password
PORT = 3005
NODE_ENV = production
```

### Step 6: Deploy

1. Click **"Create Web Service"**
2. Wait 3-5 minutes for deployment
3. Your app will be live at `https://renthub.onrender.com`

### Step 7: Verify Deployment

Visit your app URL and test:
- ✅ Home page loads
- ✅ User registration works
- ✅ Login functionality
- ✅ Vehicle browsing
- ✅ Admin dashboard access

> [!TIP]
> Render free tier apps sleep after 15 minutes of inactivity. First request may take 30-60 seconds to wake up.

---

## Option 2: Deploy to Railway

**Railway** offers a generous free tier and excellent developer experience.

### Step 1: Install Railway CLI (Optional)

```bash
npm install -g @railway/cli
railway login
```

### Step 2: Deploy via Dashboard

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click **"New Project"**
4. Select **"Deploy from GitHub repo"**
5. Choose your `RentHub` repository

### Step 3: Configure Environment Variables

1. Click on your service
2. Go to **"Variables"** tab
3. Click **"Raw Editor"**
4. Paste all environment variables:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
JWT_SECRET=your_jwt_secret
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your_app_password
PORT=3005
NODE_ENV=production
```

### Step 4: Configure Start Command

1. Go to **"Settings"** tab
2. Under **"Deploy"** section
3. Set **Start Command**: `node server-supabase.js`

### Step 5: Deploy

Railway automatically deploys on push. Your app will be at:
`https://your-app.up.railway.app`

### Step 6: Custom Domain (Optional)

1. Go to **"Settings"** → **"Domains"**
2. Click **"Generate Domain"** or add custom domain

---

## Option 3: Deploy to Vercel

**Vercel** is optimized for serverless deployments.

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Deploy

```bash
# Navigate to your project
cd c:\Users\dask6\OneDrive\Desktop\KJJ\RentHub

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? renthub
# - Directory? ./
# - Override settings? No
```

### Step 3: Add Environment Variables

```bash
# Add each environment variable
vercel env add SUPABASE_URL
vercel env add SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add JWT_SECRET
vercel env add EMAIL_USER
vercel env add EMAIL_PASS
vercel env add PORT
vercel env add NODE_ENV

# Or via dashboard:
# 1. Go to vercel.com/dashboard
# 2. Select your project
# 3. Settings → Environment Variables
```

### Step 4: Redeploy

```bash
vercel --prod
```

Your app will be at: `https://renthub.vercel.app`

> [!WARNING]
> Vercel has serverless function timeout limits (10s on free tier). Long-running operations may need optimization.

---

## Option 4: Deploy to Heroku

**Heroku** is a classic platform (no longer has free tier).

### Step 1: Install Heroku CLI

```bash
# Download from: https://devcenter.heroku.com/articles/heroku-cli
# Or use npm:
npm install -g heroku
```

### Step 2: Login and Create App

```bash
heroku login
heroku create renthub-app
```

### Step 3: Add Environment Variables

```bash
heroku config:set SUPABASE_URL="https://your-project.supabase.co"
heroku config:set SUPABASE_ANON_KEY="your_anon_key"
heroku config:set SUPABASE_SERVICE_ROLE_KEY="your_service_role_key"
heroku config:set JWT_SECRET="your_jwt_secret"
heroku config:set EMAIL_USER="your-email@gmail.com"
heroku config:set EMAIL_PASS="your_app_password"
heroku config:set NODE_ENV="production"
```

### Step 4: Deploy

```bash
git push heroku main
```

### Step 5: Open App

```bash
heroku open
```

Your app will be at: `https://renthub-app.herokuapp.com`

---

## 🔧 Post-Deployment Configuration

### 1. Update CORS Settings

If you're using a custom domain, update CORS in `server-supabase.js`:

```javascript
const corsOptions = {
  origin: ['https://your-domain.com', 'https://www.your-domain.com'],
  credentials: true
};
```

### 2. Configure Supabase

Update Supabase authentication settings:

1. Go to Supabase Dashboard
2. **Authentication** → **URL Configuration**
3. Add your deployment URL to **Site URL**
4. Add to **Redirect URLs**

### 3. Test Email Service

Send a test email to verify configuration:

```bash
curl https://your-app-url.com/test-email
```

---

## ✅ Verification Checklist

After deployment, verify these features:

### User Features
- [ ] Home page loads correctly
- [ ] User registration works
- [ ] User login successful
- [ ] Browse vehicles (bikes, cars, scooters)
- [ ] Create booking
- [ ] View "My Bookings"
- [ ] Cancel booking
- [ ] Password reset via email

### Admin Features
- [ ] Admin login works
- [ ] Dashboard statistics display
- [ ] View all bookings
- [ ] Confirm/reject bookings
- [ ] User management
- [ ] Vehicle management
- [ ] Email notifications sent

### System Features
- [ ] Database connections work
- [ ] File uploads functional
- [ ] Email service operational
- [ ] JWT authentication working
- [ ] CORS properly configured

---

## 🐛 Troubleshooting

### Issue: App crashes on startup

**Solution:**
1. Check logs: `heroku logs --tail` or platform-specific logs
2. Verify all environment variables are set
3. Ensure `PORT` is set correctly (some platforms auto-assign)

### Issue: Database connection fails

**Solution:**
1. Verify Supabase URL and keys
2. Check Supabase project is active
3. Verify network connectivity from deployment platform

### Issue: Email not sending

**Solution:**
1. Verify Gmail App Password (not regular password)
2. Check 2-Factor Authentication is enabled
3. Test with: `curl https://your-app/test-email`
4. Check email service logs

### Issue: 404 errors on routes

**Solution:**
1. Ensure `server-supabase.js` is the entry point
2. Check static file serving configuration
3. Verify all routes are properly defined

### Issue: CORS errors

**Solution:**
1. Update CORS configuration in `server-supabase.js`
2. Add your deployment domain to allowed origins
3. Redeploy after changes

---

## 🔄 Continuous Deployment

### Automatic Deployments

Most platforms support automatic deployment on git push:

**Render:**
- Automatically deploys on push to `main` branch
- Configure in: Settings → Build & Deploy

**Railway:**
- Auto-deploys by default
- Configure triggers in Settings

**Vercel:**
- Auto-deploys on push
- Configure in: Settings → Git

**Heroku:**
- Enable automatic deploys in dashboard
- Or use: `git push heroku main`

---

## 📊 Monitoring

### Application Logs

**Render:**
```
Dashboard → Your Service → Logs
```

**Railway:**
```
Dashboard → Your Service → Deployments → View Logs
```

**Vercel:**
```
Dashboard → Your Project → Deployments → View Logs
```

**Heroku:**
```bash
heroku logs --tail
```

### Performance Monitoring

Consider adding monitoring tools:
- **Sentry** - Error tracking
- **LogRocket** - Session replay
- **New Relic** - Performance monitoring

---

## 🔐 Security Best Practices

1. **Environment Variables**
   - Never commit `.env` file
   - Use strong JWT secret (32+ characters)
   - Rotate secrets regularly

2. **Database Security**
   - Enable Row Level Security in Supabase
   - Use service role key only on backend
   - Regularly review access logs

3. **HTTPS**
   - All platforms provide free SSL
   - Enforce HTTPS redirects
   - Use secure cookies

4. **Rate Limiting**
   - Consider adding rate limiting middleware
   - Protect login endpoints
   - Prevent brute force attacks

---

## 📈 Scaling Considerations

### Database
- Monitor Supabase usage
- Upgrade plan if needed
- Optimize queries for performance

### Server
- Start with free tier
- Monitor response times
- Upgrade to paid tier for:
  - More concurrent users
  - Better performance
  - No sleep time

### CDN
- Consider Cloudflare for static assets
- Enable compression
- Optimize images

---

## 🎉 Success!

Your RentHub application is now deployed and accessible worldwide! 

**Next Steps:**
1. Share your app URL with users
2. Monitor logs for any issues
3. Set up custom domain (optional)
4. Configure monitoring and alerts
5. Plan for scaling as user base grows

---

## 📞 Support

If you encounter issues:

1. Check platform-specific documentation
2. Review application logs
3. Verify environment variables
4. Test locally first
5. Open an issue on GitHub

**Happy Deploying! 🚀**
