// /////////////////////////----JSON------////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////
const adminData = async (objects) => {
  const VALID_USERNAME = "user";
  const VALID_PASSWORD = "123";
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const messageDiv = document.getElementById("message");
  const loginContainer = document.getElementById("login-container-con");
  const tip = document.querySelector(".tip");

  if (isLoggedIn === "true") {
    renderContent(objects);
    loginContainer.classList.add("hide");
    tip.classList.add("active");
    tip.innerHTML = `<h3>Добро пожаловать</h3>`;
  }

  document
    .getElementById("loginForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();

      clearMessage(messageDiv);

      if (isValidInput(username, password)) {
        if (username === VALID_USERNAME && password === VALID_PASSWORD) {
          displayMessage(messageDiv, "Успешный вход!", "success");
          renderContent(objects);
          loginContainer.classList.add("hide");
          localStorage.setItem("isLoggedIn", "true");
          tip.classList.add("active");
          tip.innerHTML = `<h3>Добро пожаловать</h3>`;
        } else {
          displayMessage(
            messageDiv,
            "Неправильное имя пользователя или пароль.",
            "error"
          );
        }
      } else {
        displayMessage(messageDiv, "Пожалуйста, заполните все поля.", "error");
      }
    });

  const btnExit = document.querySelector(".adm-btn-close");

  btnExit.addEventListener("click", function () {
    const modal = document.querySelector(".modal");
    const modalCan = document.querySelector(".modal-con");

    // Изменяем содержимое модального окна
    modal.innerHTML = `
        <div class="actept">
            <button class="btn exit-btn">Выйти</button>
            <button class="btn-light out-btn">Отмена</button>
        </div>
    `;

    // Показываем модальное окно
    modalCan.classList.add("show");
    modalCan.classList.remove("hide-prev");

    // После обновления содержимого модала, находим кнопки
    const exitBtn = modal.querySelector(".exit-btn");
    const outBtn = modal.querySelector(".out-btn");

    // Добавляем обработчик для кнопки "Выйти"
    exitBtn.addEventListener("click", () => {
      localStorage.removeItem("isLoggedIn");
      loginContainer.classList.remove("hide");
      clearMessage(messageDiv);
      modalCan.classList.remove("show"); // Закрыть модальное окно
      modalCan.classList.add("hide-prev"); // Добавить класс скрытия
    });

    // Добавляем обработчик для кнопки "Отмена"
    outBtn.addEventListener("click", () => {
      modalCan.classList.remove("show");
      modalCan.classList.add("hide-prev");
      modal.innerHTML = ``;
    });
  });

  function isValidInput(username, password) {
    return username !== "" && password !== "";
  }

  function displayMessage(messageDiv, text, className) {
    messageDiv.textContent = text;
    messageDiv.className = className;
  }

  function clearMessage(messageDiv) {
    messageDiv.textContent = "";
    messageDiv.className = "";
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////

function renderListItems(objects) {
  return objects
    .map((obj) => {
      return `<li class="admin-bar-item"><h2>${obj.name} ${obj.cod}</h2></li>`;
    })
    .join("");
}

function renderCardItems(objects) {
  return objects
    .map((obj) => {
      return `
				<div class="obj-cart-form-adm-con">
					<form class="obj-cart-form-adm" action="#">
						<div class="obj-cart">
							<div class="obj-cart-main">
								<div class="mini-photo-con">
									<img src="${obj.photo[0]}" alt="">
								</div>
								<div class="obj-cart-title">
									<input type="text" class="input-adm-main input-adm-main-name in-title" value="${obj.name}" readonly>
									<input type="text" class="input-adm-main input-adm-main-cod" value="${obj.cod}" readonly>
								</div>
								<div class="trash">
									<img class="img-adm-main input-adm-change" src="/assets/svg/change.svg" alt="">
									<img class="img-adm-main input-adm-delite" src="/assets/svg/delete.svg" alt="">
								</div>
							</div>
	
	
							<div class="obj-cart-dop">
								<div class="cart-descript-con">
									<input class="input-adm-main input-adm-main-description" type="textarea" rows="4" value="${obj.description}" readonly>
									<input class="input-adm-main input-adm-main-title" type="text" value="${obj.title}" readonly>
									<input class="input-adm-main input-adm-main-specifications" type="text" value="${obj.specifications}" readonly>
									<input class="input-adm-main input-adm-main-filter" type="text" value="${obj.filter}" readonly>
								</div>
								<input type="submit" class="input-adm-main btn input-adm-submit" value="Изменить">
							</div>
						</div>
					</form>
				</div>
				`;
    })
    .join("");
}

function renderContent(objects) {
  const contentDiv = document.querySelector(".content-con");
  contentDiv.innerHTML = "";

  // Вынести renderItems здесь, чтобы можно было передавать любые значения, всегда после отрисовки input вешаем обработчик.
  const renderItems = (filteredObjects, searchValue = "") => {
    contentDiv.innerHTML = `
      <div class="admin-bar fade-in">
        <div class="adm-bar-btn-con">
          <img class="adm-btn-close btn-modal-call" src="/assets/svg/exit.svg" alt="">
          <button class="btn-light adm-bar-btn vue-card">Показать всё</button>
          <input class="search-adm" type="search" placeholder="поиск" style="background: rgb(245, 245, 245);" value="${searchValue}">
        </div>
        <div class="cart-margin"></div>
        <ul>
          ${renderListItems(filteredObjects)}
        </ul>
      </div>
      <div class="obj-cart-con fade-in">
        ${renderCardItems(filteredObjects)}
      </div>
    `;
    toggleInputFields(objects);

    setTimeout(() => {
      document
        .querySelectorAll(".fade-in")
        .forEach((el) => el.classList.add("show"));
    }, 20);

    // === Навешиваем обработчик ЗАНОВО после каждой отрисовки input ===
    const searchInput = document.querySelector(".search-adm");
    if (searchInput) {
      searchInput.addEventListener("input", function () {
        const searchTerm = this.value.toLowerCase();
        let filteredObjects;
        if (searchTerm === "") {
          filteredObjects = objects; // Показываем все объекты
        } else {
          filteredObjects = objects.filter(
            (obj) =>
              obj.name.toLowerCase().includes(searchTerm) ||
              obj.cod.toLowerCase().includes(searchTerm)
          );
        }
        // ВАЖНО: После перерендера новый input, так что слушатель повесим заново
        renderItems(filteredObjects, this.value);
      });
      searchInput.focus();
      searchInput.setSelectionRange(
        searchInput.value.length,
        searchInput.value.length
      );
    }
  };

  contentDiv.addEventListener("click", (e) => {
    const delBtn = e.target.closest(".input-adm-delite");
    if (delBtn) {
      const modal = document.querySelector(".modal");
      const modalCan = document.querySelector(".modal-con");

      // Изменяем содержимое модального окна
      modal.innerHTML = `
  			<div class="actept">
  					<button class="btn delite-btn">Удалить</button>
  					<button class="btn-light out-btn">Отмена</button>
  			</div>
  	`;

      // Показываем модальное окно
      modalCan.classList.add("show");
      modalCan.classList.remove("hide-prev");

      // После обновления содержимого модала, находим кнопки
      const deliteBtn = modal.querySelector(".delite-btn");
      const outBtn = modal.querySelector(".out-btn");

      // Добавляем обработчик для кнопки "Выйти"
      deliteBtn.addEventListener("click", () => {
        e.preventDefault();
        const cart = delBtn.closest(".obj-cart-form-adm");
        if (cart) {
          const input = cart.querySelector(".input-adm-main-cod");
          const inputName = cart.querySelector(".input-adm-main-name");
          const inputTitle = cart.querySelector(".input-adm-main-title");
          const inputSpecifications = cart.querySelector(
            ".input-adm-main-specifications"
          );
          const inputFilter = cart.querySelector(".input-adm-main-filter");
          const inputSubmit = cart.querySelector(".input-adm-submit");

          // Добавляем обработчик клика на inputSubmit
          inputSubmit.addEventListener("click", (event) => {
            event.preventDefault(); // Предотвращаем стандартное поведение кнопки отправки

            // Получаем данные из полей ввода
            const cod = input.value; // Получаем код товара
            const name = inputName.value;
            const title = inputTitle.value;
            const specifications = inputSpecifications.value;
            const filter = inputFilter.value;

            console.log(cod);
            console.log(name);
            console.log(title);
            console.log(specifications);
            console.log(filter);

            // Отправляем данные на сервер
            fetch("update-object.php", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                cod: cod,
                name: name,
                title: title,
                specifications: specifications,
                filter: filter,
              }),
            })
              .then((response) => {
                if (!response.ok) throw new Error("Сервер ответил ошибкой");
                return response.json();
              })
              .then((data) => {
                if (data.success) {
                  console.log("Объект обновлен успешно");
                  // Здесь можно обновить интерфейс, если необходимо
                } else {
                  console.error("Ошибка обновления: " + data.message);
                }
              })
              .catch((error) => {
                console.error("Ошибка сети: " + error.message);
              });
          });

          if (!input) return; // Если не нашли код, ничего не делаем

          const cod = input.value; // Получаем код товара
          const name = inputName.value;
          const title = inputTitle.value;
          const specifications = inputSpecifications.value;
          const filter = inputFilter.value;

          // Отправляем запрос на удаление объекта
          fetch("delete-object.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              cod: cod,
              name: name,
              title: title,
              specifications: specifications,
              filter: filter,
            }),
          })
            .then((response) => {
              console.log("Response:", response); // Добавлено для отладки
              if (!response.ok) throw new Error("Сервер ответил ошибкой");
              return response.json();
            })
            .then((data) => {
              if (data.success) {
                console.log("Data received from server:", data); // Добавлено для отладки
                // Удаляем объект из массива
                const objIndex = objects.findIndex((obj) => obj.cod === cod);
                if (objIndex !== -1) {
                  objects.splice(objIndex, 1); // Удаляем 1 элемент по индексу
                }
                renderContent(objects); // Заново отрисовываем контент
              } else {
                console.error("Ошибка удаления: " + data.message);
              }
            })
            .catch((error) => {
              console.error(
                "Серверная ошибка. Попробуйте позже.\n" + error.message
              );
            });
        }

        modalCan.classList.remove("show");
        modalCan.classList.add("hide-prev");
      });

      // Добавляем обработчик для кнопки "Отмена"
      outBtn.addEventListener("click", () => {
        modalCan.classList.remove("show");
        modalCan.classList.add("hide-prev");
        modal.innerHTML = ``;
      });
    }
  });

  // Первая отрисовка
  renderItems(objects);
}

