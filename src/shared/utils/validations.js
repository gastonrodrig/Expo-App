class Validation {
  // Validación de correo electrónico
  static isValidEmail(email) {
    const emailRegEx = /^[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,64}$/;
    return emailRegEx.test(email);
  }

  // Validación de contraseña (mínimo 6 caracteres)
  static isValidPassword(password) {
    return password.length >= 6;
  }

  // Validación de nombre de usuario (mínimo 3 caracteres)
  static isValidUsername(username) {
    return username.length >= 3;
  }

  // Validación de número de teléfono (mínimo 9 dígitos)
  static isValidMobile(mobile) {
    return /^\d{9,}$/.test(mobile);
  }
}

export default Validation;
