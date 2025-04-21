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
///////////////////////////----JSON------////////////////////////////////

///////////////////////////---- BREND ------////////////////////////////////
const activeBrend = async () => {
  const categoriesBrand = document.querySelectorAll(".categories-brand");

  categoriesBrand.forEach((item) => {
    item.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      const activeCount = Array.from(categoriesBrand).filter((el) =>
        el.classList.contains("active")
      ).length;

      if (isActive) {
        if (activeCount > 1) {
          item.classList.remove("active");
        }
      } else {
        item.classList.add("active");
      }

      const activeBrands = Array.from(categoriesBrand)
        .filter((el) => el.classList.contains("active"))
        .map((el) => el.querySelector("h2").textContent);

      if (activeBrands.length > 0) {
        const brandNames = activeBrands.join(", ");
        const tip = document.querySelector(".tip");

        tip.classList.add("active");
        tip.innerHTML = `<h3>Задан фильтр по брендам:<br> ${brandNames}</h3>`;
      }
    });
  });
};
activeBrend();
///////////////////////////---- BREND ------////////////////////////////////

/////////////////////////---------LEFT-MENU--------///////////////////////////////////
const renderCategories = async () => {
  const data = await fetchDataCategories();
  const categories = data[0].categories[langToggle];

  const mainCategoriesContainer = document.querySelectorAll(".main-categories");
  mainCategoriesContainer.forEach((container) => {
    container.innerHTML = "";

    for (const categoryName in categories) {
      const categoryItem = document.createElement("li");

      categoryItem.innerHTML = `
      <h2 class="open-img">${categoryName}</h2>
      <ul class="main-sub_categories main-items close">
      </ul>
    `;
      const subCategoriesContainer = categoryItem.querySelector(
        ".main-sub_categories"
      );

      const subCategories = categories[categoryName].subCategories;
      for (const subCategoryName in subCategories) {
        const subCategoryItem = document.createElement("li");
        subCategoryItem.innerHTML = `
        <h2 class="open-img">${subCategoryName}</h2>
        <ul class="main-items close">
        </ul>
      `;

        const objectsContainer = subCategoryItem.querySelector(".main-items");

        const objects = subCategories[subCategoryName].object || [];
        objects.forEach((obj) => {
          const objectItem = document.createElement("li");
          objectItem.classList.add("object-item", "object-click");
          objectItem.innerHTML = `<h2 class="obj-btn">${
            obj.name + " " + obj.cod
          }</h2>`;
          objectsContainer.appendChild(objectItem);
        });
        subCategoriesContainer.appendChild(subCategoryItem);
      }

      container.appendChild(categoryItem);
    }
  });
  setupToggleCategories();
};

renderCategories();
/////////////////////////---------LEFT-MENU--------///////////////////////////////////

////////////////////////////------LEFT_MENU_ANIMATED--------///////////////////////////
const setupToggleCategories = () => {
  const openItems = document.querySelectorAll(".open-img");
  const objectItems = document.querySelectorAll(".object-item");

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

  objectItems.forEach((item) => {
    item.addEventListener("click", () => {
      objectItems.forEach((el) => {
        el.classList.remove("active");
      });
      item.classList.add("active");

      // Открываем родительские подкатегории
      let parent = item.closest(".object-item").previousElementSibling; // Находим предыдущий элемент, который должен быть open-img
      while (parent) {
        if (parent.classList.contains("open-img")) {
          const subcategories = parent.nextElementSibling; // Получаем подкатегории
          if (subcategories) {
            subcategories.classList.remove("close");
            subcategories.classList.add("open");
            parent.classList.add("active");
          }
        }
        parent = parent.previousElementSibling; // Переходим к следующему родительскому элементу
      }
    });
  });
};
setupToggleCategories();
const expandActiveParents = (objectItems) => {
  // Получаем все элементы с классом active
  let activeItem = Array.from(objectItems).find((item) =>
    item.classList.contains("active")
  );

  // Проверка, существует ли активный элемент
  if (activeItem) {
    let parent = activeItem.closest("li"); // Получаем родительский элемент списка
    // Этот цикл открывает всех родителей
    while (parent) {
      const toggleParent = parent.querySelector(".toggle-parent"); // Находим родительскую категорию

      if (toggleParent) {
        const subcategories = parent.querySelector(".main-sub_categories"); // Получаем подкатегории
        if (subcategories) {
          subcategories.classList.remove("close");
          subcategories.classList.add("open");
          toggleParent.classList.add("active");
        }
      }

      parent = parent.parentElement.closest("li"); // Переходим к следующему родителю
    }
  } else {
    console.warn("Активный элемент не найден.");
  }
};
///////////////////////------LEFT_MENU_ANIMATED--------////////////////////////////

