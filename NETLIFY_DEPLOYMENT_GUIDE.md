# Netlify Deployment Guide for Intern Project

This guide will help you deploy your Intern project to Netlify at `https://mcintern.netlify.app`.

## Prerequisites

- Your project is already working locally with `npm run dev`
- You have a GitHub repository with your project
- You have a Netlify account

## Step 1: Prepare Your Repository

### 1.1 Update Environment Variables for Production

Your project already has environment variables configured in `netlify.toml`, but you need to update the `NEXT_PUBLIC_SITE_URL` for your specific Netlify domain.

Update your `netlify.toml` file:

```toml
[build]
  command = "npm install && npm run build"
  publish = ".next"

[build.environment]
  NEXT_USE_NETLIFY_EDGE = "true"
  NODE_VERSION = "18"
  NEXT_TELEMETRY_DISABLED = "1"
  NODE_ENV = "production"
  NEXT_PUBLIC_BASE_URL = "https://intern-api.fly.dev"
  NEXT_PUBLIC_SITE_URL = "https://mcintern.netlify.app"
  NEXT_PUBLIC_SUPABASE_URL = "https://dnrtnzpehfifeyffayqo.supabase.co"
  NEXT_PUBLIC_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRucnRuenBlaGZpZmV5ZmZheXFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4NDczNDAsImV4cCI6MjA2NzQyMzM0MH0.07kkjshEJGr2x0dIuZmdMnFT1jV4FySz-8SqB5p78H0"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"
    Referrer-Policy = "strict-origin-when-cross-origin"
    X-Content-Type-Options = "nosniff"
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### 1.2 Update Next.js Configuration

Your `next.config.js` looks good, but make sure it has the correct settings for Netlify:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: 'template-api.fly.dev',
      }
    ],
    unoptimized: true,
  },
  basePath: '',
  assetPrefix: '',
  trailingSlash: true,
  // Add this for Netlify compatibility
  output: 'standalone',
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        path: false,
        zlib: false,
        http: false,
        https: false,
        buffer: false,
        util: false,
        url: false,
      };
    }

    // Add module resolution for styled-components
    config.resolve.alias = {
      ...config.resolve.alias,
      'styled-components': require.resolve('styled-components'),
    };

    return config;
  },
  distDir: '.next',
  generateEtags: false,
  poweredByHeader: false,
  compress: true,
  swcMinify: true,
  experimental: {
    forceSwcTransforms: true
  }
}

module.exports = nextConfig
```

## Step 2: Deploy to Netlify

### 2.1 Connect Your Repository

