// ////////////////////////---------LANG-SWICH--------///////////////////////////////////
let langToggle = localStorage.getItem("langToggle") || "ru"; // Получаем значение из localStorage или устанавливаем по умолчанию "ru"

function setupLanguageSwitch() {
  const langSwitch = document.querySelectorAll(".lang-switch");

  langSwitch.forEach((item) => {
    // Устанавливаем активный класс в зависимости от текущего языка при загрузке страницы
    if (item.value === langToggle) {
      item.classList.add("active");
    }

    item.addEventListener("click", () => {
      const langValue = item.value;
      langToggle = langValue === "ru" ? "ru" : "en";

      localStorage.setItem("langToggle", langToggle); // Сохраняем значение в localStorage

      // Обновляем состояние кнопок переключателя языка
      langSwitch.forEach((i) => {
        i.classList.remove("active");
      });
      item.classList.add("active");

      renderCategories();
      createListMenu();
      getFlatCategoryObjects();
      objClick();
      updateLanguageText();
      displayNews();
      displayJob();
      displaySPart();

      //displayNews();

      // Обновляем содержание элемента с классом .tip
      updateLanguageTip();
    });
  });

  updateLanguageText(); // Обновляем текст сразу при загрузке страницы
}

function updateLanguageText() {
  const elements = document.querySelectorAll("[data-lang], [data-lang_en]");

  elements.forEach((element) => {
    if (langToggle === "en") {
      element.innerHTML = element.getAttribute("data-lang_en") || "";
    } else {
      element.innerHTML = element.getAttribute("data-lang") || "";
    }
  });
}

// function updateLanguageTip() {
//   const tip = document.querySelector(".tip");
//   tip.classList.add("active");
//   if (langToggle === "ru") {
//     tip.innerHTML = `<h3>Язык переключен на русский</h3>`;
//   } else {
//     tip.innerHTML = `<h3>The language has been switched <br>to English</h3>`;
//   }
// }
function updateLanguageTip() {
  const tip = document.querySelector(".tip");

  // Проверяем текущий язык в localStorage
  const currentLang = localStorage.getItem("language") || "ru"; // 'en' по умолчанию

  // Убедитесь, что класс "active" добавляется только при переключении языка
  if (currentLang !== langToggle) {
    tip.classList.add("active");
    localStorage.setItem("language", langToggle); // Сохраняем новый язык в localStorage
  } else {
    tip.classList.remove("active"); // Удаляем класс, если язык не изменился
  }

  // Обновляем текст подсказки
  if (langToggle === "ru") {
    tip.innerHTML = `<h3>Язык переключен на русский</h3>`;
  } else {
    tip.innerHTML = `<h3>The language has been switched <br>to English</h3>`;
  }
}

setupLanguageSwitch();

// Вызываем функцию для первоначальной обновки подсказки
updateLanguageTip();
//////////////////////--------LANG-SWITCH-TOGGLE-------//////////////////////////////

// //////////////////////////---------LANG-SWICH--------///////////////////////////////////
//////////////////////////----JSON------////////////////////////////////
const jsonCategories = "../js/object.json";
const fetchDataCategories = async () => {
  try {
    const response = await fetch(jsonCategories);
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return await response.json();
  } catch (error) {
    console.error("Ошибка загрузки данных: ", error);
  }
};
// Асинхронная функция получает плоский массив всех объектов со ссылкой на родительские категории
async function getFlatCategoryObjects(lang = langToggle) {
  // lang = "ru";
  const data = await fetchDataCategories();
  if (!data || !data[0] || !data[0].categories || !data[0].categories[lang])
    return [];

  const categories = data[0].categories[lang];
  const flatList = [];
  for (const categoryName in categories) {
    const category = categories[categoryName];
    const subCategories = category.subCategories || {};
    for (const subCategoryName in subCategories) {
      const objects = subCategories[subCategoryName].object || [];
      // В каждую запись добавляем поля category�Name и subCategoryName
      objects.forEach((obj) => {
        flatList.push({
          ...obj,
          categoryName,
          subCategoryName,
        });
      });
    }
  }
  return flatList;
}

///////////////////////////----JSON------////////////////////////////////

// ///////////////////////////---- BREND ------////////////////////////////////
let filterActive = []; // Глобальная переменная

const activeBrend = () => {
  const brendBtn = document.querySelectorAll(".brend-btn");
  const categoriesFilter = document.querySelectorAll(".filter");

  categoriesFilter.forEach((item) => {
    item.addEventListener("click", () => {
      if (item.classList.contains("brend-btn")) {
        // Проверяем текущее количество активных кнопок
        const activeCount = Array.from(brendBtn).filter((btn) =>
          btn.classList.contains("active")
        ).length;

        if (activeCount >= 3 && item.classList.contains("active")) {
          // Если уже активны 3 кнопки, то отключаем все кроме нажатой
          brendBtn.forEach((btn) => btn.classList.remove("active"));
          item.classList.add("active");
        } else if (activeCount === 2 && item.classList.contains("active")) {
          // Если 2 активны и нажата уже активная, то просто удаляем её активность
          item.classList.remove("active");
        } else if (activeCount === 1 && item.classList.contains("active")) {
          // Нельзя отключать единственную активную кнопку
          return;
        } else {
          // Если менее 3 активных и нажата неактивная кнопка, то просто активируем
          item.classList.toggle("active");
        }
      } else {
        // Для кнопок filter-btn просто переключаем их состояние
        item.classList.toggle("active");
      }

      // Сбор всех активных brend-btn в массив filterActive
      const filterActive = Array.from(brendBtn)
        .filter((el) => el.classList.contains("active"))
        .map((el) => el.querySelector("h2").textContent);

      const tip = document.querySelector(".tip");
      if (filterActive.length > 0) {
        const brandNames = filterActive.join(", ");
        tip.classList.add("active");
        tip.innerHTML = `<h3>Задан фильтр:<br> ${brandNames}</h3>`;
      } else {
        tip.classList.remove("active");
        tip.innerHTML = "";
      }

      renderCategories(filterActive);
      createListMenu(filterActive);
    });
  });
};