/////////////////////////---------SYNS_MENU--------///////////////////////////////////
// const syncMenus = async () => {
//   const menuItems = document.querySelectorAll(".menu-obj-item");
//   const searchItems = document.querySelectorAll(".search-item");
//   const objectItems = document.querySelectorAll(".object-item");
//   const objectСlick = document.querySelectorAll(".object-click");

//   const mainItems = document.querySelectorAll(".main-items");
//   const mainSubCategories = document.querySelectorAll(".main-sub_categories");

//   // if (objectItems.length > 1) {
//   //   objectItems[1].classList.add("active");

//   //   if (
//   //     objectItems[0].classList.contains("active") ||
//   //     objectItems[0].classList.contains("open")
//   //   ) {
//   //     objectItems[0].classList.remove("active");
//   //     mainItems[0].classList.remove("open");
//   //     mainItems[0].classList.add("close");
//   //     mainSubCategories[0].classList.remove("open");
//   //     mainSubCategories[0].classList.add("close");
//   //   }

//   //   mainItems[1].classList.remove("close");
//   //   mainItems[1].classList.add("open");
//   //   mainSubCategories[0].classList.remove("close");
//   //   mainSubCategories[0].classList.add("open");
//   // }

//   // Функция для обработки кликов по элементам меню и поиска
//   const handleClick = (itemText) => {
//     objectItems.forEach((objItem) => {
//       objItem.classList.remove("active");
//     });

//     const matchingItem = Array.from(objectItems).find((objItem) => {
//       const objText = objItem.innerText.trim();
//       return objText.includes(itemText);
//     });

//     const mainItems = document.querySelectorAll(
//       ".main-items, .main-sub_categories"
//     );

//     mainItems.forEach((item) => {
//       item.classList.remove("open");
//       item.classList.add("close");
//     });

//     if (matchingItem) {
//       matchingItem.classList.add("active");

//       const parentMainItems = matchingItem.closest(".main-items");
//       const parentMainSubCategories = matchingItem.closest(
//         ".main-sub_categories"
//       );

//       if (parentMainItems) {
//         parentMainItems.classList.remove("close");
//         parentMainItems.classList.add("open");
//       }

//       if (parentMainSubCategories) {
//         parentMainSubCategories.classList.remove("close");
//         parentMainSubCategories.classList.add("open");
//       }
//     } else {
//       console.warn("Соответствующий элемент не найден.");
//     }
//   };

//   // Назначаем обработчики событий для элементов поиска
//   searchItems.forEach((searchItem) => {
//     searchItem.addEventListener("click", () => {
//       const itemText = searchItem.innerText.trim();
//       handleClick(itemText);
//     });
//   });

//   // Назначаем обработчики событий для пунктов меню
//   menuItems.forEach((menuItem) => {
//     menuItem.addEventListener("click", () => {
//       const itemText = menuItem.innerText.trim();
//       handleClick(itemText);
//     });
//   });
// };
// syncMenus();
/////////////////////////---------SYNS_MENU--------///////////////////////////////////

/////////////////////////---------MENU--------///////////////////////////////////
const createListMenu = async () => {
  const dataCategoriesMenu = await fetchDataCategories();
  const menuContainer = document.querySelectorAll(".menu-categories");
  menuContainer.innerHTML = "";

  // Готовим HTML для меню
  const categories = dataCategoriesMenu[0].categories[langToggle];

  for (const [categoryName, categoryDetails] of Object.entries(categories)) {
    const subCategoriesHTML = Object.entries(
      categoryDetails.subCategories || {}
    )
      .map(([subCategoryName, subCategoryDetails]) => {
        const objectsHTML = (subCategoryDetails.object || [])
          .map(
            (object) => `
            <li class="menu-obj-item object-click">
              <h2 class="menu-obj-text">${object.name + " " + object.cod}</h2>
            </li>`
          )
          .join("");

        return `
          <li>
            <h2 class="menu-sub_categories-text">${subCategoryName}</h2>
            <ul class="menu-items">
              ${objectsHTML}
            </ul>
          </li>`;
      })
      .join("");

    const categoryHTML = `
      <li>
        <h2 class="menu-categories-text">${categoryName}</h2>
        <ul class="menu-sub_categories">
          ${subCategoriesHTML}
        </ul>
      </li>`;

    menuContainer.innerHTML += categoryHTML;
    syncMenus();
    objClick();
  }
};
createListMenu();
/////////////////////////---------MENU--------///////////////////////////////////

