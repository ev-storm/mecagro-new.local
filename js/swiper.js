var objectSwiper = new Swiper(".object-swiper", {
  loop: true,
  speed: 1500,
  // autoplay: {
  //   delay: 2500,
  //   disableOnInteraction: true,
  // },
  spaceBetween: 0,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: ".object-swiper_mini",
  },
});

// var objectSwiperMini = new Swiper(".object-swiper_mini", {
//   direction: "vertical",
//   loop: false,
//   spaceBetween: 10,
//   slidesPerView: 4,
//   freeMode: true,
//   watchSlidesProgress: true,
// });

// const progressCircle = document.querySelector(".autoplay-progress svg");
// const progressContent = document.querySelector(".autoplay-progress span");
// const progress = document.querySelector(".autoplay-progress");

// var titleSwiper = new Swiper(".title-swiper", {
//   loop: true,
//   speed: 1500,
//   spaceBetween: 30,
//   centeredSlides: true,
//   autoplay: {
//     delay: 18000,
//     disableOnInteraction: false,
//   },
//   pagination: {
//     el: ".swiper-pagination",
//     clickable: true,
//   },
//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//   },
//   on: {
//     autoplayTimeLeft(s, time, progress) {
//       progressCircle.style.setProperty("--progress", 1 - progress);
//       progressContent.textContent = `${Math.ceil(time / 1000)}`;
//     },
//     slideChange() {
//       // Перезапускаем автопроигрывание
//       this.autoplay.start();
//       // Сбрасываем время и прогресс
//       const remainingTime = this.params.autoplay.delay;
//       // Обновляем прогресс
//       progressCircle.style.setProperty("--progress", 0); // Сбрасываем прогресс
//       progressContent.textContent = `${Math.ceil(remainingTime / 1000)}`; // Обновляем прогресс по времени
//     },
//   },
// });

// var isAutoplaying = true; // Переменная для отслеживания состояния автопроигрывания

// if (progress) {
//   // Проверяем, существует ли titleSwiper
//   progress.addEventListener("click", function () {
//     if (isAutoplaying) {
//       titleSwiper.autoplay.stop(); // Останавливаем автопроигрывание
//       progressContent.innerHTML = `<svg class="title-play" width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
// <path d="M0.966797 5.24512V0.713867L5.07987 2.85717C5.15107 2.89427 5.15172 2.99592 5.081 3.03393L0.966797 5.24512Z" fill="#58C88A"/>
// </svg>`; // Меняем иконку на кнопке при остановке
//     } else {
//       titleSwiper.autoplay.start(); // Запускаем автопроигрывание
//       progressContent.innerHTML = `<svg class="title-pause" width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
// <rect width="2" height="6" fill="#58C88A"/>
// <rect x="4" width="2" height="6" fill="#58C88A"/>
// </svg>`; // Меняем иконку на кнопке при запуске
//     }
//     isAutoplaying = !isAutoplaying; // Переключаем состояние
//   });
// }

// // Инициализация Swiper
var linkSwiper = new Swiper(".linkSwiper", {
  loop: true,
  direction: "vertical",
  spaceBetween: 30,
  slidesPerView: 3,
  centeredSlides: true,
  simulateTouch: false,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  breakpoints: {
    600: {
      direction: "horizontal",
      slidesPerView: 5,
    },
  },
  navigation: {
    nextEl: ".title-arow-R",
    prevEl: ".title-arow-L",
  },
});

//////////////////////////////////////////////////////////////////////////////
var brendMainSwiper = new Swiper(".brendMainSwiper", {
  loop: true,
  spaceBetween: 0,
  slidesPerView: 1,
  simulateTouch: false,
  breakpoints: {
    600: {
      direction: "horizontal",
      slidesPerView: 3,
    },
  },
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
  },
  speed: 10000,
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
  slidesPerView: 5,

  navigation: {
    nextEl: ".mini-news-arrow_R",
    prevEl: ".mini-news-arrow_L",
  },
});

/////////////////////////////////////////////////////////
