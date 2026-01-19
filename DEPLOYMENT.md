# MotoPay Frontend - Production Deployment Guide

## Overview
This guide covers deploying the MotoPay frontend to Vercel and connecting it to the backend API.

## Prerequisites
- Vercel account
- Backend deployed at `https://moto-pay-backend.vercel.app`
- Paystack account with live API keys

## Environment Variables

Set these in your Vercel project settings (**Settings → Environment Variables**):

### Required Variables

| Variable | Value | Description |
|----------|-------|-------------|
| `VITE_API_BASE_URL` | `https://moto-pay-backend.vercel.app` | Backend API URL |
| `VITE_API_VERSION` | `v1` | API version |
| `VITE_PAYSTACK_PUBLIC_KEY` | `pk_live_...` | Paystack public key (live) |

### Setting Environment Variables in Vercel

1. Go to your project at **vercel.com/plateaus-projects/moto-pay**
2. Navigate to **Settings → Environment Variables**
3. Add each variable:
   - Click **Add New**
   - Enter **Name** and **Value**
   - Select environments: **Production**, **Preview**, **Development**
   - Click **Save**
4. After adding all variables, trigger a redeploy

## Deployment Steps

### 1. Initial Deployment

If not already deployed:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd /path/to/MotoPay
vercel --prod
```

### 2. Update Deployment

When you push to GitHub, Vercel will automatically deploy if configured.

#### Manual Redeploy via CLI
```bash
vercel --prod
```

#### Manual Redeploy via Dashboard
1. Go to [vercel.com/plateaus-projects/moto-pay](https://vercel.com/plateaus-projects/moto-pay)
2. Click **Deployments**
3. Click **⋮** (three dots) on latest deployment
4. Click **Redeploy**

## Verification

After deployment, verify the connection:

### 1. Check API Connection
1. Open https://moto-pay.vercel.app
2. Open browser DevTools (F12) → Console tab
3. Look for any CORS or network errors
4. Navigate to different pages (lookup, checkout)
5. Check **Network** tab - API calls should go to `https://moto-pay-backend.vercel.app`

### 2. Test Authentication
1. Navigate to https://moto-pay.vercel.app/login
2. Login with admin credentials
3. Verify successful authentication and redirect

### 3. Test Vehicle Lookup
1. Navigate to https://moto-pay.vercel.app/lookup
2. Enter a test vehicle plate/TIN
3. Verify data loads from backend

## Troubleshooting

### CORS Errors
**Symptom**: Console shows "CORS policy" errors

**Solution**: 
- Verify `FRONTEND_URL` is set correctly in backend Vercel environment variables
- Should be: `https://moto-pay.vercel.app` (no trailing slash)
- Redeploy backend after updating

### API Connection Fails
**Symptom**: "Network Error" or 404 on API calls

**Solution**:
- Verify `VITE_API_BASE_URL` is set in frontend environment variables
- Check backend is deployed and accessible at the URL
- Verify no typos in the URL

### Paystack Not Loading
**Symptom**: Payment popup doesn't appear

**Solution**:
- Verify `VITE_PAYSTACK_PUBLIC_KEY` is set with live key (`pk_live_...`)
- Check browser console for Paystack errors
- Ensure Paystack script is loading (check Network tab)

## Build Configuration

The application uses Vite for builds. No additional configuration needed.

### Build Command
```bash
npm run build
```

### Output Directory
```
dist/
```

Vercel will automatically detect these settings.

## Custom Domain (Optional)

To use a custom domain like `motopay.pl.gov.ng`:

1. Go to **Project Settings → Domains**
2. Click **Add**
3. Enter your domain
4. Follow DNS configuration instructions
5. Update `FRONTEND_URL` in backend to match new domain

## Monitoring

- **Deployment Logs**: Check Vercel dashboard for build/runtime logs
- **Analytics**: Enable Vercel Analytics in project settings
- **Error Tracking**: Consider integrating Sentry for error monitoring

## Support

For deployment issues:
- Vercel Documentation: https://vercel.com/docs
- Check backend at: https://moto-pay-backend.vercel.app
- Verify environment variables are set correctly
