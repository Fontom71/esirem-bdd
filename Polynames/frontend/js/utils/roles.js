class Role {
  // Définition des rôles privés
  static #maitreDesMots = "Maitre des mots";
  static #maitreDeLIntuition = "Maitre de l'intuition";

  // Accesseur pour le rôle "Maitre des mots"
  static get maitreDesMots() {
    return this.#maitreDesMots;
  }

  // Accesseur pour le rôle "Maitre de l'intuition"
  static get maitreDeLIntuition() {
    return this.#maitreDeLIntuition;
  }

  // Accesseur pour obtenir tous les rôles
  static get roles() {
    return [this.#maitreDesMots, this.#maitreDeLIntuition];
  }
}

export default Role;
