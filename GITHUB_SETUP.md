# GitHub Gist Setup for FITTOBER Team Tracker

## Quick Setup Steps

### 1. Create GitHub Personal Access Token
1. Go to [GitHub Personal Access Tokens](https://github.com/settings/tokens)
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name like "FITTOBER Team Tracker"
4. Select the **gist** scope (check the box)
5. Click "Generate token"
6. **Copy the token immediately** (you won't see it again!)

### 2. Update the Code
1. Open `app.js`
2. Find line with `githubToken: 'YOUR_GITHUB_TOKEN_HERE'`
3. Replace `YOUR_GITHUB_TOKEN_HERE` with your token

Example:
```javascript
githubToken: 'ghp_1234567890abcdef1234567890abcdef12345678', // Your actual token
```

### 3. Test the App
1. Open the website
2. Try logging an activity
3. The app will automatically create a private GitHub Gist
4. Check your GitHub Gists at https://gist.github.com/

## Benefits of GitHub Gist
- ✅ Free and reliable
- ✅ Private gists (data not public)
- ✅ Automatic version history
- ✅ Uses your existing GitHub account
- ✅ No rate limits for basic usage
- ✅ Can view/edit data directly on GitHub

## Troubleshooting
- If you get "401 Unauthorized", check your token
- Make sure you selected the "gist" scope when creating the token
- The token should start with `ghp_`