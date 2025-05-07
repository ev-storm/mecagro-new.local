const jsonJob = "../js/job.json";

const fetchData = async () => {
  try {
    const response = await fetch(jsonJob);
    if (!response.ok) {
      throw new Error("Ошибка сети: " + response.statusText);
    }
    return await response.json();
  } catch (error) {
    console.error("Ошибка загрузки данных: ", error);
  }
};

async function getObjects(lang = langToggle) {
  const data = await fetchData();
  if (!data || !data[0] || !data[0][lang]) return [];

  const job = data[0][lang].job;
  const flatList = [];

  job.forEach((obj) => {
    flatList.push({ ...obj });
  });

  return flatList;
}

async function displayJob() {
  // Очистка текущих данных
  const jobCard = document.querySelector(".job-main-con");
  const jobList = document.querySelector(".job-list");

  // Очистка элементов списка новостей
  if (jobList) {
    jobList.innerHTML = "";
  }
  if (jobCard) {
    jobCard.innerHTML = "";
  }

  const ListJob = await getObjects(langToggle);

  if (ListJob.length === 0) {
    console.log("Нет новостей для отображения");
    return;
  }

  ListJob.forEach((obj) => {
    jobItemMain(obj.photo, obj.title, obj.expert, obj.pay, obj.description);
    joblist(obj.title);
  });
}

displayJob();

function jobItemMain(photo, title, expert, pay, description) {
  const jobCard = document.querySelector(".job-main-con");

  if (jobCard) {
    const newJobCard = document.createElement("div");
    newJobCard.classList.add("job-card");

    newJobCard.innerHTML = `
      <div class="job-card-main">
        <div class="job-card-title-con">
          <img class="job-card-title-photo" src="${photo}" alt="">
          <div class="job-card-title">
            <h1  class="job-card-title-h1">${title}</h1>
            <div class="job-card-specifications">
              <h2>Опыт: ${expert}</h2>
              <h1>${pay} ₽</h1>
            </div>
          </div>
          <img class="job-card-title-arrow" src="/assets/svg/arrow-green.svg" alt="">
        </div>
        <div class="job-card-description">
          <h2>${description}</h2>
        </div>
        <form class="job-form form" action="#" method="POST" enctype="multipart/form-data">
          <input type="hidden" name="Заявка" value="Вакансия">
          <div class="input-name-con">
            <input class="input-name-job" type="text" name="Имя" placeholder="Ваше имя">
            <input class="input-tel-job" type="tel" name="Телефон" placeholder="Телефон">
          </div>
          <textarea class="input-commet" name="Комментарий" placeholder="Введите комментарий" rows="4"></textarea>
          <div class="job-form-input">
            <input type="file" class="btn-file-job" id="file" name="file-upload" accept=".png, .jpg, .jpeg, .pdf">
            <button class="btn btn-job" type="submit">Отправить</button>
          </div>
        </form>
      </div>
    `;

    jobCard.appendChild(newJobCard);
    cardStates();

    // Инициализируем валидацию для новой формы сразу после её создания
    const form = newJobCard.querySelector(".job-form");
    validateJob(form);
  }
}

function joblist(title) {
  const jobList = document.querySelector(".job-list");

  if (jobList) {
    const newJobList = document.createElement("li");
    newJobList.classList.add("job-list-item");

    newJobList.innerHTML = `
			<li class="job-list-item">${title}</li>
		`;
    jobList.appendChild(newJobList);
    cardStates();
  }
}

function cardStates() {
  const jobCards = document.querySelectorAll(".job-card");
  const jobCardBtns = document.querySelectorAll(".job-card-title-arrow");
  const openButton = document.querySelector(".job-list-btn-open");
  const closeButton = document.querySelector(".job-list-btn-close");
  const listItem = document.querySelectorAll(".job-list-item");

  listItem.forEach((list) => {
    list.addEventListener("click", () => {
      // Извлекаем текст заголовка из элемента списка
      const textList = list.textContent.trim();

      jobCards.forEach((card) => {
        const title = card.querySelector(".job-card-title-h1");
        const titleText = title.textContent.trim();
        const btn = card.querySelector(".job-card-title-arrow");

        if (titleText === textList) {
          card.classList.add("active");
          btn.classList.add("active");
          const activeList = list.classList.contains("active");
          if (activeList) {
            card.classList.remove("active");
          }
        }
      });
      list.classList.toggle("active");
    });
  });

  jobCards.forEach((card) => {
    card.addEventListener("click", () => {
      // Извлекаем текст заголовка из элемента списка
      const title = card.querySelector(".job-card-title-h1");
      const btn = card.querySelector(".job-card-title-arrow");
      const titleText = title.textContent.trim();

      listItem.forEach((list) => {
        const textList = list.textContent.trim();

        if (titleText === textList) {
          list.classList.add("active");
          btn.addEventListener("click", () => {
            list.classList.remove("active");
          });
        }
      });
    });
  });

  jobCards.forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.add("active"); // (а)
      const btn = card.querySelector(".job-card-title-arrow");
      if (btn) btn.classList.add("active"); // (а)
      openButton.classList.remove("active"); // (-а)
      closeButton.classList.remove("active"); // (-а)
    });
  });

  jobCardBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.stopPropagation(); // предотвращаем всплытие события
      const card = btn.closest(".job-card");
      if (card) card.classList.remove("active"); // (-а)
      if (btn) btn.classList.remove("active");
      openButton.classList.remove("active"); // (-а)
      closeButton.classList.remove("active"); // (-а)
    });
  });

  openButton.addEventListener("click", () => {
    jobCards.forEach((card) => card.classList.add("active")); // (а)
    jobCardBtns.forEach((btn) => btn.classList.add("active"));
    openButton.classList.add("active"); // (а)
    closeButton.classList.remove("active"); // (-а)
    listItem.forEach((list) => list.classList.add("active")); // (а)
  });

  closeButton.addEventListener("click", () => {
    jobCards.forEach((card) => card.classList.remove("active")); // (-а)
    jobCardBtns.forEach((btn) => btn.classList.remove("active")); // (-а)
    openButton.classList.remove("active"); // (-а)
    closeButton.classList.add("active"); // (а)
    listItem.forEach((list) => list.classList.remove("active")); // (а)
  });
}

function validateJob(form) {
  const telSelector = form.querySelector(".input-tel-job");
  const inputmask = new Inputmask("+7 (999) 999-99-99");

  inputmask.mask(telSelector);

  const validation = new JustValidate(form);

  validation
    .addField(".input-name-job", [
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
    .addField(".input-tel-job", [
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
              tip.innerHTML = `<h3>Данные отправлены</h3>`;
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
