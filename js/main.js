const events = ["click", "touchstart"];
// //////////////////////-----------INPUT_OUTLINE------------//////////////////////////////
// const input = document.querySelectorAll("input");

// input.forEach((item) => {
//   item.addEventListener("focus", (event) => {
//     event.target.style.outline = "none";
//   });
// });
// const textarea = document.querySelectorAll("textarea");

// textarea.forEach((item) => {
//   item.addEventListener("focus", (event) => {
//     event.target.style.outline = "none";
//   });
// });

//////////////////////-----------INPUT_OUTLINE------------/////////////////////////////////

//////////////////////-----------TIP_STATUS------------/////////////////////////////////
const tipActive = () => {
  const tip = document.querySelector(".tip");
  let timeoutId; // Переменная для хранения идентификатора таймера

  const observer = new MutationObserver((mutationsList) => {
    for (let mutation of mutationsList) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "class"
      ) {
        if (tip.classList.contains("active")) {
          // Очищаем предыдущий таймер
          clearTimeout(timeoutId);

          // Устанавливаем новый таймер
          timeoutId = setTimeout(() => {
            tip.classList.remove("active");
          }, 5000);
        }
      }
    }
  });

  observer.observe(tip, { attributes: true });
};

tipActive();
//////////////////////-----------TIP_STATUS------------/////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
  const catalogBtn = document.querySelector(".catalog-btn");
  const subMenuCatalog = document.querySelector(".menu-categories");
  let isMenuVisible = false;
  let leaveTimer; // Таймер для события mouseleave

  const showMenu = () => {
    if (!isMenuVisible) {
      catalogBtn.classList.add("active");
      subMenuCatalog.classList.add("show");
      isMenuVisible = true;
    }
  };

  const hideMenu = () => {
    catalogBtn.classList.remove("active");
    subMenuCatalog.classList.remove("show");
    isMenuVisible = false;
  };

  const startLeaveTimer = () => {
    leaveTimer = setTimeout(hideMenu, 500); // Установка таймера на 2 секунды
  };

  const cancelLeaveTimer = () => {
    clearTimeout(leaveTimer); // Очистка таймера при наведении мыши
  };

  catalogBtn.addEventListener("mouseenter", () => {
    cancelLeaveTimer(); // Очистка таймера при наведении на кнопку
    showMenu();
  });

  catalogBtn.addEventListener("mouseleave", startLeaveTimer); // Запуск таймера при уводе мыши

  subMenuCatalog.addEventListener("mouseenter", () => {
    cancelLeaveTimer(); // Очистка таймера при наведении на подменю
    showMenu();
  });

  subMenuCatalog.addEventListener("mouseleave", startLeaveTimer); // Запуск таймера при уводе мыши
});
//////////////////////////---------ABOUT-MENU-----/////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
  const aboutBtn = document.querySelector(".about-btn");
  const subAboutBtn = document.querySelector(".sub-about-btn");
  let isMenuVisible = false;

  const showMenu = () => {
    if (!isMenuVisible) {
      aboutBtn.classList.add("active");
      subAboutBtn.classList.add("show");
      isMenuVisible = true;
    }
  };

  const hideMenu = (event) => {
    const relatedTarget = event.relatedTarget;

    if (
      !aboutBtn.contains(relatedTarget) &&
      !subAboutBtn.contains(relatedTarget)
    ) {
      aboutBtn.classList.remove("active");
      subAboutBtn.classList.remove("show");
      isMenuVisible = false;
    }
  };

  aboutBtn.addEventListener("mouseenter", showMenu);
  aboutBtn.addEventListener("mouseleave", hideMenu);

  subAboutBtn.addEventListener("mouseenter", showMenu);
  subAboutBtn.addEventListener("mouseleave", hideMenu);
});

//////////////////////--------ANIM_LEFT-------//////////////////////////////
window.addEventListener("scroll", function () {
  const elements = document.querySelectorAll(".anim-left");
  elements.forEach(function (element) {
    const rect = element.getBoundingClientRect();

    // Проверяем, находится ли элемент в пределах окна просмотра
    if (rect.top < window.innerHeight && rect.bottom > 10) {
      setTimeout(function () {
        element.classList.add("show");
      }, 300);
    } else {
      element.classList.remove("show");
    }
  });
});

