import { auth } from '../../../../firebase-config';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from 'firebase/auth';

class FirebaseAuthService {
  // Login con Email y Contraseña
  static async loginWithEmail(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw new Error(this.handleFirebaseError(error));
    }
  }

  // Registro de Usuario con Email y Contraseña
  static async registerWithEmail(email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw new Error(this.handleFirebaseError(error));
    }
  }

  // Logout
  static async logout() {
    try {
      await signOut(auth);
      return true;
    } catch (error) {
      throw new Error('Error al cerrar sesión: ' + error.message);
    }
  }

  // Manejo de errores de Firebase
  static handleFirebaseError(error) {
    switch (error.code) {
      case 'auth/user-not-found':
        return 'No existe un usuario con ese correo.';
      case 'auth/wrong-password':
        return 'Contraseña incorrecta.';
      case 'auth/email-already-in-use':
        return 'El correo ya está registrado.';
      case 'auth/weak-password':
        return 'La contraseña es demasiado débil.';
      case 'auth/invalid-email':
        return 'El correo ingresado no es válido.';
      default:
        return 'Ocurrió un error inesperado: ' + error.message;
    }
  }
}

export default FirebaseAuthService;
