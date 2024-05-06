import Controller from "../controllers/controller.js";
import View from "../views/view.js";

document.addEventListener("DOMContentLoaded", function () {
  const controller = new Controller();
  new View(controller);

  document
    .getElementById("btn-increment")
    .addEventListener("click", function () {
      controller.incrementCounter();
    });

  document
    .getElementById("btn-decrement")
    .addEventListener("click", function () {
      controller.decrementCounter();
    });
});
