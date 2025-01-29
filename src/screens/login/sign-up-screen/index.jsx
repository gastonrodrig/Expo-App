import React, { useState, useContext } from "react";
import { View, Text, TextInput, ActivityIndicator } from "react-native";
import { AuthContext } from "../../../core/context/auth-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import RoundButton from "../../../shared/components/round-button";

export const SignUpScreen = ({ navigation }) => {
  const { registerWithEmail, authState, error } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);

  const handleSignUp = async () => {
    if (!email || !password) return;
    await registerWithEmail(username, email, password);
  };

  return (
    <View style={styles.container}>
      {/* Icono superior */}
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="account" size={70} color="#F57C00" />
      </View>

      <Text style={styles.title}>Registrarse</Text>
      <Text style={styles.subtitle}>Ingrese sus credenciales para continuar</Text>

      {/* Input de Username */}
      <Text style={styles.label}>Nombre de usuario</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese su nombre de usuario"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      {/* Input de Email */}
      <Text style={styles.label}>Correo electrónico</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese su correo electrónico"
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

      {/* Términos y condiciones */}
      <Text style={styles.termsText}>
        Al continuar, acepta nuestros
        <Text style={styles.termsHighlight}> Términos de Servicio</Text> y
        <Text style={styles.termsHighlight}> Política de Privacidad</Text>.
      </Text>

      {/* Botón de Sign Up usando RoundButton */}
      <RoundButton
        title={authState === "LOADING" ? <ActivityIndicator color="#fff" /> : "Registrarse"}
        color="#53B175"
        onPress={handleSignUp}
      />

      {/* Mensaje de inicio de sesión */}
      <View style={styles.signupContainer}>
        <Text>¿Ya tienes una cuenta?</Text>
        <Text style={styles.signupText} onPress={() => navigation.navigate("Login")}>
          {" "}
          Iniciar sesión
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
    fontSize: 24,
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
  termsText: {
    textAlign: "center",
    color: "gray",
    marginBottom: 20,
    fontFamily: "Gilroy-Regular",
  },
  termsHighlight: {
    color: "#53B175",
    fontFamily: "Gilroy-Medium",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  signupText: {
    color: "#53B175",
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


export default SignUpScreen;
