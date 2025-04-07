/**
 * This file contains code to generate a notification sound using the Web Audio API.
 * Since we can't directly create an MP3 file, you can use this code to generate
 * a notification sound in your application.
 */

function createNotificationSound() {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  
  // Create oscillator
  const oscillator = audioContext.createOscillator();
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(587.33, audioContext.currentTime); // D5
  
  // Create gain node for volume control
  const gainNode = audioContext.createGain();
  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.1);
  gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.5);
  
  // Connect nodes
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  // Start and stop
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.5);
  
  // Play a second tone after a short delay
  setTimeout(() => {
    const oscillator2 = audioContext.createOscillator();
    oscillator2.type = 'sine';
    oscillator2.frequency.setValueAtTime(880, audioContext.currentTime); // A5
    
    const gainNode2 = audioContext.createGain();
    gainNode2.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode2.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.1);
    gainNode2.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.5);
    
    oscillator2.connect(gainNode2);
    gainNode2.connect(audioContext.destination);
    
    oscillator2.start();
    oscillator2.stop(audioContext.currentTime + 0.5);
  }, 300);
}

// To use this in your application:
// 1. Import this file
// 2. Call createNotificationSound() when the timer ends

module.exports = { createNotificationSound }; 