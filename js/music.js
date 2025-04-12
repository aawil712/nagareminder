// DOM elements
const nowPlaying = document.getElementById('now-playing');
const progressContainer = document.getElementById('progress-container');
const progressBar = document.getElementById('progress-bar');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const volumeSlider = document.getElementById('volume-slider');
const currentTimeEl = document.querySelector('.current-time');
const totalTimeEl = document.querySelector('.total-time');
const albumCover = document.getElementById('album-cover');
const songDots = document.querySelectorAll('.song-dot');

// Audio element
const audio = new Audio('../assets/Besideyou.mp3');
let isPlaying = false;
let currentSongIndex = 0;

// Format time in MM:SS
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Update time displays
function updateTimeDisplay() {
  currentTimeEl.textContent = formatTime(audio.currentTime);
  totalTimeEl.textContent = formatTime(audio.duration || 0);
}

// Play selected song
function playSong(index) {
  const songDot = songDots[index];
  
  // Update active dot
  songDots.forEach(dot => dot.classList.remove('active'));
  songDot.classList.add('active');
  
  // Update audio source
  audio.src = `../assets/${songDot.dataset.song}`;
  
  // Update album cover
  albumCover.src = `../assets/${songDot.dataset.cover}`;
  
  // Update now playing text
  nowPlaying.textContent = songDot.dataset.title;
  
  // Reset play button and start playing
  playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  audio.play();
  isPlaying = true;
  currentSongIndex = index;
}

// Toggle play/pause
function togglePlay() {
  if (isPlaying) {
    audio.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  } else {
    audio.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  }
  isPlaying = !isPlaying;
}

// Play next song
function playNext() {
  const nextIndex = (currentSongIndex + 1) % songDots.length;
  playSong(nextIndex);
}

// Play previous song
function playPrevious() {
  const prevIndex = (currentSongIndex - 1 + songDots.length) % songDots.length;
  playSong(prevIndex);
}

// Update progress bar
function updateProgress() {
  if (audio.duration) {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
    updateTimeDisplay();
  }
}

// Set progress bar position
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

// Set volume
function setVolume() {
  audio.volume = volumeSlider.value;
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  playBtn.addEventListener('click', togglePlay);
  prevBtn.addEventListener('click', playPrevious);
  nextBtn.addEventListener('click', playNext);
  progressContainer.addEventListener('click', setProgress);
  volumeSlider.addEventListener('input', setVolume);
  
  // Song dot event listeners
  songDots.forEach((dot, index) => {
    dot.addEventListener('click', () => playSong(index));
  });
  
  // Audio event listeners
  audio.addEventListener('timeupdate', updateProgress);
  audio.addEventListener('loadedmetadata', updateTimeDisplay);
  audio.addEventListener('ended', playNext);
}); 