window.addEventListener("scroll", function () {
  const elements = document.querySelectorAll(".anim-up");
  elements.forEach(function (element) {
    const rect = element.getBoundingClientRect();

    // Проверяем, находится ли элемент в пределах окна просмотра
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setTimeout(function () {
        element.classList.add("show");
      }, 300);
    } else {
      element.classList.remove("show");
    }
  });
});
//////////////////////--------ANIM_LEFT-------//////////////////////////////

//////////////////////--------READ_MORE-------//////////////////////////////
// Проверка количества слов в описании
function checkWordCount() {
  const descriptionElement = document.getElementById("description");
  const fullText = descriptionElement.innerText.trim();
  const words = fullText.split(/\s+/); // Разбиваем текст на слова

  if (words.length > 40) {
    const shortText = words.slice(0, 40).join(" ") + "..."; // Берем первые 40 слов
    descriptionElement.innerText = shortText; // Обновляем текст в элементе
    document.getElementById("readMoreBtn").style.display = "inline"; // Показываем кнопку
  }
}

// Обрабатываем клик по кнопке "Читать далее"
function handleReadMoreClick() {
  const descriptionElement = document.getElementById("description");
  descriptionElement.innerText =
    descriptionElement.getAttribute("data-full-text"); // Показываем полный текст
  this.style.display = "none"; // Скрываем кнопку
}

function init() {
  const descriptionElement = document.getElementById("description");

  if (descriptionElement) {
    descriptionElement.setAttribute(
      "data-full-text",
      descriptionElement.innerText
    );
    checkWordCount();

    const readMoreBtn = document.getElementById("readMoreBtn");
    if (readMoreBtn) {
      readMoreBtn.onclick = handleReadMoreClick;
    }
  }
}

// Назначаем функцию инициализации на событие загрузки окна
window.onload = init;
//////////////////////--------READ_MORE-------//////////////////////////////
const aboutTitleMob = document.querySelector(".about-title-mob");

if (aboutTitleMob) {
  window.addEventListener("scroll", () => {
    // Получаем текущую позицию скролла
    const scrollPosition = window.scrollY;
    // Получаем высоту окна браузера
    const windowHeight = window.innerHeight;
    // Получаем полную высоту документа
    const documentHeight = document.documentElement.scrollHeight;

    // Рассчитываем, сколько нужно прокрутить, чтобы это было более 20%
    const threshold = documentHeight * 0.2;

    // Если прокроллили больше 20% высоты страницы, добавляем класс hide
    if (scrollPosition > threshold) {
      aboutTitleMob.classList.add("hide");
    } else {
      aboutTitleMob.classList.remove("hide");
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  // Получаем текущий URL
  var currentUrl = window.location.pathname;

  // Проверяем, находится ли URL на странице catalog.php
  if (!currentUrl.endsWith("/pages/catalog.php")) {
    // Если это не нужная страница, скрываем компонент
    var categoriesCon = document.querySelector(".categories-con");
    if (categoriesCon) {
      categoriesCon.style.display = "none";
    }
  }
});

const jobCards = document.querySelectorAll(".job-card");
const jobCardBtns = document.querySelectorAll(".job-card-title img");
const openButton = document.querySelector(".job-list-btn-open");
const closeButton = document.querySelector(".job-list-btn-close");

if (jobCards.length && jobCardBtns.length) {
  jobCardBtns.forEach((cardBtn, index) => {
    // Обработчик события для кнопки
    cardBtn.addEventListener("click", (event) => {
      event.stopPropagation(); // Останавливаем всплытие события
      cardBtn.classList.toggle("active");
      jobCards[index].classList.toggle("active");
      openButton.classList.remove("active");
      closeButton.classList.remove("active");
    });
  });

  // Обработчик события для карточки
  jobCards.forEach((card, index) => {
    card.addEventListener("click", () => {
      card.classList.add("active");
      jobCardBtns[index].classList.add("active");
      openButton.classList.remove("active");
      closeButton.classList.remove("active");
    });
  });

  // Обработчик события для кнопки открытия всех карточек
  if (openButton) {
    openButton.addEventListener("click", () => {
      jobCards.forEach((card, index) => {
        card.classList.add("active");
        openButton.classList.add("active");
        closeButton.classList.remove("active");
        jobCardBtns[index].classList.add("active");
      });
    });
  }

  // Обработчик события для кнопки закрытия всех карточек
  if (closeButton) {
    closeButton.addEventListener("click", () => {
      jobCards.forEach((card, index) => {
        openButton.classList.remove("active");
        closeButton.classList.add("active");
        card.classList.remove("active");
        jobCardBtns[index].classList.remove("active");
      });
    });
  }
}
