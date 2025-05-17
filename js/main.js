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
      subAboutBtn.classList.remove("hide-prev");
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
  if (currentUrl.endsWith("/pages/catalog.php")) {
    // Если это не нужная страница, скрываем компонент
    var categoriesCon = document.querySelector(".categories-con");
    if (categoriesCon) {
      categoriesCon.style.display = "flex";
    }
  }
});

///////////////////////////////////////////////////

const footerLogo = document.querySelector(".footer-logo");
const imgMiniF = "/assets/svg/logo-footer.svg";
const imgF = "/assets/svg/logo-mini_footer.svg";

function updateLogo() {
  if (window.innerWidth <= 1500) {
    footerLogo.innerHTML = `
				<img src="${imgF}" alt="logo">
				<div class="about-foot">
					<h2>ООО «МЕКАГРО ГРУП» © </h2>
					<h3>Все права защищены | 2025</h3>
				</div>
			`;
  } else {
    footerLogo.innerHTML = `
				<img src="${imgMiniF}" alt="logo">
				<div class="about-foot">
					<h2>ООО «МЕКАГРО ГРУП» © </h2>
					<h3>Все права защищены | 2025</h3>
				</div>
			`;
  }
}

updateLogo();
window.addEventListener("resize", updateLogo);

const filterBtnMenu = document.querySelector(".filter-btn-menu");
const filterNewBtn = document.querySelector(".filter-new-btn");

filterBtnMenu.addEventListener("click", () => {
  filterNewBtn.classList.toggle("active");
});
if (filterNewBtn) {
  filterNewBtn.addEventListener("click", () => {
    filterBtnMenu.classList.toggle("active");
  });
}

function validateI() {
  const form = document.querySelector(".form-i");

  const telSelector = form.querySelector(".input-tel-i");
  const inputmask = new Inputmask("+7 (999) 999-99-99");

  inputmask.mask(telSelector);

  const validation = new JustValidate(".form-i");

  validation
    .addField(".input-name-i", [
      {
        rule: "minLength",
        value: 3,
        errorMessage: "Введите более 3 символов",
      },
      {
        rule: "maxLength",
        value: 30,
        errorMessage: "Введите менее 30 символов",
      },
      {
        rule: "required",
        value: true,
        errorMessage: "Введите имя",
      },
    ])
    .addField(".input-tel-i", [
      {
        rule: "required",
        value: true,
        errorMessage: "Телефон обязателен",
      },
      {
        rule: "function",
        validator: function () {
          const phone = telSelector.inputmask.unmaskedvalue();
          return phone.length === 10;
        },
        errorMessage: "Введите корректный телефон",
      },
    ])
    .onSuccess((event) => {
      console.log("Validation passes and form submitted", event);

      let formData = new FormData(event.target);

      let xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log("Отправлено");
            document.querySelector(".modal-con").classList.add("hide");
            const tip = document.querySelector(".tip");
            tip.classList.add("active");
            if (langToggle === "ru") {
              tip.innerHTML = `<h3>Даннык отправлены</h3>`;
            } else {
              tip.innerHTML = `<h3>The data has been sent</h3>`;
            }
          } else {
            console.error("Ошибка при отправке: " + xhr.status);
          }
        }
      };

      xhr.open("POST", "../mail.php", true);
      xhr.send(formData);

      event.target.reset();
    });
}

const mainFormI = document.querySelector(".main-form-i");

if (mainFormI) {
  validateI();
  const check = document.getElementById("check-form-id-i");
  const btnForm = document.querySelector(".btn-form-main-i");
  btnForm.disabled = true;
  btnForm.style.opacity = 0.5;
  check.addEventListener("click", () => {
    if (check.checked) {
      btnForm.disabled = false;
      btnForm.style.opacity = 1;
    } else {
      btnForm.disabled = true;
      btnForm.style.opacity = 0.5;
    }
  });
}