activeBrend();
// ///////////////////////////---- BREND ------////////////////////////////////

/////////////////////////---------LEFT-MENU--------///////////////////////////////////
const renderCategories = async (selectedFilters = []) => {
  const categoriesObjects = await getFlatCategoryObjects(); // получаем массив объектов

  // Фильтруем объекты по brand и filter
  const filteredObjects = categoriesObjects.filter((obj) => {
    const filterMatches =
      selectedFilters.length === 0 ||
      selectedFilters.some((filter) => obj.filter.includes(filter));
    return filterMatches;
  });

  // Группируем данные обратно по категориям/подкатегориям
  const grouped = {};
  filteredObjects.forEach((obj) => {
    if (!grouped[obj.categoryName]) grouped[obj.categoryName] = {};
    if (!grouped[obj.categoryName][obj.subCategoryName])
      grouped[obj.categoryName][obj.subCategoryName] = [];
    grouped[obj.categoryName][obj.subCategoryName].push(obj);
  });

  const mainCategoriesContainer = document.querySelectorAll(".main-categories");
  mainCategoriesContainer.forEach((container) => {
    container.innerHTML = "";

    for (const categoryName in grouped) {
      const categoryItem = document.createElement("li");
      categoryItem.innerHTML = `
            <h2 class="open-img">${categoryName}</h2>
            <ul class="main-sub_categories main-items close">
            </ul>
            `;
      const subCategoriesContainer = categoryItem.querySelector(
        ".main-sub_categories"
      );

      for (const subCategoryName in grouped[categoryName]) {
        const subCategoryItem = document.createElement("li");
        subCategoryItem.innerHTML = `
                <h2 class="open-img">${subCategoryName}</h2>
                <ul class="main-items close"></ul>
                `;
        const objectsContainer = subCategoryItem.querySelector(".main-items");
        grouped[categoryName][subCategoryName].forEach((obj) => {
          const objectItem = document.createElement("li");
          objectItem.classList.add("object-item", "object-click");
          objectItem.innerHTML = `<h2 class="obj-btn">${obj.name} ${obj.cod}</h2>`;
          objectsContainer.appendChild(objectItem);
        });
        subCategoriesContainer.appendChild(subCategoryItem);
      }

      container.appendChild(categoryItem);
    }
    setupToggleCategories();
    sPartToggle();
  });
};

renderCategories();

/////////////////////////---------LEFT-MENU--------///////////////////////////////////

// ////////////////////////////------LEFT_MENU_ANIMATED--------///////////////////////////
const setupToggleCategories = () => {
  const openItems = document.querySelectorAll(".open-img");

  openItems.forEach((item) => {
    item.addEventListener("click", () => {
      const subcategories = item.nextElementSibling;
      const allSubcategories = document.querySelectorAll("ul.open, ul.close");

      allSubcategories.forEach((ul) => {
        if (ul !== subcategories && !ul.contains(item)) {
          ul.classList.remove("open");
          ul.classList.add("close");
          const parentItem = ul.previousElementSibling;
          if (parentItem) {
            parentItem.classList.remove("active");
          }
        }
      });

      if (subcategories) {
        subcategories.classList.toggle("open");
        subcategories.classList.toggle("close");

        if (subcategories.classList.contains("open")) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      }
    });
  });
};
const ActiveLeftMenuItem = (item) => {
  const objectItems = document.querySelectorAll(".object-item");
  const objectItemsActive = document.querySelectorAll(".object-item.active");

  // Удаление класса 'active' у всех элементов
  objectItems.forEach((el) => {
    el.classList.remove("active");
  });

  // Добавление класса 'active' к текущему элементу
  item.classList.add("active");

  // Получаем текст текущего элемента и находим все элементы меню
  const itemText = item.querySelector(".menu-obj-text")?.textContent?.trim();
  const leftMenuItems = document.querySelectorAll(".object-item");

  let foundActiveItem = false; // Флаг для отслеживания найденного активного элемента

  // Поиск соответствующего элемента в меню
  leftMenuItems.forEach((leftItem) => {
    const leftItemText = leftItem
      .querySelector(".obj-btn")
      ?.textContent?.trim();

    if (leftItemText && leftItemText === itemText) {
      leftItem.classList.add("active");

      // Убираем класс open у всех элементов main-items и main-sub_categories
      const allMainItems = document.querySelectorAll(".main-items");
      allMainItems.forEach((item) => {
        item.classList.remove("open");
        item.classList.add("close");
      });

      const allSubCategoryItems = document.querySelectorAll(
        ".main-sub_categories"
      );
      allSubCategoryItems.forEach((item) => {
        item.classList.remove("open");
        item.classList.add("close");
      });

      const mainItemParent = leftItem.closest(".main-items");
      const subCategoryParent = leftItem.closest(".main-sub_categories");

      // Изменим классы у найденных родителей

      if (mainItemParent) {
        mainItemParent.classList.remove("close");
        mainItemParent.classList.add("open");
      }

      if (subCategoryParent) {
        subCategoryParent.classList.remove("close");
        subCategoryParent.classList.add("open");
      }
    }
  });
};
// ///////////////////////------LEFT_MENU_ANIMATED--------////////////////////////////

