import React, { useContext, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { ProductContext } from "../../../core/context/product-context";
import RoundButton from "../../../shared/components/round-button/index";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ProductListScreen = ({ navigation }) => {
  const { products, fetchProducts, deleteProduct } = useContext(ProductContext);

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = (productID) => {
    Alert.alert("Eliminar Producto", "¿Estás seguro?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Eliminar", onPress: () => deleteProduct(productID), style: "destructive" },
    ]);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <View>
              <Text style={styles.productTitle}>{item.name}</Text>
              <Text style={styles.productDesc}>{item.description}</Text>
              <Text style={styles.productCategory}>Categoría: {item.category}</Text>
            </View>

            <View style={styles.actions}>
              <TouchableOpacity onPress={() => navigation.navigate("ProductForm", { product: item })}>
                <MaterialCommunityIcons name="pencil" size={24} color="#4F63AC" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <MaterialCommunityIcons name="trash-can" size={24} color="#FF3B30" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <RoundButton title="Agregar Producto" color="#6DBE45" onPress={() => navigation.navigate("ProductForm")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20 
  },
  productCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productTitle: { 
    fontSize: 18, 
    fontWeight: "bold", 
    fontFamily: "Gilroy-Bold", 
    marginBottom: 5 
  },
  productDesc: { 
    color: "gray", 
    fontFamily: "Gilroy-Regular", 
    marginBottom: 5 
  },
  productCategory: { 
    fontSize: 12, 
    fontFamily: "Gilroy-Medium" 
  },
  actions: { 
    flexDirection: "row", 
    gap: 15 
  },
});

export default ProductListScreen;
