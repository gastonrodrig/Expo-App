import React, { useState, useContext } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import { ProductContext } from "../../../core/context/product-context";
import RoundButton from "../../../shared/components/round-button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

const ProductFormScreen = ({ route, navigation }) => {
  const { addProduct, updateProduct } = useContext(ProductContext);
  const product = route.params?.product || { name: "", description: "", category: "" };

  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [category, setCategory] = useState(product.category);

  const handleSubmit = async () => {
    if (!name || !description || !category) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    if (product) {
      await updateProduct(product.id, { name, description, category });
    } else {
      await addProduct({ name, description, category });
    }

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Botón para regresar */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons name="arrow-left" size={28} color="#4F63AC" />
      </TouchableOpacity>

      <Text style={styles.title}>Agregar/Editar Producto</Text>

      <Text style={styles.label}>Nombre</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Nombre del producto" />

      <Text style={styles.label}>Descripción</Text>
      <TextInput style={styles.input} value={description} onChangeText={setDescription} placeholder="Descripción" />

      <Text style={styles.label}>Categoría</Text>
      <TextInput style={styles.input} value={category} onChangeText={setCategory} placeholder="Categoría" />

      <RoundButton title={product.id ? "Actualizar" : "Agregar"} color="#4F63AC" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    zIndex: 5 
  },
  backButton: {
    position: "absolute",
    top: 6,
    left: 20,
    padding: 10,
    zIndex: 10,
  },
  title: { 
    fontSize: 22, 
    fontWeight: "bold", 
    textAlign: "center", 
    marginBottom: 40,  
    fontFamily: "Gilroy-Bold",
    zIndex: 9 
  },
  label: { 
    fontSize: 16, 
    fontWeight: "bold", 
    marginBottom: 5, 
    fontFamily: "Gilroy-Medium" 
  },
  input: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 20,
    fontFamily: "Gilroy-Regular",
  },
});

export default ProductFormScreen;
