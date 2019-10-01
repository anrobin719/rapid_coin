const openBtn = document.querySelector("#openBtn");
const closeBtn = document.querySelector("#closeBtn");
const sideDrawer = document.querySelector("aside");
const firstPage = document.querySelector("#firstPage");

function handleOpenSideDrawer() {
  const COIN_NAME = localStorage.getItem("coinName");
  if (COIN_NAME) {
    window.scrollTo(0, 0);
    sideDrawer.classList.add("asideShow");
    firstPage.style.width = "calc(100% - 20rem)";
  }
}

function handleCloseSideDrawer() {
  sideDrawer.classList.remove("asideShow");
  firstPage.style.width = "100vw";
}

function init() {
  sideDrawer.style.transition = "all .3s linear";
  firstPage.style.transition = "width .3s linear";
  openBtn.addEventListener("click", handleOpenSideDrawer);
  closeBtn.addEventListener("click", handleCloseSideDrawer);
  window.addEventListener("scroll", e => {
    if (window.scrollY !== 0) {
      handleCloseSideDrawer();
    }
  });
}

init();
