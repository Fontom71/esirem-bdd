import Observer from "../pattern/observer.js";

class View extends Observer {
  #controller;

  constructor(controller) {
    super();
    this.#controller = controller;
    this.#controller.addObserver(this);

    document
    .getElementById("btn-increment")
    .addEventListener("click", () => {
      controller.incrementCounter();
    });

    document
    .getElementById("btn-decrement")
    .addEventListener("click", () => {
      controller.decrementCounter();
    });
  }

  notify() {
    // affiche la valeur du compteur dans txt-counter
    document.getElementById("txt-counter").textContent =
      this.#controller.getCounterValue();
  }
}

export default View;
