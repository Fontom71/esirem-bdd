class Card {
  #value;
  #faceHidden;

  get value() {
    return this.#value;
  }

  get faceHidden() {
    return this.#faceHidden;
  }

  constructor(value) {
    this.#value = value;
    this.#faceHidden = true;
  }

  show() {
    this.#faceHidden = false;
  }

  hide() {
    this.#faceHidden = true;
  }

  toData() {
    return {
      value: this.#value,
      faceHidden: this.#faceHidden,
    };
  }
}

export { Card };
