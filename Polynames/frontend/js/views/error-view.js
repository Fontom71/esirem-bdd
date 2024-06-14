import { MIN_SCREEN_WIDTH } from "../constants.js";

class ErrorView {
  static boxDialog = document.getElementById("box-dialog");
  static errorCount = 0;
  static maxErrors = 3;

  // Initialise la gestion des erreurs globales
  static init() {
    window.onerror = (msg, url, lineNo, columnNo, error) => {
      this.displayError(msg, url, lineNo, columnNo, error);
      return true; // Empêche la propagation de l'erreur
    };

    window.addEventListener("unhandledrejection", (event) => {
      this.displayError(event.reason.message, null, null, null, event.reason);
      console.error(event.reason);
      event.preventDefault(); // Empêche la propagation de l'erreur
    });
  }

  // Affiche une notification d'erreur
  static displayError(msg, url, lineNo, columnNo, error) {
    if (this.errorCount >= this.maxErrors) return;

    const errorMsg = document.createElement("div");
    errorMsg.classList.add("error-notification");
    errorMsg.innerHTML = `
          ${msg} <br>
          ${url ? `<strong>URL:</strong> ${url} <br>` : ""}
          ${lineNo ? `<strong>Ligne:</strong> ${lineNo} <br>` : ""}
          ${columnNo ? `<strong>Colonne:</strong> ${columnNo} <br>` : ""}
          ${error ? `<strong>Erreur:</strong> ${error.stack} <br>` : ""}
          <div class="progress-bar"><div class="progress"></div></div>
        `;

    this.boxDialog.appendChild(errorMsg);
    this.errorCount++;

    // Affiche progressivement la notification
    setTimeout(() => {
      errorMsg.classList.add("show");
    }, 10);

    // Met à jour la barre de progression
    const progressBar = errorMsg.querySelector(".progress");
    let width = 100;
    const interval = setInterval(() => {
      width -= 2; // Réduit la largeur de 2% toutes les 100ms
      progressBar.style.width = width + "%";
      if (width <= 0) {
        clearInterval(interval);
      }
    }, 100);

    // Supprime la notification après 5 secondes
    setTimeout(() => {
      errorMsg.classList.remove("show");
      setTimeout(() => {
        this.boxDialog.removeChild(errorMsg);
        this.errorCount--;
      }, 500); // Donne le temps à l'animation de disparition
    }, 5000); // 5 secondes
  }

  // Affiche une erreur de taille d'écran
  static displayScreenSizeError() {
    const app = document.querySelector("app");
    app.innerHTML = `
      <div class="screen-size-error">
        <h1>Erreur de taille d'écran</h1>
        <p>La taille de l'écran doit être supérieure à ${MIN_SCREEN_WIDTH}px.</p>
      </div>
    `;
  }
}

export default ErrorView;