function toggleInputFields() {
  const objCart = document.querySelectorAll(".obj-cart");
  const barItem = document.querySelectorAll(".admin-bar-item");
  const cartDop = document.querySelectorAll(".obj-cart-dop");
  const vueCard = document.querySelectorAll(".vue-card");

  vueCard.forEach((vueCard) => {
    let isActive = false;

    vueCard.addEventListener("click", () => {
      isActive = !isActive;
      vueCard.classList[isActive ? "add" : "remove"]("active");
      if (isActive) {
        vueCard.innerText = "Скрыть всё";
        cartDop.forEach((item) => item.classList.add("show"));
      } else {
        vueCard.innerText = "Показать всё";
        cartDop.forEach((item) => item.classList.remove("show"));
      }
    });
  });

  barItem.forEach((barI, index) => {
    barI.addEventListener("click", () => {
      if (cartDop[index]) {
        cartDop[index].classList.add("show");
        cartDop[index].scrollIntoView({
          behavior: "smooth", // позволяет сделать прокрутку плавной
          block: "center", // определяет, где элемент окажется в области просмотра
        });
      }
      barItem.forEach((item) => item.classList.remove("active"));
      barI.classList.add("active");
    });
  });

  objCart.forEach((item) => {
    const cartDop = item.querySelector(".obj-cart-dop");
    const changeButtons = item.querySelector(".input-adm-change");
    const Inputs = item.querySelectorAll(".input-adm-main");
    const changeSubmit = item.querySelector(".input-adm-submit");

    let isActive = false;

    changeButtons.addEventListener("click", () => {
      isActive = !isActive;
      cartDop.classList[isActive ? "add" : "remove"]("show");

      Inputs.forEach((e) => {
        changeButtons.classList[isActive ? "add" : "remove"]("active");

        if (isActive) {
          e.removeAttribute("readonly");
          e.style.background = "#f5f5f5";
          changeButtons.src = "/assets/svg/change_2.svg";
          changeSubmit.style.display = "block";
        } else {
          e.setAttribute("readonly", true);
          e.style.background = "#fff";
          e.style.borderStyle = "none";
          changeButtons.src = "/assets/svg/change.svg";
          changeSubmit.style.display = "none";
        }
      });
    });
  });
}