// /////////////////////////---------MENU--------///////////////////////////////////
const createListMenu = async (selectedFilters = []) => {
  const dataCategoriesMenu = await fetchDataCategories();
  const menuContainer = document.querySelector(".menu-categories");
  menuContainer.innerHTML = "";

  const categories = dataCategoriesMenu[0].categories[langToggle];

  for (const [categoryName, categoryDetails] of Object.entries(categories)) {
    const subCategoriesHTML = Object.entries(
      categoryDetails.subCategories || {}
    )
      .map(([subCategoryName, subCategoryDetails]) => {
        // Фильтруем объекты по брендам и фильтрам
        const filteredObjects = (subCategoryDetails.object || []).filter(
          (obj) => {
            const filterMatches =
              selectedFilters.length === 0 ||
              selectedFilters.some((filter) => obj.filter.includes(filter));

            return filterMatches;
          }
        );

        const objectsHTML = filteredObjects
          .map(
            (object) => `
            <li class="menu-obj-item object-click">
              <h2 class="menu-obj-text">${object.name + " " + object.cod}</h2>
            </li>`
          )
          .join("");

        // Если после фильтрации остались объекты, создаем HTML
        return objectsHTML.length > 0
          ? `
          <li>
            <h2 class="menu-sub_categories-text">${subCategoryName}</h2>
            <ul class="menu-items">
              ${objectsHTML}
            </ul>
          </li>`
          : ""; // Возвращаем пустую строку, если нет объектов
      })
      .join("");

    // Если есть подкатегории, создаем HTML для категории
    if (subCategoriesHTML.length > 0) {
      const categoryHTML = `
      <li>
        <h2 class="menu-categories-text">${categoryName}</h2>
        <ul class="menu-sub_categories">
          ${subCategoriesHTML}
        </ul>
      </li>`;
      menuContainer.innerHTML += categoryHTML;
    }
  }
  objClick(); // Вызываем функцию обработчиков кликов
  sPartToggle();
};
createListMenu();
// /////////////////////////---------MENU--------///////////////////////////////////

// /////////////////////////---------OBJECT_ANIMATED--------///////////////////////////////////
const objAnimated = () => {
  const elementsToAnimate = [
    document.querySelector(".object-prevue"),
    document.querySelector(".object-descripcion-con"),
    document.querySelector(".object-specifications"),
  ];

  const showElement = (element) => {
    element.classList.add("hide");
    setTimeout(() => {
      element.classList.remove("hide");
    }, 300);
  };

  elementsToAnimate.forEach(showElement);
};
// /////////////////////////---------OBJECT_ANIMATED--------///////////////////////////////////

