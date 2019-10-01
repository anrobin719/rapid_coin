const asideHeadTitle = document.querySelector(".asideHead > h2");
const askRow = document.querySelectorAll(".js_askRow");
const bidRow = document.querySelectorAll(".js_bidRow");

function setList(list, row) {
  for (let i = 0; i < row.length; i++) {
    const price = list[i].price;
    const qty = list[i].qty;

    const priceEl = document.createElement("span");
    priceEl.innerText = Math.floor(price);
    const qtyEl = document.createElement("span");
    qtyEl.innerText = qty;

    row[i].appendChild(priceEl);
    row[i].appendChild(qtyEl);
  }
}

function getOrder(coin) {
  fetch(`https://api.coinone.co.kr/orderbook/?currency=${coin}`)
    .then(res => {
      return res.json();
    })
    .then(json => {
      console.log(json.timestamp);
      const askList = json.ask.slice(0, 7);
      const bidList = json.bid.slice(0, 7);

      setList(askList, askRow);
      setList(bidList, bidRow);
    });
}

function paintOrder() {
  console.log(asideHeadTitle.innerText);
}

function init() {
  const coin = localStorage.getItem(COIN_NAME);
  if (coin) {
    const coinKoreanName = localStorage.getItem("coinKoreanName");
    asideHeadTitle.innerText = `${coinKoreanName} 실시간 매도/매수`;
    getOrder(coin);
  }
}

init();