/////////////////////////---------OBJECT_ANIMATED--------///////////////////////////////////
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
/////////////////////////---------OBJECT_ANIMATED--------///////////////////////////////////

/////////////////////////--------- PHOTO -------///////////////////////////////////
function updateSlides(object) {
  // Проверяем, существует ли объект и его массив photo
  if (object && Array.isArray(object.photo)) {
    const photoUrls = []; // Создаем массив для хранения URL изображений

    // Заполняем массив photoUrls из данных объекта
    for (let i = 0; i < object.photo.length; i++) {
      photoUrls.push(object.photo[i]);
    }

    // Обновляем содержимое слайдов из photoUrls для основных слайдов
    updateSlideImages(".object-slide", photoUrls);

    // Обновляем содержимое слайдов из photoUrls для мини-слайдов
    updateSlideImages(".object-slide_mini", photoUrls);
  }
}
function updateSlideImages(selector, photoUrls) {
  const slides = document.querySelectorAll(selector);

  slides.forEach((item, index) => {
    // Проверяем, существует ли соответствующий URL для текущего слайда
    if (index < photoUrls.length) {
      // Находим img внутри текущего слайда и обновляем его src
      const img = item.querySelector("img"); // Находим изображение внутри слайда
      if (img) {
        img.src = photoUrls[index]; // Обновляем ссылку на изображение
      } else {
        // Если изображения нет, создаем его
        item.innerHTML = `<img src="${photoUrls[index]}"/>`;
      }
    }
  });
}
/////////////////////////--------- PHOTO --------///////////////////////////////////

///////////////////////--------- SPECIFICATION --------///////////////////////////////////
const specificationsFunc = async () => {
  const spec = document.querySelectorAll(".object-specifications_table");
  const data = await fetchDataCategories();
};
/////////////////////////--------- SPECIFICATION --------///////////////////////////////////

/////////////////////////---------OBJECT-KLICK--------///////////////////////////////////
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
  console.log(langToggle);
  if (!object) {
    console.log("Объект не найден");
    return;
  }

  // Заполнить поля
  objName.textContent = object.name + " " + object.cod;
  objDescripcion.textContent = object.description;

  // Характеристики
  let specHTML = `
    <tr class="object-specifications_table-title">
      <th><h1>наименование характеристики</h1></th>
      <th><h1>количество | Ед. изм.</h1></th>
    </tr>`;
  for (const key in object.specifications) {
    if (object.specifications.hasOwnProperty(key)) {
      specHTML += `
      <tr>
          <td><h1>${key}</h1></td>
          <td><h1>1${object.specifications[key]}</h1></td>
      </tr>`;
    }
  }
  spec.innerHTML = specHTML;

  // Слайды, если нужно
  if (typeof updateSlides === "function") updateSlides(object);

  // Проставить активность меню/категорий (аналог handleClick)
  const objectItems = document.querySelectorAll(".object-item");
  objectItems.forEach((item) => item.classList.remove("active"));
  const matchingItem = Array.from(objectItems).find((objItem) => {
    return objItem.innerText.trim().includes(objectName); // или ===
  });
  if (matchingItem) {
    matchingItem.classList.add("active");
    const parentMainItems = matchingItem.closest(".main-items");
    const parentMainSubCategories = matchingItem.closest(
      ".main-sub_categories"
    );
    if (parentMainItems) {
      parentMainItems.classList.add("open");
      parentMainItems.classList.remove("close");
    }
    if (parentMainSubCategories) {
      parentMainSubCategories.classList.add("open");
      parentMainSubCategories.classList.remove("close");
    }
  }
}
// 2. Единый обработчик кликов (используйте централизованную функцию):
const objClick = async () => {
  const objClickElements = document.querySelectorAll(".object-click");
  objClickElements.forEach((item) => {
    item.addEventListener("click", async () => {
      const objectName = item.innerText.trim();

      catalogMobMenu.classList.remove("active");
      closeCatMenu.classList.add("hide");
      openCatMenu.classList.remove("hide");
      // Если не на catalog.php, сохранить состояние и редирект
      if (window.location.pathname !== "/pages/catalog.php") {
        localStorage.setItem("objectToFind", objectName);
        window.location.href = "/pages/catalog.php";
        return;
      }
      objAnimated(); // если нужно до отрисовки
      await selectAndDisplayObject(objectName);
    });
  });
};
// Запуск показа нужного объекта из localStorage (на catalog.php)
document.addEventListener("DOMContentLoaded", async () => {
  const cachedObjectName = localStorage.getItem("objectToFind");
  if (cachedObjectName) {
    localStorage.removeItem("objectToFind");
    await selectAndDisplayObject(cachedObjectName);
  }
});
// Функции для меню/поиска:
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
syncMenus();
objClick();
setupLanguageSwitch();

