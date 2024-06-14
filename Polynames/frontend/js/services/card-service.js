import CardApi from "./api/card-api.js";

class CardService {
  /**
   * Récupère les cartes pour un jeu et un joueur spécifiques.
   *
   * @param {string} gameId - L'identifiant du jeu.
   * @param {string} playerId - L'identifiant du joueur.
   * @returns {Promise<any>} - Une promesse qui résout les cartes du joueur.
   */
  static async getCards(gameId, playerId) {
    const wordApi = await CardApi.getCards(gameId, playerId);
    if (!wordApi) return null;
    const wordJson = JSON.parse(wordApi);
    return wordJson;
  }
}

export default CardService;
