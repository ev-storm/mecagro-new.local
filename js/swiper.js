var objectSwiper = new Swiper(".object-swiper", {
  loop: true,
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: ".object-swiper_mini",
  },
});

var objectSwiperMini = new Swiper(".object-swiper_mini", {
  direction: "vertical",
  loop: false,
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
});

const progressCircle = document.querySelector(".autoplay-progress svg");
const progressContent = document.querySelector(".autoplay-progress span");

var titleSwiper = new Swiper(".title-swiper", {
  loop: true,
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 4500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  on: {
    autoplayTimeLeft(s, time, progress) {
      progressCircle.style.setProperty("--progress", 1 - progress);
      progressContent.textContent = `${Math.ceil(time / 1000)}`;
    },
  },
});

// Инициализация Swiper
var linkSwiper = new Swiper(".linkSwiper", {
  loop: true,
  spaceBetween: 30,
  slidesPerView: 5,
  centeredSlides: true,
  navigation: {
    nextEl: ".title-arow-R",
    prevEl: ".title-arow-L",
  },
});

//////////////////////////////////////////////////////////////////////////////
var brendMainSwiper = new Swiper(".brendMainSwiper", {
  loop: true,
  spaceBetween: 0,
  slidesPerView: 4,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
  },
  speed: 5000,
});

//////////////////////////////////////////////////////////////////////
var newsSwiper = new Swiper(".news-swiper", {
  loop: true,
  spaceBetween: 10,
  navigation: {
    nextEl: ".news-arrow_R",
    prevEl: ".news-arrow_L",
  },
  thumbs: {
    swiper: ".news-swiper-mini",
  },
});

var newsSwiperMini = new Swiper(".news-swiper-mini", {
  loop: true,
  spaceBetween: 20,
  slidesPerView: 6,
  navigation: {
    nextEl: ".mini-news-arrow_R",
    prevEl: ".mini-news-arrow_L",
  },
});
