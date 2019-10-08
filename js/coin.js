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
      };
      // RENDER - COIN INFO
      const infoVal = infoListBox.querySelector(
        ".graph-section__info-list--info-value"
      );
      for (let key in infoListObj) {
        const li = document.createElement("li");
        li.innerText = infoListObj[key];
        infoVal.appendChild(li);
      }
      // RENDER - GRAPH PRICE
      BarCurrentPrice.innerText = Math.floor(json.last);
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

  localStorage.setItem(COIN_NAME, input.value);
  localStorage.setItem(COIN_FULL_NAME, coinFullName);
  paintCoin();
  getOrder(input.value);
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

function init() {
  const coin = localStorage.getItem(COIN_NAME);
  if (!coin) {
    askForCoin();
  } else {
    paintCoin();
  }
}

init();
