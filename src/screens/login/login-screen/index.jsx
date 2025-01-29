import React, { useState, useContext } from "react";
import { View, Text, TextInput, ActivityIndicator, StyleSheet } from "react-native";
import { AuthContext } from "../../../core/context/auth-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import RoundButton from "../../../shared/components/round-button";

export const LoginScreen = ({ navigation }) => {
  const { loginWithEmail, authState, error } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);

  const handleLogin = async () => {
    if (!email || !password) return;
    await loginWithEmail(email, password);
  };

  return (
    <View style={styles.container}>
      {/* Icono de usuario para Login */}
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="account" size={70} color="#F57C00" />
      </View>

      <Text style={styles.title}>Login </Text>
      <Text style={styles.subtitle}>Ingrese su email y contraseña</Text>

      {/* Input de Email */}
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese su email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Input de Contraseña */}
      <Text style={styles.label}>Contraseña</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Ingrese su contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={secureText}
        />
        <MaterialCommunityIcons
          name={secureText ? "eye-off" : "eye"}
          size={24}
          color="gray"
          onPress={() => setSecureText(!secureText)}
        />
      </View>

      {/* Olvidó su contraseña */}
      <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>

      {/* Botón de Login usando RoundButton */}
      <RoundButton
        title={authState.LOADING ? <ActivityIndicator color="#fff" /> : "Log In"}
        color="#53B175"
        onPress={handleLogin}
      />

      {/* Mensaje de registro */}
      <View style={styles.signupContainer}>
        <Text>¿No tienes una cuenta?</Text>
        <Text style={styles.signupText} onPress={() => navigation.navigate("SignUp")}>
          {" "}
          Registrarse
        </Text>
      </View>

      {/* Mensaje de error */}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontFamily: "Gilroy-Bold",
    textAlign: "center",
    marginBottom: 15,
  },
  subtitle: {
    color: "gray",
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Gilroy-Regular",
  },
  label: {
    fontWeight: "bold",
    fontFamily: "Gilroy-Medium",
  },
  input: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 20,
    fontFamily: "Gilroy-Regular",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    fontFamily: "Gilroy-Regular",
  },
  forgotPassword: {
    color: "black",
    alignSelf: "flex-end",
    marginBottom: 20,
    fontFamily: "Gilroy-Regular",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  signupText: {
    color: "#6DBE45",
    fontWeight: "bold",
    fontFamily: "Gilroy-Medium",
  },
  errorText: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
    fontFamily: "Gilroy-Regular",
  },
});

export default LoginScreen;
