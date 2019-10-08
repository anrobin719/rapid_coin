const asideHeadTitle = document.querySelector(".side-drawer__head > h2");
const askRowList = document.querySelector(".side-drawer__ask-value");
const bidRowList = document.querySelector(".side-drawer__bid-value");

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
  console.log("GET ORDER START");
  asideHeadTitle.innerText = `${coin} - Current Asking Price`;
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

function init() {
  const coin = localStorage.getItem("coinName");
  if (coin) {
    getOrder(coin);
  }
}

init();
