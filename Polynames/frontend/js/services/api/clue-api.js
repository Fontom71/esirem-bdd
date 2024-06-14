import { API_URL } from "../../constants.js";
import { apiCall } from "../../utils/api.js";

class ClueApi {
  /**
   * Crée un indice pour un jeu et un joueur spécifiques.
   *
   * @param {string} gameId - L'identifiant du jeu.
   * @param {string} playerId - L'identifiant du joueur.
   * @param {string} clueText - Le texte de l'indice.
   * @param {number} clueNumber - Le numéro de l'indice.
   * @returns {Promise<any>} - Une promesse qui résout la création de l'indice.
   */
  static async create(gameId, playerId, clueText, clueNumber) {
    return apiCall(`${API_URL}/create-clue/${gameId}/${playerId}`, "POST", {
      clueText,
      clueNumber,
    });
  }

  /**
   * Récupère l'indice pour un jeu spécifique.
   *
   * @param {string} gameId - L'identifiant du jeu.
   * @returns {Promise<any>} - Une promesse qui résout l'indice du jeu.
   */
  static async getClue(gameId) {
    return apiCall(`${API_URL}/get-clue/${gameId}`, "GET");
  }

  /**
   * Devine une carte pour un jeu et un joueur spécifiques.
   *
   * @param {string} gameId - L'identifiant du jeu.
   * @param {string} playerId - L'identifiant du joueur.
   * @param {number} row - La ligne de la carte devinée.
   * @param {number} col - La colonne de la carte devinée.
   * @returns {Promise<any>} - Une promesse qui résout la tentative de deviner la carte.
   */
  static async guessCard(gameId, playerId, row, col) {
    return apiCall(`${API_URL}/guess/${gameId}/${playerId}`, "POST", {
      row,
      col,
    });
  }
}

export default ClueApi;
