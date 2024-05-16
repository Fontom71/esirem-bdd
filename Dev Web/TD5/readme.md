# Compte Rendu : TD JavaScript - POO & LocalStorage

## Implémentation

### Une Carte

#### Modèle

- Création de la classe `Card` avec un attribut `value` disposant d'un getter dans `js/models/card.js` :
  ```javascript
  export class Card {
      #value;
      constructor(value) {
          this.#value = value;
      }
      get value() {
          return this.#value;
      }
  }
  ```

#### Contrôleur

- Ajout d'un attribut `card` de type `Card` avec un getter dans `js/controllers/controller-memory.js` :
  ```javascript
  import { Card } from './../models/card.js';
  import { Notifier } from "../patterns/notifier.js";

  export class ControllerMemory extends Notifier {
      #card;
      constructor() {
          super();
      }
      get card() {
          return this.#card;
      }
      createCard() {
          const randomValue = Math.floor(Math.random() * (0x1F9FF - 0x1F90C + 1)) + 0x1F90C;
          this.#card = new Card(randomValue);
          this.notify();
      }
  }
  ```

#### Vue

- Ajout de la méthode `displayCard` dans `js/views/view-memory.js` :
  ```javascript
  import { Observer } from "../patterns/observer.js";

  export class ViewMemory extends Observer {
      #controllerMemory;

      constructor(controllerMemory) {
          super();

          this.#controllerMemory = controllerMemory;
          this.#controllerMemory.addObserver(this);
      }
      displayCard(card) {
          const cardElement = document.createElement('div');
          cardElement.classList.add("card");
          const specialChar = String.fromCodePoint(card.value);
          cardElement.innerHTML = `<p>${specialChar}</p>`;
          const cards = document.getElementsByClassName("cards")[0];
          cards.appendChild(cardElement);
      }
      notify() {
          this.displayCard(this.#controllerMemory.card);
      }
  }
  ```

#### Application

- Appel de la méthode `createCard` dans le constructeur de `ApplicationMemory` :
  ```javascript
  import { ControllerMemory } from './controllers/controller-memory.js';
  import { ViewMemory } from './views/view-memory.js';

  export class ApplicationMemory {
      #controllerMemory;
      #viewMemory;

      constructor() {
          this.#initControllers();
          this.#initViews();
          this.#controllerMemory.createCard();
      }
      #initControllers() {
          this.#controllerMemory = new ControllerMemory();
      }

      #initViews() {
          this.#viewMemory = new ViewMemory(this.#controllerMemory);
      }
  }
  ```

### Des Cartes

#### Modèle

- Création de la classe `Memory` dans `js/models/memory.js` :
  ```javascript
  export class Memory {
      #cards;
      constructor() {
          this.#cards = [];
      }
      newGame(pairsNumber) {
          this.#cards = [];
          for (let i = 0; i < pairsNumber; i++) {
              const value = 0x1F90C + i;
              this.#cards.push(new Card(value), new Card(value));
          }
          this.#cards = this.#cards.sort(() => Math.random() - 0.5);
      }
      getCardsNumber() {
          return this.#cards.length;
      }
      getCard(index) {
          return this.#cards[index];
      }
  }
  ```

#### Contrôleur

- Mise à jour de `ControllerMemory` :
  ```javascript
  import { Memory } from './../models/memory.js';
  import { Notifier } from "../patterns/notifier.js";

  export class ControllerMemory extends Notifier {
      #memory;
      constructor() {
          super();
          this.#memory = new Memory();
      }
      get memory() {
          return this.#memory;
      }
      newGame() {
          this.#memory.newGame(10);
          this.notify();
      }
  }
  ```

#### Vue

- Mise à jour de `ViewMemory` :
  ```javascript
  import { Observer } from "../patterns/observer.js";

  export class ViewMemory extends Observer {
      #controllerMemory;

      constructor(controllerMemory) {
          super();

          this.#controllerMemory = controllerMemory;
          this.#controllerMemory.addObserver(this);
      }
      displayCard(card) {
          const cardElement = document.createElement('div');
          cardElement.classList.add("card");
          const specialChar = String.fromCodePoint(card.value);
          cardElement.innerHTML = `<p>${specialChar}</p>`;
          const cards = document.getElementsByClassName("cards")[0];
          cards.appendChild(cardElement);
      }
      displayCards(cards) {
          const cardsContainer = document.getElementsByClassName("cards")[0];
          cardsContainer.innerHTML = "";

          for (let i = 0; i < cards.getCardsNumber(); i++) {
              this.displayCard(cards.getCard(i));
          }
      }
      notify() {
          const cards = this.#controllerMemory.memory;
          this.displayCards(cards);
      }
  }
  ```

#### Application

- Mise à jour du constructeur de `ApplicationMemory` :
  ```javascript
  import { ControllerMemory } from './controllers/controller-memory.js';
  import { ViewMemory } from './views/view-memory.js';

  export class ApplicationMemory {
      #controllerMemory;
      #viewMemory;

      constructor() {
          this.#initControllers();
          this.#initViews();
          this.#controllerMemory.newGame();
      }
      #initControllers() {
          this.#controllerMemory = new ControllerMemory();
      }

      #initViews() {
          this.#viewMemory = new ViewMemory(this.#controllerMemory);
      }
  }
  ```

### Enregistrement

#### Contrôleur

- Ajout de la méthode `saveGame` dans `ControllerMemory` :
  ```javascript
  saveGame() {
      const memoryData = JSON.stringify(this.#memory.toData());
      localStorage.setItem('memory', memoryData);
  }
  ```

#### Méthodes toData et fromData

##### Card

- Ajout de la méthode `toData` :
  ```javascript
  toData() {
      return { value: this.#value };
  }
  ```

##### Memory

- Ajout de la méthode `toData` :

  ```javascript
  toData() {
      return { cards: this.#cards.map(card => card.toData()) };
  }
  ```
- Ajout de la méthode `fromData` :

  ```javascript
  fromData(data) {
      this.#cards = [];
      data.cards.forEach((cardData) => {
          const card = new Card(cardData.value);
          cardData.faceHidden ? card.hide() : card.show();
          this.#cards.push(card);
      });
  }
  ```

#### Contrôleur

- Mise à jour de `saveGame` et ajout de `loadGame` :
  ```javascript
  saveGame() {
      const memoryData = JSON.stringify(this.#memory.toData());
      localStorage.setItem('memoryGame', memoryData);
  }
  loadGame() {
      const memoryData = JSON.parse(sessionStorage.getItem("memory"));
      if (memoryData) {
          this.memory.fromData(memoryData);
          this.notify();
          return true;
      } else {
          return false;
      }
  }
  start() {
      if (!this.loadGame()) {
          this.newGame();
      }
  }
  ```

#### Application

- Mise à jour de `ApplicationMemory` :
  ```javascript
  import { ControllerMemory } from './controllers/controller-memory.js';
  import { ViewMemory } from './views/view-memory.js';

  export class ApplicationMemory {
      #controllerMemory;
      #viewMemory;

      constructor() {
          this.#initControllers();
          this.#initViews();
          this.#controllerMemory.start();
      }
      #initControllers() {
          this.#controllerMemory = new ControllerMemory();
      }

      #initViews() {
          this.#viewMemory = new ViewMemory(this.#controllerMemory);
      }
  }
  ```

## Conclusion

Ce TD m'a permis de comprendre comment structurer une application JavaScript en utilisant les modules ES6, les classes, le modèle MVC, et le LocalStorage pour une architecture propre et maintenable.
