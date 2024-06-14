import { API_URL } from "../../constants.js";
import { apiCall } from "../../utils/api.js";

class CardApi {
  /**
   * Récupère les cartes pour un jeu et un joueur spécifiques.
   *
   * @param {string} gameId - L'identifiant du jeu.
   * @param {string} player - Le nom du joueur.
   * @returns {Promise<any>} - Une promesse qui résout les cartes du joueur.
   */
  static async getCards(gameId, player) {
    return apiCall(`${API_URL}/get-cards/${gameId}/${player}`, "GET");
  }
}

export default CardApi;
