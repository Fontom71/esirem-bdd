import { API_URL } from "../constants.js";
import Main from "../main.js";
import GameAPI from "./api/game-api.js";

class GameService {
  /**
   * Crée un nouveau jeu et met à jour les identifiants du joueur et du jeu dans Main.
   *
   * @param {string} username - Le nom d'utilisateur du créateur du jeu.
   * @returns {Promise<any>} - Une promesse qui résout la création du jeu.
   */
  static async create(username) {
    const gameApi = await GameAPI.create(username);
    const gameJson = JSON.parse(gameApi);
    Main.playerId.set(gameJson.playerId);
    Main.gameId.set(gameJson.gameId);
    return gameApi;
  }

  /**
   * Rejoint un jeu existant et met à jour l'identifiant du jeu dans Main.
   *
   * @param {string} gameId - L'identifiant du jeu.
   * @param {string} username - Le nom d'utilisateur du joueur.
   * @returns {Promise<any>} - Une promesse qui résout la participation au jeu.
   */
  static async join(gameId, username) {
    const gameApi = await GameAPI.join(gameId, username);
    if (!gameApi) return null;
    const gameJson = JSON.parse(gameApi);
    Main.gameId.set(gameJson.gameId);
    return gameApi;
  }

  /**
   * Choisit un rôle pour le joueur actuel dans le jeu actuel.
   *
   * @param {string} role - Le rôle choisi.
   * @returns {Promise<any>} - Une promesse qui résout le choix du rôle.
   */
  static async choose(role) {
    const gameApi = await GameAPI.choose(
      Main.gameId.get(),
      Main.playerId.get(),
      role
    );
    return gameApi;
  }

  /**
   * Démarre le jeu actuel.
   *
   * @returns {Promise<any>} - Une promesse qui résout le démarrage du jeu.
   */
  static async start() {
    const gameApi = await GameAPI.start(Main.gameId.get());
    if (!gameApi) return null;
    const gameJson = JSON.parse(gameApi);
    return gameJson;
  }

  /**
   * Récupère les informations d'un jeu spécifique.
   *
   * @param {string} gameId - L'identifiant du jeu.
   * @returns {Promise<any>} - Une promesse qui résout les informations du jeu.
   */
  static async get(gameId) {
    const gameApi = await GameAPI.get(gameId);
    if (!gameApi) return null;
    const gameJson = JSON.parse(gameApi);
    return gameJson;
  }

  /**
   * Vérifie la disponibilité de l'API.
   *
   * @returns {Promise<void>} - Une promesse qui résout si l'API est disponible.
   * @throws {Error} - Si l'API n'est pas disponible.
   */
  static async checkApiAvailability() {
    const response = await fetch(`${API_URL}/status`);
    if (!response.ok) {
      throw new Error("API not available");
    }
  }

  /**
   * Récupère le score d'un jeu spécifique.
   *
   * @param {string} gameId - L'identifiant du jeu.
   * @returns {Promise<any>} - Une promesse qui résout le score du jeu.
   */
  static async getScore(gameId) {
    const gameApi = await GameAPI.getScore(gameId);
    if (!gameApi) return null;
    const gameJson = JSON.parse(gameApi);
    return gameJson;
  }
}

export default GameService;
