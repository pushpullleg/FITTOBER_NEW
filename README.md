# FITTOBER Team Activity Tracker

A modern, mobile-first web application for tracking team fitness activities with real-time cloud synchronization and seamless Google Forms integration.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-brightgreen)](https://pushpullleg.github.io/FITTOBER_NEW/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![GitHub Gist](https://img.shields.io/badge/Storage-GitHub%20Gist-lightgrey)](https://gist.github.com/)

## Overview

FITTOBER is a streamlined fitness tracking application designed for team-based fitness challenges. It combines an intuitive user interface with cloud synchronization to enable team members to log activities efficiently while maintaining real-time visibility of team progress.

### Key Features

- **Real-time Team Analytics** - Live synchronization of team member activities across all devices
- **Mobile-Optimized Interface** - Touch-friendly design with quick-select buttons and counter controls
- **Cloud Storage** - Secure data storage using GitHub Gist API with automatic backup
- **Google Forms Integration** - Seamless pre-filled form submission for official record keeping
- **Cross-Device Sync** - Access team data from any device with one-time token setup
- **Activity Tracking** - Support for multiple activity types including cardio, strength training, yoga, and custom activities

## Architecture

The application follows a client-side architecture with cloud synchronization:

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Web Interface │ ── │  GitHub Gist API │ ── │ Google Forms    │
│   (HTML/CSS/JS) │    │  (Cloud Storage) │    │ (Data Export)   │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### Technology Stack

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Storage**: GitHub Gist API for cloud synchronization
- **Authentication**: GitHub Personal Access Tokens
- **Deployment**: GitHub Pages
- **Integration**: Google Forms API for data submission

## Getting Started

### Prerequisites

- GitHub account
- Modern web browser with JavaScript enabled

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/pushpullleg/FITTOBER_NEW.git
   cd FITTOBER_NEW
   ```

2. **Create GitHub Personal Access Token**
   - Go to [GitHub Settings > Tokens](https://github.com/settings/tokens)
   - Generate new token (classic) with `gist` scope
   - Copy the token for later use

3. **Deploy to GitHub Pages**
   - Enable GitHub Pages in repository settings
   - Select source branch (main)
   - Access your live application

### Configuration

> [!IMPORTANT]
> The application requires a GitHub Personal Access Token for cloud synchronization. This token will be requested on first use and stored securely in browser localStorage.

When first accessing the application:
1. Enter your GitHub Personal Access Token when prompted
2. The app will create a private GitHub Gist for team data
3. Token is saved locally - no re-entry needed on the same device

## Usage

### Logging Activities

1. **Select Team Member** - Choose from the dropdown
2. **Choose Activity Type** - Select from predefined options or enter custom activity
3. **Set Duration** - Use quick buttons (15, 30, 45, 60, 90 min) or counter controls
4. **Submit** - Click "Log Activity" to save and open pre-filled Google Form

### Team Analytics

- **Real-time Totals** - View cumulative minutes per team member
- **Recent Activity Feed** - See latest activities from all team members
- **Cross-device Sync** - Data updates automatically across all devices

### Mobile Experience

The interface is optimized for mobile devices with:
- Touch-friendly controls
- Quick-select duration buttons
- Responsive grid layout
- Optimized form inputs

## API Integration

### GitHub Gist API

The application uses GitHub Gist API for data persistence:

```javascript
// Configuration
const CLOUD_CONFIG = {
  apiUrl: 'https://api.github.com/gists',
  githubToken: localStorage.getItem('githubToken'),
  gistId: localStorage.getItem('gistId'),
  fileName: 'fittober_team_data.json'
};
```

### Google Forms Integration

Activities are automatically submitted to Google Forms with pre-filled data:
- Team name and member information
- Activity type and duration
- Timestamp and unique identifiers

## Team Configuration

To customize for your team, update the following in `app.js`:

```javascript
const members = [
  { name: 'Team Member 1', cwid: 'ID1' },
  { name: 'Team Member 2', cwid: 'ID2' },
  // Add your team members
];

const teamName = "Your Team Name";

// Update Google Form entry IDs
const entryIDs = {
  team: 'entry.xxxxxxxxx',
  member: 'entry.xxxxxxxxx',
  // Update with your form's entry IDs
};
```

## Security

- **Token Storage**: GitHub tokens stored in browser localStorage (device-specific)
- **Private Gists**: Team data stored in private, encrypted GitHub Gists
- **No Server Dependencies**: Client-side only, no server-side data storage
- **Secure Authentication**: GitHub OAuth token-based authentication

> [!WARNING]
> Keep your GitHub Personal Access Token private. Only share with trusted team members for setup purposes.

## Browser Support

- Chrome/Chromium 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## Troubleshooting

### Common Issues

**Token Authentication Fails**
- Verify token has `gist` scope enabled
- Check token hasn't expired
- Ensure token starts with `ghp_`

**Data Not Syncing**
- Check internet connection
- Verify GitHub Gist permissions
- Clear browser cache and re-enter token

**Mobile Display Issues**
- Ensure viewport meta tag is present
- Check CSS media queries
- Test in device developer tools

## Development

### Local Development

```bash
# Serve locally (requires Python)
python -m http.server 8000

# Or using Node.js
npx serve .
```

### File Structure

```
├── index.html          # Main application interface
├── app.js             # Core application logic
├── images/
│   └── bkg.jpg        # Background image
├── GITHUB_SETUP.md    # Setup documentation
└── README.md          # Project documentation
```

## Deployment

The application is designed for static hosting and can be deployed to:

- **GitHub Pages** (recommended)
- Netlify
- Vercel
- Any static hosting service

For GitHub Pages deployment, simply enable Pages in repository settings and select the main branch.

---

**Live Demo**: [https://pushpullleg.github.io/FITTOBER_NEW/](https://pushpullleg.github.io/FITTOBER_NEW/)

For questions or support, contact [Mukesh Ravichandran](https://www.linkedin.com/in/mukesh-ravichandran/).