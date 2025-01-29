import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { AuthContext } from "../../core/context/auth-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const ProfileScreen = () => {
  const { user } = useContext(AuthContext); // ✅ Obtiene la info del usuario

  return (
    <View style={styles.container}>
      {/* Icono de perfil */}
      <MaterialCommunityIcons name="account-circle" size={80} color="#4F63AC" />

      {/* Información del usuario */}
      <Text style={styles.name}>{user?.username || "Usuario desconocido"}</Text>

      <Text style={styles.email}>{user?.email || "Correo no disponible"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    fontFamily: "Gilroy-Bold",
    marginTop: 10,
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: "gray",
    fontFamily: "Gilroy-Regular",
    marginBottom: 20,
  },
});
