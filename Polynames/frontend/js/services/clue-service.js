import ClueApi from "./api/clue-api.js";

class ClueService {
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
    const clueApi = await ClueApi.create(
      gameId,
      playerId,
      clueText,
      clueNumber
    );
    if (!clueApi) return null;
    const clueJson = JSON.parse(clueApi);
    return clueJson;
  }

  /**
   * Récupère l'indice pour un jeu spécifique.
   *
   * @param {string} gameId - L'identifiant du jeu.
   * @returns {Promise<any>} - Une promesse qui résout l'indice du jeu.
   */
  static async getClue(gameId) {
    const clueApi = await ClueApi.getClue(gameId);
    if (!clueApi) return null;
    const clueJson = JSON.parse(clueApi);
    return clueJson;
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
    const clueApi = await ClueApi.guessCard(gameId, playerId, row, col);
    if (!clueApi) return null;
    const clueJson = JSON.parse(clueApi);
    return clueJson;
  }
}

export default ClueService;