/////////////////////////---------OBJECT-KLICK--------///////////////////////////////////

////////////////////////-----------SEARCH------------/////////////////////////////////
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
                const brand = item.brand
                  ? item.brand.toString().toLowerCase()
                  : "";

                // Проверяем, если хотя бы одно из полей содержит запрос
                if (
                  query &&
                  typeof query === "string" &&
                  (name.includes(query.toLowerCase()) ||
                    cod.includes(query.toLowerCase()) ||
                    description.includes(query.toLowerCase()) ||
                    subCategories.includes(query.toLowerCase()) ||
                    brand.includes(query.toLowerCase()))
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
  				</div>
					<h3 class="search-filter-item">${item.filter[0] ? item.filter[0] : ""}</h3>
  			`;
      resultsContainer.appendChild(resultItem);
    });
    syncMenus();
    objClick();
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
////////////////////////-----------SEARCH------------/////////////////////////////////

////////////////////////---------LANG-SWICH--------///////////////////////////////////
let langToggle = "ru";
function setupLanguageSwitch() {
  const langSwitch = document.querySelectorAll(".lang-switch");

  langSwitch.forEach((item) => {
    item.addEventListener("click", () => {
      const langValue = item.value;
      langToggle = langValue === "ru" ? "ru" : "en";

      renderCategories();
      createListMenu();
      objClick;
    });
  });
}
setupLanguageSwitch();
//////////////////////////---------LANG-SWICH--------///////////////////////////////////()
//////////////////////-------MENU-------//////////////////////////////
const openMenu = document.querySelector(".open-menu");
const closeMenu = document.querySelector(".close-menu");
const mainMobMenu = document.querySelector(".main-mob-menu");

const openCatMenu = document.querySelector(".open-cat-menu");
const closeCatMenu = document.querySelector(".close-cat-menu");
const catalogMobMenu = document.querySelector(".catalog-mob-menu");

const objBtn = document.querySelector(".obj-btn");

// objBtn.forEach((item) => {
//   item.addEventListener("click", () => {
//     catalogMobMenu.classList.remove("active");
//     closeCatMenu.classList.add("hide");
//     openCatMenu.classList.remove("hide");
//   });
// });

openMenu.addEventListener("click", () => {
  mainMobMenu.classList.add("active");
  closeMenu.classList.remove("hide");
  catalogMobMenu.classList.remove("active");
  closeCatMenu.classList.add("hide");
  openCatMenu.classList.add("hide");
});

closeMenu.addEventListener("click", () => {
  mainMobMenu.classList.remove("active");
  closeMenu.classList.add("hide");
  openCatMenu.classList.remove("hide");
  openCatMenu.classList.remove("hide");
});

openCatMenu.addEventListener("click", () => {
  catalogMobMenu.classList.add("active");
  closeCatMenu.classList.remove("hide");
  openCatMenu.classList.add("hide");
});

closeCatMenu.addEventListener("click", () => {
  catalogMobMenu.classList.remove("active");
  closeCatMenu.classList.add("hide");
  openCatMenu.classList.remove("hide");
});

var hammertime = new Hammer(document.body, {
  enable: true,
  recognizers: [[Hammer.Swipe, { direction: Hammer.DIRECTION_HORIZONTAL }]],
});

hammertime.on("swipeleft", function (ev) {
  // mainMobMenu.classList.add("active");
  // closeMenu.classList.remove("hide");
  // catalogMobMenu.classList.remove("active");
  //closeCatMenu.classList.add("hide");
  //openCatMenu.classList.add("hide");
  catalogMobMenu.classList.remove("active");
  closeCatMenu.classList.add("hide");
  openCatMenu.classList.remove("hide");
});

hammertime.on("swiperight", function (ev) {
  mainMobMenu.classList.remove("active");
  closeMenu.classList.add("hide");
  openCatMenu.classList.remove("hide");
});

//////////////////////-------MENU-------//////////////////////////////
