const playBtn = document.querySelector('.playBtn');
let sec = 10;
const controller = document.querySelector('.fa-solid ');

playBtn.addEventListener('click', () => {
  controller.classList.toggle('fa-stop');
  controller.classList.toggle('fa-play');

  const myTimer = setInterval(myCallback, 1000);
  function myCallback() {
    let sec2 = sec.toString().padStart(2, '0');
    document.querySelector('.timer').innerHTML = `00:${sec2}`;
    sec--;
    if (sec < 0) {
      clearInterval(myTimer);
      document.querySelector('.timer').innerHTML = '00:00';
      sec = 10;
      controller.classList.remove('fa-stop');
      controller.classList.add('fa-play');
    } else if (controller.classList.contains('fa-play')) {
      clearInterval(myTimer);
      document.querySelector('.timer').innerHTML = '00:00';
      sec = 10;
    }
  }
});
