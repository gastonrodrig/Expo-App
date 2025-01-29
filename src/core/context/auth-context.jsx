import { createContext, useState, useEffect } from "react";
import { AuthState } from "../../shared/constants/auth-state";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FirebaseAuthService from "../services/firebase/firebase-auth-service";
import UserService from "../services/api/user-service";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authState, setAuthState] = useState(AuthState.UNAUTHENTICATED);
  const [error, setError] = useState(null);
  const isUserLogin = authState === AuthState.AUTHENTICATED;
  const userService = new UserService();

  // Cargar usuario guardado en AsyncStorage
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          setAuthState(AuthState.AUTHENTICATED);
        }
      } catch (error) {
        console.error("Error al cargar usuario:", error);
      }
    };
    loadUser();
  }, []);

  // Guardar/Borrar usuario basado en autenticación
  const setUserData = async (user, firebaseUser) => {
    if (firebaseUser) {
      await AsyncStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      console.log(user)

      setAuthState(AuthState.AUTHENTICATED);
      setError(null);
    } else {
      await AsyncStorage.removeItem("user");
      setUser(null);
      setAuthState(AuthState.UNAUTHENTICATED);
    }
  };

  // Login con Email/Password
  const loginWithEmail = async (email, password) => {
    setAuthState(AuthState.LOADING);
    try {
      const firebaseUser = await FirebaseAuthService.loginWithEmail(email, password);
      console.log("UID del usuario:", firebaseUser.uid);

      const userByEmail = await userService.getUserByEmail(firebaseUser.email);

      setUserData(userByEmail, firebaseUser);
      setError(null);
    } catch (error) {
      setError(error.message);
      setAuthState(AuthState.ERROR);
    }
  };

  // Registro con Email/Password
  const registerWithEmail = async (username, email, password) => {
    setAuthState(AuthState.LOADING);
    try {
      const newUser = await FirebaseAuthService.registerWithEmail(email, password);
      console.log("UID del nuevo usuario:", newUser.uid);

      if(newUser.uid) {
        const createdUser = await userService.createUser({username, email});

        setUserData(createdUser, newUser);
        setError(null);
      }
    } catch (error) {
      setError(error.message);
      setAuthState(AuthState.ERROR);
    }
  };

  // Cerrar sesión
  const logout = async () => {
    setAuthState(AuthState.LOADING);
    try {
      await FirebaseAuthService.logout();
      setUserData(null, null);
      setError(null);
    } catch (error) {
      setError(error.message);
      setAuthState(AuthState.ERROR);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authState,
        error,
        isUserLogin,
        loginWithEmail,
        registerWithEmail,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
