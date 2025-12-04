# 📋 Pre-Deployment Checklist

Complete this checklist before deploying RentHub to production.

## ✅ Code Preparation

- [ ] All code changes committed to Git
- [ ] `.env` file is in `.gitignore` (verify it's not tracked)
- [ ] Code pushed to GitHub/GitLab repository
- [ ] Repository is public or deployment platform has access
- [ ] Latest changes tested locally

## ✅ Database Setup

- [ ] Supabase account created
- [ ] Supabase project created
- [ ] All required tables created:
  - [ ] `users` table
  - [ ] `bookings` table
  - [ ] `password_reset_otps` table
  - [ ] `activity_log` table
- [ ] Database connection tested locally
- [ ] Sample data added (optional)

## ✅ Environment Variables Ready

Gather all these values before deployment:

### Supabase
- [ ] `SUPABASE_URL` (from Supabase Dashboard → Settings → API)
- [ ] `SUPABASE_ANON_KEY` (from Supabase Dashboard → Settings → API)
- [ ] `SUPABASE_SERVICE_ROLE_KEY` (from Supabase Dashboard → Settings → API)

### Authentication
- [ ] `JWT_SECRET` (generate a strong random string, 32+ characters)
  - Generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

### Email Service
- [ ] Gmail account with 2-Factor Authentication enabled
- [ ] Gmail App Password generated (16 characters)
- [ ] `EMAIL_USER` (your Gmail address)
- [ ] `EMAIL_PASS` (16-character app password, NOT your Gmail password)

### Server
- [ ] `PORT` (usually 3005 or auto-assigned by platform)
- [ ] `NODE_ENV` (set to "production")

## ✅ Email Service Configuration

- [ ] 2-Factor Authentication enabled on Gmail
- [ ] App Password generated (Settings → Security → 2-Step Verification → App passwords)
- [ ] Email service tested locally
- [ ] Test email received successfully

## ✅ Local Testing

- [ ] Application runs locally without errors
- [ ] User registration works
- [ ] User login successful
- [ ] Booking creation works
- [ ] Admin dashboard accessible
- [ ] Email notifications sent
- [ ] All API endpoints tested

## ✅ Platform Selection

Choose your deployment platform:

- [ ] **Render** (Recommended - Free tier, easy setup)
- [ ] **Railway** (Great alternative - Free tier)
- [ ] **Vercel** (Serverless - Good for static + API)
- [ ] **Heroku** (Classic - No free tier)

## ✅ Account Setup

- [ ] Deployment platform account created
- [ ] GitHub account connected to platform
- [ ] Payment method added (if using paid tier)

## ✅ Domain & SSL (Optional)

- [ ] Custom domain purchased (optional)
- [ ] DNS configured (if using custom domain)
- [ ] SSL certificate (usually auto-provided by platforms)

## ✅ Monitoring & Logging

- [ ] Error tracking service chosen (Sentry, LogRocket, etc.) - Optional
- [ ] Logging strategy defined
- [ ] Monitoring alerts configured - Optional

## ✅ Security Review

- [ ] `.env` file NOT committed to Git
- [ ] Strong JWT secret generated
- [ ] Database credentials secure
- [ ] CORS configuration reviewed
- [ ] Rate limiting considered (optional)

## ✅ Documentation

- [ ] README.md updated with deployment URL (after deployment)
- [ ] API documentation reviewed
- [ ] User guide prepared (optional)

## ✅ Backup Plan

- [ ] Database backup strategy defined
- [ ] Rollback plan prepared
- [ ] Local copy of all code and data

---

## 🚀 Ready to Deploy?

If all items are checked, you're ready to deploy! 

**Next Steps:**
1. Choose your deployment platform
2. Follow the platform-specific guide in [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
3. Deploy your application
4. Verify all features work in production
5. Monitor logs for any issues

---

## 📝 Quick Reference

### Generate JWT Secret
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Test Email Service Locally
```bash
curl http://localhost:3005/test-email
```

### Check Git Status
```bash
git status
git log -1
```

### Verify Environment Variables
```bash
# Windows PowerShell
Get-Content .env

# Check specific variable (don't run in production!)
echo $env:SUPABASE_URL
```

---

## ❓ Common Questions

**Q: Do I need a paid plan?**
A: No, Render and Railway offer generous free tiers suitable for small to medium applications.

**Q: Can I use a different email service?**
A: Yes, but you'll need to modify the email configuration in `config/emailService.js`.

**Q: How long does deployment take?**
A: Usually 3-10 minutes depending on the platform.

**Q: Can I deploy to multiple platforms?**
A: Yes! You can deploy to multiple platforms for redundancy or testing.

**Q: What if I forget an environment variable?**
A: You can add it later through the platform's dashboard and redeploy.

---

**Good luck with your deployment! 🎉**
