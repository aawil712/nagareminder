// DOM elements
const settingsForm = document.getElementById('settings-form');
const pomodoroInput = document.getElementById('pomodoro');
const shortBreakInput = document.getElementById('short-break');
const longBreakInput = document.getElementById('long-break');
const autoStartBreaksCheck = document.getElementById('auto-start-breaks');
const autoStartPomodorosCheck = document.getElementById('auto-start-pomodoros');

// Load settings from storage
const settings = window.electronAPI.getTimerSettings();

// Set form values from settings
pomodoroInput.value = settings.pomodoro;
shortBreakInput.value = settings.shortBreak;
longBreakInput.value = settings.longBreak;
autoStartBreaksCheck.checked = settings.autoStartBreaks;
autoStartPomodorosCheck.checked = settings.autoStartPomodoros;

// Save settings
settingsForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const newSettings = {
    pomodoro: parseInt(pomodoroInput.value, 10),
    shortBreak: parseInt(shortBreakInput.value, 10),
    longBreak: parseInt(longBreakInput.value, 10),
    autoStartBreaks: autoStartBreaksCheck.checked,
    autoStartPomodoros: autoStartPomodorosCheck.checked
  };
  
  window.electronAPI.saveTimerSettings(newSettings);
  
  // Show confirmation (could be improved with a proper toast notification)
  alert('Settings saved!');
}); 