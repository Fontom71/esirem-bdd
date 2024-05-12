import { Observer } from "../patterns/observer.js";

export class ViewMemory extends Observer {
  #controllerMemory;

  constructor(controllerMemory) {
    super();

    this.#controllerMemory = controllerMemory;
    this.#controllerMemory.addObserver(this);
  }

  notify() {
    const cards = this.#controllerMemory.memory;
    this.displayCards(cards);
  }

  displayCard(card) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    if (card.faceHidden) {
      cardElement.classList.add("hidden");
    }
    const specialChar = String.fromCodePoint(card.value);
    cardElement.innerHTML = `<p>${specialChar}</p>`;
    const cards = document.getElementsByClassName("cards")[0];
    cards.appendChild(cardElement);
    cardElement.addEventListener("click", () => {
      const index = Array.from(cards.children).indexOf(cardElement);
      this.#controllerMemory.showCard(index);
    });
  }

  displayCards(cards) {
    const cardsContainer = document.getElementsByClassName("cards")[0];
    cardsContainer.innerHTML = "";

    for (let i = 0; i < cards.getCardsNumber(); i++) {
      this.displayCard(cards.getCard(i));
    }
  }
}
