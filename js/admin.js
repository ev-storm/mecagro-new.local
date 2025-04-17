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

// // Функция для отрисовки контента при успешном входе
// function renderContent() {
//   const contentDiv = document.querySelector(".content-con");
//   contentDiv.innerHTML = "";
//   contentDiv.innerHTML = `
//     <div class="admin-bar">
// 				<h2 class="open-all">Расскрыть все</h2>
// 				<h2 class="close-all">Закрыть все</h2>
// 				<div class="cart-margin"></div>
// 				<ul>
// 					<li><a href="/pages/admin.php#"><h2>объект 1</h2></a></li>
// 					<li><a href="/pages/admin.php#"><h2>объект 2</h2></a></li>
// 					<li><a href="/pages/admin.php#"><h2>объект 3</h2></a></li>
// 					<li><a href="/pages/admin.php#"><h2>объект 4</h2></a></li>
// 					<li><a href="/pages/admin.php#"><h2>объект 5</h2></a></li>
// 					<li><a href="/pages/admin.php#"><h2>объект 6</h2></a></li>
// 					<li><a href="/pages/admin.php#"><h2>объект 7</h2></a></li>
// 					<li><a href="/pages/admin.php#"><h2>объект 8</h2></a></li>
// 					<li><a href="/pages/admin.php#"><h2>объект 9</h2></a></li>
// 					<li><a href="/pages/admin.php#"><h2>объект 10</h2></a></li>
// 					<li><a href="/pages/admin.php#"><h2>объект 11</h2></a></li>
// 					<li><a href="/pages/admin.php#"><h2>объект 12</h2></a></li>
// 					<li><a href="/pages/admin.php#"><h2>объект 13</h2></a></li>
// 					<li><a href="/pages/admin.php#"><h2>объект 1</h2></a></li>
// 					<li><a href="/pages/admin.php#"><h2>объект 2</h2></a></li>
// 					<li><a href="/pages/admin.php#"><h2>объект 3</h2></a></li>
// 					<li><a href="/pages/admin.php#"><h2>объект 4</h2></a></li>
// 					<li><a href="/pages/admin.php#"><h2>объект 5</h2></a></li>
// 					<li><a href="/pages/admin.php#"><h2>объект 6</h2></a></li>
// 					<li><a href="/pages/admin.php#"><h2>объект 7</h2></a></li>
// 					<li><a href="/pages/admin.php#"><h2>объект 8</h2></a></li>
// 					<li><a href="/pages/admin.php#"><h2>объект 9</h2></a></li>
// 					<li><a href="/pages/admin.php#"><h2>объект 10</h2></a></li>
// 					<li><a href="/pages/admin.php#"><h2>объект 11</h2></a></li>
// 					<li><a href="/pages/admin.php#"><h2>объект 12</h2></a></li>
// 					<li><a href="/pages/admin.php#"><h2>объект 13</h2></a></li>
// 				</ul>
// 			</div>
// 			<div class="obj-cart-con">
// 				<div class="obj-cart">
// 					<div class="obj-cart-main">
// 						<div class="mini-photo-con">
// 							<img src="/assets/img/avto/1.png" alt="">
// 						</div>
// 						<div class="obj-cart-title">
// 							<h1>Название</h1>
// 							<h2>Подкатегория</h2>
// 						</div>
// 						<div class="trash">
// 							<span class="trash-tip">удалить объект</span>
// 							<img src="/assets/svg/trash.svg" alt="">
// 						</div>
// 					</div>
// 					<div class="obj-cart-down">
// 						<img src="/assets/svg/arrow-green.svg" alt="">
// 					</div>

// 					<div class="obj-cart-dop">
// 						<div class="cart-photo">
// 							<img src="/assets/img/avto/1.png" alt="">
// 						</div>
// 						<div class="cart-descript-con">
// 							<h2 class="cart-descript">Описание Описание  Описание</h2>
// 							<h3 class="cart-specifications">Характиристики Хаиристиар актиристики Характиристики Характиристики</h3>
// 							<span class="cart-brend">MECARGO | BARGAM | MOSH</span>
// 							<span class="cart-filter">Новинка | Популярное</span>
// 						</div>
// 					</div>
// 				</div>
// 				<div class="obj-cart">
// 					<div class="obj-cart-main">
// 						<div class="mini-photo-con">
// 							<img src="/assets/img/avto/1.png" alt="">
// 						</div>
// 						<div class="obj-cart-title">
// 							<h1>Название</h1>
// 							<h2>Подкатегория</h2>
// 						</div>
// 						<div class="trash">
// 							<span class="trash-tip">удалить объект</span>
// 							<img src="/assets/svg/trash.svg" alt="">
// 						</div>
// 					</div>
// 					<div class="obj-cart-down">
// 						<img src="/assets/svg/arrow-green.svg" alt="">
// 					</div>

