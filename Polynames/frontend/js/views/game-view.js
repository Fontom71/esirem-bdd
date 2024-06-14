import Main from "../main.js";
import ClueService from "../services/clue-service.js";
import ErrorView from "./error-view.js";
import PlayerView from "./player-view.js";

class GameView {
  // Crée le conteneur pour rejoindre une partie
  static async createJoinContainer() {
    const app = document.querySelector("app");
    const joinContainer = document.createElement("div");
    joinContainer.classList.add("join-container");

    const code = document.createElement("input");
    code.setAttribute("type", "text");
    code.setAttribute("placeholder", "Entrez le code de la partie");
    code.setAttribute("maxlength", "8");
    code.classList.add("code");

    code.addEventListener("input", () => {
      code.value = code.value.toUpperCase();
    });

    const join = document.createElement("button");
    join.innerText = "Rejoindre la partie";
    join.classList.add("join");

    joinContainer.appendChild(code);
    joinContainer.appendChild(join);
    app.appendChild(joinContainer);

    join.addEventListener("click", async () => {
      const enteredCode = code.value;

      if (enteredCode) {
        // Logique pour rejoindre une partie
        Main.codeGame = enteredCode;
        await Main.onJoin();
      } else {
        // Logique d'erreur
        ErrorView.displayError("Veuillez entrer un code");
      }
    });
  }

  // Affiche le formulaire pour entrer un indice
  static renderIndiceForm() {
    const app = document.querySelector("app");

    const indiceContainer = document.createElement("div");
    indiceContainer.classList.add("indice-container");

    const word = document.createElement("input");
    word.setAttribute("type", "text");
    word.setAttribute("placeholder", "Entrez le mot");
    word.classList.add("word");
    word.style.textTransform = "uppercase";
    word.setAttribute("maxlength", "15");

    word.addEventListener("input", () => {
      word.value = word.value.replace(/\s+/g, ""); // Supprime tous les espaces
    });

    const count = document.createElement("select");
    count.classList.add("count");

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.innerText = "-";
    defaultOption.hidden = true;
    count.appendChild(defaultOption);

    for (let i = 0; i <= 9; i++) {
      const option = document.createElement("option");
      option.value = i;
      option.innerText = i;
      count.appendChild(option);
    }

    const submit = document.createElement("button");
    submit.innerText = "Valider";
    submit.classList.add("submit");

    submit.addEventListener("click", async () => {
      const enteredWord = word.value;
      const enteredCount = count.value;

      if (enteredWord && enteredCount) {
        // Supprimer la vue indice
        GameView.deleteView("indice");

        await ClueService.create(
          Main.gameId.get(),
          Main.playerId.get(),
          enteredWord,
          enteredCount
        );
      } else {
        // Logique d'erreur
        ErrorView.displayError("Veuillez entrer un mot et un nombre");
      }
    });

    indiceContainer.appendChild(word);
    indiceContainer.appendChild(count);
    indiceContainer.appendChild(submit);
    app.appendChild(indiceContainer);
  }

  // Affiche le bouton de retour
  static backPage() {
    const app = document.querySelector("app");
    const back = document.createElement("button");
    back.id = "back";
    back.innerText = "👈 Retour";
    app.appendChild(back);

    back.addEventListener("click", () => {
      app.removeChild(back);
      const views = ["role", "join"];
      views.forEach((view) => {
        const viewContainer = document.querySelector(`.${view}-container`);
        if (viewContainer) {
          GameView.deleteView(view);
          PlayerView.showCreatePseudo();
        }
      });
    });
  }

  // Supprime une vue spécifique
  static deleteView(view) {
    const app = document.querySelector("app");
    const viewElement = document.querySelector(`.${view}-container`);

    if (viewElement) {
      app.removeChild(viewElement);
    }
  }

  // Supprime toutes les vues
  static deleteAllViews() {
    const app = document.querySelector("app");
    app.innerHTML = "";
  }
}

export default GameView;
