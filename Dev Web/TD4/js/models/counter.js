class Counter {
  #value;
  get value() {
    return this.#value;
  }

  constructor() {
    this.#value = 0;
  }

  incrementValue() {
    this.#value++;
  }

  decrementValue() {
    this.#value--;
  }
}

export default Counter;
