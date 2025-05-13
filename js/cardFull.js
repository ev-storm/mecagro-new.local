async function categoryFull(selectedFilters = [], filterActivePlus = []) {
  const categoriesObjects = await getFlatCategoryObjects(); // получаем массив объектов

  const filteredObjects = categoriesObjects.filter((obj) => {
    const brandMatches =
      selectedFilters.length === 0 ||
      selectedFilters.some((filter) => obj.filter.includes(filter));

    const filterActivePlusMatches =
      filterActivePlus.length === 0 ||
      filterActivePlus.some((filter) => obj.filter.includes(filter));

    return brandMatches && filterActivePlusMatches;
  });

  // Очищаем контейнер перед добавлением новых карточек
  const objectAllPrevue = document.querySelector(".object-all-prevue");
  objectAllPrevue.innerHTML = "";

  filteredObjects.forEach((obj) => {
    // Создаем карточку объекта
    const objCard = document.createElement("div");
    objCard.classList.add("obj-all-card");

    // Заполняем карточку содержимым
    objCard.innerHTML = `
			<img src="${obj.photo[0]}" alt="">
			<li class="object-click">
          <h2 >${obj.name + " " + obj.cod}</h2>
        </li>
			<h3>${obj.filter}</h3>
		`;

    objectAllPrevue.appendChild(objCard);

    const objectAllBtn = document.querySelector(".obj-all-btn");
    const objectCon = document.querySelector(".object");
    const sparePartsCon = document.querySelector(".spare-parts-con");
    const sparePartsBtn = document.querySelector(".spare-parts-btn");
    const objectClick = document.querySelectorAll(".object-click");

    let isActive = false;

    function toggleActiveState() {
      if (!isActive) {
        objectAllBtn.classList.remove("active");
        objectAllBtn.src = "/assets/svg/obj-all.svg";
        objectAllPrevue.classList.remove("active");
        objectCon.classList.add("active");
      } else {
        objectAllBtn.classList.add("active");
        objectAllBtn.src = "/assets/svg/obj-all_2.svg";
        objectAllPrevue.classList.add("active");
        objectCon.classList.remove("active");
        sparePartsCon.classList.remove("active");
      }
      isActive = !isActive; // toggle the state
    }
    // Прикрепляем обработчик нажатия на кнопку
    objectAllBtn.addEventListener("click", toggleActiveState);

    sparePartsBtn.addEventListener("click", () => {
      objectAllPrevue.classList.remove("active");
      objectAllBtn.classList.remove("active");
      objectAllBtn.src = "/assets/svg/obj-all.svg";
      isActive = true;
    });

    objectClick.forEach((e) => {
      e.addEventListener("click", () => {
        objectAllPrevue.classList.remove("active");
        objectAllBtn.classList.remove("active");
        objectCon.classList.add("active");
        objectAllBtn.src = "/assets/svg/obj-all.svg";
        isActive = true;
      });
    });
  });
  objClick();
}
categoryFull();

function filterNewBtnState() {
  const filterButtonMenu = document.querySelector(".filter-btn-menu");
  const filterNewBtn = document.querySelector(".filter-new-btn");

  // При клике на кнопку фильтра
  filterButtonMenu.addEventListener("click", function () {
    if (window.location.pathname !== "/pages/catalog.php") {
      window.location.href = "/pages/catalog.php";
    }
  });

  // Эмуляция нажатия на filterNewBtn при загрузке страницы catalog.php
  if (window.location.pathname === "/pages/catalog.php") {
    filterNewBtn.click();
  }
}

filterNewBtnState();
