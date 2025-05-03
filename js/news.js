//////////////////////////----JSON------////////////////////////////////
const jsonNews = "../js/news.json";

const fetchDataNews = async () => {
  try {
    const response = await fetch(jsonNews);
    if (!response.ok) {
      throw new Error("Ошибка сети: " + response.statusText);
    }
    return await response.json();
  } catch (error) {
    console.error("Ошибка загрузки данных: ", error);
  }
};

async function getFlatNewsObjects(lang = langToggle) {
  const data = await fetchDataNews();
  if (!data || !data[0] || !data[0][lang]) return [];

  const news = data[0][lang].news;
  const flatList = [];

  news.forEach((objN) => {
    flatList.push({ ...objN });
  });

  return flatList;
}

function newsItemMain(title, description, photo, date) {
  const newsSwiperWrapper = document.querySelector(".news-swiper-wrapper");
  const newsSwiperWrapperMini = document.querySelector(
    ".news-swiper-wrapper-mini"
  );
  if (newsSwiperWrapper) {
    const newsItemMain = document.createElement("div");
    newsItemMain.classList.add("swiper-slide", "news-slide"); // Объединение классов

    newsItemMain.innerHTML = `
		<div class="news-img-con">
			<img src="${photo}" alt="">
		</div>
		<div class="news-text">
			<h1>${title}</h1>
			<h2>${description}</h2>
			<div class="news-data">
				<span>${date}</span>
			</div>
		</div>
		`;
    newsSwiperWrapper.appendChild(newsItemMain);

    if (newsSwiperWrapperMini) {
      const newsItemMainMini = document.createElement("div");
      newsItemMainMini.classList.add("swiper-slide", "news-slide"); // Объединение классов

      newsItemMainMini.innerHTML = `
						<h1>${title}
							<br><br><span>${date}</span>
						</h1>
						<img src="${photo}">
				`;
      newsSwiperWrapperMini.appendChild(newsItemMainMini);
    }
  }
}
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

function addNewsItemToList(title, description, photo, date) {
  const newsListElement = document.querySelector(".news-list");
  if (newsListElement) {
    const newsItemLi = document.createElement("li");
    newsItemLi.innerHTML = `
				<li class="news-item">
				<img class="mini-img-news" src="${photo}">
				<h2 class="news-item-title">${title}</h2>
				<span>${date}</span>
				</li>
				`;
    newsListElement.appendChild(newsItemLi);

    const newsItem = document.querySelectorAll(".news-item");

    newsItem.forEach((item) => {
      item.addEventListener("click", () => {
        newsItem.forEach((el) => {
          el.classList.remove("active");
          setTimeout(() => {
            newsListCon.classList.add("active");
            newsList.classList.add("active");
            newsListConTitle.classList.add("active");
          }, 600);
        });

        item.classList.add("active");

        const activeTitle = item
          .querySelector(".news-item-title")
          .innerText.trim();

        findActiveNewsObject(activeTitle);
      });
    });
  }
}

// Функция для поиска активного объекта новостей
function findActiveNewsObject(activeTitle) {
  // Получаем весь список новостей из API
  getFlatNewsObjects().then((newsList) => {
    // Находим соответствующий объект
    const activeNewsObject = newsList.find((obj) => obj.title === activeTitle);

    // Проверяем, нашёлся ли объект
    if (activeNewsObject) {
      const titleH1 = document.querySelector(".news-main-title-h1");
      const titleH2 = document.querySelector(".news-main-title-h2");
      const titleImg = document.querySelector(".news-main-photo-img");

      titleH1.innerHTML = `<h1>${activeNewsObject.title}</h1>`;
      titleH2.innerHTML = `<h2>${activeNewsObject.description}</h2>`;
      titleImg.src = activeNewsObject.photo;
    } else {
      console.log("Новость не найдена");
    }
  });
}

const newsListCon = document.querySelector(".news-list-con");
const newsMainCon = document.querySelector(".news-main-con");
const newsList = document.querySelector(".news-list");
const newsItem = document.querySelector(".news-item");
const newsListConTitle = document.querySelector(".news-list-con-title");
const newsListBtn = document.querySelector(".news-list-open");

if (newsListCon) {
  newsListBtn.addEventListener("click", () => {
    newsListCon.classList.toggle("active");
    newsList.classList.toggle("active");
    newsListConTitle.classList.toggle("active");
  });

  newsMainCon.addEventListener("click", () => {
    newsListCon.classList.add("active");
    newsList.classList.add("active");
    newsListConTitle.classList.add("active");
  });
}

async function displayNews() {
  const newsList = await getFlatNewsObjects();
  newsList.forEach((objN) => {
    addNewsItemToList(objN.title, objN.description, objN.photo, objN.date);
    newsItemMain(objN.title, objN.description, objN.photo, objN.date);
  });
}

displayNews();
