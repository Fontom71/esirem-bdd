# Compte rendu : JavaScript - POO & LocalStorage

## Introduction
Dans ce TD sur JavaScript axé sur la programmation orientée objet (POO) et l'utilisation de l'API Web LocalStorage, nous avons réalisé un jeu Memory. L'objectif était de manipuler les modules ES6, de comprendre les concepts de la POO, d'implémenter l'architecture Modèle/Vue/Contrôleur (MVC), et de sauvegarder l'état du jeu dans le navigateur grâce au LocalStorage. Ce compte rendu résume les étapes suivies et les concepts abordés tout au long de l'exercice.

## Une carte
### Modèle
- Implémentation de la classe Card avec un attribut "value" et un getter.
### Contrôleur
- Ajout d'un attribut "card" à la classe ControllerMemory avec un getter.
- Création de la méthode "createCard" pour initialiser "card" avec une instance de Card.
### Vue
- Ajout de la méthode "displayCard" à la classe ViewMemory pour afficher une carte avec un caractère spécial HTML correspondant à sa valeur.

## Application
- Appel de la méthode "createCard" dans le constructeur de ApplicationMemory.

## Test
- Lancement du serveur local pour vérifier l'apparition d'une carte à l'écran.

## Des cartes
- Modification pour générer une nouvelle carte à chaque clic sur la carte affichée.

## Memory
### Modèle
- Implémentation de la classe Memory avec des méthodes pour gérer les cartes du jeu.
### Contrôleur
- Suppression de "card" et "createCard".
- Ajout de "memory" initialisé avec une nouvelle instance de Memory et d'une méthode "newGame".

### Vue
- Modification de "displayCard" pour afficher les cartes passées en paramètre.
- Ajout de "displayCards" pour afficher toutes les cartes du Memory.

## Application
- Modification du constructeur pour appeler "newGame".

## Un peu aléatoire
- Modification pour que les cartes soient générées dans un ordre aléatoire.

## Enregistrement
### Contrôleur
- Ajout de la méthode "saveGame" pour enregistrer l'état du jeu dans le LocalStorage.

### Test
- Vérification de l'enregistrement des données au format JSON.

## Chargement
### Memory
- Ajout de la méthode "fromData" pour charger les données d'un Memory depuis un objet JavaScript.

### Contrôleur
- Ajout de la méthode "loadGame" pour charger les données enregistrées.

### Application
- Modification pour appeler "start" au lieu de "newGame".

### Test
- Vérification que les données sont chargées correctement au démarrage de l'application.

## SessionStorage
- Remplacement de LocalStorage par SessionStorage pour tester les différences.

## Bonus du développeur
### Carte
- Ajout de l'attribut "faceHidden" et des méthodes "show" et "hide" pour gérer l'affichage des cartes.

### Memory
- Ajout de la méthode "showCard" pour gérer le retournement des cartes pendant le jeu.

### Contrôleur
- Ajout de la méthode "showCard" pour interagir avec Memory lors du retournement d'une carte.

### Vue
- Modification pour appeler "showCard" lors du clic sur une carte.

## Bonus du pro du CSS
- Animation du retournement des cartes avec l'attribut CSS "transform".

Ce TD nous a permis de comprendre et de mettre en pratique de nombreux concepts avancés de JavaScript, notamment la POO et l'utilisation de l'API Web Storage pour sauvegarder les données localement dans le navigateur.