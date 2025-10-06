const members = [
  { name: 'Mukesh Ravichandran', cwid: '50380788' },
  { name: 'Trisha Harjono', cwid: '50386141' },
  { name: 'Jaahnavi Garikipati', cwid: '50393610' },
  { name: 'Tejaswini Damodara Kannan', cwid: '50380778' },
];
const teamName = "The Excel-erators";

// Cloud sync configuration - GitHub Gist
const CLOUD_CONFIG = {
  enabled: true,
  apiUrl: 'https://api.github.com/gists',
  githubToken: 'YOUR_GITHUB_TOKEN_HERE', // Replace with GitHub Personal Access Token
  gistId: null, // Will be set after creating the gist
  teamName: teamName,
  fileName: 'fittober_team_data.json'
};

// Google Form field entry IDs
const entryIDs = {
  team: 'entry.500000070',
  member: 'entry.721958901',
  cwid: 'entry.1522950107',
  activity: 'entry.1322466239',
  duration: 'entry.737958173'
};

function getSelectedMember() {
  const idx = document.getElementById('member').value;
  return members[idx];
}

// Profile update no longer needed since CWID/team name removed from display

// Cloud sync functions
async function initializeCloudSync() {
  // For cloud-only approach, we'll create gist if not exists
  // You can manually set CLOUD_CONFIG.gistId if you have an existing gist
  if (!CLOUD_CONFIG.gistId) {
    console.log('🌟 Creating new GitHub gist for team...');
    await createCloudGist();
  } else {
    console.log('📡 Using configured GitHub gist:', CLOUD_CONFIG.gistId);
  }
}

