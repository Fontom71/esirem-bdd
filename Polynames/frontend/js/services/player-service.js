import PlayerApi from "./api/player-api.js";

class PlayerService {
  /**
   * Récupère les joueurs pour un jeu spécifique.
   *
   * @param {string} gameId - L'identifiant du jeu.
   * @returns {Promise<any>} - Une promesse qui résout les joueurs du jeu.
   */
  static async getPlayers(gameId) {
    const playerApi = await PlayerApi.getPlayers(gameId);
    if (!playerApi) return null;
    const playerJson = JSON.parse(playerApi);
    return playerJson;
  }

  /**
   * Récupère les informations d'un joueur spécifique.
   *
   * @param {string} playerId - L'identifiant du joueur.
   * @returns {Promise<any>} - Une promesse qui résout les informations du joueur.
   */
  static async getPlayer(playerId) {
    const playerApi = await PlayerApi.getPlayer(playerId);
    if (!playerApi) return null;
    const playerJson = JSON.parse(playerApi);
    return playerJson;
  }
}

export default PlayerService;
