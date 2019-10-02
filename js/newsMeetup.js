const newsImg = document.querySelectorAll(".js_news .js_img > img"),
  newsTitle = document.querySelectorAll(".js_news .js_contents > h4"),
  newsDate = document.querySelectorAll(".js_news .js_contents > span");
const meetupTitle = document.querySelectorAll(".js_meetup .js_contents > h4"),
  meetupStartDate = document.querySelectorAll(".js_startDate"),
  meetupEndDate = document.querySelectorAll(".js_endDate"),
  meetupMonth = document.querySelectorAll(".js_articleMonth"),
  meetupDay = document.querySelectorAll(".js_articleDay");
const modalBox = document.querySelector(".modalBox");
const API_KEY = "$2y$10$McJXUMn./1K2jL978jMyZOMjfEO5lB3z.MJCmkGmmf7bXcGuXO0ha",
  SHOW_MODAL_CN = "show";

let news = null,
  meetup = null;

function printArticle(modal, article) {
  if (!article.start_day) {
    modal.querySelector("h4").innerText = article.title;
    modal.querySelector(".author").innerText = article.byline;
    modal.querySelector(".date").innerText = article.pubdate;
    modal.querySelector("img").setAttribute("src", article.thumbnail);
    modal.querySelector(".js_newsModalContentBox").innerHTML = article.content;
  } else {
    modal.querySelector("h4").innerText = article.title;
    modal.querySelector(".js_month").innerText = article.cmonth;
    modal.querySelector(".js_day").innerText = article.cday;
    modal.querySelector(".js_meetupModalContentBox").innerText =
      article.content;
    modal.querySelector("a").setAttribute("href", article.site_url);
  }
}

function showModal(article) {
  modalBox.classList.add(SHOW_MODAL_CN);
  document.body.classList.add("noScroll");

  if (!article.start_day) {
    const newsModal = modalBox.querySelector(".js_newsModal");
    newsModal.addEventListener("click", e => handlePropagation(e));
    modalBox.addEventListener("click", () => hideModal(newsModal));
    newsModal.classList.add(SHOW_MODAL_CN);

    printArticle(newsModal, article);
  } else {
    const meetupModal = modalBox.querySelector(".js_meetupModal");
    meetupModal.addEventListener("click", e => handlePropagation(e));
    modalBox.addEventListener("click", () => hideModal(meetupModal));
    meetupModal.classList.add(SHOW_MODAL_CN);

    printArticle(meetupModal, article);
  }
}

function handlePropagation(e) {
  e.stopPropagation();
}

function hideModal(modal) {
  modalBox.classList.remove("show");
  modal.classList.remove("show");
  document.body.classList.remove("noScroll");
}

function getNews() {
  fetch(`https://www.cryptohub.or.kr/api/v1/news?token=${API_KEY}`, {
    method: "POST"
  })
    .then(res => {
      return res.json();
    })
    .then(json => {
      news = json.data.slice(0, 3);
      for (let i = 0; i < news.length; i++) {
        newsImg[i].setAttribute("src", news[i].thumbnail);
        newsTitle[i].innerText = news[i].title;
        newsDate[i].innerText = news[i].updated_at;

        const parentArticle = newsImg[i].parentElement.parentElement;
        parentArticle.addEventListener("click", () => showModal(news[i]));
      }
    });
}

function getMeetup() {
  fetch(`https://www.cryptohub.or.kr/api/v1/meetup?token=${API_KEY}`, {
    method: "POST"
  })
    .then(res => {
      return res.json();
    })
    .then(json => {
      meetup = json.data.slice(0, 3);
      for (let i = 0; i < meetup.length; i++) {
        meetupTitle[i].innerText = meetup[i].title;
        meetupStartDate[i].innerText = meetup[i].start_day;
        meetupEndDate[i].innerText = meetup[i].end_day;

        meetupMonth[i].innerText = meetup[i].cmonth;
        meetupDay[i].innerText = meetup[i].cday;

        const parentArticle = meetupTitle[i].parentElement.parentElement;
        parentArticle.addEventListener("click", () => showModal(meetup[i]));
      }
    });
}

function init() {
  getNews();
  getMeetup();
}

init();
