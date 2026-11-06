(() => {
  const audio = document.getElementById('reunion-music');
  const status = document.getElementById('music-status');
  let started = false;
  const gestures = ['pointerdown', 'click', 'keydown'];
  const removeFallback = () => gestures.forEach(type => document.removeEventListener(type, onGesture, true));
  const start = () => {
    if (started || !audio.paused) return;
    audio.play().catch(() => {
      if (!started) status.textContent = 'Lovely Kids・輕觸頁面，即可開始播放音樂。';
    });
  };
  function onGesture(event) {
    if (audio.contains(event.target)) return;
    if (event.type === 'keydown' && !['Enter', ' '].includes(event.key)) return;
    start();
  }
  audio.addEventListener('playing', () => {
    started = true;
    removeFallback();
    status.textContent = 'Lovely Kids・讓音樂陪我們重逢。';
  });
  audio.addEventListener('pause', () => {
    status.textContent = 'Lovely Kids・音樂已暫停。';
  });
  audio.addEventListener('error', () => {
    removeFallback();
    status.textContent = 'Lovely Kids・音樂暫時無法載入，請稍後重新整理。';
  });
  gestures.forEach(type => document.addEventListener(type, onGesture, true));
  start();
})();