async function createCloudGist() {
  if (!CLOUD_CONFIG.enabled || !CLOUD_CONFIG.githubToken || CLOUD_CONFIG.githubToken === 'YOUR_GITHUB_TOKEN_HERE') {
    console.warn('⚠️ GitHub token not configured');
    return null;
  }
  
  try {
    const initialData = {
      teamName: CLOUD_CONFIG.teamName,
      logs: [],
      created: new Date().toISOString(),
      version: 1,
      members: members.map(m => m.name)
    };
    
    const gistData = {
      description: `FITTOBER Team Tracker - ${CLOUD_CONFIG.teamName}`,
      public: false, // Private gist
      files: {
        [CLOUD_CONFIG.fileName]: {
          content: JSON.stringify(initialData, null, 2)
        }
      }
    };
    
    const response = await fetch(CLOUD_CONFIG.apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `token ${CLOUD_CONFIG.githubToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json'
      },
      body: JSON.stringify(gistData)
    });
    
    if (response.ok) {
      const result = await response.json();
      const gistId = result.id;
      CLOUD_CONFIG.gistId = gistId;
      console.log('✅ GitHub Gist created:', gistId);
      console.log('💡 Gist URL:', result.html_url);
      return gistId;
    } else {
      const error = await response.json();
      console.error('❌ Failed to create gist:', error.message);
    }
  } catch (error) {
    console.warn('⚠️ Failed to create GitHub gist:', error.message);
  }
  return null;
}

async function syncToCloud(newLogData) {
  if (!CLOUD_CONFIG.enabled || !CLOUD_CONFIG.gistId) return false;
  
  try {
    // Get current cloud data
    const cloudData = await getCloudData();
    
    // Add new log
    cloudData.logs = cloudData.logs || [];
    cloudData.logs.unshift(newLogData);
    cloudData.lastUpdated = new Date().toISOString();
    cloudData.version = (cloudData.version || 0) + 1;
    
    // Save back to GitHub Gist
    const gistData = {
      files: {
        [CLOUD_CONFIG.fileName]: {
          content: JSON.stringify(cloudData, null, 2)
        }
      }
    };
    
    const response = await fetch(`${CLOUD_CONFIG.apiUrl}/${CLOUD_CONFIG.gistId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `token ${CLOUD_CONFIG.githubToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json'
      },
      body: JSON.stringify(gistData)
    });
    
    if (response.ok) {
      console.log('✅ Synced to cloud successfully');
      return true;
    }
  } catch (error) {
    console.warn('⚠️ Cloud sync failed:', error.message);
  }
  return false;
}

async function getCloudData() {
  if (!CLOUD_CONFIG.enabled || !CLOUD_CONFIG.gistId) return { logs: [] };
  
  try {
    const response = await fetch(`${CLOUD_CONFIG.apiUrl}/${CLOUD_CONFIG.gistId}`, {
      headers: {
        'Authorization': `token ${CLOUD_CONFIG.githubToken}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    
    if (response.ok) {
      const result = await response.json();
      const fileContent = result.files[CLOUD_CONFIG.fileName]?.content;
      if (fileContent) {
        return JSON.parse(fileContent);
      }
    }
  } catch (error) {
    console.warn('⚠️ Failed to get cloud data:', error.message);
  }
  return { logs: [] };
}

async function refreshUIFromCloud() {
  console.log('🔄 Refreshing UI from cloud...');
  try {
    // Update both UI sections from cloud
    await Promise.all([
      renderRecentLogs(),
      updateTotalTime()
    ]);
    console.log('✅ UI refreshed from cloud');
  } catch (error) {
    console.error('❌ Failed to refresh UI:', error.message);
  }
}

function buildPrefillURL(profile, activity, duration) {
  const params = new URLSearchParams();
  params.append(entryIDs.team, teamName);
  params.append(entryIDs.member, profile.name);
  params.append(entryIDs.cwid, profile.cwid);
  params.append(entryIDs.activity, activity);
  params.append(entryIDs.duration, duration);
  return `https://docs.google.com/forms/d/e/1FAIpQLSfhLBkLnU8xGQouW4lr_ALblEuij9aCkgYad5F87T06XBJUvg/viewform?pli=1&${params.toString()}`;
}

async function saveActivityToCloud(logData) {
  if (!CLOUD_CONFIG.enabled || !CLOUD_CONFIG.gistId) {
    console.error('❌ Cloud not initialized');
    return false;
  }
  
  try {
    // Get current cloud data
    const cloudData = await getCloudData();
    
    // Add new log to cloud
    cloudData.logs = cloudData.logs || [];
    cloudData.logs.unshift(logData);
    cloudData.lastUpdated = new Date().toISOString();
    cloudData.version = (cloudData.version || 0) + 1;
    
    // Save back to GitHub Gist
    const gistData = {
      files: {
        [CLOUD_CONFIG.fileName]: {
          content: JSON.stringify(cloudData, null, 2)
        }
      }
    };
    
    const response = await fetch(`${CLOUD_CONFIG.apiUrl}/${CLOUD_CONFIG.gistId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `token ${CLOUD_CONFIG.githubToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json'
      },
      body: JSON.stringify(gistData)
    });
    
    if (response.ok) {
      console.log('✅ Activity saved to GitHub Gist');
      // Refresh UI with latest cloud data
      await refreshUIFromCloud();
      return true;
    } else {
      const error = await response.json();
      console.error('❌ Failed to save to gist:', error.message);
      return false;
    }
  } catch (error) {
    console.error('❌ Cloud save error:', error.message);
    return false;
  }
}

async function renderRecentLogs() {
  const ul = document.getElementById('recentLog');
  ul.innerHTML = '<li>Loading recent activities...</li>';
  
  try {
    const cloudData = await getCloudData();
    const logs = cloudData.logs || [];
    
    ul.innerHTML = '';
    
    // Show last 10 logs
    const recentLogs = logs.slice(0, 10);
    
    if (recentLogs.length === 0) {
      ul.innerHTML = '<li>No activities logged yet</li>';
      return;
    }
    
    recentLogs.forEach(l => {
      const li = document.createElement('li');
      li.textContent = `${l.date} | ${l.member} | ${l.activity} (${l.duration} min)`;
      ul.appendChild(li);
    });
    
  } catch (error) {
    ul.innerHTML = '<li>Error loading activities</li>';
    console.error('Failed to load recent logs:', error);
  }
}

async function updateTotalTime() {
  const ul = document.getElementById('totalTimeList');
  ul.innerHTML = '<li>Calculating totals...</li>';
  
  try {
    const cloudData = await getCloudData();
    const logs = cloudData.logs || [];
    
    // Calculate totals from ALL cloud history
    const totals = {};
    members.forEach(m => { totals[m.name] = 0; });
    
    logs.forEach(l => {
      if (totals[l.member] !== undefined) {
        totals[l.member] += parseInt(l.duration) || 0;
      }
    });
    
    // Filter and sort (hide zero totals)
    const filtered = Object.entries(totals)
      .filter(([name, min]) => min > 0)
      .sort((a, b) => b[1] - a[1]);
    
    ul.innerHTML = '';
    
    if (filtered.length === 0) {
      ul.innerHTML = '<li>No activities recorded yet</li>';
      return;
    }
    
    filtered.forEach(([name, min]) => {
      const li = document.createElement('li');
      li.textContent = `${name}: ${min} min`;
      ul.appendChild(li);
    });
    
  } catch (error) {
    ul.innerHTML = '<li>Error calculating totals</li>';
    console.error('Failed to calculate totals:', error);
  }
}

// Populate member dropdown
const memberSelect = document.getElementById('member');
members.forEach((m, i) => {
  const opt = document.createElement('option');
  opt.value = i;
  opt.textContent = m.name;
  memberSelect.appendChild(opt);
});
// Default to first member
memberSelect.value = 0;

// Quick add buttons
const quickDurations = [15, 30, 45, 60, 75, 90];
const quickBtnsDiv = document.getElementById('quickBtns');
quickDurations.forEach(val => {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'quick-btn';
  btn.textContent = `${val} min`;
  btn.onclick = () => {
    updateDurationDisplay(val);
  };
  quickBtnsDiv.appendChild(btn);
});

// Counter functionality
let currentDuration = 30;

function updateDurationDisplay(value) {
  currentDuration = Math.max(15, Math.min(600, value));
  document.getElementById('durationDisplay').textContent = currentDuration;
  document.getElementById('duration').value = currentDuration;
  
  // Update quick button selection
  document.querySelectorAll('.quick-btn').forEach(btn => {
    btn.classList.remove('selected');
    if (btn.textContent === `${currentDuration} min`) {
      btn.classList.add('selected');
    }
  });
}

// Initialize counter functionality after DOM is ready
function initializeCounters() {
  // Counter button event listeners
  const incrementBtn = document.getElementById('incrementBtn');
  const decrementBtn = document.getElementById('decrementBtn');
  
  if (incrementBtn && decrementBtn) {
    incrementBtn.addEventListener('click', () => {
      updateDurationDisplay(currentDuration + 15);
    });

    decrementBtn.addEventListener('click', () => {
      updateDurationDisplay(currentDuration - 15);
    });
  }
}

document.getElementById('activityForm').onsubmit = async function(e) {
  e.preventDefault();
  const idx = memberSelect.value;
  const profile = members[idx];
  let activity = document.getElementById('activity').value;
  const duration = currentDuration;
  
  // Handle custom activity
  if (activity === 'Other') {
    const customActivity = document.getElementById('customActivity').value.trim();
    if (!customActivity) {
      alert('Please enter your custom activity');
      return;
    }
    activity = customActivity;
  }
  
  if (!activity || !duration) return;

  // Create comprehensive log data for cloud
  const now = new Date();
  const logData = {
    id: Date.now() + Math.random(), // Unique ID
    timestamp: now.toISOString(), // Full ISO timestamp
    date: now.toLocaleDateString('en-GB', { year:'numeric', month:'short', day:'2-digit' }),
    time: now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
    member: profile.name,
    memberIndex: idx,
    cwid: profile.cwid,
    activity,
    duration: parseInt(duration),
    teamName,
    formUrl: buildPrefillURL(profile, activity, duration),
    sessionInfo: {
      userAgent: navigator.userAgent.split(' ').pop(),
      platform: navigator.platform,
      language: navigator.language
    }
  };
  
  // Show loading state
  const submitBtn = document.querySelector('.button');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Saving...';
  submitBtn.disabled = true;
  
  // Save to cloud only
  const saved = await saveActivityToCloud(logData);
  
  // Reset button state  
  submitBtn.textContent = originalText;
  submitBtn.disabled = false;
  
  if (!saved) {
    alert('Failed to save activity. Please try again.');
    return;
  }

  // Open pre-filled form
  const url = buildPrefillURL(profile, activity, duration);
  window.open(url, '_blank');
};

// Initialize cloud-only system
if (CLOUD_CONFIG.enabled) {
  initializeCloudSync().then(() => {
    console.log('🌟 Cloud initialized - Loading team data...');
    // Load initial UI from cloud
    refreshUIFromCloud();
  }).catch(err => {
    console.error('❌ Cloud initialization failed:', err.message);
    // Show error state
    document.getElementById('recentLog').innerHTML = '<li>Failed to connect to team data</li>';
    document.getElementById('totalTimeList').innerHTML = '<li>Failed to load team totals</li>';
  });
  
  // Periodic refresh every 1 minute for real-time updates
  setInterval(refreshUIFromCloud, 1 * 60 * 1000);
} else {
  // Fallback if cloud is disabled
  document.getElementById('recentLog').innerHTML = '<li>Cloud sync disabled</li>';
  document.getElementById('totalTimeList').innerHTML = '<li>Cloud sync disabled</li>';
}

// Initialize duration display and counters after everything is set up
updateDurationDisplay(30);
initializeCounters();

// Handle "Other" activity selection
document.getElementById('activity').addEventListener('change', function() {
  const customField = document.getElementById('customActivityField');
  const customInput = document.getElementById('customActivity');
  
  if (this.value === 'Other') {
    customField.style.display = 'block';
    customInput.required = true;
    customInput.focus();
  } else {
    customField.style.display = 'none';
    customInput.required = false;
    customInput.value = '';
  }
});