class ProductsService {
  static async findAll() {
    const response = await fetch("http://localhost:8080/products");
    if (response.status === 200) {
      return response.json();
    }
    return [];
  }

  static async findById(productId) {
    const response = await fetch(`http://localhost:8080/products/${productId}`);
    if (response.status === 200) {
      return response.json();
    }
    return null;
  }

  static async bid(productId) {
    const response = await fetch(`http://localhost:8080/bid/${productId}`, {
      method: "POST",
    });
    return response.status === 200;
  }
}

export default ProductsService;
