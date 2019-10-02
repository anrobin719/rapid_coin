const asideHeadTitle = document.querySelector(".asideHead > h2");
const askRowList = document.querySelector(".js_askRowList");
const bidRowList = document.querySelector(".js_bidRowList");

function setList(list, type) {
  for (let i = 0; i < list.length; i++) {
    const price = list[i].price;
    const qty = list[i].qty;

    const priceEl = document.createElement("span");
    priceEl.innerText = Math.floor(price);
    const qtyEl = document.createElement("span");
    qtyEl.innerText = qty;

    let rowEl = document.createElement("div");
    if (type === "ask") {
      rowEl.setAttribute("class", "js_askRow askRow");
      rowEl.appendChild(priceEl);
      rowEl.appendChild(qtyEl);
      askRowList.appendChild(rowEl);
    } else {
      rowEl.setAttribute("class", "js_bidRow bidRow");
      rowEl.appendChild(priceEl);
      rowEl.appendChild(qtyEl);
      bidRowList.appendChild(rowEl);
    }
  }
}

function getOrder(coin) {
  fetch(`https://api.coinone.co.kr/orderbook/?currency=${coin}`)
    .then(res => {
      return res.json();
    })
    .then(json => {
      const askList = json.ask.slice(0, 9);
      const bidList = json.bid.slice(0, 9);

      setList(askList, "ask");
      setList(bidList, "bid");
    });
}

function paintOrder() {
  console.log(asideHeadTitle.innerText);
}

function init() {
  const coin = localStorage.getItem("coinName");
  if (coin) {
    asideHeadTitle.innerText = `${coin} - Current Asking Price`;
    getOrder(coin);
  }
}

init();
