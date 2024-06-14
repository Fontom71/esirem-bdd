class Storage {
  /**
   * Récupère une valeur du localStorage.
   *
   * @param {string} key - La clé de l'élément à récupérer.
   * @returns {any|null} - La valeur associée à la clé, ou null si non trouvée.
   */
  static get(key) {
    const storage = localStorage.getItem(key);
    if (storage) {
      return JSON.parse(storage);
    } else {
      return null;
    }
  }

  /**
   * Sauvegarde une valeur dans le localStorage.
   *
   * @param {string} key - La clé de l'élément à sauvegarder.
   * @param {any} value - La valeur à sauvegarder.
   */
  static save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Supprime une valeur du localStorage.
   *
   * @param {string} key - La clé de l'élément à supprimer.
   */
  static remove(key) {
    localStorage.removeItem(key);
  }
}

export default Storage;
