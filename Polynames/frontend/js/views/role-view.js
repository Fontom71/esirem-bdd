import Main from "../main.js";
import GameService from "../services/game-service.js";
import Role from "../utils/roles.js";
import GameView from "./game-view.js";

class RoleView {
  // Affiche le formulaire pour choisir le rôle du joueur
  static async choosePlayerRole() {
    const app = document.querySelector("app");
    const roleContainer = document.createElement("div");
    roleContainer.classList.add("role-container");

    const roles = Role.roles;

    const select = document.createElement("select");
    select.classList.add("role-select");

    roles.forEach((role) => {
      const option = document.createElement("option");
      option.innerText = role;
      select.appendChild(option);
    });

    // Créer 2 boutons choisir le role ou aléatoire
    const submit = document.createElement("button");
    submit.innerText = "Choisir le rôle";
    submit.classList.add("submit");

    const random = document.createElement("button");
    random.innerText = "Rôle aléatoire";
    random.classList.add("random");

    roleContainer.appendChild(select);
    roleContainer.appendChild(submit);
    roleContainer.appendChild(random);
    roleContainer.appendChild(GameView.createBackButton()); // Ajoutez ceci
    app.appendChild(roleContainer);

    // Fonction pour gérer la sélection du rôle
    const handleRoleSelection = async (selectedRole) => {
      if (selectedRole) {
        await GameService.create(Main.username.get());
        const role = selectedRole ? selectedRole : Role.maitreDeLIntuition;
        const game = await GameService.choose(role);
        if (game) {
          GameView.deleteView("role");
          Main.onCreated();
        }
      }
    };

    // Événement pour le bouton de soumission
    submit.addEventListener("click", async () => {
      const selectedRole = select.value;
      await handleRoleSelection(selectedRole);
    });

    // Événement pour le bouton de rôle aléatoire
    random.addEventListener("click", async () => {
      const randomRole = roles[Math.floor(Math.random() * roles.length)];
      await handleRoleSelection(randomRole);
    });
  }
}

export default RoleView;
