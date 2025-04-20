//////////////////////-----------INPUT_OUTLINE------------//////////////////////////////
const input = document.querySelectorAll("input");

input.forEach((item) => {
  item.addEventListener("focus", (event) => {
    event.target.style.outline = "none";
  });
});

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
          }, 2000);
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

  const showMenu = () => {
    if (!isMenuVisible) {
      catalogBtn.classList.add("active");
      subMenuCatalog.classList.add("show");
      isMenuVisible = true;
    }
  };

  const hideMenu = (event) => {
    const relatedTarget = event.relatedTarget;

    if (
      !catalogBtn.contains(relatedTarget) &&
      !subMenuCatalog.contains(relatedTarget)
    ) {
      catalogBtn.classList.remove("active");
      subMenuCatalog.classList.remove("show");
      isMenuVisible = false;
    }
  };

  catalogBtn.addEventListener("mouseenter", showMenu);
  catalogBtn.addEventListener("mouseleave", hideMenu);

  subMenuCatalog.addEventListener("mouseenter", showMenu);
  subMenuCatalog.addEventListener("mouseleave", hideMenu);
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
//////////////////////////---------ABOUT-MENU-----///////////////////////////////////////////////////////
// const toggleCategories = () => {
//   const openItems = document.querySelectorAll(".open-img");

//   openItems.forEach((item) => {
//     item.addEventListener("click", () => {
//       const subcategories = item.nextElementSibling;
//       const allSubcategories = document.querySelectorAll("ul.open, ul.close");

//       allSubcategories.forEach((ul) => {
//         if (ul !== subcategories && !ul.contains(item)) {
//           ul.classList.remove("open");
//           ul.classList.add("close");
//           // Убираем класс active у заголовка, если подкатегории закрыты
//           const parentItem = ul.previousElementSibling;
//           if (parentItem) {
//             parentItem.classList.remove("active");
//           }
//         }
//       });

//       if (subcategories) {
//         subcategories.classList.toggle("open");
//         subcategories.classList.toggle("close");

//         // Переключаем класс active у заголовка, если подкатегории открыты
//         if (subcategories.classList.contains("open")) {
//           item.classList.add("active");
//         } else {
//           item.classList.remove("active");
//         }
//       }
//     });
//   });
// };

// toggleCategories();

//////////////////////--------MODAL--------//////////////////////////////
const modalButtons = document.querySelectorAll(".btn-modal-call");

modalButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const modalCon = document.querySelector(".modal-con");
    document.querySelector(".modal-con").classList.remove("hide-prev");
    modalCon.classList.remove("hide");
    modalCon.classList.add("show");
  });
});

document
  .querySelector(".modal-con")
  .addEventListener("click", function (event) {
    if (!event.target.closest(".modal")) {
      document.querySelector(".modal-con").classList.remove("show");
      document.querySelector(".modal-con").classList.add("hide");
    }
  });

document.querySelector(".close-modal").addEventListener("click", function () {
  document.querySelector(".modal-con").classList.remove("show");
  document.querySelector(".modal-con").classList.add("hide");
});

//////////////////////--------MODAL--------//////////////////////////////

//////////////////////--------LANG-SWITCH--------//////////////////////////////

const langSwitchActive = () => {
  const langSwitch = document.querySelectorAll(".lang-switch");

  langSwitch.forEach((item) => {
    item.addEventListener("click", () => {
      // Удаляем класс "active" у всех элементов
      langSwitch.forEach((i) => {
        i.classList.remove("active");
      });
      // Добавляем класс "active" к текущему элементу
      item.classList.add("active");

      const langValue = item.value;

      // Изменяем содержание элемента с классом .tip
      const tip = document.querySelector(".tip");
      tip.classList.add("active");
      if (langValue === "ru") {
        tip.innerHTML = `<h3>Язык переключен на русский</h3>`;
      } else {
        tip.innerHTML = `<h3>The language has been switched <br>to еnglish</h3>`;
      }
    });
  });
};

// Вызываем функцию для инициализации
langSwitchActive();
//////////////////////--------LANG-SWITCH--------//////////////////////////////

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
function checkWordCount() {
  const descriptionElement = document.getElementById("description");
  const fullText = descriptionElement.innerText.trim();
  const words = fullText.split(/\s+/); // Разбиваем текст на слова

  if (words.length > 40) {
    const shortText = words.slice(0, 40).join(" ") + "..."; // Берем первые 20 слов
    descriptionElement.innerText = shortText; // Обновляем текст в элементе
    document.getElementById("readMoreBtn").style.display = "inline"; // Показываем кнопку
  }
}

document.getElementById("readMoreBtn").onclick = function () {
  const descriptionElement = document.getElementById("description");
  descriptionElement.innerText =
    descriptionElement.getAttribute("data-full-text"); // Показываем полный текст
  this.style.display = "none"; // Скрываем кнопку
};

window.onload = function () {
  // Сохраняем полный текст в атрибут data-full-text
  const descriptionElement = document.getElementById("description");
  descriptionElement.setAttribute(
    "data-full-text",
    descriptionElement.innerText
  );
  checkWordCount();
};
//////////////////////--------READ_MORE-------//////////////////////////////
