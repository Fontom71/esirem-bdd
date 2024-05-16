# Compte Rendu : TD JavaScript - Classes & MVC

## Modules ES6

### À l'Ancienne

- Création d'une variable globale `counter` initialisée à 0 dans `counter.js` :
  ```javascript
  let counter = 0;
  ```
- Affichage du contenu de `counter` dans `application.js` :
  ```javascript
  console.log(counter);
  ```

### Avec les Modules

- Modification de `index.html` pour indiquer que `application.js` est un module :
  ```html
  <script src="js/application/application.js" type="module"></script>
  ```
- Ajout de l'import de `counter` dans `application.js` :
  ```javascript
  import { counter } from "./../models/counter.js";
  ```
- Modification de `counter.js` pour permettre l'exportation de `counter` :
  ```javascript
  export let counter = 0;
  ```

### Un Peu Mieux

- Création d'une fonction `getCounter` dans `counter.js` :
  ```javascript
  export function getCounter() {
      return counter;
  }
  ```

Dans cette section, j'ai d'abord appris comment organiser mon code en utilisant des modules ES6. Cela me permet de diviser mon application en plusieurs fichiers pour une meilleure organisation et maintenabilité.

## Première Classe

- Création de la classe `Counter` dans `counter.js` :
  ```javascript
  class Counter {
    #value;
    get value() {
      return this.#value;
    }

    constructor() {
      this.#value = 0;
    }

    incrementValue() {
      this.#value++;
    }

    decrementValue() {
      this.#value--;
    }
  }

  export default Counter;
  ```
- Adaptation de `application.js` pour utiliser cette classe :
  ```javascript
  import { Counter } from "./../models/counter.js";

  const counter = new Counter();
  console.log(counter.counter);
  ```

J'ai créé la classe `Counter` dans counter.js. Cette classe représente le modèle de mon application. Elle contient la logique métier pour gérer un compteur, avec des méthodes pour incrémenter et décrémenter sa valeur.

## Sujet/Observateur

- Implémentation de l'interface `Observer` dans `observer.js` :
  ```javascript
  class Observer {
    notify() {
      throw new Error("La méthode notify doit être implémentée");
    }
  }

  export default Observer;
  ```
- Création de la classe `Notifier` dans `notifier.js` :
  ```javascript
  class Notifier {
    #observers;

    constructor() {
      this.#observers = [];
    }

    addObserver(observer) {
      this.#observers.push(observer);
    }

    notify() {
      this.#observers.forEach((observer) => observer.notify());
    }
  }

  export default Notifier;
  ```

J'ai introduit le concept de Sujet/Observateur en implémentant une interface `Observer` dans `observer.js`. Ensuite, j'ai créé la classe `Notifier` dans `notifier.js`, qui gère une liste d'observateurs et les notifie lorsque des changements surviennent.

## Modèle / Vue / Contrôleur

### Modèle

- La classe `Counter` représente le modèle et contient la logique métier de l'application.

### Contrôleur

- Création de la classe `Controller` dans `controller.js` :
  ```javascript
  import Counter from "../models/counter.js";
  import Notifier from "../pattern/notifier.js";

  class Controller extends Notifier {
    #counter;

    constructor() {
      super();
      this.#counter = new Counter();
    }

    incrementCounter() {
      this.#counter.incrementValue();
      this.notify();
    }

    decrementCounter() {
      this.#counter.decrementValue();
      this.notify();
    }

    getCounterValue() {
      return this.#counter.value;
    }
  }

  export default Controller;
  ```

Le contrôleur est représenté par la classe `Controller` dans `controller.js`. Il interagit avec le modèle `Counter` pour effectuer des actions telles qu'incrémenter ou décrémenter le compteur. Il étend également la classe `Notifier` pour pouvoir notifier les observateurs lorsque des changements se produisent.

### Vue

- Création de la classe `View` dans `view.js` :
  ```javascript
  import Observer from "../pattern/observer.js";

  class View extends Observer {
    #controller;

    constructor(controller) {
      super();
      this.#controller = controller;
      this.#controller.addObserver(this);

      document
      .getElementById("btn-increment")
      .addEventListener("click", () => {
        controller.incrementCounter();
      });

      document
      .getElementById("btn-decrement")
      .addEventListener("click", () => {
        controller.decrementCounter();
      });
    }

    notify() {
      // affiche la valeur du compteur dans txt-counter
      document.getElementById("txt-counter").textContent =
        this.#controller.getCounterValue();
    }
  }

  export default View;
  ```

La vue est représentée par la classe `View` dans `view.js`. Elle est responsable de l'affichage des données à l'utilisateur. La vue observe les changements dans le modèle via le contrôleur et met à jour l'interface utilisateur en conséquence.

### Application

- Modification de `application.js` pour créer un `Controller` et une `View` :
  ```javascript
  import { Controller } from './controllers/controller.js';
  import { View } from './views/view.js';

  window.addEventListener('DOMContentLoaded', () => {
      const controller = new Controller();
      new View(controller);
  });
  ```

Enfin, dans `application.js`, j'assemble les pièces en créant une instance du contrôleur et de la vue lors du chargement du DOM. Cela démarre l'application et permet à l'utilisateur d'interagir avec le compteur via les boutons d'incrémentation et de décrémentation.

## Conclusion

Ce TD m'a permis de comprendre comment structurer une application JavaScript en utilisant les modules ES6, les classes, et le modèle MVC avec le patron Sujet/Observateur pour une architecture propre et maintenable.
