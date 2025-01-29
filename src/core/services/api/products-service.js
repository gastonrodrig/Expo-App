import { baseURL } from "../../helpers/api-config";
import NetworkManager from "../../helpers/network-manager";
import CreateProductModel from "../../models/product/create-product-model";
import UpdateProductModel from "../../models/product/update-product-model";

class ProductService {
  constructor() {
    this.URL = `${baseURL}/product`;
  }

  // Crear producto (POST /product)
  async createProduct(product) {
    const newURL = `${this.URL}`;
    const productData = new CreateProductModel(product.name, product.description, product.category);
    try {
      const data = await NetworkManager.requestWithBody(newURL, "POST", productData);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Obtener todos los productos (GET /product)
  async getAllProducts() {
    const newURL = `${this.URL}`;
    try {
      const data = await NetworkManager.request(newURL, "GET");
      return data;
    } catch (error) {
      throw error;
    }
  }

  // Obtener un producto por ID (GET /product/{id})
  async getProductByID(productID) {
    const newURL = `${this.URL}/${productID}`;
    try {
      const data = await NetworkManager.request(newURL, "GET");
      return data;
    } catch (error) {
      throw error;
    }
  }

  // Actualizar un producto (PATCH /product/{id})
  async updateProduct(productID, product) {
    const newURL = `${this.URL}/${productID}`;
    const productData = new UpdateProductModel(product.name, product.description, product.category);
    try {
      const data = await NetworkManager.requestWithBody(newURL, "PATCH", productData);
      return data;
    } catch (error) {
      throw error;
    }
  }

  // Eliminar un producto (DELETE /product/{id})
  async deleteProduct(productID) {
    const newURL = `${this.URL}/${productID}`;
    try {
      await NetworkManager.request(newURL, "DELETE");
      return true;
    } catch (error) {
      throw error;
    }
  }
}

export default ProductService;
