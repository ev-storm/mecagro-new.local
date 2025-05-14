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
									<input type="text" class="input-adm-main in-title" value="${obj.name}" readonly>
									<input type="text" class="input-adm-main" value="${obj.cod}" readonly>
								</div>
								<div class="trash">
									<img class="img-adm-main input-adm-change" src="/assets/svg/change.svg" alt="">
									<img class="img-adm-main" src="/assets/svg/delete.svg" alt="">
								</div>
							</div>
	
	
							<div class="obj-cart-dop">
								<div class="cart-descript-con">
									<input class="input-adm-main" type="textarea" rows="4" value="${obj.description}" readonly>
									<input class="input-adm-main" type="text" value="${obj.title}" readonly>
									<input class="input-adm-main" type="text" value="${obj.specifications}" readonly>
									<input class="input-adm-main" type="text" value="${obj.filter}" readonly>
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

  contentDiv.innerHTML = `
			<div class="admin-bar">
				<div class="adm-bar-btn-con"> 
					<img class="adm-btn-close btn-modal-call" src="/assets/svg/exit.svg" alt="">
					<button class="btn-light adm-bar-btn vue-card">Показать всё</button>
					<input class="search-adm" type="search" placeholder="поиск" style="background: rgb(245, 245, 245);">
				</div>
				<div class="cart-margin"></div>
				<ul>
					${renderListItems(objects)}
				</ul>
			</div>
			<div class="obj-cart-con">
	
				${renderCardItems(objects)}
			</div>
		`;

  toggleInputFields();
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
