const jsonSPart = "../js/sPart.json";

const fetchDataSPart = async () => {
  try {
    const response = await fetch(jsonSPart);
    if (!response.ok) {
      throw new Error("Ошибка сети: " + response.statusText);
    }
    return await response.json();
  } catch (error) {
    console.error("Ошибка загрузки данных: ", error);
  }
};

async function getObjects(lang = langToggle) {
  const data = await fetchDataSPart();
  if (!data || !data[0] || !data[0][lang]) return [];

  // Извлечение всех объектов SPart
  const SPart = data[0][lang].SPart;
  return SPart.map((obj) => ({ ...obj })); // Возвращаем массив объектов
}

async function displaySPart() {
  const SPart = document.querySelector(".spare-parts-con");

  // Очистка элементов списка новостей
  if (SPart) {
    SPart.innerHTML = "";
  }

  const ListSPart = await getObjects(langToggle);

  if (ListSPart.length === 0) {
    console.log("Нет новостей для отображения");
    return;
  }

  ListSPart.forEach((obj) => {
    SPartItemMain(obj.photo, obj.title, obj.art);
    //cartState(cardElement, obj.title, obj.art, obj.photo);
  });
}

displaySPart();

function SPartItemMain(photo, title, art) {
  const SPartCard = document.querySelector(".spare-parts-con");

  if (SPartCard) {
    const newSPartCard = document.createElement("div");
    newSPartCard.classList.add("s-part");

    newSPartCard.innerHTML = `
			<div class="SPart-photo">
				<img src="${photo}" alt="">
			</div>
      <h1>${title}</h1>
      <h3>Артикул: ${art}</h3>
      <div>
        <button class="btn btn-modal-call form-data-SPart">Заказать</button>
        <button class="btn-light cartPlus cart-SPart">+</button>
      </div>
    `;
    SPartCard.appendChild(newSPartCard);

    cartState(newSPartCard, title, art, photo);
    nameModalZap(newSPartCard, title, art);
  }
}

const sPartToggle = async () => {
  const sPart = document.querySelector(".spare-parts-btn");
  const object = document.querySelector(".object");
  const objectClick = document.querySelectorAll(".object-click");
  const mainSubCategories = document.querySelectorAll(".main-sub_categories");
  const openImg = document.querySelectorAll(".open-img");
  const sPartsCon = document.querySelector(".spare-parts-con");

  if (sPart) {
    sPart.addEventListener("click", () => {
      sPart.classList.toggle("active");
      mainSubCategories.forEach((m) => {
        m.classList.remove("open");
        m.classList.add("close");
      });
      openImg.forEach((o) => {
        o.classList.remove("active");
      });
      if (sPart.classList.contains("active")) {
        object.classList.remove("active");
        sPartsCon.classList.add("active");
      } else {
        object.classList.add("active");
        sPartsCon.classList.remove("active");
      }
    });
  }

  objectClick.forEach((item) => {
    item.addEventListener("click", async () => {
      sPart.classList.remove("active");
      object.classList.add("active");
      sPartsCon.classList.remove("active");
    });
  });
};

sPartToggle();

function cartState(cardElement, title, art, photo) {
  const cartButton = cardElement.querySelector(".cart-SPart");
  const SPlistCart = document.querySelector(".SPlistCart");
  const SPlistCartUlCon = document.querySelector(".SPlistCartUl-con");

  const updateCartState = () => {
    const activeButtons = document.querySelectorAll(".cart-SPart.active");
    if (activeButtons.length > 0) {
      SPlistCart.classList.add("active");
    } else {
      SPlistCart.classList.remove("active");
    }
  };

  cartButton.addEventListener("click", () => {
    const isActive = cartButton.classList.contains("active");

    if (!isActive) {
      const SPlistCartUlCon = document.querySelector(".SPlistCartUl-con");
      let newSPlistCart = SPlistCartUlCon.querySelector(".SPlistCartUl");
      if (!newSPlistCart) {
        newSPlistCart = document.createElement("ul");
        newSPlistCart.classList.add("SPlistCartUl");
        SPlistCartUlCon.appendChild(newSPlistCart);
      }
      const newSPlistCartLi = document.createElement("li");
      newSPlistCartLi.classList.add("SPlist-li");
      newSPlistCartLi.innerHTML = `<div class="SP-photo-con"><img class="SPlist-photo" src="${photo}" alt=""></div><h2>${title}<br><span>${art}</span></h2>`;
      newSPlistCart.appendChild(newSPlistCartLi);
      cartButton.classList.add("active");
      nameModalZapAll();
    } else {
      const items = SPlistCartUlCon.querySelectorAll("li");
      items.forEach((item) => {
        if (item.textContent === `${title}|${art}`) {
          item.remove();
        }
      });

      cartButton.classList.remove("active");
    }

    updateCartState();
  });
}