// 					<div class="obj-cart-dop">
// 						<div class="cart-photo">
// 							<img src="/assets/img/avto/1.png" alt="">
// 						</div>
// 						<div class="cart-descript-con">
// 							<h2 class="cart-descript">Описание Описание  Описание</h2>
// 							<h3 class="cart-specifications">Характиристики Хаиристиар актиристики Характиристики Характиристики</h3>
// 							<span class="cart-brend">MECARGO | BARGAM | MOSH</span>
// 							<span class="cart-filter">Новинка | Популярное</span>
// 						</div>
// 					</div>
// 				</div>
// 				<div class="obj-cart">
// 					<div class="obj-cart-main">
// 						<div class="mini-photo-con">
// 							<img src="/assets/img/avto/1.png" alt="">
// 						</div>
// 						<div class="obj-cart-title">
// 							<h1>Название</h1>
// 							<h2>Подкатегория</h2>
// 						</div>
// 						<div class="trash">
// 							<span class="trash-tip">удалить объект</span>
// 							<img src="/assets/svg/trash.svg" alt="">
// 						</div>
// 					</div>
// 					<div class="obj-cart-down">
// 						<img src="/assets/svg/arrow-green.svg" alt="">
// 					</div>

// 					<div class="obj-cart-dop">
// 						<div class="cart-photo">
// 							<img src="/assets/img/avto/1.png" alt="">
// 						</div>
// 						<div class="cart-descript-con">
// 							<h2 class="cart-descript">Описание Описание  Описание</h2>
// 							<h3 class="cart-specifications">Характиристики Хаиристиар актиристики Характиристики Характиристики</h3>
// 							<span class="cart-brend">MECARGO | BARGAM | MOSH</span>
// 							<span class="cart-filter">Новинка | Популярное</span>
// 						</div>
// 					</div>
// 				</div>
// 				<div class="obj-cart">
// 					<div class="obj-cart-main">
// 						<div class="mini-photo-con">
// 							<img src="/assets/img/avto/1.png" alt="">
// 						</div>
// 						<div class="obj-cart-title">
// 							<h1>Название</h1>
// 							<h2>Подкатегория</h2>
// 						</div>
// 						<div class="trash">
// 							<span class="trash-tip">удалить объект</span>
// 							<img src="/assets/svg/trash.svg" alt="">
// 						</div>
// 					</div>
// 					<div class="obj-cart-down">
// 						<img src="/assets/svg/arrow-green.svg" alt="">
// 					</div>

// 					<div class="obj-cart-dop">
// 						<div class="cart-photo">
// 							<img src="/assets/img/avto/1.png" alt="">
// 						</div>
// 						<div class="cart-descript-con">
// 							<h2 class="cart-descript">Описание Описание  Описание</h2>
// 							<h3 class="cart-specifications">Характиристики Хаиристиар актиристики Характиристики Характиристики</h3>
// 							<span class="cart-brend">MECARGO | BARGAM | MOSH</span>
// 							<span class="cart-filter">Новинка | Популярное</span>
// 						</div>
// 					</div>
// 				</div>
// 				<div class="obj-cart">
// 					<div class="obj-cart-main">
// 						<div class="mini-photo-con">
// 							<img src="/assets/img/avto/1.png" alt="">
// 						</div>
// 						<div class="obj-cart-title">
// 							<h1>Название</h1>
// 							<h2>Подкатегория</h2>
// 						</div>
// 						<div class="trash">
// 							<span class="trash-tip">удалить объект</span>
// 							<img src="/assets/svg/trash.svg" alt="">
// 						</div>
// 					</div>
// 					<div class="obj-cart-down">
// 						<img src="/assets/svg/arrow-green.svg" alt="">
// 					</div>

