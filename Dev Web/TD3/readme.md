### TD - FarmCraft

### Création des Champs

1. Ouvrez le fichier `js/script.js`.
2. Créez une fonction `generateFields` qui créera 25 éléments :

   - ayant la balise personnalisée `field-part`
   - ayant la classe CSS `grass`
   - qui seront ajoutés comme enfants de la balise `field-parts` déjà présente dans le document HTML.
3. Testez le bon fonctionnement.

**script.js :**

```javascript
function generateFields() {
    const fieldPartsContainer = document.querySelector("field-parts");
    for (let i = 0; i < 25; i++) {
        const fieldPart = document.createElement("field-part");
        fieldPart.classList.add("grass");
        fieldPartsContainer.appendChild(fieldPart);
    }
}

window.addEventListener("load", generateFields);
```

### Sélection des Outils

1. Créez une fonction `attachToolsEvent` qui attachera un gestionnaire d’événement `click` sur les outils situés à gauche de l’interface. L’objectif est d’activer l’outil sur lequel l’utilisateur clique en lui affectant la classe CSS `active`. Seul un outil doit être actif à la fois.
2. Appelez la fonction `attachToolsEvent` lorsque la page a terminé son chargement.
3. Testez le bon fonctionnement.

**script.js :**

```javascript
function attachToolsEvent() {
    const tools = document.querySelectorAll(".tool");
    tools.forEach(tool => {
        tool.addEventListener("click", () => {
            tools.forEach(t => t.classList.remove("active"));
            tool.classList.add("active");
        });
    });
}

window.addEventListener("load", () => {
    generateFields();
    attachToolsEvent();
});
```

### Action des Outils sur les Champs

1. Créez des gestionnaires d’événements pour chaque outil.
   - **Labourer** : ajoute la classe `farmland` et retire la classe `grass`.
   - **Arroser** : ajoute la classe `hydrated` si le champ est labouré.
   - **Semer** : ajoute une propriété `data-seed` égale à 1 si le champ est labouré.
   - **Moissonner** : remet `data-seed` à 0 et augmente le stock de blé si `data-seed` était égal à 7.

**script.js :**

```javascript
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

window.addEventListener("load", () => {
    generateFields();
    attachToolsEvent();
});
```

### Pousse du Blé

1. Créez une fonction `grow` qui parcourra les champs de blé toutes les secondes et fera passer les graines à l’étape suivante de germination en incrémentant la valeur de `data-seed`.
   - La valeur de `data-seed` ne doit pas excéder 7.
   - Ajoutez une probabilité de croissance selon les règles suivantes :
     - 30% de chance de passer au stade suivant si le champ est arrosé.
     - 5% de chance sinon.
     - Un champ sec sans graine (data-seed = 0) a 1% de chance de redevenir de l’herbe chaque seconde.

**script.js :**

```javascript
function grow() {
    const fieldParts = document.querySelectorAll(".farmland[data-seed]");
    const hydratedFields = document.querySelectorAll(".farmland.hydrated");

    fieldParts.forEach((field) => {
        let seedValue = parseInt(field.dataset.seed);
        // Calculer la probabilité de croissance en fonction de l'arrosage
        let growthProbability = Array.from(hydratedFields).includes(field)
            ? 0.3
            : 0.05;
        // Générer un nombre aléatoire entre 0 et 1
        const min = 0;
        const max = 1;
        let random = Math.random() * (max - min) + min;
        // Vérifier si la croissance se produit en fonction de la probabilité
        if (random < growthProbability) {
            if (seedValue > 0 && seedValue < 7) {
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
        const min = 0;
        const max = 1;
        let random = Math.random() * (max - min) + min;
        // Si la probabilité est de 1% ou moins, redevient de l'herbe
        if (random <= 0.01) {
            field.classList.remove("farmland");
            field.classList.add("grass");
        }
    });

    // Appeler la fonction grow toutes les secondes (1000 millisecondes)
    setTimeout(grow, 1000);
}

window.addEventListener("load", () => {
    generateFields();
    attachToolsEvent();
    attachFieldEvents();
    grow();
});
```

### Code Complet de `script.js` :

```javascript
function generateFields() {
    const fieldParts = document.querySelector("field-parts");

    for (let i = 0; i < 25; i++) {
        // Créer un nouvel élément avec la balise personnalisée "field-part"
        const fieldPart = document.createElement("field-part");
        // Ajouter la classe CSS "grass" à cet élément
        fieldPart.classList.add("grass");
        // Ajouter l'élément comme enfant de la balise "field-parts"
        fieldParts.appendChild(fieldPart);
    }
}

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

    fieldParts.forEach((field) => {
        let seedValue = parseInt(field.dataset.seed);
        // Calculer la probabilité de croissance en fonction de l'arrosage
        let growthProbability = Array.from(hydratedFields).includes(field)
            ? 0.3
            : 0.05;
        // Générer un nombre aléatoire entre 0 et 1
        const min = 0;
        const max = 1;
        let random = Math.random() * (max - min) + min;
        // Vérifier si la croissance se produit en fonction de la probabilité
        if (random < growthProbability) {
            if (seedValue > 0 && seedValue < 7) {
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
        const min = 0;
        const max = 1;
        let random = Math.random() * (max - min) + min;
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

```