// /////////////////////////--------- PHOTO -------///////////////////////////////////
function updateSlides(object) {
  // Проверяем, существует ли объект и его массив photo
  if (object && Array.isArray(object.photo)) {
    const photoUrls = object.photo; // Получаем массив URL изображений

    // Получаем контейнер для основных слайдов
    const mainSwiperWrapper = document.querySelector(".object-swiper-wrapper");
    mainSwiperWrapper.innerHTML = ""; // Очищаем текущие слайды

    // Получаем контейнер для мини-слайдов
    const miniSwiperWrapper = document.querySelector(
      ".object-swiper-wrapper_mini"
    );
    miniSwiperWrapper.innerHTML = ""; // Очищаем текущие мини-слайды

    // Заполняем контейнеры новыми слайдами
    photoUrls.forEach((url) => {
      // Создаём слайд для основного слайдера
      const mainSlide = document.createElement("div");
      mainSlide.classList.add("swiper-slide", "object-slide");
      mainSlide.innerHTML = `<img src="${url}" />`;
      mainSwiperWrapper.appendChild(mainSlide);

      // Создаём слайд для мини-слайдера
      const miniSlide = document.createElement("div");
      miniSlide.classList.add("swiper-slide", "object-slide_mini");
      miniSlide.innerHTML = `<img src="${url}" />`;
      miniSwiperWrapper.appendChild(miniSlide);
    });

    var objectSwiper = new Swiper(".object-swiper", {
      loop: true,
      spaceBetween: 0,
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

    objectSwiper.update();
    objectSwiperMini.update();
  }
}
// /////////////////////////--------- PHOTO --------///////////////////////////////////

// /////////////////////////---------OBJECT-KLICK--------///////////////////////////////////

// 1. Централизованная функция обработки выбора объекта:
async function selectAndDisplayObject(objectName) {
  //const langToggle = window.langToggle || "ru";

  const objName = document.querySelector(".object-name_main-text");
  const objDescripcion = document.querySelector(
    ".object-descripcion_main-text"
  );

  const spec = document.querySelector(".object-specifications_table");
  const data = await fetchDataCategories();

  // Поиск объекта по имени (или дружественному тексту)
  function findObject(categories, text) {
    for (const category of Object.values(categories)) {
      for (const subCategory of Object.values(category.subCategories)) {
        for (const object of subCategory.object || []) {
          const objectText = `${object.name} ${object.cod}`;
          if (objectText === text) {
            return object;
          }
        }
      }
    }
    return null;
  }

  const object = findObject(data[0].categories[langToggle], objectName);

  if (!object) {
    console.log("Объект не найден");
    return;
  }

  // Заполнить поля
  objName.textContent = object.name + " " + object.cod;
  objDescripcion.textContent = object.description;
  nameModal(object.name, object.cod);

  // Характеристики
  let specHTML = `
	<h1 class="object-specifications-title">Технические характеристики</h1>
    <tr class="object-specifications_table-title">
      <th><h1>наименование характеристики</h1></th>
      <th><h1>количество | Ед. изм.</h1></th>
    </tr>`;
  for (const key in object.specifications) {
    if (object.specifications.hasOwnProperty(key)) {
      specHTML += `
      <tr>
          <td><h1>${key}</h1></td>
          <td><h1>${object.specifications[key]}</h1></td>
      </tr>`;
    }
  }
  spec.innerHTML = specHTML;
  updateSlides(object);
}
// 2. Единый обработчик кликов (используйте централизованную функцию):
const objClick = async () => {
  const objClickElements = document.querySelectorAll(".object-click");
  objClickElements.forEach((item) => {
    item.addEventListener("click", async () => {
      const objectName = item.innerText.trim();
      // catalogMobMenu.classList.remove("active");
      // closeCatMenu.classList.add("hide");
      // openCatMenu.classList.remove("hide");
      const openCatMenu = document.querySelector(".open-cat-menu");
      const closeCatMenu = document.querySelector(".close-cat-menu");
      const catalogMobMenu = document.querySelector(".categories-con");

      if (catalogMobMenu) {
        catalogMobMenu.classList.remove("active");
        openCatMenu.classList.remove("hide");
        closeCatMenu.classList.add("hide");
      }
      // Если не на catalog.php, сохранить состояние и редирект
      if (window.location.pathname !== "/pages/catalog.php") {
        localStorage.setItem("objectToFind", objectName);
        window.location.href = "/pages/catalog.php";
        return;
      }
      objAnimated(); // если нужно до отрисовки
      await selectAndDisplayObject(objectName);
      ActiveLeftMenuItem(item);
    });
  });
};
// Запуск показа нужного объекта из localStorage (на catalog.php)
document.addEventListener("DOMContentLoaded", async () => {
  const cachedObjectName = localStorage.getItem("objectToFind");
  if (cachedObjectName) {
    localStorage.removeItem("objectToFind");
    await selectAndDisplayObject(cachedObjectName);

    const leftMenuItems = document.querySelectorAll(".object-item");

    leftMenuItems.forEach((leftItem) => {
      const leftItemText = leftItem
        .querySelector(".obj-btn")
        ?.textContent?.trim();

      if (leftItemText && leftItemText === cachedObjectName) {
        leftItem.classList.add("active");

        // Убираем класс open у всех элементов main-items и main-sub_categories
        const allMainItems = document.querySelectorAll(".main-items");
        allMainItems.forEach((item) => {
          item.classList.remove("open");
          item.classList.add("close");
        });

        const allSubCategoryItems = document.querySelectorAll(
          ".main-sub_categories"
        );
        allSubCategoryItems.forEach((item) => {
          item.classList.remove("open");
          item.classList.add("close");
        });

        const mainItemParent = leftItem.closest(".main-items");
        const subCategoryParent = leftItem.closest(".main-sub_categories");

        // Изменим классы у найденных родителей

        if (mainItemParent) {
          mainItemParent.classList.remove("close");
          mainItemParent.classList.add("open");
        }

        if (subCategoryParent) {
          subCategoryParent.classList.remove("close");
          subCategoryParent.classList.add("open");
        }
      }
    });
  }
});
// // Функции для меню/поиска:
const syncMenus = () => {
  const menuItems = document.querySelectorAll(".menu-obj-item");
  const searchItems = document.querySelectorAll(".search-item");
  // Синхронизация при кликах:
  [...menuItems, ...searchItems].forEach((el) => {
    el.addEventListener("click", async () => {
      const itemText = el.innerText.trim();
      await selectAndDisplayObject(itemText);
    });
  });
};

// /////////////////////////---------OBJECT-KLICK--------///////////////////////////////////

// ////////////////////////-----------SEARCH------------/////////////////////////////////
const search = (async = () => {
  const searchProducts = async (query) => {
    const data = await fetchDataCategories();

    if (!data || !data.length) {
      console.error("Неверные данные");
      return;
    }

    const results = [];

    data.forEach((category) => {
      for (const categoryName in category.categories[langToggle]) {
        const subCategories =
          category.categories[langToggle][categoryName].subCategories;

        for (const subCategoryName in subCategories) {
          const products = subCategories[subCategoryName].object;

          if (Array.isArray(products)) {
            // Фильтруем продукты по запросу
            products.forEach((item) => {
              if (item && typeof item === "object") {
                // Приводим все значимые поля к строчным символам для поиска
                const name = item.name
                  ? item.name.toString().toLowerCase()
                  : "";
                const cod = item.cod ? item.cod.toString().toLowerCase() : "";
                const description = item.description
                  ? item.description.toString().toLowerCase()
                  : "";
                const subCategories = item.subCategories
                  ? item.subCategories.toString().toLowerCase()
                  : "";
                const filter = item.filter
                  ? item.filter.toString().toLowerCase()
                  : "";

                // Проверяем, если хотя бы одно из полей содержит запрос
                if (
                  query &&
                  typeof query === "string" &&
                  (name.includes(query.toLowerCase()) ||
                    cod.includes(query.toLowerCase()) ||
                    description.includes(query.toLowerCase()) ||
                    subCategories.includes(query.toLowerCase()) ||
                    filter.includes(query.toLowerCase()))
                ) {
                  results.push(item);
                }
              } else {
                console.warn("Невалидный товар:", item);
              }
            });
          }
        }
      }
    });

    displayResults(results);
  };

  const displayAllProducts = async () => {
    const data = await fetchDataCategories();

    if (!data || !data.length) {
      console.error("Неверные данные");
      return;
    }

    const allProducts = [];

    data.forEach((category) => {
      for (const categoryName in category.categories[langToggle]) {
        const subCategories =
          category.categories[langToggle][categoryName].subCategories;

        for (const subCategoryName in subCategories) {
          const products = subCategories[subCategoryName].object;

          if (Array.isArray(products)) {
            allProducts.push(...products); // Собираем все товары
          }
        }
      }
    });

    // Фильтруем товары по популярности и новизне
    const popularAndNewProducts = allProducts.filter(
      (product) => (product.filter && product.filter[0]) || product.filter[1]
    );

    const otherProducts = allProducts.filter(
      (product) =>
        !((product) =>
          (product.filter && product.filter[0]) || product.filter[1])
    );

    // Объединяем массивы
    const sortedProducts = [...popularAndNewProducts, ...otherProducts];

    document
      .getElementById("searchInput")
      .addEventListener("input", (event) => {
        const query = event.target.value;
        if (query.length > 0) {
          searchProducts(query);
        } else {
          displayResults(sortedProducts);
        }
      });

    displayResults(sortedProducts); // Отображаем все товары в нужном порядке
  };

  const displayResults = (results) => {
    const resultsContainer = document.getElementById("resultsContainer");
    resultsContainer.innerHTML = ""; // Очистка предыдущих результатов

    if (results.length === 0) {
      resultsContainer.innerHTML = `<h2 class="no-search">Инструмент не найден</h2>`;
      //displayResults(sortedProducts);
      return;
    }

    results.forEach((item) => {
      const resultItem = document.createElement("div");
      resultItem.classList.add("result-item");

      resultItem.innerHTML = `
        <div class="search-photo">
            <img src="${item.photo[0]}" alt="${item.name}">
        </div>
        <div class="search-item object-click">
            <h1>${item.name + " " + item.cod}</h1>
            <div class="search-filter">
                <span class="search-filter-item">${
                  item.filter[1] ? item.filter[1] : ""
                }</span>
                <h3 class="search-filter-item">${
                  item.filter[0] ? item.filter[0] : ""
                }</h3>
            </div>
        </div>
    `;

      resultsContainer.appendChild(resultItem);

      // Здесь мы добавляем обработчик события клика на сам resultItem
      resultItem.addEventListener("click", () => {
        const objName = document.querySelector(".object-name_main-text");
        const objDescripcion = document.querySelector(
          ".object-descripcion_main-text"
        );
        const spec = document.querySelector(".object-specifications_table");
        if (objName) {
          objName.textContent = item.name + " " + item.cod;
          objDescripcion.textContent = item.description;

          let specHTML = `
            <h1 class="object-specifications-title">Технические характеристики</h1>
            <tr class="object-specifications_table-title">
                <th><h1>наименование характеристики</h1></th>
                <th><h1>количество | Ед. изм.</h1></th>
            </tr>`;
          for (const key in item.specifications) {
            if (item.specifications.hasOwnProperty(key)) {
              specHTML += `
							<tr>
									<td><h1>${key}</h1></td>
									<td><h1>1${item.specifications[key]}</h1></td>
							</tr>`;
            }
          }
          spec.innerHTML = specHTML;

          const leftMenuA = document.createElement("li");
          leftMenuA.className = "menu-obj-item object-click";
          leftMenuA.innerHTML = `<h2 class="menu-obj-text">${
            item.name + " " + item.cod
          }</h2>`;

          const resultsContainer = document.getElementById("resultsContainer");
          const search = document.querySelector(".search");

          resultsContainer.classList.remove("active");
          search.classList.remove("active");

          ActiveLeftMenuItem(leftMenuA);
          objAnimated(leftMenuA);
        }

        if (window.location.pathname !== "/pages/catalog.php") {
          localStorage.setItem("objectToFind", objName);
          window.location.href = "/pages/catalog.php";
          return;
        }
        selectAndDisplayObject(objName);

        const sPart = document.querySelector(".spare-parts-btn");
        const object = document.querySelector(".object");
        const sPartsCon = document.querySelector(".spare-parts-con");
        sPart.classList.remove("active");
        object.classList.add("active");
        sPartsCon.classList.remove("active");
      });
    });
  };

  document.getElementById("searchInput").addEventListener("focus", (event) => {
    const query = event.target.value;
    if (query.length === 0) {
      displayAllProducts();
    }
  });

  const resultsContainer = document.getElementById("resultsContainer");
  const search = document.querySelector(".search");

  // Обработчик клика на элемент поиска
  search.addEventListener("click", (event) => {
    event.stopPropagation(); // Предотвращаем всплытие события
    resultsContainer.classList.add("active");
    search.classList.add("active");
  });

  // Обработчик клика на документе
  document.addEventListener("click", (event) => {
    // Проверяем, не кликнули ли мы по элементу поиска или контейнеру результатов
    if (
      !search.contains(event.target) &&
      !resultsContainer.contains(event.target)
    ) {
      resultsContainer.classList.remove("active");
      search.classList.remove("active");
    }
  });

  searchProducts();
});
search();
// ////////////////////////-----------SEARCH------------/////////////////////////////////
//////////////////////--------TITLE_CATEGIRY-------//////////////////////////////

const titleSlides = async () => {
  const categoriesObjects = await getFlatCategoryObjects();
  const swiperWrapper = document.querySelector(".title-wrapper");

  // Очищаем содержимое всех слайдов, кроме первого
  const slides = document.querySelectorAll(
    ".title-slide:not(.title-slide-mov)"
  );
  slides.forEach((slide) => {
    slide.remove();
  });

  // Убедимся, что title-slide-mov на первом месте
  const firstSlide = document.querySelector(".title-slide-mov");
  if (firstSlide) {
    swiperWrapper.prepend(firstSlide);
  }

  const titlesWithObjects = [];

  if (swiperWrapper) {
    categoriesObjects.forEach((obj) => {
      if (obj.title) {
        titlesWithObjects.push(obj); // Если title существует, добавляем объект в массив
      }
    });

    // Создаем и добавляем новые слайды для каждого объекта с title
    titlesWithObjects.forEach((obj) => {
      const newSlide = document.createElement("div");
      newSlide.classList.add("swiper-slide", "title-slide");

      newSlide.innerHTML = `
      <div class="slide-text">
        <h3>Опрыскиватели для многолетних насаждений</h3>
        <h1>${obj.name} ${obj.cod}</h1>
        <h2>${obj.description}.</h2>
        <button class="btn title-btn-obj">Побробнее</button>
      </div>
      <img src="${obj.photo[0]}" />
    `;

      // Добавляем новый слайд в swiper-wrapper
      swiperWrapper.appendChild(newSlide);

      // Сохраняем ссылку на объект obj для обработки события
      const titleBtnObj = newSlide.querySelector(".title-btn-obj");

      titleBtnObj.addEventListener("click", async () => {
        const objectName = obj.name + " " + obj.cod;

        if (window.location.pathname !== "/pages/catalog.php") {
          localStorage.setItem("objectToFind", objectName);
          window.location.href = "/pages/catalog.php";
          return;
        }

        objAnimated(); // если нужно до отрисовки
        await selectAndDisplayObject(objectName);
        ActiveLeftMenuItem(objectName);
      });
    });
  }

  //////////////////////////////////////////////////////////////////////////////////

  const progressCircle = document.querySelector(".autoplay-progress svg");
  const progressContent = document.querySelector(".autoplay-progress span");
  const progress = document.querySelector(".autoplay-progress");

  var titleSwiper = new Swiper(".title-swiper", {
    loop: true,
    speed: 1500,
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 18000,
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
      slideChange() {
        // Перезапускаем автопроигрывание
        this.autoplay.start();
        // Сбрасываем время и прогресс
        const remainingTime = this.params.autoplay.delay;
        // Обновляем прогресс
        progressCircle.style.setProperty("--progress", 0); // Сбрасываем прогресс
        progressContent.textContent = `${Math.ceil(remainingTime / 1000)}`; // Обновляем прогресс по времени
      },
    },
  });

  var isAutoplaying = true;

  if (progress) {
    // Проверяем, существует ли titleSwiper
    progress.addEventListener("click", function () {
      if (isAutoplaying) {
        titleSwiper.autoplay.stop(); // Останавливаем автопроигрывание
        progressContent.innerHTML = `<svg class="title-play" width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M0.966797 5.24512V0.713867L5.07987 2.85717C5.15107 2.89427 5.15172 2.99592 5.081 3.03393L0.966797 5.24512Z" fill="#58C88A"/>
  </svg>`; // Меняем иконку на кнопке при остановке
      } else {
        titleSwiper.autoplay.start(); // Запускаем автопроигрывание
        progressContent.innerHTML = `<svg class="title-pause" width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="2" height="6" fill="#58C88A"/>
  <rect x="4" width="2" height="6" fill="#58C88A"/>
  </svg>`; // Меняем иконку на кнопке при запуске
      }
      isAutoplaying = !isAutoplaying; // Переключаем состояние
    });
  }

  ////////////////////////////////////////////////////////////////////////
};

document.addEventListener("DOMContentLoaded", function () {
  titleSlides();
});

//////////////////////--------TITLE_CATEGIRY-------//////////////////////////////

// //////////////////////-------MENU-------//////////////////////////////
const openMenu = document.querySelector(".open-menu");
const closeMenu = document.querySelector(".close-menu");
const mainMobMenu = document.querySelector(".main-mob-menu");
const openCatMenu = document.querySelector(".open-cat-menu");
const closeCatMenu = document.querySelector(".close-cat-menu");
const catalogMobMenu = document.querySelector(".categories-con");
//const objectItem = document.querySelectorAll(".obj-btn");
//const button = document.querySelector(".btn-modal");

openMenu.addEventListener("click", () => {
  mainMobMenu.classList.add("active");
  closeMenu.classList.remove("hide");
});

document.addEventListener("click", (event) => {
  if (!mainMobMenu.contains(event.target) && !openMenu.contains(event.target)) {
    mainMobMenu.classList.remove("active");
    closeMenu.classList.add("hide");
  }
});

openCatMenu.addEventListener("click", () => {
  catalogMobMenu.classList.add("active");
  openCatMenu.classList.add("hide");
  closeCatMenu.classList.remove("hide");
});

document.addEventListener("click", (event) => {
  if (
    (!catalogMobMenu.contains(event.target) &&
      !openCatMenu.contains(event.target)) ||
    closeCatMenu.contains(event.target)
  ) {
    catalogMobMenu.classList.remove("active");
    openCatMenu.classList.remove("hide");
    closeCatMenu.classList.add("hide");
  }
});

// closeMenu.addEventListener("click", () => {
//   openCatMenu.classList.remove("hide");
//   mainMobMenu.classList.remove("active");
//   closeMenu.classList.add("hide");
//   closeCatMenu.remove("hide");
//   mainMobMenu.classList.remove("active");
//   closeMenu.classList.add("hide");
// });
//

// closeCatMenu.addEventListener("click", () => {
//   catalogMobMenu.classList.remove("active");
//   openCatMenu.classList.remove("hide");
//   closeCatMenu.classList.add("hide");
// });

// var hammertime = new Hammer(document.body, {
//   enable: true,
//   recognizers: [[Hammer.Swipe, { direction: Hammer.DIRECTION_HORIZONTAL }]],
// });

// hammertime.on("swipeleft", function (ev) {
//   catalogMobMenu.classList.remove("active");
//   closeCatMenu.classList.add("hide");
//   openCatMenu.classList.remove("hide");
// });

// hammertime.on("swiperight", function (ev) {
//   mainMobMenu.classList.remove("active");
//   closeMenu.classList.add("hide");
//   openCatMenu.classList.remove("hide");
// });

// //////////////////////-------MENU-------//////////////////////////////

//////////////////////--------MODAL--------//////////////////////////////
function nameModal(name, cod) {
  const modalButtons = document.querySelectorAll(".btn-modal-call");
  const formData = document.querySelectorAll(".form-data");
  const formDataLeasing = document.querySelectorAll(".form-data-leasing");
  const formDataSPart = document.querySelectorAll(".form-data-SPart");
  const formDataSPartAll = document.querySelectorAll(".form-data-SPartAll");

  const modal = document.querySelectorAll(".modal");

  const renderModal = (content) => {
    modal.forEach((m) => {
      m.innerHTML = content;
      closeModal();
      updateButtonState();
    });
  };
  const modalContentLeasing = `
  <div class="modal-title">
    <img class="modal-logo" src="/assets/svg/logo.svg" alt="">
    <img class="close-modal" src="/assets/svg/close-green.svg" alt="">
  </div>
  <form class="modal-form form" action="#" method="POST">
	  <input type="hidden" name="Заявка на технику" value="Обратная связь">
    <input class="input-name-title" name="Наименование техники" value="${name}" readonly>
		<input class="input-name-title" name="Код техники" value="${cod}" readonly>
    <input class="input-name-modal input-name" type="text" name="Имя" placeholder="Ваше имя *">
    <input class="input-tel-modal input-tel" type="tel" name="Телефон" placeholder="Телефон *">
    <input class="input-mail" type="email" name="E-mail" placeholder="E-mail *">
    <textarea class="input-commet" name="Комментарий" placeholder="Введите комментарий" rows="2"></textarea>
    <button class="btn btn-modal" disabled="false">Отправить</button>
    <label class="check-form" for="check-form-id">
      <input id="check-form-id" type="checkbox">
      <span>Согласен с обработкой персональных данных в соответствии с <a href="/pages/about.php#policy">политикой конфиденциальности</a></span>
    </label>
		<div class="link link-form">
			<a href="#"><img src="/assets/svg/link/wt.svg" alt=""></a>
			<a href="#"><img src="/assets/svg/link/tg.svg" alt=""></a>
			<a class="mail-btn"><img src="/assets/svg/link/ml.svg" alt="">
				<div class="mail-drop-btn">
						<h2 class="copy">mekagrogrup@mail.ru</h2>
				</div>
			</a>
			<a href="#"><img src="/assets/svg/link/vk.svg" alt=""></a>
			<a class="mail-btn"><img src="/assets/svg/link/tel.svg" alt="">
				<div class="mail-drop-btn">
						<h2 class="copy">+7 (989) 807-00-15</h2>
				</div>
			</a>
		</div>
  </form>
`;

  const modalContentSPart = `
  <div class="modal-title">
    <img class="modal-logo" src="/assets/svg/logo.svg" alt="">
    <img class="close-modal" src="/assets/svg/close-green.svg" alt="">
  </div>
  <form class="modal-form form" action="#" method="POST">
	  <input type="hidden" name="Заявка на технику" value="Обратная связь">
    <input class="input-name-title" name="Наименование техники" value="${name}" readonly>
		<input class="input-name-title" name="Код техники" value="${cod}" readonly>
    <input class="input-name-modal input-name" type="text" name="Имя" placeholder="Ваше имя *">
    <input class="input-tel-modal input-tel" type="tel" name="Телефон" placeholder="Телефон *">
    <input class="input-mail" type="email" name="E-mail" placeholder="E-mail *">
    <textarea class="input-commet" name="Комментарий" placeholder="Введите комментарий" rows="2"></textarea>
    <button class="btn btn-modal" disabled="false">Отправить</button>
    <label class="check-form" for="check-form-id">
      <input id="check-form-id" type="checkbox">
      <span>Согласен с обработкой персональных данных в соответствии с <a href="/pages/about.php#policy">политикой конфиденциальности</a></span>
    </label>
		<div class="link link-form">
			<a href="#"><img src="/assets/svg/link/wt.svg" alt=""></a>
			<a href="#"><img src="/assets/svg/link/tg.svg" alt=""></a>
			<a class="mail-btn"><img src="/assets/svg/link/ml.svg" alt="">
				<div class="mail-drop-btn">
						<h2 class="copy">mekagrogrup@mail.ru</h2>
				</div>
			</a>
			<a href="#"><img src="/assets/svg/link/vk.svg" alt=""></a>
			<a class="mail-btn"><img src="/assets/svg/link/tel.svg" alt="">
				<div class="mail-drop-btn">
						<h2 class="copy">+7 (989) 807-00-15</h2>
				</div>
			</a>
		</div>
  </form>
`;
  const modalContentSPartAll = `
  <div class="modal-title">
    <img class="modal-logo" src="/assets/svg/logo.svg" alt="">
    <img class="close-modal" src="/assets/svg/close-green.svg" alt="">
  </div>
  <form class="modal-form form" action="#" method="POST">
	  <input type="hidden" name="Заявка на технику" value="Обратная связь">
    <input class="input-name-title" name="Наименование техники" value="${[
      name,
    ]}" readonly>
		<input class="input-name-title" name="Код техники" value="${[cod]}" readonly>
    <input class="input-name-modal input-name" type="text" name="Имя" placeholder="Ваше имя *">
    <input class="input-tel-modal input-tel" type="tel" name="Телефон" placeholder="Телефон *">
    <input class="input-mail" type="email" name="E-mail" placeholder="E-mail *">
    <textarea class="input-commet" name="Комментарий" placeholder="Введите комментарий" rows="2"></textarea>
    <button class="btn btn-modal" disabled="false">Отправить</button>
    <label class="check-form" for="check-form-id">
      <input id="check-form-id" type="checkbox">
      <span>Согласен с обработкой персональных данных в соответствии с <a href="/pages/about.php#policy">политикой конфиденциальности</a></span>
    </label>
		<div class="link link-form">
			<a href="#"><img src="/assets/svg/link/wt.svg" alt=""></a>
			<a href="#"><img src="/assets/svg/link/tg.svg" alt=""></a>
			<a class="mail-btn"><img src="/assets/svg/link/ml.svg" alt="">
				<div class="mail-drop-btn">
						<h2 class="copy">mekagrogrup@mail.ru</h2>
				</div>
			</a>
			<a href="#"><img src="/assets/svg/link/vk.svg" alt=""></a>
			<a class="mail-btn"><img src="/assets/svg/link/tel.svg" alt="">
				<div class="mail-drop-btn">
						<h2 class="copy">+7 (989) 807-00-15</h2>
				</div>
			</a>
		</div>
  </form>
`;

  const modalContentForm = `
  <div class="modal-title">
    <img class="modal-logo" src="/assets/svg/logo.svg" alt="">
    <img class="close-modal" src="/assets/svg/close-green.svg" alt="">
  </div>
  <form class="modal-form form" action="#" method="POST">
    <input type="hidden" name="Заявка" value="Обратная связь">
    <input class="input-name-modal input-name" type="text" name="Имя" placeholder="Ваше имя *">
    <input class="input-tel-modal input-tel" type="tel" name="Телефон" placeholder="Телефон *">
    <input class="input-mail" type="email" name="E-mail" placeholder="E-mail *">
    <textarea class="input-commet" name="Комментарий" placeholder="Введите комментарий" rows="2"></textarea>
    <button class="btn btn-modal" disabled="false">Отправить</button>
    <label class="check-form" for="check-form-id">
      <input id="check-form-id" type="checkbox" >
      <span>Согласен с обработкой персональных данных в соответствии с <a href="/pages/about.php#policy">политикой конфиденциальности</a></span>
    </label>
    <div class="link link-form">
			<a href="#"><img src="/assets/svg/link/wt.svg" alt=""></a>
			<a href="#"><img src="/assets/svg/link/tg.svg" alt=""></a>
			<a class="mail-btn"><img src="/assets/svg/link/ml.svg" alt="">
				<div class="mail-drop-btn">
						<h2 class="copy">mekagrogrup@mail.ru</h2>
				</div>
			</a>
			<a href="#"><img src="/assets/svg/link/vk.svg" alt=""></a>
			<a class="mail-btn"><img src="/assets/svg/link/tel.svg" alt="">
				<div class="mail-drop-btn">
						<h2 class="copy">+7 (989) 807-00-15</h2>
				</div>
			</a>
		</div>
  </form>
`;

  const attachEventListenersToButtons = (buttons, content) => {
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        renderModal(content);
        validate();
      });
    });
  };

  attachEventListenersToButtons(formDataLeasing, modalContentLeasing);
  attachEventListenersToButtons(formDataSPart, modalContentSPart);
  attachEventListenersToButtons(formDataSPartAll, modalContentSPartAll);
  attachEventListenersToButtons(formData, modalContentForm);

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

  const closeModal = () => {
    document
      .querySelector(".close-modal")
      .addEventListener("click", function () {
        document.querySelector(".modal-con").classList.remove("show");
        document.querySelector(".modal-con").classList.add("hide");
      });
  };

  const updateButtonState = () => {
    const check = document.getElementById("check-form-id");
    const btnModal = document.querySelector(".btn-modal");
    if (check) {
      check.addEventListener("click", () => {
        if (check.checked) {
          btnModal.disabled = false;
          btnModal.style.opacity = 1;
        } else {
          btnModal.disabled = true;
          btnModal.style.opacity = 0.5;
        }
      });
    }
  };
}
nameModal();

//////////////////////--------MODAL--------//////////////////////////////
function validate() {
  const form = document.querySelector(".form");

  const telSelector = form.querySelector(".input-tel");
  const inputmask = new Inputmask("+7 (999) 999-99-99");

  inputmask.mask(telSelector);

  const validation = new JustValidate(".form");

  validation
    .addField(".input-name", [
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
    .addField(".input-tel", [
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

const mainForm = document.querySelector(".main-form");
if (mainForm) {
  validate();
  const check = document.getElementById("check-form-id");
  const btnForm = document.querySelector(".btn-form-main");
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

function validateF() {
  const forms = document.querySelectorAll(".form-f");

  forms.forEach((form) => {
    const telSelector = form.querySelector(".input-tel-f");

    if (telSelector) {
      const inputmask = new Inputmask("+7 (999) 999-99-99");
      inputmask.mask(telSelector);

      const validation = new JustValidate(form);

      validation
        .addField(".input-tel-f", [
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
    } else {
      console.error("Телефонный ввод не найден в форме");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const footerForm = document.querySelectorAll(".form-f");

  if (footerForm.length > 0) {
    validateF();
  }
});

const upBtns = document.querySelectorAll(".up-btn");

if (upBtns) {
  upBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      console.log("ok");
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  });
}
