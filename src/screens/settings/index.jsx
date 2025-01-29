import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { AuthContext } from "../../core/context/auth-context";
import RoundButton from "../../shared/components/round-button";

export const SettingsScreen = () => {
  const { logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración</Text>

      {/* Botón de Cerrar Sesión usando RoundButton */}
      <RoundButton title="Cerrar Sesión" color="#FF3B30" onPress={logout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: "Gilroy-Bold",
    textAlign: "center",
    marginBottom: 20,
  },
});

export default SettingsScreen;
