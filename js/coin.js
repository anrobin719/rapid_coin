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
        COIN_NAME = 'coinName',
        COIN_FULL_NAME = 'coinFullName',
        COIN_KOREAN_NAME = 'coinKoreanName'


function getCoinInfo(coin) {
    fetch(`https://api.coinone.co.kr/ticker/?currency=${coin}`)
        .then(res => {
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
            // 코인 정보 출력
            const infoVal = infoListBox.querySelector('.js_infoVal');
            for (let key in infoListObj) {
                const li = document.createElement("li");
                li.innerText = infoListObj[key];
                infoVal.appendChild(li);
            }
            // 그래프 바 코인, 가격 출력
            BarCurrentPrice.innerText = json.last;
            BarCurrentCoin.innerText = localStorage.getItem(COIN_FULL_NAME);
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
    
    let coinFullName = null;
    let coinKoreanName = null;
    switch (input.value) {
        case 'BTC':
            coinFullName = 'Bitcoin';
            coinKoreanName = '비트코인';
            break;
        case 'ETH':
            coinFullName = 'Ethereum';
            coinKoreanName = '이더리움';
            break;
        case 'XRP':
            coinFullName = 'Ripple';
            coinKoreanName = '리플';
            break;
        case 'EOS':
            coinFullName = 'EOS';
            coinKoreanName = '이오스';
            break;
        case 'ATOM':
            coinFullName = 'Cosmos ATOM';
            coinKoreanName = '코스모스아톰';
            break;
        case 'LUNA':
            coinFullName = 'Luna';
            coinKoreanName = '루나';
            break;
        case 'QTUM':
            coinFullName = 'Qtum';
            coinKoreanName = '퀀텀';
            break;
        case 'XTZ':
            coinFullName = 'Tezos';
            coinKoreanName = '테조스';
            break;
        case 'HINT':
            coinFullName = 'Hintchain';
            coinKoreanName = '비트코인';
            break;
        case 'XLM':
            coinFullName = 'Stellar Lumens';
            coinKoreanName = '스텔라루멘';
            break;
        case 'NEO':
            coinFullName = 'NEO';
            coinKoreanName = '네오';
            break;
        case 'OMG':
            coinFullName = 'OmiseGO';
            coinKoreanName = '오미세고';
            break;
        default: coinFullName;
    }

    localStorage.setItem(COIN_NAME, input.value);
    localStorage.setItem(COIN_FULL_NAME, coinFullName);
    localStorage.setItem(COIN_KOREAN_NAME, coinKoreanName);
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
    coinTitle.innerText = coin;
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