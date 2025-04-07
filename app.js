// Common JavaScript functionality for all pages
const { ipcRenderer } = require('electron');

// Navigation function
function navigateTo(destination) {
  ipcRenderer.send('navigate', destination);
}

// Create back to home button for all pages except welcome
function createBackButton() {
  if (window.location.pathname !== '/welcome.html') {
    const backButton = document.createElement('button');
    backButton.className = 'nav-btn';
    backButton.innerText = 'Back';
    backButton.addEventListener('click', () => navigateTo('welcome'));
    document.body.appendChild(backButton);
  }
}

// Create stars background animation
function createStars() {
  const starsContainer = document.createElement('div');
  starsContainer.className = 'stars';
  
  const starCount = 50;
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 2}s`;
    starsContainer.appendChild(star);
  }
  
  document.body.appendChild(starsContainer);
}

// Initialize common elements when DOM loads
document.addEventListener('DOMContentLoaded', () => {
  createBackButton();
  createStars();
}); 