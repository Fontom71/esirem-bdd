import { API_URL } from "../../constants.js";
import { apiCall } from "../../utils/api.js";

class PlayerApi {
  /**
   * Récupère les joueurs pour un jeu spécifique.
   *
   * @param {string} gameId - L'identifiant du jeu.
   * @returns {Promise<any>} - Une promesse qui résout les joueurs du jeu.
   */
  static async getPlayers(gameId) {
    return apiCall(`${API_URL}/get-players/${gameId}`, "GET");
  }

  /**
   * Récupère les informations d'un joueur spécifique.
   *
   * @param {string} playerId - L'identifiant du joueur.
   * @returns {Promise<any>} - Une promesse qui résout les informations du joueur.
   */
  static async getPlayer(playerId) {
    return apiCall(`${API_URL}/get-player/${playerId}`, "GET");
  }
}

export default PlayerApi;
