# FITOBER Activity Logger

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)

⭐ If you like this project, star it on GitHub — it helps a lot!

[Overview](#overview) • [Features](#features) • [Getting Started](#getting-started) • [Usage](#usage) • [Team](#team)

A streamlined fitness activity tracking web application designed for teams participating in fitness challenges. Track workouts, compete with teammates, and automatically submit data to Google Forms with pre-filled information.

![FITOBER Activity Logger](https://img.shields.io/badge/FITOBER-Activity%20Logger-brightgreen)

## Overview

FITOBER Activity Logger is a client-side web application built for "The Excel-erators" team to efficiently log fitness activities during fitness challenges. The app provides a clean, modern interface for team members to quickly record their workouts and automatically opens pre-filled Google Forms for official submission.

### Key Benefits

- **Fast Activity Logging**: Quick-add buttons for common workout durations
- **Team Competition**: Real-time leaderboard showing total minutes per member  
- **Activity History**: Local storage of recent workout logs
- **Seamless Integration**: Automatic Google Forms pre-filling for official submissions
- **Responsive Design**: Works perfectly on mobile and desktop devices
- **No Backend Required**: Runs entirely in the browser with local data persistence

## Features

- **Member Selection**: Choose from team members with auto-populated profile information
- **Activity Tracking**: Support for multiple fitness activities (Cardio, Weights, Sports, Yoga, Dance, etc.)
- **Quick Duration Entry**: One-click buttons for common workout durations (15, 30, 45, 60, 75 minutes)
- **Local Leaderboard**: Real-time ranking of team members by total workout minutes
- **Recent Activity Log**: History of the last 7 logged activities
- **Google Forms Integration**: Automatic pre-filling of team submission forms
- **Responsive UI**: Modern dark theme with mobile-optimized design
- **Local Data Persistence**: All data stored locally using browser localStorage

## Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for Google Forms submission)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/pushpullleg/FITTOBER_NEW.git
   cd FITTOBER_NEW
   ```

2. **Open the application**:
   Simply open `index.html` in your web browser:
   ```bash
   # On macOS
   open index.html
   
   # On Windows
   start index.html
   
   # On Linux
   xdg-open index.html
   ```

3. **Start logging activities**:
   The app is ready to use immediately - no installation or setup required!

### Alternative: Direct Download

You can also download the files directly and run them locally:
1. Download `index.html` and `app.js`
2. Place them in the same folder
3. Open `index.html` in your browser

## Usage

### Logging an Activity

1. **Select Team Member**: Choose your name from the dropdown menu
2. **Choose Activity Type**: Select from the available fitness activities
3. **Set Duration**: Either:
   - Click a quick-add button (15, 30, 45, 60, 75 minutes)
   - Manually enter duration in the input field
4. **Submit**: Click "Open Pre-filled Form" to:
   - Save the activity locally
   - Open the official Google Form with your information pre-filled

### Viewing Progress

- **Leaderboard**: See real-time rankings of all team members by total workout minutes
- **Recent Logs**: View your last 7 activities with dates and details
- **Team Profile**: Current team member information is displayed at the top

### Supported Activities

- Cardio
- Weights  
- Sports
- Yoga
- Dance
- Biking
- Intentional Walking
- Table Tennis
- Pickleball
- Cricket

> [!TIP]
> Use the quick-add buttons for faster logging of common workout durations!

## Team

**The Excel-erators** team members:

| Name | CWID |
|------|------|
| Mukesh Ravichandran | 50380788 |
| Trisha Harjono | 50386141 |  
| Jaahnavi Garikipati | 50393610 |
| Tejaswini Damodara Kannan | 50380778 |

## Technical Details

### Architecture

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Storage**: Browser localStorage for activity history and leaderboard data
- **Integration**: Google Forms API for official submissions
- **Styling**: Custom CSS with modern dark theme and responsive design

### Data Structure

Activities are stored locally with the following structure:
```javascript
{
  date: "02 Oct 2025",      // Formatted date
  member: "Member Name",    // Team member name
  activity: "Cardio",      // Activity type
  duration: "30"           // Duration in minutes
}
```

### Browser Compatibility

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Customization

To customize the app for your team:

1. **Update team information** in `app.js`:
   ```javascript
   const members = [
     { name: 'Your Name', cwid: 'Your CWID' },
     // Add more members...
   ];
   const teamName = "Your Team Name";
   ```

2. **Update Google Form integration** in `app.js`:
   ```javascript
   const entryIDs = {
     team: 'entry.YOUR_TEAM_ID',
     member: 'entry.YOUR_MEMBER_ID',
     // Update with your form's entry IDs...
   };
   ```

3. **Modify activities** in `index.html`:
   ```html
   <option>Your Custom Activity</option>
   ```

## Contributing

Contributions are welcome! This project is open to improvements and feature additions.

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test thoroughly in multiple browsers
5. Submit a pull request

### Reporting Issues

If you encounter any bugs or have feature requests, please [open an issue](https://github.com/pushpullleg/FITTOBER_NEW/issues) with:
- Browser and version
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

---

<div align="center">

**Built with ❤️ for The Excel-erators team**

For feedback or improvements, contact the [App Developer](https://github.com/pushpullleg)

</div>