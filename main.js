/* global */
const playBtn = document.querySelector('.playBtn');
const controller = document.querySelector('.fa-solid ');
const timer = document.querySelector('.timer');
const message = document.querySelector('.message');
const counter = document.querySelector('.counter');
let myTimer;
let sec = 7;
let remain = 10;

/* BGM🎵 */
mainBgm = new Audio('sound/bg.mp3');
vicBgm = new Audio('sound/game_win.mp3');
loseBgm = new Audio('sound/alert.wav');
carrotPull = new Audio('sound/carrot_pull.mp3');
bugPull = new Audio('sound/bug_pull.mp3');

/* make a field */
const field = document.querySelector('.field');
const carrots = document.querySelectorAll('.carrot');
const bugs = document.querySelectorAll('.bug');

function makeField(item1, item2) {
  field.classList.toggle('visible');
  arrangeItems(item1);
  arrangeItems(item2);
}

function arrangeItems(items) {
  items.forEach((item) => {
    let x = Math.floor(Math.random() * field.offsetWidth);
    let y = Math.floor((Math.random() * field.offsetHeight) / 1.5);
    item.style.transform = `translate(${x}px, ${y}px)`;
  });
}

function uncheckItem(items) {
  items.forEach((item) => {
    item.classList.remove('invisible');
  });
}

/* click the play button */
playBtn.addEventListener('click', () => {
  controller.classList.toggle('fa-stop');
  controller.classList.toggle('fa-play');
  message.classList.add('invisible');
  message.style.zIndex = 'auto';
  makeField(bugs, carrots);
  counter.innerHTML = 10;
  myTimer = setInterval(myCallback, 1000);
  timer.style.color = 'black';
  mainBgm.play();
  mainBgm.loop = true;
});

/* timer */
function myCallback() {
  let sec2 = sec.toString().padStart(2, '0');
  timer.innerHTML = `00:${sec2}`;
  sec--;
  if (sec < 0) {
    endGame('You Lose 😂');
    timer.style.color = 'red';
    loseBgm.play();
  } else if (controller.classList.contains('fa-play')) {
    clearInterval(myTimer);
    sec = 7;
    timer.innerHTML = '00:00';
    uncheckItem(carrots);
    remain = 10;
  }
}

/* click the carrots */
for (const carrot of carrots) {
  carrot.addEventListener('click', () => {
    carrot.classList.add('invisible');
    carrotPull.play();
    remain--;
    counter.innerHTML = remain;
    if (remain <= 0) {
      endGame('You Win 😎🎉');
      vicBgm.play();
    }
  });
}

/* click the bugs */
const bugsAll = document.querySelector('.bugs');
bugsAll.addEventListener('click', () => {
  endGame('You Lose 😂');
  bugPull.play();
});

function endGame(txt) {
  clearInterval(myTimer);
  sec = 7;
  timer.innerHTML = '00:00';
  controller.classList.remove('fa-stop');
  controller.classList.add('fa-play');
  field.classList.remove('visible');
  message.classList.remove('invisible');
  message.innerHTML = txt;
  message.style.zIndex = '2';
  uncheckItem(carrots);
  remain = 10;
}
