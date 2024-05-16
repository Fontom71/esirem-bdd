### Développement d’Application Web : Introduction à JavaScript

### Premiers Pas avec JavaScript

**Exercice 1 : Configuration Initiale**

1. Créez un dossier pour votre projet et ouvrez-le avec Visual Studio Code.
2. Créez un fichier `index.html` contenant une structure HTML de base.
   - Astuce : Tapez « html » dans un fichier HTML vide et sélectionnez le snippet `html:5` pour obtenir une structure de base.
3. Créez un fichier `script.js`.
4. Ajoutez la balise `<script>` suivante dans le body de votre page HTML :
   ```html
   <script src="script.js" defer></script>
   ```

**index.html :**

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Introduction à JavaScript</title>
</head>
<body>
    <h1>Titre</h1>
    <p>Un paragraphe avec <strong>un texte important</strong></p>
    <p>Un autre paragraphe avec <a href="#">un lien</a></p>

    <input type="text" id="textInput">
    <button id="testButton">Tester</button>

    <script src="script.js" defer></script>
</body>
</html>
```

**script.js :**

```javascript
// Exercice 2 : Utilisation de la Console
console.log("Polytech Dijon !");

// Exercice 3 : Déclaration et Utilisation des Variables
let area = "VIDE";
const width = 1920;
const height = 1080;
area = width * height;
console.log("La surface est : ", area);

try {
    height = 1200;
} catch (e) {
    console.log("Erreur : ", e);
}

// Exercice 5 : Manipulation des Tableaux
const array = [];
array.push(42);
array.push("Bonjour");
console.log("Tableau : ", array);

// Exercice 6 : Conditions
let notTrue = false;
let zero = 0;
if (notTrue === zero) {
    console.log("Elles sont égales");
} else {
    console.log("Elles ne sont pas égales");
}

// Exercice 7 : Boucles
const randomArray = [];
for (let i = 0; i < 30; i++) {
    randomArray.push(Math.random());
}
console.log("Tableau aléatoire : ", randomArray);

// Exercice 8 : Fonctions
function calculerMoyenne(tableau) {
    let somme = 0;
    for (let nombre of tableau) {
        somme += nombre;
    }
    return somme / tableau.length;
}
console.log("Moyenne : ", calculerMoyenne(randomArray));

// Exercice 9 : Manipulation du DOM
function helloWorld() {
    document.body.innerHTML = "<h1>Hello World !</h1>";
}
helloWorld();

// Exercice 10 : Manipulation des Éléments du DOM
function modifierContenu() {
    const titre = document.querySelector("h1");
    titre.textContent = "Polytech Dijon";

    const texteImportant = document.querySelector("strong");
    texteImportant.style.color = "#4691ff";

    const lien = document.querySelector("a");
    lien.href = "https://esirem.u-bourgogne.fr";
}
modifierContenu();

// Exercice 11 : Validation de Formulaire
function testValue() {
    const input = document.querySelector("#textInput");
    const value = input.value;

    if (isNaN(value)) {
        input.style.backgroundColor = "red";
    } else if (value % 2 === 0) {
        input.style.backgroundColor = "yellow";
    } else {
        input.style.backgroundColor = "blue";
    }
}

function connectClickEvent() {
    const button = document.querySelector("#testButton");
    button.addEventListener("click", testValue);
}
connectClickEvent();

// Exercice 12 : Différence entre let et var
function testVarLet() {
    for (var i = 0; i < 3; i++) {
        console.log("var i : ", i);
    }
    console.log("var après boucle : ", i); // i est accessible ici

    for (let j = 0; j < 3; j++) {
        console.log("let j : ", j);
    }
    try {
        console.log("let après boucle : ", j); // j n'est pas accessible ici
    } catch (e) {
        console.log("Erreur : ", e);
    }
}
testVarLet();
```

### Explication du Code

- **index.html** : Contient la structure de base du document HTML avec une balise `<script>` ajoutée en bas du `<body>` avec l’attribut `defer` pour s’assurer que le script est exécuté après le chargement du DOM.
- **script.js** : Contient tous les exercices, incluant les manipulations du DOM, les boucles, les conditions, et les fonctions en JavaScript. Le script est conçu pour être modifiable et exécuter les tâches spécifiées dans chaque exercice.
