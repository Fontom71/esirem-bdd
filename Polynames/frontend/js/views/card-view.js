import Main from "../main.js";
import CardService from "../services/card-service.js";
import ClueService from "../services/clue-service.js";
import GameService from "../services/game-service.js";
import GameView from "./game-view.js";

class CardView {
  // Génère les cartes avec les mots
  static async generateWords() {
    const app = document.querySelector("app");
    const cardsContainer = document.createElement("div");
    cardsContainer.classList.add("cards-container");

    const cards = await CardService.getCards(
      Main.gameId.get(),
      Main.playerId.get()
    );

    // Générer les cartes sans révéler les mots
    cards.cards.forEach((cardData, index) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.id = index;
      card.dataset.row = cardData.row;
      card.dataset.col = cardData.col;
      card.innerText = cardData.word; // Stocker le mot dans un attribut data
      cardData.typeCard
        ? card.classList.add(cardData.typeCard)
        : card.classList.add("card");
      cardData.isRevealed
        ? (card.style.pointerEvents = "none")
        : (card.style.pointerEvents = "auto");
      cardsContainer.appendChild(card);

      // Ajouter un événement de clic pour deviner la carte
      card.addEventListener("click", async () => {
        const row = card.dataset.row;
        const col = card.dataset.col;
        await ClueService.guessCard(
          Main.gameId.get(),
          Main.playerId.get(),
          row,
          col
        );
      });
    });

    app.appendChild(cardsContainer);
  }

  // Démarre le jeu
  static startGame() {
    GameView.deleteView("waiting");
    const app = document.querySelector("app");
    const start = document.createElement("button");
    start.innerText = "Démarrer la partie";
    start.classList.add("start");

    start.addEventListener("click", async () => {
      app.removeChild(start);
      await GameService.start();
    });
    app.appendChild(start);
  }

  // Affiche un message d'attente pour le joueur
  static waitForPlayer() {
    const app = document.querySelector("app");
    const waiting = document.createElement("div");
    waiting.innerText = "En attente du joueur";
    waiting.classList.add("waiting-container");
    app.appendChild(waiting);
  }

  // Affiche un message d'attente pour l'hôte
  static waitForHost() {
    const app = document.querySelector("app");
    const waiting = document.createElement("div");
    waiting.innerText = "En attente du hôte";
    waiting.classList.add("waiting-container");
    app.appendChild(waiting);
  }

  // Affiche un message d'attente pour l'indice
  static waitForClue() {
    const app = document.querySelector("app");
    const waiting = document.createElement("div");
    waiting.innerText = "En attente de l'indice";
    waiting.classList.add("waiting-container");
    app.appendChild(waiting);
  }

  // Active ou désactive les clics sur les cartes
  static async toggleClickCards(action) {
    const cards = document.querySelectorAll(".card");

    if (action === true) {
      const cardsData = await CardService.getCards(
        Main.gameId.get(),
        Main.playerId.get()
      );

      cards.forEach((card, index) => {
        const isRevealed = cardsData.cards[index].isRevealed === "true";
        card.style.pointerEvents = isRevealed ? "none" : "auto";
      });
    } else {
      cards.forEach((card) => {
        card.style.pointerEvents = "none";
      });
    }
  }

  // Affiche l'indice
  static showClue(data) {
    const app = document.querySelector("app");
    const indice = document.createElement("div");
    indice.classList.add("clue-container");
    indice.innerText = `${data.clueText} - ${data.clueNum}`;
    app.appendChild(indice);
  }
}

export default CardView;
