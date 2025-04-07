// Common JavaScript functionality for all pages
const { ipcRenderer } = require('electron');

// Navigation function with transition effect
function navigateTo(destination) {
  // Create pixel dust animation
  createPixelDustAnimation();
  
  // Add exit animation class
  document.body.classList.add('page-transition-exit');
  
  // Navigate after animation completes
  setTimeout(() => {
    ipcRenderer.send('navigate', destination);
  }, 500);
}

// Create back button for all pages except welcome
function createBackButton() {
  const pagePath = window.location.pathname.toLowerCase();
  if (!pagePath.includes('welcome.html')) {
    const backButton = document.createElement('button');
    backButton.className = 'back-btn pixel-btn pink-btn';
    backButton.innerHTML = '&larr; BACK';
    backButton.addEventListener('click', () => navigateTo('welcome'));
    backButton.style.position = 'fixed';
    backButton.style.top = '10px';
    backButton.style.left = '10px';
    backButton.style.zIndex = '1000';
    document.body.insertBefore(backButton, document.body.firstChild);
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

// Create pixel dust animation for transitions
function createPixelDustAnimation() {
  const dustContainer = document.createElement('div');
  dustContainer.className = 'pixel-dust';
  
  const pixelCount = 100;
  for (let i = 0; i < pixelCount; i++) {
    const pixel = document.createElement('div');
    pixel.className = 'pixel';
    
    // Random position
    pixel.style.top = `${Math.random() * 100}%`;
    pixel.style.left = `${Math.random() * 100}%`;
    
    // Random color (pastel colors)
    const hue = Math.floor(Math.random() * 360);
    const saturation = 70 + Math.floor(Math.random() * 30);
    const lightness = 70 + Math.floor(Math.random() * 20);
    pixel.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    
    // Random movement
    pixel.style.setProperty('--translateX', `${(Math.random() - 0.5) * 200}px`);
    pixel.style.setProperty('--translateY', `${(Math.random() - 0.5) * 200}px`);
    pixel.style.setProperty('--rotate', `${Math.random() * 360}deg`);
    
    // Random size
    const size = 2 + Math.random() * 4;
    pixel.style.width = `${size}px`;
    pixel.style.height = `${size}px`;
    
    // Random delay
    pixel.style.animationDelay = `${Math.random() * 0.2}s`;
    
    dustContainer.appendChild(pixel);
  }
  
  document.body.appendChild(dustContainer);
  
  // Remove after animation completes
  setTimeout(() => {
    document.body.removeChild(dustContainer);
  }, 2000);
}

// Initialize common elements when DOM loads
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    createBackButton();
  }, 100);
  createStars();
  
  // Add entrance animation class
  document.body.classList.add('page-transition-enter');
  
  // Remove class after animation completes
  setTimeout(() => {
    document.body.classList.remove('page-transition-enter');
  }, 500);
}); 