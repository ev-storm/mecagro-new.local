// function totalSvg() {
//   const paths = document.querySelectorAll("svg path");
//   const btns = document.querySelectorAll(".btn-svg");

//   paths.forEach(function (path) {
//     let len = Math.round(path.getTotalLength());

//     path.setAttribute("stroke-dasharray", len);
//     path.setAttribute("stroke-dashoffset", len);

//     // Добавляем анимацию для проигрывания один раз
//     const animate = document.createElementNS(
//       "http://www.w3.org/2000/svg",
//       "animate"
//     );
//     animate.setAttribute("attributeName", "stroke-dashoffset");
//     animate.setAttribute("values", `${len}; 0`);
//     animate.setAttribute("dur", `${len / 100}`);
//     animate.setAttribute("fill", "freeze");

//     path.appendChild(animate);
//     animate.beginElement();
//   });

//   btns.forEach((btn) => {
//     let isAnimating = false;

//     btn.addEventListener("mouseenter", function () {
//       if (isAnimating) return;

//       const path = this.querySelector("svg > path");

//       let len = Math.round(path.getTotalLength());

//       const animate = document.createElementNS(
//         "http://www.w3.org/2000/svg",
//         "animate"
//       );
//       animate.setAttribute("attributeName", "stroke-dashoffset");
//       animate.setAttribute("values", `${len}; 0`);
//       animate.setAttribute("dur", `${len / 80}`);
//       animate.setAttribute("fill", "freeze");

//       path.appendChild(animate);
//       animate.beginElement();
//       isAnimating = true; // Устанавливаем флаг в состояние "занято"

//       setTimeout(() => {
//         isAnimating = false;
//       }, 5000);
//     });

//     btn.addEventListener("mouseleave", function () {
//       const path = this.querySelector("svg > path");
//     });
//   });
// }

// // function totalSvg_2() {
// //   const paths = document.querySelectorAll("svg path");
// //   const btns = document.querySelectorAll(".btn-svg-2");

// //   paths.forEach(function (path) {
// //     let len = Math.round(path.getTotalLength());

// //     path.setAttribute("stroke-dasharray", len);
// //     path.setAttribute("stroke-dashoffset", len);

// //     // Добавляем анимацию для проигрывания один раз
// //     const animate = document.createElementNS(
// //       "http://www.w3.org/2000/svg",
// //       "animate"
// //     );
// //     animate.setAttribute("attributeName", "stroke-dashoffset");
// //     animate.setAttribute("values", `${len}; 0`);
// //     animate.setAttribute("dur", `${len / 100}`);
// //     animate.setAttribute("fill", "freeze");

// //     path.appendChild(animate);
// //     animate.beginElement();
// //   });

// //   btns.forEach((btn) => {
// //     btn.addEventListener("mouseenter", function () {
// //       const path = this.querySelector("svg > path");

// //       let len = Math.round(path.getTotalLength());

// //       const animate = document.createElementNS(
// //         "http://www.w3.org/2000/svg",
// //         "animate"
// //       );
// //       animate.setAttribute("attributeName", "stroke-dashoffset");
// //       animate.setAttribute("values", `${len}; 0`);
// //       animate.setAttribute("dur", `${len / 100}`);
// //       animate.setAttribute("fill", "freeze");

// //       path.appendChild(animate);
// //       animate.beginElement();
// //     });
// //   });
// // }

// // Вызываем totalSvg при загрузке страницы
// document.addEventListener("DOMContentLoaded", totalSvg);
// document.addEventListener("DOMContentLoaded", totalSvg_2);
