// Créez une fonction « generateFields » qui créera 25 éléments :
function generateFields() {
  // Sélectionner la balise "field-parts" déjà présente dans le document HTML
  const fieldParts = document.querySelector("field-parts");

  // Boucle pour créer 25 éléments "field-part" avec la classe CSS "grass"
  for (let i = 0; i < 25; i++) {
    // Créer un nouvel élément avec la balise personnalisée "field-part"
    const fieldPart = document.createElement("field-part");
    // Ajouter la classe CSS "grass" à cet élément
    fieldPart.classList.add("grass");
    // Ajouter l'élément comme enfant de la balise "field-parts"
    fieldParts.appendChild(fieldPart);
  }
}

// Appelez la fonction « generateFields » lorsque la page a terminé son chargement.
window.addEventListener("load", generateFields);

// Créez une fonction « attachToolsEvent » qui ajoutera un gestionnaire d'événement "click" à chaque outil.
function attachToolsEvent() {
  const tools = document.querySelectorAll("tool");
  const fieldParts = document.querySelectorAll("field-part");
  const stockWheat = document.getElementById("stock-wheat");

  let selectedTool = null; // Pour stocker l'outil actuellement sélectionné

  tools.forEach((tool) => {
    tool.addEventListener("click", () => {
      // Retirer la classe "active" de tous les outils
      tools.forEach((tool) => {
        tool.classList.remove("active");
      });
      // Ajouter la classe "active" à l'outil sur lequel l'utilisateur a cliqué
      tool.classList.add("active");
      // Stocker l'outil actuellement sélectionné
      selectedTool = tool.id;
    });
  });

  fieldParts.forEach((field) => {
    field.addEventListener("click", () => {
      if (selectedTool === "tool-hoe") {
        field.classList.remove("grass");
        field.classList.add("farmland");
      } else if (
        selectedTool === "tool-water" &&
        field.classList.contains("farmland")
      ) {
        field.classList.add("hydrated");
      } else if (
        selectedTool === "tool-sow" &&
        field.classList.contains("farmland")
      ) {
        field.dataset.seed = 1;
      } else if (selectedTool === "tool-harvest" && field.dataset.seed) {
        if (field.dataset.seed === "7") {
          stockWheat.innerText = parseInt(stockWheat.innerText) + 1;
        }
        field.dataset.seed = 0;
      }
    });
  });
}

window.addEventListener("load", attachToolsEvent);

function grow() {
  const fieldParts = document.querySelectorAll(".farmland[data-seed]");
  const hydratedFields = document.querySelectorAll(".farmland.hydrated");

  // Pour chaque champ de blé
  fieldParts.forEach((field) => {
    let seedValue = parseInt(field.dataset.seed);
    // Calculer la probabilité de croissance en fonction de l'arrosage
    let growthProbability = hydratedFields.includes(field) ? 0.3 : 0.05;
    // Générer un nombre aléatoire entre 0 et 1
    let random = Math.random();
    // Vérifier si la croissance se produit en fonction de la probabilité
    if (random < growthProbability) {
      if (seedValue < 7) {
        seedValue++;
        field.dataset.seed = seedValue;
      }
    }
  });

  // Gérer l'humidité des champs arrosés
  hydratedFields.forEach((field) => {
    // Retirer la classe "hydrated" après 10 secondes
    setTimeout(() => {
      field.classList.remove("hydrated");
    }, 10000);
  });

  // Probabilité qu'un champ sec sans graine redevienne de l'herbe
  const dryFields = document.querySelectorAll(".farmland:not([data-seed])");
  dryFields.forEach((field) => {
    let random = Math.random();
    // Si la probabilité est de 1% ou moins, redevient de l'herbe
    if (random <= 0.01) {
      field.classList.remove("farmland");
      field.classList.add("grass");
    }
  });

  // Appeler la fonction grow toutes les secondes (1000 millisecondes)
  setTimeout(grow, 1000);
}

// Appeler la fonction grow lorsque la page a terminé son chargement
window.addEventListener("load", grow);