1. Go to [Netlify](https://app.netlify.com/)
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub account if not already connected
4. Select your Intern project repository

### 2.2 Configure Build Settings

In the Netlify deployment settings, configure:

**Build settings:**
- **Build command**: `npm run build`
- **Publish directory**: `.next`

**Environment variables to set in Netlify dashboard:**

```
NEXT_USE_NETLIFY_EDGE = true
NODE_VERSION = 18
NEXT_TELEMETRY_DISABLED = 1
NODE_ENV = production
NEXT_PUBLIC_BASE_URL = https://intern-api.fly.dev
NEXT_PUBLIC_SITE_URL = https://mcintern.netlify.app
NEXT_PUBLIC_SUPABASE_URL = https://dnrtnzpehfifeyffayqo.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRucnRuenBlaGZpZmV5ZmZheXFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4NDczNDAsImV4cCI6MjA2NzQyMzM0MH0.07kkjshEJGr2x0dIuZmdMnFT1jV4FySz-8SqB5p78H0
```

### 2.3 Set Up Custom Domain

1. In your Netlify site settings, go to "Domain management"
2. Click "Add custom domain"
3. Enter `mcintern.netlify.app`
4. Netlify will automatically provision the domain

## Step 3: Configure Authentication Callbacks

### 3.1 Update Supabase Authentication Settings

1. Go to your Supabase dashboard
2. Navigate to Authentication → URL Configuration
3. Update the Site URL to: `https://mcintern.netlify.app`
4. Add redirect URLs:
   - `https://mcintern.netlify.app/auth/callback`
   - `https://mcintern.netlify.app/`

### 3.2 Update OAuth Providers (if using Google)

1. In Supabase, go to Authentication → Providers
2. If using Google OAuth, update the authorized redirect URI to:
   - `https://mcintern.netlify.app/auth/callback`

## Step 4: Test Your Deployment

### 4.1 Verify Build Success

1. After deployment, check the build logs in Netlify
2. Ensure there are no build errors
3. The site should be accessible at `https://mcintern.netlify.app`

### 4.2 Test Authentication Flow

1. Visit your deployed site
2. Test the Google sign-in functionality
3. Verify that users can authenticate and access the app
4. Check that redirects work properly after authentication

## Step 5: Troubleshooting Common Issues

### 5.1 Build Failures

**Issue**: Build fails with module not found errors
**Solution**: 
- Ensure all dependencies are in `package.json`
- Check that `node_modules` is not in your repository
- Verify Node.js version is set to 18 in Netlify

**Issue**: TypeScript errors during build
**Solution**:
- Add `NEXT_TYPESCRIPT_IGNORE_BUILD_ERRORS=true` to environment variables
- Or fix TypeScript errors in your code

### 5.2 Authentication Issues

**Issue**: Google OAuth redirect errors
**Solution**:
- Verify redirect URLs in Supabase match your Netlify domain
- Check that `NEXT_PUBLIC_SITE_URL` is set correctly
- Ensure OAuth provider settings are updated

**Issue**: Users can't sign in
**Solution**:
- Check Supabase URL and API key are correct
- Verify environment variables are set in Netlify
- Check browser console for CORS errors

### 5.3 Runtime Errors

**Issue**: Images not loading
**Solution**:
- Update `next.config.js` image domains to include your Netlify domain
- Ensure images are properly imported or use absolute URLs

**Issue**: API calls failing
**Solution**:
- Verify `NEXT_PUBLIC_BASE_URL` points to your correct API endpoint
- Check CORS settings on your API server
- Ensure API is accessible from Netlify's servers

## Step 6: Performance Optimization

### 6.1 Enable Netlify Edge Functions

Your `netlify.toml` already includes `NEXT_USE_NETLIFY_EDGE = "true"`, which enables:
- Faster builds
- Better caching
- Improved performance

### 6.2 Configure Caching

Your current headers configuration is good for development, but for production you might want to adjust caching:

```toml
[[headers]]
  for = "/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"
    Referrer-Policy = "strict-origin-when-cross-origin"
    X-Content-Type-Options = "nosniff"
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
```

## Step 7: Continuous Deployment

### 7.1 Automatic Deployments

Netlify will automatically deploy when you push to your main branch. To configure:

1. In Netlify dashboard, go to Site settings → Build & deploy
2. Configure branch deployments:
   - **Production branch**: `main` or `master`
   - **Deploy contexts**: 
     - Production: `main` branch
     - Branch deploys: All other branches
     - Pull request previews: Enabled

### 7.2 Environment-Specific Variables

For different environments, you can set up deploy contexts:

- **Production**: `main` branch with production environment variables
- **Staging**: `develop` branch with staging environment variables
- **Preview**: Pull requests with preview environment variables

## Final Checklist

Before going live, verify:

- [ ] Build completes successfully
- [ ] Site loads at `https://mcintern.netlify.app`
- [ ] Google authentication works
- [ ] Users can sign in and access the app
- [ ] All API calls work correctly
- [ ] Images and assets load properly
- [ ] No console errors in browser
- [ ] Mobile responsiveness works
- [ ] Performance is acceptable

## Support

If you encounter issues:

1. Check Netlify build logs for errors
2. Verify all environment variables are set correctly
3. Test locally with production environment variables
4. Check Supabase dashboard for authentication issues
5. Review browser console for client-side errors

Your site should now be successfully deployed at `https://mcintern.netlify.app`! 🚀 