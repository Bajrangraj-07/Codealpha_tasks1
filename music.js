const songs = [
  {
    title: "Sample Song 1",
    artist: "Artist One",
    src: "songs/song1.mp3"
  },
  {
    title: "Sample Song 2",
    artist: "Artist Two",
    src: "songs/song2.mp3"
  },
  {
    title: "Sample Song 3",
    artist: "Artist Three",
    src: "songs/song3.mp3"
  }
];

let currentSong = 0;
const audio = document.getElementById('audio');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const playPauseBtn = document.getElementById('playPause');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const playlist = document.getElementById('playlist');
cons songs =[
  {
    title :"Bedardi se pyar ka",
      artist:"jubin nautiyal",
src:"Bedardi Se Pyaar Ka Song_Jubin N_Meet B_Manoj M_Gurmeet C_Sherine S_Kaashish V _ Ashish P_ Bhushan K(MP3_160K).mp3"
}
];
function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;
  highlightPlaylist();
}

function togglePlay() {
  if (audio.paused) {
    audio.play();
    playPauseBtn.textContent = '⏸';
  } else {
    audio.pause();
    playPauseBtn.textContent = '▶️';
  }
}

function nextSong() {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(songs[currentSong]);
  audio.play();
  playPauseBtn.textContent = '⏸';
}

function prevSong() {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(songs[currentSong]);
  audio.play();
  playPauseBtn.textContent = '⏸';
}

audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', nextSong); // autoplay
audio.addEventListener('loadedmetadata', () => {
  durationEl.textContent = formatTime(audio.duration);
});

function updateProgress() {
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = `${progressPercent}%`;
  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration);
}

function setProgress(e) {
  const width = e.currentTarget.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

function formatTime(sec) {
  const minutes = Math.floor(sec / 60);
  const seconds = Math.floor(sec % 60);
  return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

function changeVolume(value) {
  audio.volume = value;
}

// Playlist creation
songs.forEach((song, index) => {
  const li = document.createElement('li');
  li.textContent = `${song.title} - ${song.artist}`;
  li.onclick = () => {
    currentSong = index;
    loadSong(song);
    audio.play();
    playPauseBtn.textContent = '⏸';
  };
  playlist.appendChild(li);
});

function highlightPlaylist() {
  const items = playlist.querySelectorAll('li');
  items.forEach((item, index) => {
    item.classList.toggle('active', index === currentSong);
  });
}

// Initial load
loadSong(songs[currentSong]);
