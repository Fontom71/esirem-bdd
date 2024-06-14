import Main from "../main.js";
import Role from "../utils/roles.js";
import CardView from "../views/card-view.js";
import ErrorView from "../views/error-view.js";
import GameView from "../views/game-view.js";
import PlayerView from "../views/player-view.js";
import GameService from "./game-service.js";
import PlayerService from "./player-service.js";

class SSEService {
  /**
   * Gère l'événement de rejoindre un jeu.
   *
   * @param {string} data - Les données de l'événement en format JSON.
   */
  static async join(data) {
    data = JSON.parse(data);
    if (data.type === "player-joined") {
      const gamePlayers = await PlayerService.getPlayers(Main.gameId.get());
      const player = gamePlayers.players.find(
        (player) => player.playerId === data.playerId
      );
      await PlayerView.updatePlayerList(player);
    }
  }

  /**
   * Gère l'événement d'attribution de rôle.
   *
   * @param {string} data - Les données de l'événement en format JSON.
   */
  static role(data) {
    data = JSON.parse(data);
    if (data.type === "role-assigned") {
      const role = data.role;
      const roleElement = document.querySelector(".role");
      roleElement.innerText = role;
    }
  }

  /**
   * Gère l'événement de démarrage du jeu.
   *
   * @param {string} data - Les données de l'événement en format JSON.
   */
  static async start(data) {
    data = JSON.parse(data);
    if (data.type === "game-started") {
      GameView.deleteView("waiting");
      const player = await PlayerService.getPlayer(Main.playerId.get());
      player.role === Role.maitreDesMots
        ? GameView.renderIndiceForm()
        : CardView.waitForPlayer();
    }
  }

  /**
   * Gère l'événement de préparation au démarrage du jeu.
   *
   * @param {string} data - Les données de l'événement en format JSON.
   */
  static ready(data) {
    data = JSON.parse(data);
    if (data.type === "ready-to-start") {
      CardView.startGame();
    }
  }

  /**
   * Gère l'événement de mise à jour des cartes.
   *
   * @param {string} data - Les données de l'événement en format JSON.
   */
  static cards(data) {
    data = JSON.parse(data);
    if (data.type === "card-updated") {
      const card = document.querySelector(`.card[id="${data.id}"]`);
      card.innerText = data.word;
      card.classList.add(data.color);
    }
  }

  /**
   * Gère l'événement de création d'un indice.
   *
   * @param {string} data - Les données de l'événement en format JSON.
   */
  static async clue(data) {
    data = JSON.parse(data);
    if (data.type === "clue-created") {
      GameView.deleteView("waiting");
      const player = await PlayerService.getPlayer(Main.playerId.get());
      if (player.role === Role.maitreDeLIntuition) {
        // Afficher l'indice
        CardView.showClue(data);
        CardView.toggleClickCards(true);
      } else {
        CardView.waitForClue();
      }
    }
  }

  /**
   * Gère l'événement de devinette.
   *
   * @param {string} data - Les données de l'événement en format JSON.
   */
  static async guess(data) {
    data = JSON.parse(data);
    if (data.type === "guess-made") {
      if (data.isGuess) {
        if (data.found === 0) {
          GameView.deleteAllViews();
          ErrorView.displayError("Vous avez perdu !");
          Main.gameId.remove();
          await new Promise((resolve) => setTimeout(resolve, 3000));
          window.location.reload();
        } else {
          GameView.deleteView("waiting");
          GameView.deleteView("clue");
          Main.executePlayerAction(Main.playerId.get());
        }
      } else {
        const card = document.querySelector(
          `.card[data-row="${data.row}"][data-col="${data.col}"]`
        );
        card.classList.add(data.color);
        card.style.pointerEvents = "none";

        const score = await GameService.getScore(Main.gameId.get());
        PlayerView.updateScore(score.value);
      }
    }
  }
}

export default SSEService;
