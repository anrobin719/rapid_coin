(function() {
  const clock = document.querySelector(".info-section__clock");

  function getTime() {
    const date = new Date();
    const hours = date.getHours();
    const minuites = date.getMinutes();
    const seconds = date.getSeconds();

    clock.innerText = `${hours < 10 ? `0${hours}` : hours}:${
      minuites < 10 ? `0${minuites}` : minuites
    }:${seconds < 10 ? `0${seconds}` : seconds}`;
  }

  function initClock() {
    getTime();
    setInterval(getTime, 1000);
  }

  initClock();
})();
