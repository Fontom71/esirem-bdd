import { API_URL } from "../../constants.js";
import { apiCall } from "../../utils/api.js";

class GameAPI {
  /**
   * Crée un nouveau jeu.
   *
   * @param {string} username - Le nom d'utilisateur du créateur du jeu.
   * @returns {Promise<any>} - Une promesse qui résout la création du jeu.
   */
  static async create(username) {
    return apiCall(`${API_URL}/create-game`, "POST", { username });
  }

  /**
   * Rejoint un jeu existant.
   *
   * @param {string} gameId - L'identifiant du jeu.
   * @param {string} username - Le nom d'utilisateur du joueur.
   * @returns {Promise<any>} - Une promesse qui résout la participation au jeu.
   */
  static async join(gameId, username) {
    return apiCall(`${API_URL}/join-game/${gameId}`, "POST", { username });
  }

  /**
   * Choisit un rôle pour un joueur dans un jeu spécifique.
   *
   * @param {string} gameId - L'identifiant du jeu.
   * @param {string} playerId - L'identifiant du joueur.
   * @param {string} role - Le rôle choisi.
   * @returns {Promise<any>} - Une promesse qui résout le choix du rôle.
   */
  static async choose(gameId, playerId, role) {
    return apiCall(`${API_URL}/choose-role/${gameId}`, "POST", {
      playerId,
      role,
    });
  }

  /**
   * Démarre un jeu spécifique.
   *
   * @param {string} gameId - L'identifiant du jeu.
   * @returns {Promise<any>} - Une promesse qui résout le démarrage du jeu.
   */
  static async start(gameId) {
    return apiCall(`${API_URL}/start-game/${gameId}`, "POST");
  }

  /**
   * Récupère les informations d'un jeu spécifique.
   *
   * @param {string} gameId - L'identifiant du jeu.
   * @returns {Promise<any>} - Une promesse qui résout les informations du jeu.
   */
  static async get(gameId) {
    return apiCall(`${API_URL}/get-game/${gameId}`, "GET");
  }

  /**
   * Récupère le score d'un jeu spécifique.
   *
   * @param {string} gameId - L'identifiant du jeu.
   * @returns {Promise<any>} - Une promesse qui résout le score du jeu.
   */
  static async getScore(gameId) {
    return apiCall(`${API_URL}/get-score/${gameId}`, "GET");
  }
}

export default GameAPI;