// 					<div class="obj-cart-dop">
// 						<div class="cart-photo">
// 							<img src="/assets/img/avto/1.png" alt="">
// 						</div>
// 						<div class="cart-descript-con">
// 							<h2 class="cart-descript">Описание Описание  Описание</h2>
// 							<h3 class="cart-specifications">Характиристики Хаиристиар актиристики Характиристики Характиристики</h3>
// 							<span class="cart-brend">MECARGO | BARGAM | MOSH</span>
// 							<span class="cart-filter">Новинка | Популярное</span>
// 						</div>
// 					</div>
// 				</div>
// 				<div class="obj-cart">
// 					<div class="obj-cart-main">
// 						<div class="mini-photo-con">
// 							<img src="/assets/img/avto/1.png" alt="">
// 						</div>
// 						<div class="obj-cart-title">
// 							<h1>Название</h1>
// 							<h2>Подкатегория</h2>
// 						</div>
// 						<div class="trash">
// 							<span class="trash-tip">удалить объект</span>
// 							<img src="/assets/svg/trash.svg" alt="">
// 						</div>
// 					</div>
// 					<div class="obj-cart-down">
// 						<img src="/assets/svg/arrow-green.svg" alt="">
// 					</div>

// 					<div class="obj-cart-dop">
// 						<div class="cart-photo">
// 							<img src="/assets/img/avto/1.png" alt="">
// 						</div>
// 						<div class="cart-descript-con">
// 							<h2 class="cart-descript">Описание Описание  Описание</h2>
// 							<h3 class="cart-specifications">Характиристики Хаиристиар актиристики Характиристики Характиристики</h3>
// 							<span class="cart-brend">MECARGO | BARGAM | MOSH</span>
// 							<span class="cart-filter">Новинка | Популярное</span>
// 						</div>
// 					</div>
// 				</div>

// 			</div>
//   `;
// }

// function dropMenu() {
//   const cartDown = document.querySelectorAll(".obj-cart-down");
//   const cartDop = document.querySelectorAll(".obj-cart-dop");
//   const openAll = document.querySelector(".open-all");
//   const closeAll = document.querySelector(".close-all");

//   // Handle individual cart item toggles
//   cartDown.forEach((item) => {
//     item.addEventListener("click", () => {
//       const cartDetail = item.nextElementSibling;

//       if (cartDetail) {
//         cartDetail.classList.toggle("show");

//         if (cartDetail.classList.contains("show")) {
//           item.style.transform = "rotate(180deg)";
//         } else {
//           item.style.transform = "rotate(0deg)";
//         }
//       }
//     });
//   });

//   openAll.addEventListener("click", () => {
//     cartDop.forEach((dopItem) => {
//       dopItem.classList.add("show");
//       const index = Array.from(cartDop).indexOf(dopItem);
//       if (index >= 0) {
//         const toggleButton = cartDown[index];
//         if (dopItem.classList.contains("show")) {
//           toggleButton.style.transform = "rotate(180deg)";
//         } else {
//           toggleButton.style.transform = "rotate(0deg)";
//         }
//       }
//     });
//   });
//   closeAll.addEventListener("click", () => {
//     cartDop.forEach((dopItem) => {
//       dopItem.classList.remove("show");
//       const index = Array.from(cartDop).indexOf(dopItem);
//       if (index >= 0) {
//         const toggleButton = cartDown[index];
//         if (dopItem.classList.contains("show")) {
//           toggleButton.style.transform = "rotate(180deg)";
//         } else {
//           toggleButton.style.transform = "rotate(0deg)";
//         }
//       }
//     });
//   });
// }
// dropMenu();

// // /////////////////////////----JSON------////////////////////////////////
// // const jsonCategories = "../js/object.json";

// // const fetchDataCategories = async () => {
// //   try {
// //     const response = await fetch(jsonCategories);
// //     if (!response.ok) {
// //       throw new Error("Network response was not ok " + response.statusText);
// //     }
// //     return await response.json();
// //   } catch (error) {
// //     console.error("Ошибка загрузки данных: ", error);
// //   }
// // };
// // /////////////////////////----JSON------////////////////////////////////
