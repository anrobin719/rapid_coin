const blockChainImg = document.querySelectorAll(".blockChain__img > img"),
  blockChainTitle = document.querySelectorAll(".blockChain__contents > h4"),
  blockChainDate = document.querySelectorAll(".blockChain__contents > span");
const icoImg = document.querySelectorAll(".ico__img > img"),
  icoTitle = document.querySelectorAll(".ico__contents > h4"),
  icoDate = document.querySelectorAll(".ico__contents > span");
const modalBox = document.querySelector(".modalBox");
const SHOW_MODAL_CN = "show";

document.cookie = "same-site-cookie=foo; SameSite=Lax";
document.cookie = "cross-site-cookie=bar; SameSite=None; Secure";

let blockChain = null,
  ico = null;

// PRINT ARTICLE IN MODAL
function printArticle(modal, article) {
  function setInnerText(el, text) {
    modal.querySelector(el).innerText = text;
  }
  setInnerText(".modal__title", article.title);
  setInnerText(".modal__title", article.title);
  setInnerText(".modal__sub--tag", article.primaryCategory);
  setInnerText(".modal__sub--date", moment(article.publishedAt).format("lll"));
  setInnerText(".modal__contents", article.description);

  function setAttrs(el, attrs) {
    for (let key in attrs) {
      modal.querySelector(el).setAttribute(key, attrs[key]);
    }
  }
  setAttrs(".modal__img > img", { src: article.originalImageUrl });
  setAttrs(".modal__button > a", {
    href: article.url,
    target: "_blank"
  });
}

// SHOW MODAL
function showModal(article) {
  modalBox.classList.add(SHOW_MODAL_CN);
  document.body.classList.add("noScroll");

  const modal = modalBox.querySelector(".modal");
  modal.addEventListener("click", e => handlePropagation(e));
  modalBox.addEventListener("click", () => hideModal(modal));
  modal.classList.add(SHOW_MODAL_CN);

  printArticle(modal, article);
}

function handlePropagation(e) {
  e.stopPropagation();
}

// HIDE MODAL
function hideModal(modal) {
  modalBox.classList.remove("show");
  modal.classList.remove("show");
  document.body.classList.remove("noScroll");
}

// GET BLOCK CHAIN NEWS & ICO NEWS
function getNews() {
  fetch(
    `https://cryptocontrol.io/api/v1/public/news/category?key=2541ad9bc9e4abc9dc1685f7b4aee8cc`,
    {
      method: "GET"
    }
  )
    .then(res => {
      return res.json();
    })
    .then(json => {
      const blockChain = json.blockchain.slice(0, 3);
      const ico = json.ico.slice(0, 3);

      function printArray(news) {
        // PRINT BLOCK CHAIN NEWS TO DOM
        if (news === blockChain) {
          for (let i = 0; i < blockChain.length; i++) {
            blockChainImg[i].setAttribute(
              "src",
              blockChain[i].originalImageUrl
            );
            blockChainTitle[i].innerText = blockChain[i].title;
            blockChainDate[i].innerText = moment(
              blockChain[i].publishedAt
            ).format("lll");

            const parentArticle =
              blockChainTitle[i].parentElement.parentElement;
            // SET CLICK EVENT LISTENER : PASS THE ARTICLE
            parentArticle.addEventListener("click", () =>
              showModal(blockChain[i])
            );
          }
        }
        // PRINT ICO NEWS TO DOM
        else {
          for (let i = 0; i < ico.length; i++) {
            icoImg[i].setAttribute("src", ico[i].originalImageUrl);
            icoTitle[i].innerText = ico[i].title;
            icoDate[i].innerText = moment(ico[i].publishedAt).format("lll");

            const parentArticle = icoTitle[i].parentElement.parentElement;
            // SET CLICK EVENT LISTENER : PASS THE ARTICLE
            parentArticle.addEventListener("click", () => showModal(ico[i]));
          }
        }
      }

      printArray(blockChain);
      printArray(ico);
    });
}

function init() {
  // GET BLOCK CHAIN NEWS & ICO NEWS
  getNews();
}

init();
