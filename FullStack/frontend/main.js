import ProductsView from "./views/products-view.js";
import { SSEClient } from "./libs/sse-client.js";

async function run() {
  ProductsView.displayProducts();

  const sseClient = new SSEClient("localhost:8080");
  sseClient.connect();
  sseClient.subscribe("bids", ProductsView.updateBid);
}

document.addEventListener("DOMContentLoaded", run);
