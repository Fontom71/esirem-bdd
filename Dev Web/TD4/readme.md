# Compte rendu : TD JavaScript - Classes & MVC

## Introduction

Dans le cadre du TD JavaScript sur les Classes & MVC, nous avons exploré plusieurs concepts clés de la programmation web moderne, notamment l'utilisation des modules ES6, les classes en JavaScript, le patron de conception Sujet/Observateur, ainsi que l'architecture Modèle/Vue/Contrôleur (MVC). Ce compte rendu présente un résumé des étapes suivies et des concepts abordés au cours de ce TD.

## Modules ES6

### Ancienne méthode

- Création d'un dossier "models" et d'un fichier "counter.js".
- Déclaration d'une variable globale "counter" initialisée à 0.
- Création d'un dossier "application" et d'un fichier "application.js".
- Affichage du contenu de "counter" dans la console une fois la page chargée.
- Ajout des scripts "counter.js" et "application.js" au fichier "index.html".
- Test du bon fonctionnement.

### Utilisation des modules

- Retrait du script "counter.js" du fichier "index.html".
- Modification de la balise script associée à "application.js" pour indiquer qu'il s'agit d'un module.
- Importation de "counter" dans "application.js".
- Modification de la déclaration de "counter" pour permettre l'exportation.
- Test du bon fonctionnement.

### Amélioration avec l'élimination des variables globales

- Création d'une fonction "getCounter" dans "counter.js" pour retourner la valeur de "counter".
- Exportation de cette fonction.
- Suppression du mot clé "export" devant la déclaration de "counter".
- Test et explication du résultat obtenu.
- Correction du problème.

## Première classe

- Introduction à la syntaxe de déclaration d'une classe en JavaScript.
- Remplacement du code de "counter.js" par une classe.
- Adaptation du code de "application.js".
- Test du bon fonctionnement.

## Getter et Setter

- Remplacement de la méthode "getValue" par un getter dans la classe "Counter".
- Adaptation du reste du code.
- Test du bon fonctionnement.

## Patron Sujet/Observateur

- Création d'un dossier "pattern" et des fichiers "observer.js" et "notifier.js".
- Implémentation de l'interface "Observer".
- Implémentation de la classe "Notifier".
- Exportation des classes pour leur utilisation dans d'autres modules.

## Modèle / Vue / Contrôleur (MVC)

### Modèle

- Définition du modèle avec la classe "Counter".

### Contrôleur

- Création d'un dossier "controllers" et du fichier "controller.js".
- Implémentation de la classe "Controller" qui hérite de "Notifier".

### Vue

- Création d'un dossier "views" et du fichier "view.js".
- Implémentation de la classe "View" qui implémente l'interface "Observer".
- Ajout d'un gestionnaire d'événements "click" sur le bouton "Incrémenter".
- Affichage de la valeur du compteur dans le paragraphe "txt-counter".
- Création d'une instance de "Controller" et de "View" dans "application.js".
- Test du bon fonctionnement.

### Gestion de l'interaction utilisateur

- Ajout d'un gestionnaire d'événements "click" sur le bouton "Décrémenter".
- Test du bon fonctionnement.

## Conclusion

Ce TD nous a permis de comprendre les concepts fondamentaux de la programmation web, en mettant l'accent sur l'organisation du code à l'aide des modules ES6, des classes et du patron de conception MVC. Nous avons également appris à éviter les variables globales et à mettre en place une architecture robuste pour nos applications web
