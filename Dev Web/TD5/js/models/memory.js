import { Card } from "./card.js";

class Memory {
  #cards;
  #firstCardIndex;

  constructor() {
    this.#cards = [];
    this.#firstCardIndex = null;
  }

  newGame(pairsNumber) {
    this.#cards = [];
    for (let i = 0; i < pairsNumber; i++) {
      const value = 0x1f90c + i;
      this.#cards.push(new Card(value), new Card(value));
    }

    this.#cards = this.#cards.sort(() => Math.random() - 0.5);
  }

  getCardsNumber() {
    return this.#cards.length;
  }

  getCard(index) {
    return this.#cards[index];
  }

  showCard(index) {
    const card = this.#cards[index];
    if (card.faceHidden) {
      card.show();
      if (this.#firstCardIndex === null) {
        // Si c'est la première carte à être retournée
        this.#firstCardIndex = index;
      } else {
        // Si c'est la deuxième carte à être retournée
        const firstCard = this.#cards[this.#firstCardIndex];
        if (card.value === firstCard.value) {
          // Si les deux cartes sont identiques
          card.show();
        } else {
          // Si les deux cartes ne sont pas identiques, les masquer après une seconde
          setTimeout(() => {
            card.hide();
            firstCard.hide();
          }, 1000);
        }
        this.#firstCardIndex = null;
      }
    }

    // Vérifier si toutes les cartes ont été retournées
    let allCardsFound = true;
    this.#cards.forEach((card) => {
      if (card.faceHidden) {
        allCardsFound = false;
      }
    });

    if (allCardsFound) return true;
  }

  toData() {
    return {
      cards: this.#cards.map((card) => card.toData()),
    };
  }

  fromData(data) {
    this.#cards = [];
    data.cards.forEach((cardData) => {
      const card = new Card(cardData.value);
      cardData.faceHidden ? card.hide() : card.show();
      this.#cards.push(card);
    });
  }
}

export { Memory };
