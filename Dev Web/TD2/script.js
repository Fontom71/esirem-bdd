console.log("Polytech Dijon !");

let area = "VIDE";
const width = 1920;
const height = 1080;
area = width * height;
console.log(area); // Affiche 2073600

try {
  height = 1200;
} catch (error) {
  console.error("Erreur : " + error);
}

const array = [];
array.push(5); // Ajoute un entier
array.push("Bonjour"); // Ajoute une chaine de caractères
console.log(array); // Affiche [5, "Bonjour"]

let notTrue = false;
let zero = 0;
if (notTrue == zero) {
  console.log("Elles sont égales"); // Affiche "Elles sont égales"
} else {
  console.log("Elles ne sont pas égales");
}

if (notTrue === zero) {
  console.log("Elles sont égales");
} else {
  console.log("Elles ne sont pas égales"); // Affiche "Elles ne sont pas égales"
}

const randomArray = [];
for (let i = 0; i < 30; i++) {
  randomArray.push(Math.random());
}
console.log(randomArray);

function calculerMoyenne(tableau) {
  let somme = 0;
  for (let i = 0; i < tableau.length; i++) {
    somme += tableau[i];
  }
  return somme / tableau.length;
}

const tableauNombres = [5, 10, 15, 20];
const moyenne = calculerMoyenne(tableauNombres);
console.log(moyenne); // Affiche 12.5

const titre = document.querySelector("h1");
titre.innerHTML = "Polytech Dijon";

const texteImportant = document.querySelector("strong");
texteImportant.style.color = "#4691ff";

const lien = document.querySelector("a");
lien.href = "https://esirem.u-bourgogne.fr";

if (true) {
  let a = 5;
  var b = 10;
}
console.log(a); // Erreur: a is not defined
console.log(b); // Affiche 10
