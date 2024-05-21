import ProductsService from "../services/products-service.js";

class ProductsView {
  static async displayProducts() {
    const products = await ProductsService.findAll();
    products.forEach((product) => this.#displayProduct(product));
  }

  static #displayProduct(product) {
    const productsContainer = document.querySelector(".products");
    const productElement = document.createElement("div");
    productElement.classList.add("product");
    productElement.innerHTML = `
    <div class="product-line">
        <h2 class="product-name">${product.name}</h2>
        <p class="product-owner">${product.owner}</p>
        <p class="product-bid">Prix: <span>${product.bid}</span>€</p>
        <button class="bid-button" data-id="${product.id}">Enchérir</button>
    </div>`;
    productsContainer.appendChild(productElement);

    productElement
      .querySelector("button")
      .addEventListener("click", async () => {
        await ProductsService.bid(product.id);

        // Afficher la boîte de dialogue de confirmation
        const confirmationDialog = document.getElementById(
          "confirmation-dialog"
        );
        confirmationDialog.querySelector(
          "p"
        ).innerText = `Vous avez enchéri sur ${product.name}`;
        confirmationDialog.style.display = "block";
        setTimeout(() => {
          confirmationDialog.style.display = "none";
        }, 2000);
      });
  }

  static updateBid(data) {
    const productElement = document
      .querySelector(`[data-id="${data.productId}"]`)
      .closest(".product");
    const bidElement = productElement.querySelector("p:nth-child(3) span");

    bidElement.innerText = data.bid;

    // Mettre en rouge et en gras le bid pendant 2 secondes
    bidElement.parentNode.style.color = "red";
    bidElement.parentNode.style.fontWeight = "bold";
    setTimeout(() => {
      bidElement.parentNode.style.color = "black";
      bidElement.parentNode.style.fontWeight = "normal";
    }, 2000);
  }
}

export default ProductsView;
