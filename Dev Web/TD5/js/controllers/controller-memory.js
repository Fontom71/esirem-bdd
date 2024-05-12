import { Memory } from "../models/memory.js";
import { Notifier } from "../patterns/notifier.js";

export class ControllerMemory extends Notifier {
  #memory;

  get memory() {
    return this.#memory;
  }

  constructor() {
    super();
    this.#memory = new Memory();
  }

  newGame() {
    this.#memory.newGame(10);
    this.saveGame();
    this.notify();
  }

  saveGame() {
    sessionStorage.setItem("memory", JSON.stringify(this.#memory.toData()));
  }

  loadGame() {
    const memoryData = JSON.parse(sessionStorage.getItem("memory"));
    if (memoryData) {
      this.memory.fromData(memoryData);
      this.notify();
      return true;
    } else {
      return false;
    }
  }

  showCard(index) {
    this.#memory.showCard(index);
    this.saveGame();
    this.notify();
  }

  start() {
    if (!this.loadGame()) {
      this.newGame();
    }
  }
}
