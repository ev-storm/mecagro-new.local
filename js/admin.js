// /////////////////////////----JSON------////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////

// const VALID_USERNAME = "user";
// const VALID_PASSWORD = "123";

// document
//   .getElementById("loginForm")
//   .addEventListener("submit", function (event) {
//     event.preventDefault();

//     const username = document.getElementById("username").value.trim();
//     const password = document.getElementById("password").value.trim();
//     const messageDiv = document.getElementById("message");
//     const loginContainer = document.getElementById("login-container-con");

//     clearMessage(messageDiv);

//     if (isValidInput(username, password)) {
//       if (username === VALID_USERNAME && password === VALID_PASSWORD) {
//         displayMessage(messageDiv, "Успешный вход!", "success");
//         renderContent();
//         loginContainer.classList.add("hide");
//       } else {
//         displayMessage(
//           messageDiv,
//           "Неправильное имя пользователя или пароль.",
//           "error"
//         );
//       }
//     } else {
//       // Поля ввода не заполнены
//       displayMessage(messageDiv, "Пожалуйста, заполните все поля.", "error");
//     }
//   });

// function isValidInput(username, password) {
//   return username !== "" && password !== "";
// }

// function displayMessage(messageDiv, text, className) {
//   messageDiv.textContent = text;
//   messageDiv.className = className;
// }

// function clearMessage(messageDiv) {
//   messageDiv.textContent = "";
//   messageDiv.className = "";
// }

// function adminData(objects) {
//   renderContent(objects);
// }

const adminData = async (objects) => {
  renderContent(objects);
};

function renderListItems(objects) {
  return objects
    .map((obj) => {
      return `<li><a href="/pages/admin.php#"><h2>${obj.name} ${obj.cod}</h2></a></li>`;
    })
    .join(""); // Собирает строки в единую HTML-разметку
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
            <div class="obj-cart-down">
              <img src="/assets/svg/arrow-green.svg" alt="">
            </div>

            <div class="obj-cart-dop">
              <div class="cart-descript-con">
                <input class="input-adm-main" type="textarea" rows="4" value="${obj.description}">
                <input class="input-adm-main" type="text" value="${obj.title}">
                <input class="input-adm-main" type="text" value="${obj.specifications}">
                <input class="input-adm-main" type="text" value="${obj.filter}">
              </div>
              <input type="submit" class="input-adm-main btn input-adm-submit" value="Изменить">
            </div>
          </div>
        </form>
      </div>
			`;
    })
    .join(""); // Собирает строки в единую HTML-разметку
}

function renderContent(objects) {
  const contentDiv = document.querySelector(".content-con");
  contentDiv.innerHTML = "";

  // const firstObject = objects[0];

  contentDiv.innerHTML = `
    <div class="admin-bar">
      <h2 class="open-all">Расскрыть все</h2>
      <h2 class="close-all">Закрыть все</h2>
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
  const cartDown = document.querySelectorAll(".obj-cart-down");
  const cartDop = document.querySelectorAll(".obj-cart-dop");
  const openAll = document.querySelector(".open-all");
  const closeAll = document.querySelector(".close-all");
  //const inputFields = document.querySelectorAll(".input-adm-main");
  const changeButtons = document.querySelectorAll(".input-adm-change");
  const changeSubmit = document.querySelector(".input-adm-submit");

  const trash = document.querySelector(".trash");

  objCart.forEach((item) => {
    const cartDop = item.querySelector(".obj-cart-dop");
    const cartDown = item.querySelector(".obj-cart-down");
    const changeSubmit = item.querySelector(".input-adm-submit");

    changeSubmit.addEventListener("click", () => {
      cartDown.classList.toggle("up");
      cartDop.classList.toggle("show");
    });
  });

  // objCart.forEach((item) => {
  //   const cartDop = item.querySelector(".obj-cart-dop");
  //   const cartDown = item.querySelector(".obj-cart-down");

  //   cartDown.addEventListener("click", () => {
  //     cartDown.classList.toggle("up");
  //     cartDop.classList.toggle("show");
  //   });
  // });

  // objCart.forEach((item) => {
  //   item.removeAttribute("readonly");

  //   item.addEventListener("click", () => {
  //     const cartDop = item.querySelector(".obj-cart-dop");
  //     const cartDown = item.querySelector(".obj-cart-down");
  //     cartDown.classList.add("up");
  //     cartDop.classList.add("show");
  //   });
  // });

  // openAll.addEventListener("click", () => {
  //   cartDop.forEach((dopItem, index) => {
  //     dopItem.classList.add("show");
  //     cartDown[index].style.transform = "rotate(180deg)";
  //   });
  // });

  // closeAll.addEventListener("click", () => {
  //   cartDop.forEach((dopItem, index) => {
  //     dopItem.classList.remove("show");
  //     cartDown[index].style.transform = "rotate(0deg)";
  //   });
  // });

  // changeButtons.forEach((button) => {
  //   button.addEventListener("click", function () {
  //     const form = button.closest("form");
  //     const currentInputs = form.querySelectorAll(".input-adm-main");

  //     button.classList.toggle("active");

  //     currentInputs.forEach((input) => {
  //       if (button.classList.contains("active")) {
  //         input.removeAttribute("readonly");
  //         input.classList.add("focus");
  //         input.style.background = "#f5f5f5";
  //         button.src = "/assets/svg/change_2.svg";
  //         changeSubmit.style.display = "block";
  //         objCart.forEach((item) => {
  //           const cartDop = item.querySelector(".obj-cart-dop");
  //           const cartDown = item.querySelector(".obj-cart-down");
  //           cartDown.classList.add("up");
  //           cartDop.classList.add("show");
  //         });
  //       } else {
  //         input.setAttribute("readonly", "readonly");
  //         input.style.background = "#fff";
  //         input.style.borderStyle = "none";
  //         button.src = "/assets/svg/change.svg";
  //         changeSubmit.style.display = "none";
  //         objCart.forEach((item) => {
  //           const cartDop = item.querySelector(".obj-cart-dop");
  //           const cartDown = item.querySelector(".obj-cart-down");
  //           cartDown.classList.remove("up");
  //           cartDop.classList.remove("show");
  //         });
  //       }
  //     });
  //   });
  // });
}
