import Controller from "../controllers/controller.js";
import View from "../views/view.js";

document.addEventListener("DOMContentLoaded", () => {
  const controller = new Controller();
  new View(controller);
});
