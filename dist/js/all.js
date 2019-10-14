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

(function() {
  const defaultMessage = document.querySelector(".default-message"),
    form = document.querySelector(".info-section__coin-list-form"),
    input = form.querySelector("input"),
    coinTitle = document.querySelector(".info-section__coinTitle"),
    goToMarketBtn = document.querySelector(".info-section__exchange-button"),
    infoListBox = document.querySelector(".graph-section__info-list-box"),
    marketAnchor = goToMarketBtn.querySelector(
      ".info-section__exchange-button > a"
    ),
    BarCurrentPrice = document.querySelector(".progressbar__current-price"),
    BarCurrentCoin = document.querySelector(".progressbar__current-coin");

  const SHOWING_CN = "show",
    COIN_NAME = "coinName",
    COIN_FULL_NAME = "coinFullName";

  function getCoinInfo(coin) {
    // 
    // fetch(
    //   `https://cors-anywhere.herokuapp.com/https://api.binance.com/api/v1/ticker/24hr?symbol=${coin}USDT`,
    //   {
    //     method: "GET",
    //     mode: "cors",
    //     credentials: "same-origin",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //       Origin: "*",
    //       "Access-Control-Allow-Headers": "*",
    //       "Access-Control-Allow-Origin": "*"
    //     }
    //   }
    // )
    fetch(`https://api.coinone.co.kr/ticker/?currency=${coin}`)
      .then(res => {
        return res.json();
      })
      .then(json => {
        const infoListObj = {
          currentPrice: Math.floor(json.last),
          highestPrice: Math.floor(json.high),
          lowestPrice: Math.floor(json.low),
          yHighestPrice: Math.floor(json.yesterday_high),
          ylowestPrice: Math.floor(json.yesterday_low)
          // currentPrice: json.lastPrice,
          // highestPrice: json.highPrice,
          // lowestPrice: json.lowPrice,
          // askPrice: json.askPrice,
          // bidPrice: json.bidPrice
        };
        // RENDER - COIN INFO
        const infoVal = infoListBox.querySelector(
          ".graph-section__info-list--info-value"
        );
        for (let key in infoListObj) {
          const li = document.createElement("li");
          li.innerText = infoListObj[key];
          // li.innerText = JSON.parse(infoListObj[key]).toFixed(2);
          infoVal.appendChild(li);
        }
        // RENDER - GRAPH PRICE
        BarCurrentPrice.innerText = `₩${Math.floor(json.last)}`;
        // BarCurrentPrice.innerText = `$${JSON.parse(json.lastPrice).toFixed(2)}`;
        BarCurrentCoin.innerText = localStorage.getItem(COIN_FULL_NAME);
      });
  }

  function setLink(coin) {
    if (coin) {
      marketAnchor.setAttribute(
        "href",
        `https://www.binance.com/en/trade/${coin}_USDT`
      );
    } else {
      marketAnchor.setAttribute(
        "href",
        "https://www.binance.com/en/trade/BTC_USDT"
      );
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    let coinFullName = null;
    switch (input.value) {
      case "BTC":
        coinFullName = "Bitcoin";
        break;
      case "ETH":
        coinFullName = "Ethereum";
        break;
      case "XRP":
        coinFullName = "Ripple";
        break;
      case "EOS":
        coinFullName = "EOS";
        break;
      case "ATOM":
        coinFullName = "Cosmos ATOM";
        break;
      case "LUNA":
        coinFullName = "Luna";
        break;
      case "ETC":
        coinFullName = "Ethereum Classic";
        break;
      case "QTUM":
        coinFullName = "Qtum";
        break;
      case "XTZ":
        coinFullName = "Tezos";
        break;
      case "HINT":
        coinFullName = "Hintchain";
        break;
      case "XLM":
        coinFullName = "Stellar Lumens";
        break;
      case "NEO":
        coinFullName = "NEO";
        break;
      case "OMG":
        coinFullName = "OmiseGO";
        break;
      default:
        coinFullName;
    }

    if (input.value !== "") {
      localStorage.setItem(COIN_NAME, input.value);
      localStorage.setItem(COIN_FULL_NAME, coinFullName);
      paintCoin();
      getOrder(input.value);
    }
  }

  function askForCoin() {
    defaultMessage.classList.add(SHOWING_CN);
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
  }

  function paintCoin() {
    defaultMessage.classList.remove(SHOWING_CN);
    form.classList.remove(SHOWING_CN);
    coinTitle.classList.add(SHOWING_CN);
    infoListBox.classList.add(SHOWING_CN);
    const coin = localStorage.getItem(COIN_NAME);
    const coinFullName = localStorage.getItem(COIN_FULL_NAME);
    coinTitle.innerText = coinFullName;
    setLink(coin);
    getCoinInfo(coin);
  }

  function initCoin() {
    const coin = localStorage.getItem(COIN_NAME);
    if (!coin) {
      askForCoin();
    } else {
      paintCoin();
    }
  }

  initCoin();
})();

(function() {
  const openBtn = document.querySelector("#openBtn");
  const closeBtn = document.querySelector("#closeBtn");
  const sideDrawer = document.querySelector(".side-drawer");
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

  function initSideDrawer() {
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

  initSideDrawer();
})();

const asideHeadTitle = document.querySelector(".side-drawer__head > h2");
const askRowList = document.querySelector(".side-drawer__ask-value");
const bidRowList = document.querySelector(".side-drawer__bid-value");

function setList(list, type) {
  for (let i = 0; i < list.length; i++) {
    const price = list[i].price;
    const qty = list[i].qty;
    // const price = list[i][0];
    // const qty = list[i][1];

    const priceEl = document.createElement("span");
    priceEl.innerText = Math.floor(price);
    // priceEl.innerText = JSON.parse(price).toFixed(2);
    const qtyEl = document.createElement("span");
    qtyEl.innerText = qty;
    // qtyEl.innerText = JSON.parse(qty).toFixed(6);

    let rowEl = document.createElement("div");
    if (type === "ask") {
      rowEl.setAttribute("class", "side-drawer__askRow");
      rowEl.appendChild(priceEl);
      rowEl.appendChild(qtyEl);
      askRowList.appendChild(rowEl);
    } else {
      rowEl.setAttribute("class", "side-drawer__bidRow");
      rowEl.appendChild(priceEl);
      rowEl.appendChild(qtyEl);
      bidRowList.appendChild(rowEl);
    }
  }
}

function getOrder(coin) {
  asideHeadTitle.innerText = `${coin} - Current Asking Price`;
  // fetch(
  //   `https://cors-anywhere.herokuapp.com/https://api.binance.com/api/v1/depth?symbol=${coin}USDT`
  // )
  fetch(`https://api.coinone.co.kr/orderbook/?currency=${coin}`)
    .then(res => {
      return res.json();
    })
    .then(json => {
      const askList = json.ask.slice(0, 9);
      const bidList = json.bid.slice(0, 9);
      // const askList = json.asks.slice(0, 9);
      // const bidList = json.bids.slice(0, 9);
      setList(askList, "ask");
      setList(bidList, "bid");
    });
}

function initCoinOrder() {
  const coin = localStorage.getItem("coinName");
  if (coin) {
    getOrder(coin);
  }
}

initCoinOrder();

(function() {
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

  // PRINT ARTICLE IN MODAL
  function printArticle(modal, article) {
    function setInnerText(el, text) {
      modal.querySelector(el).innerText = text;
    }
    setInnerText(".modal__title", article.title);
    setInnerText(".modal__sub--tag", article.primaryCategory);
    setInnerText(
      ".modal__sub--date",
      moment(article.publishedAt).format("lll")
    );
    setInnerText(".modal__contents", article.description);

    function setAttrs(el, attrs) {
      for (let key in attrs) {
        if (attrs[key] !== null) {
          modal.querySelector(el).setAttribute(key, attrs[key]);
        }
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

  function initCryptoNews() {
    // GET BLOCK CHAIN NEWS & ICO NEWS
    getNews();
  }

  initCryptoNews();
})();
