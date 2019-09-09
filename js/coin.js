const defaultMessage = document.querySelector('.js_defaultMessage'),
        form = document.querySelector('.js_form'),
        input = form.querySelector('input'),
        coinTitle = document.querySelector('.js_coinTitle'),
        infoListBox = document.querySelector('.infoListBox'),
        goToMarketBtn = document.querySelector('.js_goToMarketBtn'),
        anchor = goToMarketBtn.querySelector('a');

const SHOWING_CN = 'show',
        COIN_NAME = 'coinName';


function getCoinInfo(coin) {
    fetch(`https://api.coinone.co.kr/ticker/?currency=${coin}`).then(res => {
            return res.json();
        })
        .then(json => {
            console.log(json);
            const resArray = [];
            const currentPrice = json.last;
            const highestPrice = json.high;
            const lowestPrice = json.low;
            const yHighestPrice = json.yesterday_high;
            const ylowestPrice = json.yesterday_low;
            resArray.push(currentPrice, highestPrice, lowestPrice, yHighestPrice, ylowestPrice);
            console.log(`This is resArray`, resArray);
            const infoList = infoListBox.querySelector('.js_infoVal');
            const lists = resArray.map(list => {
                const li = document.createElement("li");
                li.innerHTML = list;
                infoList.appendChild(li);
            });
        });
}

function setLink(coin) {
    const lowerCaseCoin = coin.toLowerCase();
    if (coin) {
        anchor.setAttribute('href', `https://coinone.co.kr/exchange/trade/${lowerCaseCoin}/krw`);
    } else {
        anchor.setAttribute('href', 'https://coinone.co.kr/exchange/trade/btc/krw');
    }
}
function handleSubmit(e) {
    e.preventDefault();
    const inputVal = input.value;
    localStorage.setItem(COIN_NAME, inputVal);
    paintCoin();
}
function askForCoin() {
    console.log('Ask for coin start!');
    defaultMessage.classList.add(SHOWING_CN);
    form.classList.add(SHOWING_CN);
    form.addEventListener('submit', handleSubmit);
}
function paintCoin() {
    console.log('Paint coin start!');
    defaultMessage.classList.remove(SHOWING_CN);
    form.classList.remove(SHOWING_CN);
    coinTitle.classList.add(SHOWING_CN);
    infoListBox.classList.add(SHOWING_CN);
    const coin = localStorage.getItem(COIN_NAME);
    coinTitle.innerHTML = coin;
    setLink(coin);
    getCoinInfo(coin);
}
function init() {
    const coin = localStorage.getItem(COIN_NAME);
    if(!coin) {
        askForCoin();
    } else {
        paintCoin();
    }
}

init();