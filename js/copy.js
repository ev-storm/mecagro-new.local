const copyElements = document.querySelectorAll(".copy");

// Добавляем обработчик клика к каждому элементу с классом "copy"
copyElements.forEach((element) => {
  element.addEventListener("click", function () {
    // Находим текст внутри элемента h3 рядом с элементом h2
    const copyText = this.nextElementSibling.textContent;
    const copyTitleText = this.textContent;
    // Копируем номер телефона в буфер обмена
    navigator.clipboard
      .writeText(copyText)
      .then(() => {
        // Выводим значение текста элемента в алерте
        const tip = document.querySelector(".tip");

        tip.classList.add("active");
        tip.innerHTML = `${copyTitleText} скопирован</h3>`;
      })
      .catch((err) => {
        // Если возникла ошибка, выводим сообщение в консоль
        console.error("Ошибка при копировании: ", err);
      });
  });
});

const copyRecvi = document.querySelectorAll(".copy-recvi");

copyRecvi.forEach((element) => {
  element.addEventListener("click", function () {
    // Находим текст внутри элемента h3 рядом с элементом h2
    const copyText =
      'Общество с ограниченной ответственностью "МЕКАГРО ГРУП"	|	ИНН: 7806594440 	| 	КПП: 781001001 	|	 ОГРН: 119 502 702 6435	 |	 Рассчетный счет: 40702810690450002660 	| 	Корр. Счёт: 30101810900000000790 	| 	БИК: 044030790 	| 	Банк: "ПАО БАНК САНКТ-ПЕТЕРБУРГ" 	| 	Генеральный директор: Белая Николета Николаевна 	| 	ОКПО: 1217800203917 	|	 ОКАТО: 40278000000 	| 	ОКТМО: 40278000000 	| 	ОКОГУ: 4210014 	| 	ОКФС: 16 	| 	ОКОПФ: 12300 	| 	ОКВЭД: 46.14 45.40 45.32 45.31 45.20 45.19 45.11 77.39.1 69.20.2 68.31  68.20.2 	| 	Юридический адрес: 196135, г. Санкт-Петербург, ул. Типанова, д. 23, к. 2, стр. 1, пом. 10Н, ком. ЧП13 	| 	Фактический адрес: 196135, г. Санкт-Петербург, ул. Типанова, д. 23, к. 2, стр. 1, пом. 10Н, ком. ЧП13 	| 	Почтовый адрес: 196135, г. Санкт-Петербург, ул. Типанова, д. 23, к. 2, стр. 1, пом. 10Н, ком. ЧП13';

    navigator.clipboard
      .writeText(copyText)
      .then(() => {
        // Выводим значение текста элемента в алерте
        const tip = document.querySelector(".tip");

        tip.classList.add("active");
        tip.innerHTML = `Реквизиты скопирован</h3>`;
      })
      .catch((err) => {
        // Если возникла ошибка, выводим сообщение в консоль
        console.error("Ошибка при копировании: ", err);
      });
  });
});
