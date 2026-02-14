const VALENTINE_DATE = "2026-02-14";

const WEEK = [
  {file:"rose.html", day:"Rose Day 🌹", date:"2026-02-07"},
  {file:"propose.html", day:"Propose Day 💍", date:"2026-02-08"},
  {file:"chocolate.html", day:"Chocolate Day 🍫", date:"2026-02-09"},
  {file:"teddy.html", day:"Teddy Day 🧸", date:"2026-02-10"},
  {file:"promise.html", day:"Promise Day 🤞", date:"2026-02-11"},
  {file:"hug.html", day:"Hug Day 🤗", date:"2026-02-12"},
  {file:"kiss.html", day:"Kiss Day 😘", date:"2026-02-13"},
  {file:"valentine.html", day:"Valentine’s Day 💖", date:"2026-02-14"}
];

function today(){
  return new Date().toISOString().split("T")[0];
}

function unlocked(date){
  return today() >= date;
}

window.addEventListener("DOMContentLoaded", ()=>{
  const grid=document.getElementById("daysGrid");
  if(grid){
    grid.innerHTML=WEEK.map(d=>{
      const open=unlocked(d.date);
      return `
        <a class="dayCard ${open?"":"locked"}"
           href="${open?d.file:"#"}">
          ${d.day}<br>
          <small>${d.date}</small>
        </a>
      `;
    }).join("");
  }

  const countdown=document.getElementById("countdown");
  if(countdown){
    const diff=(new Date(VALENTINE_DATE)-new Date())/(1000*60*60*24);
    countdown.textContent="Days until Valentine: "+Math.ceil(diff);
  }
});
