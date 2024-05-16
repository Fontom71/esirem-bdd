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
    const memoryData = JSON.stringify(this.#memory.toData());
    sessionStorage.setItem("memory", memoryData);
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
    const win = this.#memory.showCard(index);
    this.saveGame();
    this.notify();
    setTimeout(() => {
      this.saveGame();
      this.notify();
      if (win) {
        this.newGame();
      }
    }, 1000);
  }

  start() {
    if (!this.loadGame()) {
      this.newGame();
    }
  }
}
