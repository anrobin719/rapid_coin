const defaultMessage = document.querySelector('.js_defaultMessage'),
        form = document.querySelector('.js_form'),
        input = form.querySelector('input'),
        coinTitle = document.querySelector('.js_coinTitle'),
        infoListBox = document.querySelector('.infoListBox'),
        goToMarketBtn = document.querySelector('.js_goToMarketBtn'),
        marketAnchor = goToMarketBtn.querySelector('a'),
        BarCurrentPrice = document.querySelector('.js_BarCurrentPrice'),
        BarCurrentCoin = document.querySelector('.js_BarCurrentCoin')

const SHOWING_CN = 'show',
        COIN_NAME = 'coinName';


function getCoinInfo(coin) {
    fetch(`https://api.coinone.co.kr/ticker/?currency=${coin}`).then(res => {
            return res.json();
        })
        .then(json => {
            console.log(json);
            const infoListObj = {
                currentPrice: json.last,
                highestPrice: json.high,
                lowestPrice: json.low,
                yHighestPrice: json.yesterday_high,
                ylowestPrice: json.yesterday_low,
            };
            const infoVal = infoListBox.querySelector('.js_infoVal');
            for (let key in infoListObj) {
                const li = document.createElement("li");
                li.innerHTML = infoListObj[key];
                infoVal.appendChild(li);
            }

            BarCurrentPrice.innerHTML = json.last;
            BarCurrentCoin.innerHTML = json.currency;

        });
}

function setLink(coin) {
    const lowerCaseCoin = coin.toLowerCase();
    if (coin) {
        marketAnchor.setAttribute('href', `https://coinone.co.kr/exchange/trade/${lowerCaseCoin}/krw`);
    } else {
        marketAnchor.setAttribute('href', 'https://coinone.co.kr/exchange/trade/btc/krw');
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