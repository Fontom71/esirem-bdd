import Notifier from "../pattern/notifier.js";

class Controller extends Notifier {
  #counter;

  constructor() {
    super();
    this.#counter = 0;
  }

  incrementCounter() {
    this.#counter++;
    this.notify();
  }

  decrementCounter() {
    this.#counter--;
    this.notify();
  }

  getCounterValue() {
    return this.#counter;
  }
}

export default Controller;
