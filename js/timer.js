// DOM elements
const timerDisplay = document.getElementById('timer-display');
const pomodoroBtn = document.getElementById('pomodoro-btn');
const shortBreakBtn = document.getElementById('short-break-btn');
const longBreakBtn = document.getElementById('long-break-btn');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');

// Timer variables
let timer;
let timeLeft;
let isRunning = false;
let currentMode = 'pomodoro';

// Get settings from storage
const settings = window.electronAPI.getTimerSettings();

// Mode durations in minutes
const modes = {
  pomodoro: settings.pomodoro,
  shortBreak: settings.shortBreak,
  longBreak: settings.longBreak
};

// Initialize timer
function initTimer(mode) {
  clearInterval(timer);
  currentMode = mode;
  timeLeft = modes[mode] * 60;
  updateDisplay();
  
  // Update active button
  document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById(`${mode}-btn`).classList.add('active');
  
  // Reset controls
  isRunning = false;
  startBtn.disabled = false;
  pauseBtn.disabled = true;
}

// Update timer display
function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const seconds = (timeLeft % 60).toString().padStart(2, '0');
  timerDisplay.textContent = `${minutes}:${seconds}`;
  
  // Update document title
  document.title = `${minutes}:${seconds} - NagaReminder`;
}

// Start timer
function startTimer() {
  if (isRunning) return;
  
  isRunning = true;
  startBtn.disabled = true;
  pauseBtn.disabled = false;
  
  // Add active animation class to timer display
  timerDisplay.classList.add('timer-active');
  
  timer = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timer);
      // Play notification sound using Web Audio API
      document.getElementById('alarm-sound').play();

      
      // Remove active animation class
      timerDisplay.classList.remove('timer-active');
      
      // Reset controls
      isRunning = false;
      startBtn.disabled = false;
      pauseBtn.disabled = true;
      
      // Auto-start next timer if enabled
      if (currentMode === 'pomodoro' && settings.autoStartBreaks) {
        initTimer('shortBreak');
        startTimer();
      } else if (currentMode === 'shortBreak' && settings.autoStartPomodoros) {
        initTimer('pomodoro');
        startTimer();
      }
    } else {
      timeLeft--;
      updateDisplay();
    }
  }, 1000);
}

// Pause timer
function pauseTimer() {
  if (!isRunning) return;
  
  clearInterval(timer);
  isRunning = false;
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  
  // Remove active animation class
  timerDisplay.classList.remove('timer-active');
}

// Reset timer
function resetTimer() {
  clearInterval(timer);
  initTimer(currentMode);
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  pomodoroBtn.addEventListener('click', () => initTimer('pomodoro'));
  shortBreakBtn.addEventListener('click', () => initTimer('shortBreak'));
  longBreakBtn.addEventListener('click', () => initTimer('longBreak'));
  startBtn.addEventListener('click', startTimer);
  pauseBtn.addEventListener('click', pauseTimer);
  resetBtn.addEventListener('click', resetTimer);
  
  // Initialize timer
  initTimer('pomodoro');
}); 