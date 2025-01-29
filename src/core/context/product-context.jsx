import React, { createContext, useState, useEffect } from "react";
import ProductService from "../services/api/products-service";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const productService = new ProductService();

  // Cargar productos al iniciar
  useEffect(() => {
    fetchProducts();
  }, []);

  // Obtener todos los productos
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await productService.getAllProducts();
      setProducts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Crear un nuevo producto
  const addProduct = async (product) => {
    setLoading(true);
    try {
      const newProduct = await productService.createProduct(product);
      setProducts((prevProducts) => [...prevProducts, newProduct]);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Actualizar un producto
  const updateProduct = async (productID, updatedProduct) => {
    setLoading(true);
    try {
      const updatedData = await productService.updateProduct(productID, updatedProduct);
      setProducts((prevProducts) =>
        prevProducts.map((product) => (product.id === productID ? updatedData : product))
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Eliminar un producto
  const deleteProduct = async (productID) => {
    setLoading(true);
    try {
      await productService.deleteProduct(productID);
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productID));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        fetchProducts,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
