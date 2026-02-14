/* =====================================
   Valentine Week 2026 - Full app.js
   ===================================== */

/* ========= SETTINGS ========= */

const SETTINGS = {
  herName: "Anitha",      // Change if needed
  yourName: "Fayaz",      // Change if needed
  volume: 0.4             // Default music volume
};

/* ========= APPLY NAMES & DATE ========= */

(function applyNamesAndDate(){

  document.querySelectorAll("#herName")
    .forEach(el => el.textContent = SETTINGS.herName);

  document.querySelectorAll("#yourName")
    .forEach(el => el.textContent = SETTINGS.yourName);

  const todayEl = document.getElementById("today");
  if (todayEl) {
    const d = new Date();
    todayEl.textContent = d.toDateString();
  }

})();

/* ========= FLOATING HEARTS ========= */

(function heartsCanvas(){

  const canvas = document.getElementById("hearts");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let w, h;

  function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener("resize", resize);

  const hearts = [];

  function createHeart(){
    hearts.push({
      x: Math.random() * w,
      y: h + 30,
      size: 12 + Math.random() * 18,
      speed: 0.6 + Math.random(),
      alpha: 0.4 + Math.random() * 0.6
    });
  }

  function drawHeart(x, y, size, alpha){
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(x, y);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-size, -size, -size*2, size/2, 0, size*2);
    ctx.bezierCurveTo(size*2, size/2, size, -size, 0, 0);
    ctx.fillStyle = "#ff4d6d";
    ctx.fill();

    ctx.restore();
  }

  function animate(){
    ctx.clearRect(0, 0, w, h);

    if (Math.random() < 0.5) createHeart();

    for (let i = hearts.length - 1; i >= 0; i--){
      const hrt = hearts[i];
      hrt.y -= hrt.speed;
      drawHeart(hrt.x, hrt.y, hrt.size, hrt.alpha);

      if (hrt.y < -60) hearts.splice(i, 1);
    }

    requestAnimationFrame(animate);
  }

  animate();

})();

/* ========= BACKGROUND MUSIC ========= */

(function backgroundMusic(){

  const page = window.location.pathname.split("/").pop();
  if (page === "songs.html") return;

  const pageMusic = {

    // Memories
    "memories.html": "./SONGS/kadhaipoma-reprise.mp3",

    // Valentine week days
    "rose.html": "./SONGS/First-Sight.mp3",
    "propose.html": "./SONGS/The-Love-Bug-Has-Bitten.mp3",
    "chocolate.html": "./SONGS/The-Bus-Diaries.mp3",
    "teddy.html": "./SONGS/Unexpected-Sleepover.mp3",
    "promise.html": "./SONGS/At-the-Saree-Store.mp3",
    "hug.html": "./SONGS/Anu-Leaves-Church-(Background-Score)-MassTamilan.io.mp3",
    "kiss.html": "./SONGS/Arjun-Wins-Anu-in-the-Court-(Background-Score)-MassTamilan.io.mp3",
    "valentine.html": "./SONGS/kadhaipoma-reprise.mp3",

    // Other pages
    "index.html": "./SONGS/Shades_Of_Kadhal.mp3",
    "question.html": "./SONGS/Shades_Of_Kadhal.mp3"
  };

  const src = pageMusic[page] 
  if (!src) return;

  const audio = document.createElement("audio");
  audio.src = src;
  audio.loop = true;
  audio.volume = SETTINGS.volume;
  audio.autoplay = true;

  document.body.appendChild(audio);

  // Try autoplay immediately
  audio.play().catch(() => {
    // If browser blocks autoplay, play on first interaction
    document.addEventListener("click", () => {
      audio.play();
    }, { once: true });
  });

})();
