import CardView from "./views/card-view.js";
import ErrorView from "./views/error-view.js";
import GameView from "./views/game-view.js";
import PlayerView from "./views/player-view.js";
import GameService from "./services/game-service.js";
import Storage from "./utils/storage.js";
import PlayerService from "./services/player-service.js";
import SSEService from "./services/sse-service.js";
import { SSEClient } from "./libs/sse-client.js";
import { SSE_URL } from "./constants.js";
import Role from "./utils/roles.js";
import ClueService from "./services/clue-service.js";

class Main {
  static codeGame = null;
  static started = false;
  static sseClient = new SSEClient(SSE_URL);
  static gameId = {
    get() {
      return Storage.get("game");
    },
    set(gameId) {
      Storage.save("game", gameId);
    },
    remove() {
      Storage.remove("game");
    },
  };
  static playerId = {
    get() {
      return Storage.get("player");
    },
    set(playerId) {
      Storage.save("player", playerId);
    },
    remove() {
      Storage.remove("player");
    },
  };
  static username = {
    get() {
      return Storage.get("username");
    },
    set(username) {
      Storage.save("username", username);
    },
    remove() {
      Storage.remove("username");
    },
  };

  /**
   * S'abonne aux événements SSE pour un jeu donné
   * @param {string} game - L'ID du jeu
   */
  static subscribeToSSE(game) {
    Main.sseClient.subscribe(`join-${game}`, SSEService.join);
    Main.sseClient.subscribe(`cards-${game}`, SSEService.cards);
    Main.sseClient.subscribe(`role-${game}`, SSEService.role);
    Main.sseClient.subscribe(`ready-${game}`, SSEService.ready);
    Main.sseClient.subscribe(`clue-${game}`, SSEService.clue);
    Main.sseClient.subscribe(`guess-${game}`, SSEService.guess);
    Main.sseClient.subscribe(`start-${game}`, SSEService.start);
  }

  /**
   * Exécute l'application principale
   */
  static async run() {
    try {
      await GameService.checkApiAvailability();

      ErrorView.init();
      Main.sseClient.connect();

      if (Main.gameId.get()) this.started = true;
      this.started ? Main.onCreated() : PlayerView.showCreatePseudo();
    } catch (error) {
      ErrorView.displayError(
        "L'API n'est pas disponible. Veuillez réessayer plus tard."
      );
      const app = document.querySelector("app");
      const messageElement = document.createElement("div");
      messageElement.className = "message";
      messageElement.innerText =
        "L'API n'est pas disponible. Veuillez réessayer plus tard.";
      app.appendChild(messageElement);
    }
  }

  /**
   * Gère le processus de rejoindre
   */
  static async onJoin() {
    try {
      let data = await GameService.join(this.codeGame, Main.username.get());
      data = JSON.parse(data);
      if (!data) {
        throw new Error("Code invalide");
      }

      const { playerId } = data;
      this.playerId.set(playerId);

      GameView.deleteView("join");

      const game = this.gameId.get();
      if (game) {
        Main.subscribeToSSE(game);

        await PlayerService.getPlayers(game);

        await PlayerView.displayUserInformation();
        await PlayerView.renderPlayerList();
        await CardView.generateWords();
        CardView.waitForHost();
      } else {
        throw new Error("Game ID non trouvé");
      }
    } catch (error) {
      ErrorView.displayError(error.message);
    }
  }

  /**
   * Gère le processus de création
   */
  static async onCreated() {
    const game = this.gameId.get();
    if (game) {
      Main.subscribeToSSE(game);
      const player = await PlayerService.getPlayer(Main.playerId.get());
      await PlayerService.getPlayers(game);
      const gamePlayers = await PlayerService.getPlayers(Main.gameId.get());
      await PlayerView.displayUserInformation();
      await PlayerView.renderPlayerList();
      await CardView.generateWords();
      let status = await GameService.get(game);
      if (!status.isStarted) {
        if (player.isHost && gamePlayers.players.length > 1)
          CardView.startGame();
        else if (player.isHost && gamePlayers.players.length === 1)
          CardView.waitForPlayer();
        else CardView.waitForHost();
      } else {
        await Main.executePlayerAction(Main.playerId.get());
      }
    }
  }

  /**
   * Exécute l'action du joueur
   * @param {string} playerId - L'ID du joueur
   */
  static async executePlayerAction(playerId) {
    const game = await GameService.get(Main.gameId.get());
    const player = await PlayerService.getPlayer(playerId);
    CardView.toggleClickCards(false);
    if (
      game.playing === player.playerId &&
      player.role === Role.maitreDesMots
    ) {
      GameView.renderIndiceForm();
    } else if (game.playing !== player.playerId) {
      CardView.waitForPlayer();
    } else {
      const clue = await ClueService.getClue(game.gameId);
      CardView.showClue(clue);
      CardView.toggleClickCards(true);
    }
  }
}

export default Main;

document.addEventListener("DOMContentLoaded", Main.run);
