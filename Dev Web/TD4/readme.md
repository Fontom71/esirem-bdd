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

## Conclusion

Ce TD m'a permis de comprendre comment structurer une application JavaScript en utilisant les modules ES6, les classes, et le modèle MVC avec le patron Sujet/Observateur pour une architecture propre et maintenable.
