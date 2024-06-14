import Main from "../main.js";
import GameService from "../services/game-service.js";
import PlayerService from "../services/player-service.js";
import Role from "../utils/roles.js";
import ErrorView from "./error-view.js";
import GameView from "./game-view.js";
import RoleView from "./role-view.js";
import SuccessView from "./success-view.js";

class PlayerView {
  // Affiche les informations de l'utilisateur
  static async displayUserInformation() {
    const app = document.querySelector("app");

    const profile = document.createElement("div");
    profile.classList.add("profile-container");

    // Récupérer les données du joueur
    const playerDb = await PlayerService.getPlayer(Main.playerId.get());
    const player = Main.username.get();
    const role = playerDb.role;
    const code = Main.gameId.get();

    const menuButton = document.createElement("button");
    menuButton.classList.add("menu-button");
    for (let i = 0; i < 3; i++) {
      const bar = document.createElement("div");
      menuButton.appendChild(bar);
    }

    const menuItems = document.createElement("div");
    menuItems.classList.add("menu-items");

    const username = document.createElement("div");
    username.classList.add("pseudo-profile");
    username.innerText = `Pseudo: ${player}`;

    const roleElement = document.createElement("div");
    roleElement.classList.add("role-profile");
    roleElement.innerText = `Rôle: ${role}`;

    const codeElement = document.createElement("div");
    codeElement.classList.add("code-profile");
    codeElement.innerText = `Code: `;

    const codeSpan = document.createElement("span");
    codeSpan.innerText = code;
    codeElement.appendChild(codeSpan);

    const logout = document.createElement("button");
    logout.innerText = "Quitter le salon";
    logout.classList.add("logout");

    menuItems.appendChild(username);
    menuItems.appendChild(roleElement);
    menuItems.appendChild(codeElement);
    menuItems.appendChild(logout);

    profile.appendChild(menuButton);
    profile.appendChild(menuItems);
    app.appendChild(profile, app.firstChild);

    // Afficher ou cacher le menu
    menuButton.addEventListener("click", (event) => {
      event.stopPropagation();
      menuButton.classList.toggle("active");
      const toggle = menuItems.style.display === "block" ? "none" : "block";
      menuItems.style.display = toggle;
    });

    // Fermer le menu si on clique en dehors
    document.addEventListener("click", (event) => {
      if (
        !menuItems.contains(event.target) &&
        !menuButton.contains(event.target)
      ) {
        menuItems.style.display = "none";
        menuButton.classList.remove("active"); // Ajoutez cette ligne
      }
    });

    codeElement.addEventListener("click", () => {
      const code = codeElement.querySelector("span");
      navigator.clipboard.writeText(code.innerText);
      // Affiche une notification de succès
      SuccessView.displaySuccess("Code copié dans le presse-papier");
    });

    logout.addEventListener("click", () => {
      Main.gameId.remove();
      // Supprime toutes les vues
      GameView.deleteAllViews();
      Main.run();
    });
  }

  // Affiche le formulaire pour créer un pseudo
  static async showCreatePseudo() {
    const app = document.querySelector("app");
    const pseudoContainer = document.createElement("div");
    pseudoContainer.classList.add("pseudo-container");

    const player = Main.username.get();
    const pseudoInput = document.createElement("input");
    pseudoInput.setAttribute("type", "text");
    pseudoInput.setAttribute("placeholder", "Entrez votre pseudo");
    pseudoInput.value = player;
    pseudoInput.classList.add("pseudo");

    const join = document.createElement("button");
    join.innerText = "Rejoindre la partie";
    join.classList.add("join");

    const create = document.createElement("button");
    create.innerText = "Créer une partie";
    create.classList.add("create");

    pseudoContainer.appendChild(pseudoInput);
    pseudoContainer.appendChild(join);
    pseudoContainer.appendChild(create);
    app.appendChild(pseudoContainer);

    join.addEventListener("click", async () => {
      const enteredPseudo = pseudoInput.value;

      if (enteredPseudo) {
        // Logique pour rejoindre une partie
        Main.username.set(enteredPseudo.toString());
        GameView.deleteView("pseudo");
        GameView.createJoinContainer();
      } else {
        // Logique d'erreur
        ErrorView.displayError("Veuillez entrer un pseudo");
      }
    });

    create.addEventListener("click", async () => {
      const enteredPseudo = pseudoInput.value;

      if (enteredPseudo) {
        // Logique pour créer une partie
        Main.username.set(enteredPseudo.toString());
        GameView.deleteView("pseudo");
        RoleView.choosePlayerRole();
      } else {
        // Logique d'erreur
        ErrorView.displayError("Veuillez entrer un pseudo");
      }
    });
  }

  // Met à jour le profil de l'utilisateur
  static updateProfile(data) {
    const pseudo = document.querySelector(".pseudo-profile");
    const role = document.querySelector(".role-profile");
    const code = document.querySelector(".code-profile");

    pseudo.innerText = `Pseudo: ${data.username}`;
    role.innerText = `Rôle: ${data.role}`;
    code.innerText = `Code: ${data.code}`;
  }

  // Affiche la liste des joueurs
  static async renderPlayerList() {
    const app = document.querySelector("app");

    const players = document.createElement("div");
    players.classList.add("players");

    // Récupérer les données des joueurs
    let gamePlayers = await PlayerService.getPlayers(Main.gameId.get());

    // Créer l'élément du score
    const scoreElement = document.createElement("div");
    scoreElement.classList.add("score");
    scoreElement.innerText = "Score :";

    // Ajouter le numéro du score
    const score = await GameService.getScore(Main.gameId.get());
    const scoreDisplay = document.createElement("span");
    scoreDisplay.classList.add("score-number");
    scoreDisplay.innerText = score.value;
    scoreElement.appendChild(scoreDisplay);

    gamePlayers.players.forEach(async (player, index) => {
      const playerCard = document.createElement("div");
      playerCard.classList.add("player-card");

      const playerName = document.createElement("div");
      playerName.classList.add("player-name");
      playerName.innerText = `Pseudo: ${player.username}`;

      const role = Role.roles.find((role) => role === player.role);
      const playerRole = document.createElement("div");
      playerRole.classList.add("player-role");
      playerRole.innerText = `Rôle: ${role}`;

      playerCard.appendChild(playerName);
      playerCard.appendChild(playerRole);

      players.appendChild(playerCard);
    });

    players.appendChild(scoreElement);
    app.appendChild(players);
  }

  // Met à jour la liste des joueurs
  static async updatePlayerList(player) {
    const playersContainer = document.querySelector(".players");
    if (!playersContainer) {
      // Si le conteneur des joueurs n'existe pas, on le crée.
      await PlayerView.renderPlayerList();
    }

    // Création de la carte du joueur
    const playerCard = document.createElement("div");
    playerCard.classList.add("player-card");

    const playerName = document.createElement("div");
    playerName.classList.add("player-name");
    playerName.innerText = `Pseudo: ${player.username}`;

    const role = Role.roles.find((role) => role === player.role);
    const playerRole = document.createElement("div");
    playerRole.classList.add("player-role");
    playerRole.innerText = `Rôle: ${role}`;

    playerCard.appendChild(playerName);
    playerCard.appendChild(playerRole);

    // Ajout de la carte du joueur avant le dernier joueur
    playersContainer.insertBefore(playerCard, playersContainer.lastChild);
  }

  // Met à jour le score
  static async updateScore(score) {
    const scoreElement = document.querySelector(".score-number");
    scoreElement.innerText = score;
  }
}

export default PlayerView;
