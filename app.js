const members = [
  { name: 'Mukesh Ravichandran', cwid: '50380788' },
  { name: 'Trisha Harjono', cwid: '50386141' },
  { name: 'Jaahnavi Garikipati', cwid: '50393610' },
  { name: 'Tejaswini Damodara Kannan', cwid: '50380778' },
];
const teamName = "The Excel-erators";

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

function buildPrefillURL(profile, activity, duration) {
  const params = new URLSearchParams();
  params.append(entryIDs.team, teamName);
  params.append(entryIDs.member, profile.name);
  params.append(entryIDs.cwid, profile.cwid);
  params.append(entryIDs.activity, activity);
  params.append(entryIDs.duration, duration);
  return `https://docs.google.com/forms/d/e/1FAIpQLSfhLBkLnU8xGQouW4lr_ALblEuij9aCkgYad5F87T06XBJUvg/viewform?pli=1&${params.toString()}`;
}

function saveRecentLog(log) {
  let logs = JSON.parse(localStorage.getItem('fitober_logs') || '[]');
  logs.unshift(log);
  logs = logs.slice(0, 10);
  localStorage.setItem('fitober_logs', JSON.stringify(logs));
  renderRecentLogs();
  updateTotalTime();
}

function renderRecentLogs() {
  const logs = JSON.parse(localStorage.getItem('fitober_logs') || '[]');
  const ul = document.getElementById('recentLog');
  ul.innerHTML = '';
  logs.forEach(l => {
    const li = document.createElement('li');
    li.textContent = `${l.date} | ${l.member} | ${l.activity} (${l.duration} min)`;
    ul.appendChild(li);
  });
}

function updateTotalTime() {
  const logs = JSON.parse(localStorage.getItem('fitober_logs') || '[]');
  const totals = {};
  members.forEach(m => { totals[m.name] = 0; });
  logs.forEach(l => {
    if (totals[l.member] !== undefined) {
      totals[l.member] += parseInt(l.duration) || 0;
    }
  });
  const filtered = Object.entries(totals)
    .filter(([name, min]) => min > 0)
    .sort((a, b) => b[1] - a[1]);
  const ul = document.getElementById('totalTimeList');
  ul.innerHTML = '';
  filtered.forEach(([name, min]) => {
    const li = document.createElement('li');
    li.textContent = `${name}: ${min} min`;
    ul.appendChild(li);
  });
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

document.getElementById('activityForm').onsubmit = function(e) {
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

  // Log locally
  const date = new Date().toLocaleDateString('en-GB', { year:'numeric', month:'short', day:'2-digit' });
  saveRecentLog({
    date,
    member: profile.name,
    activity,
    duration
  });

  // Open pre-filled form
  const url = buildPrefillURL(profile, activity, duration);
  window.open(url, '_blank');
};

renderRecentLogs();
updateTotalTime();

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